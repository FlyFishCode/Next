<template>
	<div class="searchBox">
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ $t('default.4') }}
			</a-col>
			<a-col :span="6">
				<a-input v-model:value="infoVO.title" allow-clear />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ $t('default.5') }}
			</a-col>
			<a-col :span="6">
				<a-select class="selectBox" show-search v-model:value="infoVO.name" :default-active-first-option="false" :show-arrow="false" :filter-option="false" :not-found-content="null" allow-clear @search="shopSearch">
					<a-select-option v-for="d in shopList" :key="d.name">
						<div :title="d.name">{{ d.name }}</div>
					</a-select-option>
				</a-select>
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ $t('default.6') }}
			</a-col>
			<a-col :span="3" class="datePicker">
				<a-date-picker v-model:value="infoVO.minCreateTime" :disabled-date="disabledStartDate" valueFormat="yyyy-MM-DD 00:00:00" allow-clear />
			</a-col>
			<a-col :span="3" class="datePicker">
				<a-date-picker v-model:value="infoVO.maxCreateTime" :disabled-date="disabledEndDate" valueFormat="yyyy-MM-DD 23:59:59" allow-clear />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ $t('default.7') }}
			</a-col>
			<a-col :span="6">
				<a-input v-model:value="infoVO.url" allow-clear />
			</a-col>
			<a-col :span="3" class="labelText">
				<a-button type="primary" size="small" @click="search">{{ $t('default.8') }}</a-button>
			</a-col>
		</a-row>
	</div>
	<a-row class="rowStyle">
		<a-col :span="1">
			<a-button type="danger" size="small" @click="handleDelete">{{ $t('default.10') }}</a-button>
			<!-- <a-button type="danger" size="small" @click="handleDeleteAll">{{ '删除所有数据' }}</a-button> -->
		</a-col>
		<a-col :span="1">
			<a-button type="primary" size="small" @click="handleCreate">{{ $t('default.9') }}</a-button>
		</a-col>
		<a-table bordered :row-selection="rowSelection" :columns="columns" :data-source="tableList" :pagination="false" rowKey="id" class="tableStyle">
			<template #aaa="{ record }">
				<a-button type="link" @click="handleTitleClick(record.id)">{{ record.title }}</a-button>
			</template>
			<template #shop="{ record }">
				<div v-if="record.shopList.length" class="tableShop">
					<div class="moreShopBox">
						<!-- <div :title="record.shopList[0].shopName" @click="handleShopClick(record.shopList[0].shopId)">{{ record.shopList[0].shopName }}</div> -->
						<a-button type="link" :title="record.shopList[0].shopName" @click="handleShopClick(record.shopList[0].shopId)">{{ record.shopList[0].shopName }}</a-button>
					</div>
					<div style="lineHeight:32px">
						<a-button type="danger" size="small" @click="shopDelete(record.id, record.shopList[0].shopId)">{{ $t('default.10') }}</a-button>
					</div>
					<div v-show="record.shopList.length > 1" class="link">
						<span v-if="record.flag" @click="record.flag = !record.flag"><DownOutlined /></span>
						<span v-else @click="record.flag = !record.flag"><UpOutlined /></span>
					</div>
				</div>
				<transition enter-active-class="animate__animated animate__fadeInUp">
					<div v-show="record.flag" class="shopItem">
						<div v-for="(item, index) in record.shopList" :key="item.id">
							<div v-if="index" class="moreShopBox">
								<a-button type="link" :title="item.shopName" @click="handleShopClick(item.shopId)">{{ item.shopName }}</a-button>
								<div>
									<a-button type="danger" size="small" @click="shopDelete(record.id, item.shopId)">{{ '删除' }}</a-button>
								</div>
							</div>
						</div>
					</div>
				</transition>
			</template>
			<template #url="{ record }">
				<a-button type="link" @click="handleUrlClick(record.url)">{{ record.url }}</a-button>
			</template>
			<template #ShopNumber="{ record }">
				<div>{{ record.shopList.length }}</div>
			</template>
		</a-table>
	</a-row>
	<showUrlDialog :visible="urlBox" :src="src" @showBoxCancel="showBoxCancel" />
	<DeleteDialog :visible="visible" @afterClose="afterClose" @handleOk="handleOk" />
	<DeleteAllDialog :visible="allVisible" @afterAllClose="afterAllClose" @handleAllOk="handleAllOk" />
	<div class="paginationStyle">
		<a-pagination show-quick-jumper v-model:current="infoVO.pageIndex" :total="pageTotal" @change="pageChange" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { handleSelectEvent, i18n } from '@/components/common/tools';
