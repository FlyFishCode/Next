<template>
	<labelTitle :value="$t('default.3')" :btn="ROUTE.query.id ? update : create" />
	<div class="searchBox">
		<a-row class="rowStyle">
			<a-col :span="4" class="labelText">
				{{ $t('default.4') }}
			</a-col>
			<a-col :span="20">
				<a-input v-model:value="infoVO.title" />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="4" class="labelText">
				{{ $t('default.7') }}
			</a-col>
			<a-col :span="15">
				<a-input v-model:value="infoVO.url" />
			</a-col>
			<a-col :span="2" class="searchButton">
				<a-button size="small" type="primary" @click="preview">{{ $t('default.16') }}</a-button>
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="4" class="labelText">
				{{ $t('default.3') }}
			</a-col>
			<a-col :span="1" class="searchButton">
				<a-button size="small" type="primary" @click="addShop">{{ $t('default.20') }}</a-button>
			</a-col>
		</a-row>
	</div>
	<a-row>
		<a-table bordered :columns="columns" :data-source="tableList" :pagination="false" rowKey="machineId" class="tableStyle">
			<template #handle="{ record }">
				<div class="tableBtn">
					<a-button size="small" type="danger" @click="shopDelete(record)">{{ $t('default.10') }}</a-button>
				</div>
			</template>
		</a-table>
	</a-row>
	<div class="paginationStyle">
		<a-pagination show-quick-jumper v-model:current="shopVO.pageIndex" :total="tableListTotal" @change="machineChange" />
	</div>
	<!-- 广告链接的预览 -->
	<showUrlDialog :visible="showUrlDialog" :src="infoVO.url" @showBoxCancel="showBoxCancel" />
	<!-- 添加机器 -->
	<div>
		<a-modal v-model:visible="showShopDialog" centered :title="$t('default.3')" width="60%">
			<div class="searchBox">
				<a-row>
					<a-col :span="3" class="labelText">
						{{ $t('default.5') }}
					</a-col>
					<a-col :span="4">
						<a-input v-model:value="shopVO.shopName" allow-clear />
					</a-col>
					<a-col :span="3" class="labelText">
						{{ $t('default.13') }}
					</a-col>
					<a-col :span="4">
						<a-input v-model:value="shopVO.machineName" allow-clear />
					</a-col>
					<a-col :span="3" class="labelText">
						{{ $t('default.21') }}
					</a-col>
					<a-col :span="4">
						<a-input v-model:value="shopVO.serial" allow-clear />
					</a-col>
					<a-col :span="2" class="searchButton">
						<a-button size="small" type="primary" @click="getMachineList">{{ $t('default.8') }}</a-button>
					</a-col>
				</a-row>
			</div>
			<a-row class="shopBodyBox">
				<a-table bordered :row-selection="shopRowSelection" :columns="shopDialogColumns" :data-source="machineList" :pagination="false" rowKey="id" class="tableStyle"> </a-table>
			</a-row>
			<div class="paginationStyle">
				<a-pagination show-quick-jumper v-model:current="shopVO.pageIndex" :total="machineTotal" @change="pageChange" />
			</div>
			<template #footer>
				<div class="footerBtnClass">
					<a-button key="back" @click="handleCancel">{{ $t('default.19') }}</a-button>
					<a-button key="submit" type="primary" @click="handleOk">{{ $t('default.18') }}</a-button>
				</div>
			</template>
		</a-modal>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, ref, computed, unref } from 'vue';
// import { SettingFilled} from '@ant-design/icons-vue';
import labelTitle from '@/components/labelTitle.vue';
import showUrlDialog from '@/components/common/showUrlDialog.vue';
import { AdvertTableAddHttp, AdvertSearchHttp, AdvertChangeHttp, MachineListHttp } from '@/api/api';
import { useRoute } from 'vue-router';
import { message } from 'ant-design-vue';
import { handleList, i18n } from '@/components/common/tools';

