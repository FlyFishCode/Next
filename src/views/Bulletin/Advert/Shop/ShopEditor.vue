<template>
	<labelTitle :value="'ShopEditor'" :btn="ROUTE.query.id ? update : create" />
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
				{{ 'Shop' }}
			</a-col>
			<a-col :span="1" class="searchButton">
				<a-button size="small" type="primary" @click="addShop">{{ '添加' }}</a-button>
			</a-col>
		</a-row>
	</div>
	<a-row>
		<a-table bordered :row-selection="rowSelection" :columns="columns" :data-source="tableList" :pagination="false" rowKey="id" class="tableStyle">
			<template #handle="{ record }">
				<div class="tableBtn">
					<a-button size="small" type="danger" @click="shopDelete(record.id)">{{ 'delete' }}</a-button>
				</div>
			</template>
		</a-table>
	</a-row>
	<div class="paginationStyle">
		<a-pagination show-quick-jumper v-model:current="infoVO.pageIndex" :total="pageTotal" @change="pageChange" />
	</div>
	<!-- 广告链接的预览 -->
	<div>
		<a-modal v-model:visible="showUrlDialog" :footer="null" width="50%">
			<div class="modalBox">
				<div v-if="isVideo">
					<video :src="infoVO.url" controls></video>
				</div>
				<div v-else>
					<img :src="infoVO.url" alt="图片地址不正确" />
				</div>
			</div>
		</a-modal>
	</div>
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
				<a-table bordered :row-selection="shopRowSelection" :columns="shopDialogColumns" :data-source="shopList" :pagination="false" rowKey="id" class="tableStyle"> </a-table>
			</a-row>
			<div class="paginationStyle">
				<a-pagination show-quick-jumper v-model:current="shopVO.pageIndex" :total="shopPageTotal" @change="shopChange" />
			</div>
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
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
// import { SettingFilled} from '@ant-design/icons-vue';
import labelTitle from '@/components/labelTitle.vue';
import { AdvertTableAddHttp, AdvertSearchHttp, AdvertChangeHttp, shopListHttp, AdvertTableListHttp } from '@/api/api';
import { useRoute } from 'vue-router';
import { message } from 'ant-design-vue';

interface DataProps {
	tableList: any[];
	allShopList: any[];
	showUrlDialog: boolean;
	showShopDialog: boolean;
}

export default defineComponent({
	name: 'AdvertEditor',
	components: {
		labelTitle
	},
	setup() {
		const ROUTE = useRoute();
		let selectList: number[] = [];
		let shopSelectList: any = [];
		const defaultSelectList: any[] = ['6451', '10086', '15047', '19402', '19421', '19430'];
		const data = reactive({
			showUrlDialog: false,
			showShopDialog: false,
			isVideo: true,
			infoVO: {
				title: '',
				shopId: '',
				url: '',
				pageIndex: 1,
				pageSize: 10
			},
			shopVO: {
				name: '',
				pageIndex: 1,
				pageSize: 10
			},
			shopPageTotal: 1,
			columns: [
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
					dataIndex: 'type'
				},
				{
					title: 'Shop Number',
					dataIndex: 'Number'
				},
				{
					title: 'Creation time',
					dataIndex: 'age'
				},
				{
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
					dataIndex: 'type'
				},
				{
					title: 'Shop Number',
					dataIndex: 'Number'
				}
			],
			pageTotal: 1,
			shopList: [],
			allShopList: [],
			tableList: [],
			rowSelection: {
				columnWidth: 50,
				onChange: (selectedRowKeys: number[], selectedRows: any) => {
					selectList = selectedRows.map((i: any) => i.id);
					console.log(selectList);
				}
			},
			shopRowSelection: {
				columnWidth: 50,
				// selectedRowKeys: selectedRowKey,
				getCheckboxProps: (record: any) => ({
					defaultChecked: defaultSelectList.includes(`${record.id}`)
				}),
				onChange: (selectedRowKeys: number[]) => {
					shopSelectList = selectedRowKeys.map((i: number) => {
						return data.allShopList.find((j: any) => i === j.id);
					});
					console.log(selectedRowKeys);
				}
			},
			handleCancel: () => {
				data.showShopDialog = false;
			},
			handleOk: () => {
				console.log(defaultSelectList);
				data.tableList = Object.assign([], shopSelectList);
				data.showShopDialog = false;
			},
			preview: () => {
				if (data.infoVO.url) {
					data.showUrlDialog = true;
					if (data.infoVO.url.includes('.mp4')) {
						data.isVideo = true;
					} else {
						data.isVideo = false;
					}
				} else {
					message.warning('请添加广告链接');
				}
			},
			shopDelete: (id: number) => {
				data.tableList.splice(
					data.tableList.findIndex((i: any) => i.id === id),
					1
				);
			},
			addShop: () => {
				data.showShopDialog = true;
			},
			getShopList: () => {
				shopListHttp(data.shopVO).then((res) => {
					data.shopList = res.data.data.list;
					data.shopPageTotal = res.data.data.totalCount;
				});
				shopListHttp({ name: '', pageSize: 9999 }).then((res) => {
					data.allShopList = res.data.data.list;
				});
			},
			shopChange: (value: number) => {
				data.shopVO.pageIndex = value;
				data.getShopList();
			},
			handleChange(value: any) {
				console.log(value);
			},
			create: () => {
				return AdvertTableAddHttp(data.infoVO);
			},
			update: () => {
				return AdvertChangeHttp(data.infoVO);
			},
			pageChange: () => {
				AdvertTableListHttp(data.infoVO).then((res: any) => {
					data.tableList = res.data.data.list;
				});
			}
		});
		const init = () => {
			// AdvertTableListHttp(data.infoVO).then((res: any) => {
			// 	data.tableList = res.data.data.list;
			// 	data.pageTotal = res.data.data.totalCount;
			// });
			data.getShopList();
		};
		onMounted(() => {
			init();
			if (ROUTE.query.id) {
				AdvertSearchHttp(ROUTE.query.id).then((res: any) => {
					data.infoVO = res.data.data;
				});
			}
		});
		return {
			...toRefs(data),
			ROUTE
		};
	}
});
</script>

<style scoped>
.modalBox {
	min-height: 500px;
}
.modalBox img,
video {
	width: 100%;
}
.shopBodyBox {
	height: 650px;
	overflow-y: auto;
}
.footerBtnClass {
	display: flex;
	justify-content: center;
}
</style>