import DeleteDialog from '@/components/common/DeleteDialog.vue';
import DeleteAllDialog from '@/components/common/DeleteAllDialog.vue';
import showUrlDialog from '@/components/common/showUrlDialog.vue';
import { message } from 'ant-design-vue';
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';
import { AdvertTableListHttp, deleteAdvertHttp, shopListHttp, deleteAdvertShopHttp } from '@/api/api';
export default defineComponent({
	name: 'Advert',
	components: {
		// labelTitle,
		DownOutlined,
		UpOutlined,
		DeleteDialog,
		DeleteAllDialog,
		showUrlDialog
	},
	setup() {
		const ROUTER = useRouter();
		let selectList: number[] = [];
		let showTips = true;
		let deleteId: string | number = '';
		let deleteShopId: string | number = '';
		const data = reactive({
			urlBox: false,
			visible: false,
			allVisible: false,
			src: '',
			infoVO: {
				title: '',
				name: '',
				url: '',
				type: 1,
				minCreateTime: '',
				maxCreateTime: '',
				pageIndex: 1,
				pageSize: 10
			},
			pageTotal: 1,
			columns: [
				{
					title: i18n('default.4'),
					dataIndex: 'title',
					slots: { customRender: 'aaa' }
				},
				{
					title: i18n('default.5'),
					slots: { customRender: 'shop' }
				},
				{
					title: i18n('default.7'),
					slots: { customRender: 'url' }
				},
				{
					title: i18n('default.12'),
					slots: { customRender: 'ShopNumber' }
				},
				{
					title: i18n('default.6'),
					dataIndex: 'createTime'
				}
			],
			shopList: [],
			tableList: [],
			createrList: [],
			rowSelection: {
				columnWidth: 50,
				// columnTitle: '全选',
				onChange: (selectedRowKeys: number[], selectedRows: any) => {
					selectList = selectedRows.map((i: any) => i.id);
				}
			},
			showBoxCancel: (value: boolean) => {
				data.urlBox = value;
			},
			disabledStartDate: (startValue: any) => {
				if (!startValue || !data.infoVO.maxCreateTime) {
					return false;
				}
				return startValue.valueOf() > new Date(data.infoVO.maxCreateTime).valueOf();
			},
			disabledEndDate: (endValue: any) => {
				if (!endValue || !data.infoVO.minCreateTime) {
					return false;
				}
				return new Date(data.infoVO.minCreateTime).valueOf() >= endValue.valueOf();
			},
			shopSearch: (value: string) => {
				shopListHttp({ name: value.split("'").join(''), pageSize: 999 }).then((res: any) => {
					data.shopList = res.data.data.list;
				});
			},
			shopDelete: (id: number, shopId: number) => {
				data.visible = true;
				showTips = false;
				deleteId = id;
				deleteShopId = shopId;
			},
			search: () => {
				AdvertTableListHttp(data.infoVO).then((res: any) => {
					res.data.data.list.forEach((i: any) => (i.flag = false));
					data.tableList = res.data.data.list;
					data.pageTotal = res.data.data.totalCount;
				});
			},
			handleUrlClick: (url: string) => {
				data.urlBox = true;
				data.src = url;
			},
			handleOk: () => {
				if (showTips) {
					const obj = {
						advertIds: selectList,
						deleteAll: false
					};
					deleteAdvertHttp(obj).then((res: any) => {
						message.warning(res.data.msg);
						data.search();
					});
				} else {
					const obj = {
						type: 1,
						advertIds: [deleteId],
						shopId: deleteShopId,
						deleteAll: false
					};
					deleteAdvertShopHttp(obj).then((res: any) => {
						message.warning(res.data.msg);
						data.search();
					});
				}
				data.visible = false;
			},
			handleAllOk: () => {
				const obj = {
					advertIds: [],
					deleteAll: true
				};
				deleteAdvertHttp(obj).then((res: any) => {
					message.warning(res.data.msg);
					data.allVisible = false;
					data.search();
				});
			},
			afterAllClose: (value: boolean) => {
				data.allVisible = value;
			},
			afterClose: (value: boolean) => {
				data.visible = value;
			},
			handleDelete: () => {
				if (handleSelectEvent(selectList, 'id').length) {
					data.visible = true;
				}
			},
			handleDeleteAll: () => {
				data.allVisible = true;
			},
			// AdvertEdit: (id: number) => {
			// 	ROUTER.push({
			// 		path: 'ShopEditor',
			// 		query: { id }
			// 	});
			// },
			handleTitleClick: (id: number) => {
				ROUTER.push({
					path: 'ShopEditor',
					query: { id }
				});
			},
			handleShopClick: (id: number) => {
				ROUTER.push({
					path: 'ShopInfo',
					query: { id }
				});
			},
			handleChange: () => {
				console.log('handleChange');
			},
			handleCreate: () => {
				ROUTER.push('ShopEditor');
			},
			handleExport: () => {
				console.log(1);
			},
			pageChange: () => {
				AdvertTableListHttp(data.infoVO).then((res: any) => {
					data.tableList = res.data.data.list;
				});
			}
		});
		const getShopList = () => {
			shopListHttp({ name: '', pageSize: 999 }).then((res: any) => {
				data.shopList = res.data.data.list;
			});
		};
		const init = () => {
			data.search();
			getShopList();
		};
		onMounted(() => {
			init();
		});
		return {
			...toRefs(data)
		};
	}
});
</script>

<style scoped>
.tableShop {
	display: flex;
	justify-content: space-between;
}
.tableRightBox {
	display: flex;
	justify-content: space-between;
	line-height: 32px;
}
.moreShopBox {
	line-height: 32px;
	display: flex;
}
/* .moreShopBox .ant-btn-link {
	width: 160px;
} */
.shopItem {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	max-height: 150px;
	overflow-y: auto;
}
.tableBtn {
	display: flex;
	justify-content: space-between;
}
</style>
