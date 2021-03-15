<template>
	<labelTitle :value="'MachineEditor'" :btn="ROUTE.query.id ? update : create" />
	<div class="searchBox">
		<a-row class="rowStyle">
			<a-col :span="4" class="labelText">
				{{ 'Title' }}
			</a-col>
			<a-col :span="20">
				<a-input v-model:value="infoVO.title" />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="4" class="labelText">
				{{ 'Url' }}
			</a-col>
			<a-col :span="15">
				<a-input v-model:value="infoVO.url" />
			</a-col>
			<a-col :span="2" class="searchButton">
				<a-button size="small" type="primary" @click="preview">{{ '预览' }}</a-button>
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="4" class="labelText">
				{{ 'Machine' }}
			</a-col>
			<a-col :span="1" class="searchButton">
				<a-button size="small" type="primary" @click="addShop">{{ '添加' }}</a-button>
			</a-col>
		</a-row>
	</div>
	<a-row>
		<a-table bordered :row-selection="rowSelection" :columns="columns" :data-source="tableList" :pagination="false" :scroll="{ y: 600 }" :rowKey="rowKey" class="tableStyle">
			<template #handle="{ record }">
				<div class="tableBtn">
					<a-button size="small" type="danger" @click="shopDelete(record)">{{ 'delete' }}</a-button>
				</div>
			</template>
		</a-table>
	</a-row>
	<!-- 广告链接的预览 -->
	<showUrlDialog :visible="showUrlDialog" :src="infoVO.url" @showBoxCancel="showBoxCancel" />
	<!-- 添加机器 -->
	<div>
		<a-modal v-model:visible="showShopDialog" centered title="Machine" width="60%">
			<div class="searchBox">
				<a-row>
					<a-col :span="3" class="labelText">
						{{ 'Machine Name' }}
					</a-col>
					<a-col :span="5">
						<a-input v-model:value="shopVO.name" />
					</a-col>
					<a-col :span="2" class="searchButton">
						<a-button size="small" type="primary" @click="getMachineList">{{ '搜索' }}</a-button>
					</a-col>
				</a-row>
			</div>
			<a-row class="shopBodyBox">
				<a-table bordered :row-selection="shopRowSelection" :columns="shopDialogColumns" :data-source="machineList" :pagination="false" :rowKey="rowKey" class="tableStyle"> </a-table>
			</a-row>
			<template #footer>
				<div class="footerBtnClass">
					<a-button key="back" @click="handleCancel">Cancel</a-button>
					<a-button key="submit" type="primary" @click="handleOk">Ok</a-button>
				</div>
			</template>
			<div class="paginationStyle">
				<a-pagination show-quick-jumper v-model:current="shopVO.pageIndex" :total="machineTotal" @change="pageChange" />
			</div>
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

interface DataProps {
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
		let selectList: number[] = [];
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
			rowKey: (row: any) => {
				return row.id || row.machineId;
			},
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
			columns: [
				{
					title: 'Shop Name',
					dataIndex: 'shopName'
				},
				{
					title: 'Mchine Name',
					dataIndex: 'machineName'
				},
				{
					title: 'Mchine No',
					dataIndex: 'machineSerial'
				},
				{
					title: 'Type',
					dataIndex: 'machineType'
				},
				{
					width: 100,
					slots: { customRender: 'handle' }
				}
			],
			shopDialogColumns: [
				{
					title: 'Shop Name',
					dataIndex: 'shopName'
				},
				{
					title: 'Mchine Name',
					dataIndex: 'name'
				},
				{
					title: 'Mchine No',
					dataIndex: 'serial'
				},
				{
					title: 'Type',
					dataIndex: 'type'
				}
			],
			machineList: [],
			tableList: [],
			rowSelection: {
				columnWidth: 50,
				onChange: (selectedRowKeys: number[], selectedRows: any) => {
					selectList = selectedRows.map((i: any) => i.id);
					console.log(selectList);
				}
			},
			showBoxCancel: (value: boolean) => {
				data.showUrlDialog = value;
			},
			handleCancel: () => {
				data.showShopDialog = false;
			},
			handleOk: () => {
				const tableListIds = defaultSelectList.value;
				const list: any = [];
				tableListIds.forEach((i: number) => {
					const item = data.machineList.find((j: any) => i === j.id);
					if (item && !data.tableList.find((k: any) => k.machineId === i)) {
						list.push(item);
					}
				});
				data.tableList.unshift(
					...list.map((i: any) => {
						return {
							machineId: i.id,
							shopName: i.shopName,
							machineType: i.type,
							machineName: i.name,
							machineSerial: i.serial
						};
					})
				);
				if (id) {
					obj.addMachineIds = list.map((i: any) => i.id);
				} else {
					data.infoVO.machineIds = list.map((i: any) => i.id);
				}
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
			pageChange: () => {
				data.getMachineList();
			},
			create: () => {
				data.infoVO.machineIds = data.tableList.map((i: any) => i.id);
				return AdvertTableAddHttp(data.infoVO);
			},
			update: () => {
				obj.title = data.infoVO.title;
				obj.url = data.infoVO.url;
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
.footerBtnClass {
	display: flex;
	justify-content: center;
}
</style>