interface DataProps {
	getAllMachineList: () => void;
	allMachineList: Array<any>;
	tableListTotal: number;
	machineTotal: number;
	getMachineList: () => void;
	machineList: any;
	tableList: any[];
	showUrlDialog: boolean;
	showShopDialog: boolean;
	infoVO: { [x: string]: any };
	shopVO: { [x: string]: any };
}
interface ObjProps {
	title: string;
	url: string;
	type: number;
	advertId: string | number;
	addMachineIds: any;
	delMachineIds: any;
}
export default defineComponent({
	name: 'MachineEditor',
	components: {
		labelTitle,
		showUrlDialog
	},
	setup() {
		const ROUTE = useRoute();
		const id: any = ROUTE.query.id || null;
		let allSelectList: any = [];
		const defaultSelectList: any = ref([]);
		const obj: ObjProps = {
			title: '',
			url: '',
			type: 2,
			advertId: id,
			addMachineIds: [],
			delMachineIds: []
		};
		const objVO = {
			type: 2,
			advertId: id,
			pageIndex: 1,
			pageSize: 10
		};
		const shopRowSelection = computed(() => {
			return {
				columnWidth: 50,
				selectedRowKeys: unref(defaultSelectList),
				hideDefaultSelections: true,
				onChange: (changableRowKeys: any) => {
					defaultSelectList.value = changableRowKeys;
				}
			};
		});
		const data: DataProps = reactive({
			showUrlDialog: false,
			showShopDialog: false,
			infoVO: {
				type: 2,
				url: '',
				title: '',
				machineIds: []
			},
			shopVO: {
				name: '',
				pageIndex: 1,
				pageSize: 10
			},
			machineTotal: 1,
			tableListTotal: 1,
			columns: [
				{
					title: i18n('default.5'),
					dataIndex: 'shopName'
				},
				{
					title: i18n('default.13'),
					dataIndex: 'machineName'
				},
				{
					title: i18n('default.21'),
					dataIndex: 'machineSerial'
				},
				{
					title: i18n('default.22'),
					dataIndex: 'machineType'
				},
				{
					width: 100,
					slots: { customRender: 'handle' }
				}
			],
			shopDialogColumns: [
				{
					title: i18n('default.5'),
					dataIndex: 'shopName'
				},
				{
					title: i18n('default.13'),
					dataIndex: 'name'
				},
				{
					title: i18n('default.21'),
					dataIndex: 'serial'
				},
				{
					title: i18n('default.22'),
					dataIndex: 'type'
				}
			],
			machineList: [],
			allMachineList: [],
			tableList: [],
			handleOk: () => {
				allSelectList = [];
				defaultSelectList.value.forEach((i: any) => {
					const temp = data.allMachineList.find((j: any) => j.id === i);
					if (temp) {
						allSelectList.push(temp);
					}
				});
				allSelectList = allSelectList.map((i: any) => {
					return {
						machineId: i.id,
						shopName: i.shopName,
						machineName: i.name,
						machineSerial: i.serial,
						machineType: i.type
					};
				});
				obj.addMachineIds = allSelectList.map((i: any) => i.id);
				data.tableList = allSelectList.slice(0, 10);
				data.tableListTotal = allSelectList.length;
				data.showShopDialog = false;
			},
			showBoxCancel: (value: boolean) => {
				data.showUrlDialog = value;
			},
			handleCancel: () => {
				data.showShopDialog = false;
			},
			preview: () => {
				if (data.infoVO.url) {
					data.showUrlDialog = true;
				} else {
					message.warning('请添加广告链接');
				}
			},
			shopDelete: (row: any) => {
				data.tableList.splice(
					data.tableList.findIndex((i: any) => i.machineId === row.machineId),
					1
				);
				const selectId = defaultSelectList.value.findIndex((i: number) => i === row.machineId);
				if (selectId >= 0) {
					defaultSelectList.value.splice(selectId, 1);
					allSelectList.splice(selectId, 1);
				}
				if (id) {
					obj.delMachineIds.push(row.id || row.machineId);
				}
			},
			addShop: () => {
				data.showShopDialog = true;
			},
			getMachineList: () => {
				MachineListHttp(data.shopVO).then((res) => {
					data.machineList = res.data.data.list;
					data.machineTotal = res.data.data.totalCount;
				});
			},
			getAllMachineList: () => {
				MachineListHttp({ pageSize: 99999 }).then((res) => {
					data.allMachineList = res.data.data.list;
				});
			},
			machineChange: (index: number) => {
				if (index > 1) {
					data.tableList = allSelectList.slice(`${index - 1}0`, `${index}0`);
				} else {
					data.tableList = allSelectList.slice(0, 10);
				}
			},
			pageChange: () => {
				data.getMachineList();
			},
			create: () => {
				data.infoVO.machineIds = data.tableList.map((i: any) => i.id);
				return AdvertTableAddHttp(data.infoVO);
			},
			update: () => {
				const addSetList: any = new Set(obj.addMachineIds);
				const deleteSetList: any = new Set(obj.delMachineIds);
				obj.title = data.infoVO.title;
				obj.url = data.infoVO.url;
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				obj.addMachineIds = handleList(addSetList, deleteSetList);
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				obj.delMachineIds = handleList(deleteSetList, addSetList);
				return AdvertChangeHttp(obj);
			}
		});
		const getInfo = () => {
			AdvertSearchHttp(objVO).then((res: any) => {
				if (res.data.data) {
					data.infoVO = res.data.data;
					data.tableList = res.data.data.advertConfigListPage.list;
					defaultSelectList.value = data.tableList.map((i: any) => i.machineId);
				}
			});
		};
		const init = (id: any) => {
			data.getMachineList();
			data.getAllMachineList();
			if (id) {
				getInfo();
			}
		};
		onMounted(() => {
			init(id);
		});
		return {
			...toRefs(data),
			shopRowSelection,
			ROUTE
		};
	}
});
</script>

<style scoped>
.shopBodyBox {
	height: 650px;
	overflow-y: auto;
}
</style>
