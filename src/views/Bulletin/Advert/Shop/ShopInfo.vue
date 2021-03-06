<template>
	<labelTitle :value="'Shop Info'" />
	<div class="searchBox">
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ 'Shop Name' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.name" :disabled="true" />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ 'Type' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.type" :disabled="true" />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ 'Address' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.address" :disabled="true" />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ 'Phone' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.phone" :disabled="true" />
			</a-col>
		</a-row>
	</div>
	<labelTitle :value="'Machines'" />
	<div class="searchBox">
		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ 'Title' }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="advertVO.title" allow-clear />
			</a-col>
			<a-col :span="2" class="labelText">
				{{ 'Time' }}
			</a-col>
			<a-col :span="3" class="datePicker">
				<a-date-picker v-model:value="advertVO.minCreateTime" :disabled-date="disabledStartDate" valueFormat="yyyy-MM-DD 00:00:00" allow-clear />
			</a-col>
			<a-col :span="3" class="datePicker">
				<a-date-picker v-model:value="advertVO.maxCreateTime" :disabled-date="disabledEndDate" valueFormat="yyyy-MM-DD 23:59:59" allow-clear />
			</a-col>
			<a-col :span="2" class="labelText">
				{{ 'Url' }}
			</a-col>
			<a-col :span="6">
				<a-input v-model:value="advertVO.url" allow-clear />
			</a-col>
			<a-col :span="2" class="labelText">
				<a-button type="primary" size="small" @click="search">{{ '搜索' }}</a-button>
			</a-col>
		</a-row>
	</div>
	<a-row>
		<a-col :span="1" id="deleteBtnBox">
			<a-button type="danger" size="small" @click="handleDelete">{{ '删除' }}</a-button>
			<!-- <a-button type="danger" size="small" @click="handleDeleteAll">{{ '删除所有' }}</a-button> -->
		</a-col>
	</a-row>
	<showUrlDialog :visible="urlBox" :src="src" @showBoxCancel="showBoxCancel" />
	<DeleteDialog :visible="visible" @afterClose="afterClose" @handleOk="handleOk" />
	<DeleteAllDialog :visible="allVisible" @afterAllClose="afterAllClose" @handleAllOk="handleAllOk" />
	<a-table :row-selection="rowSelection" bordered :columns="columns" :data-source="tableList" :pagination="false" rowKey="id" class="tableStyle">
		<template #url="{ record }">
			<a-button type="link" @click="handleUrlClick(record.url)">{{ record.url }}</a-button>
		</template>
	</a-table>
	<div class="paginationStyle">
		<a-pagination show-quick-jumper v-model:current="currentPage" :total="total" @change="sizeChange" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
// import { SettingFilled} from '@ant-design/icons-vue';
import { handleSelectEvent } from '@/components/common/tools';
import DeleteDialog from '@/components/common/DeleteDialog.vue';
import DeleteAllDialog from '@/components/common/DeleteAllDialog.vue';
import labelTitle from '@/components/labelTitle.vue';
import showUrlDialog from '@/components/common/showUrlDialog.vue';
import { useRoute } from 'vue-router';
import { message } from 'ant-design-vue';
import { shopSingleInfoHttp, AdvertListHttp, deleteAdvertShopHttp } from '@/api/api';
export default defineComponent({
	name: 'ShopInfo',
	components: {
		labelTitle,
		DeleteDialog,
		DeleteAllDialog,
		showUrlDialog
	},
	setup() {
		const ROUTE = useRoute();
		const id: any = ROUTE.query.id;
		let selectList: number[] = [];
		const data = reactive({
			urlBox: false,
			visible: false,
			allVisible: false,
			src: '',
			infoVO: {
				name: '',
				type: '',
				address: '',
				phone: ''
			},
			advertVO: {
				title: '',
				url: '',
				type: 1,
				shopId: id,
				minCreateTime: '',
				maxCreateTime: '',
				pageIndex: 1,
				pageSize: 10
			},
			currentPage: 1,
			total: 1,
			columns: [
				{
					title: 'Title',
					dataIndex: 'title'
				},
				{
					title: 'Url',
					dataIndex: 'url',
					slots: { customRender: 'url' }
				},
				{
					title: 'Time',
					dataIndex: 'createTime'
				}
			],
			tableList: [],
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
				if (!startValue || !data.advertVO.maxCreateTime) {
					return false;
				}
				return startValue.valueOf() > new Date(data.advertVO.maxCreateTime).valueOf();
			},
			disabledEndDate: (endValue: any) => {
				if (!endValue || !data.advertVO.minCreateTime) {
					return false;
				}
				return new Date(data.advertVO.minCreateTime).valueOf() >= endValue.valueOf();
			},
			handleOk: () => {
				const obj = {
					advertIds: selectList,
					shopId: id,
					deleteAll: false
				};
				deleteAdvertShopHttp(obj).then((res: any) => {
					message.success(res.data.msg);
					data.visible = false;
					data.search();
				});
			},
			handleUrlClick: (url: string) => {
				data.urlBox = true;
				data.src = url;
			},
			afterClose: (value: boolean) => {
				data.visible = value;
			},
			handleAllOk: (value: boolean) => {
				console.log(value);
			},
			afterAllClose: (value: boolean) => {
				data.allVisible = value;
			},
			sizeChange: (index: number) => {
				console.log(index);
			},
			handleDelete: () => {
				if (handleSelectEvent(selectList, 'id').length) {
					data.visible = true;
				}
			},
			handleDeleteAll: () => {
				data.allVisible = true;
			},
			search: () => {
				AdvertListHttp(data.advertVO).then((res: any) => {
					data.tableList = res.data.data.list;
				});
			}
		});
		const getShopInfo = (id: any) => {
			shopSingleInfoHttp({ shopId: id }).then((res: any) => {
				if (res.data.data) {
					data.infoVO = res.data.data;
				}
			});
		};
		const init = () => {
			getShopInfo(id);
			data.search();
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

<style scoped></style>
