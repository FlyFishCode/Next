<template>
	<labelTitle :value="'ShopEditor'" :btn="ROUTE.query.id ? update : create" />
	<div class="searchBox">
		<a-row class="rowStyle">
			<a-col :span="4" class="labelText">
				{{ 'Title' }}
			</a-col>
			<a-col :span="20">
				<a-input v-model:value="infoVO.title" allow-clear />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="4" class="labelText">
				{{ 'Url' }}
			</a-col>
			<a-col :span="15">
				<a-input v-model:value="infoVO.url" allow-clear />
			</a-col>
			<a-col :span="2" class="searchButton">
				<a-button size="small" type="primary" @click="preview">{{ '预览' }}</a-button>
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="4" class="labelText">
				{{ 'Shop' }}
			</a-col>
			<a-col :span="1" class="searchButton">
				<a-button size="small" type="primary" @click="addShop">{{ '添加' }}</a-button>
			</a-col>
		</a-row>
	</div>
	<a-row>
		<a-table bordered :columns="columns" :data-source="tableList" :pagination="false" :rowKey="rowKey" :scroll="{ y: 600 }" class="tableStyle">
			<template #handle="{ record }">
				<div class="tableBtn">
					<a-button size="small" type="danger" @click="shopDelete(record)">{{ 'delete' }}</a-button>
				</div>
			</template>
		</a-table>
	</a-row>
	<!-- 广告链接的预览 -->
	<showUrlDialog :visible="showUrlDialog" :src="infoVO.url" @showBoxCancel="showBoxCancel" />
	<!-- 添加店铺 -->
	<div>
		<a-modal v-model:visible="showShopDialog" centered title="Shop" width="60%">
			<div class="searchBox">
				<a-row>
					<a-col :span="2" class="labelText">
						{{ 'Shop Name' }}
					</a-col>
					<a-col :span="5">
						<a-input v-model:value="shopVO.name" />
					</a-col>
					<a-col :span="2" class="searchButton">
						<a-button size="small" type="primary" @click="getShopList">{{ '搜索' }}</a-button>
					</a-col>
				</a-row>
			</div>
			<a-row class="shopBodyBox">
				<a-table bordered :row-selection="shopRowSelection" :columns="shopDialogColumns" :data-source="shopList" :pagination="false" :rowKey="rowKey" class="tableStyle"> </a-table>
			</a-row>
			<!-- <div class="paginationStyle">
				<a-pagination show-quick-jumper v-model:current="shopVO.pageIndex" :total="shopPageTotal" @change="shopChange" />
			</div> -->
			<template #footer>
				<div class="footerBtnClass">
					<a-button key="back" @click="handleCancel">Cancel</a-button>
					<a-button key="submit" type="primary" @click="handleOk">Ok</a-button>
				</div>
			</template>
		</a-modal>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs, ref, unref } from 'vue';
// import { SettingFilled} from '@ant-design/icons-vue';
import labelTitle from '@/components/labelTitle.vue';
import showUrlDialog from '@/components/common/showUrlDialog.vue';
import { AdvertTableAddHttp, AdvertSearchHttp, AdvertChangeHttp, shopListHttp } from '@/api/api';
import { useRoute } from 'vue-router';
import { message } from 'ant-design-vue';

interface DataProps {
	getShopList: () => void;
	shopPageTotal: any;
	shopList: any;
	shopVO: { [x: string]: any };
	infoVO: any;
	tableList: any[];
	showUrlDialog: boolean;
	showShopDialog: boolean;
}
interface ObjProps {
	title: string;
	url: string;
	type: number;
	advertId: string | number;
	addShopIds: any;
	delShopIds: any;
}
export default defineComponent({
	name: 'ShopEditor',
	components: {
		labelTitle,
		showUrlDialog
	},
	setup() {
		const ROUTE = useRoute();
		const id: any = ROUTE.query.id || null;
		const defaultSelectList: any = ref([]);
		const obj: ObjProps = {
			title: '',
			url: '',
			type: 1,
			advertId: id,
			addShopIds: [],
			delShopIds: []
		};
		const objVO = {
			type: 1,
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
				return row.id || row.shopId;
			},
			infoVO: {
				type: 1,
				title: '',
				url: '',
				shopIds: []
			},
			shopVO: {
				name: '',
				pageIndex: 1,
				pageSize: 99999
			},
			shopPageTotal: 1,
			columns: [
				{
					title: 'Name',
					dataIndex: 'shopName'
				},
				{
					title: 'Address',
					dataIndex: 'shopAddress'
				},
				{
					title: 'Type',
					width: 100,
					dataIndex: 'shopType'
				},
				{
					title: 'Shop Number',
					width: 200,
					dataIndex: 'machineCount'
				},
				{
					width: 100,
					slots: { customRender: 'handle' }
				}
			],
			shopDialogColumns: [
				{
					title: 'Name',
					dataIndex: 'name'
				},
				{
					title: 'Address',
					dataIndex: 'address'
				},
				{
					title: 'Type',
					width: 100,
					dataIndex: 'shopType'
				},
				{
					title: 'Machine Number',
					width: 200,
					dataIndex: 'machineCount'
				}
			],
			shopList: [],
			tableList: [],
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
					const item = data.shopList.find((j: any) => i === j.id);
					if (item && !data.tableList.find((k: any) => k.shopId === i)) {
						list.push(item);
					}
				});
				data.tableList.unshift(
					...list.map((i: any) => {
						return {
							shopId: i.id,
							shopType: i.shopType,
							shopName: i.name,
							shopAddress: i.address
						};
					})
				);
				if (id) {
					obj.addShopIds = list.map((i: any) => i.id);
				} else {
					data.infoVO.shopIds = list.map((i: any) => i.id);
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
					data.tableList.findIndex((i: any) => i.shopId === row.shopId),
					1
				);
				const selectId = defaultSelectList.value.findIndex((i: number) => i === row.shopId);
				if (selectId >= 0) {
					defaultSelectList.value.splice(selectId, 1);
				}
				if (id) {
					obj.delShopIds.push(row.id || row.shopId);
				}
			},
			addShop: () => {
				data.showShopDialog = true;
			},
			getShopList: () => {
				shopListHttp(data.shopVO).then((res) => {
					data.shopList = res.data.data.list;
				});
			},
			create: () => {
				return AdvertTableAddHttp(data.infoVO);
			},
			update: () => {
				const addSetList: any = new Set(obj.addShopIds);
				const deleteSetList: any = new Set(obj.delShopIds);
				obj.title = data.infoVO.title;
				obj.url = data.infoVO.url;
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				obj.addShopIds = handleList(addSetList, deleteSetList);
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				obj.delShopIds = handleList(deleteSetList, addSetList);
				return AdvertChangeHttp(obj);
			}
		});
		const handleList = (addList: any, deleteList: any) => {
			let newList = [];
			const totalNumberList = new Set([...addList].filter((x) => deleteList.has(x)));
			newList = [...new Set([...addList].filter((x) => !totalNumberList.has(x)))];
			return newList;
		};
		const getInfo = () => {
			AdvertSearchHttp(objVO).then((res: any) => {
				if (res.data.data) {
					data.infoVO = res.data.data;
					data.tableList = res.data.data.advertConfigListPage.list;
					defaultSelectList.value = data.tableList.map((i: any) => i.shopId);
				}
			});
		};
		const init = (id: any) => {
			data.getShopList();
			if (id) {
				getInfo();
			}
		};
		onMounted(() => {
			init(id);
		});
		return {
			...toRefs(data),
			defaultSelectList,
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
