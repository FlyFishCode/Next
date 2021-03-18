<template>
	<labelTitle :value="'Machine'" />
	<div class="searchBox">
		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ 'ID' }}
			</a-col>
			<a-col :span="3">
				<a-input v-model:value="infoVO.id" allow-clear />
			</a-col>
			<a-col :span="2" class="labelText">
				{{ 'Name' }}
			</a-col>
			<a-col :span="3" class="selectSearch">
				<a-input v-model:value="infoVO.name" allow-clear />
			</a-col>
			<a-col :span="2" class="labelText">
				{{ 'Shop' }}
			</a-col>
			<a-col :span="4" class="selectSearch">
				<a-select show-search v-model:value="infoVO.shopName" :default-active-first-option="false" :show-arrow="false" :filter-option="false" :not-found-content="null" allowClear @search="shopSearch">
					<a-select-option v-for="shop in shopList" :key="shop.name">
						<div :title="shop.name">{{ shop.name }}</div>
					</a-select-option>
				</a-select>
			</a-col>
			<a-col :span="2" class="labelText">
				{{ 'Type' }}
			</a-col>
			<a-col :span="4" class="selectSearch">
				<a-select v-model:value="infoVO.type" allow-clear>
					<a-select-option value="A1">A1</a-select-option>
					<a-select-option value="W1">W1</a-select-option>
				</a-select>
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ 'Serial' }}
			</a-col>
			<a-col :span="3">
				<a-input v-model:value="infoVO.serial" allow-clear />
			</a-col>
			<a-col :span="2" class="labelText">
				{{ 'Placing Type' }}
			</a-col>
			<a-col :span="3" class="selectSearch">
				<a-select v-model:value="infoVO.placingType" allow-clear>
					<a-select-option value="1">Free</a-select-option>
					<a-select-option value="2">Rent</a-select-option>
					<a-select-option value="3">Sell</a-select-option>
				</a-select>
			</a-col>
			<a-col :span="2" class="labelText">
				{{ 'Last Online' }}
			</a-col>
			<a-col :span="2">
				<a-date-picker v-model:value="infoVO.minLastOnlineTime" :disabled-date="disabledStartDate" valueFormat="yyyy-MM-DD 00:00:00" allow-clear />
			</a-col>
			<a-col :span="2">
				<a-date-picker v-model:value="infoVO.maxLastOnlineTime" :disabled-date="disabledEndDate" valueFormat="yyyy-MM-DD 23:59:59" allow-clear />
			</a-col>
			<a-col :span="2" class="labelText">
				<a-button type="primary" size="small" @click="search">{{ '搜索' }}</a-button>
			</a-col>
		</a-row>
	</div>
	<a-row class="rowStyle">
		<a-col :span="1">
			<a-button type="danger" size="small" @click="handleDelete">{{ '删除' }}</a-button>
		</a-col>
		<a-col :span="1">
			<a-button type="primary" size="small" @click="handleCreate">{{ '创建' }}</a-button>
		</a-col>
		<a-col :span="1">
			<a-button type="primary" size="small" @click="handleSetting">{{ '设置' }}</a-button>
		</a-col>
		<a-table bordered :row-selection="rowSelection" :columns="columns" :data-source="tableList" :pagination="false" rowKey="id" class="tableStyle">
			<template #label="{ record }">
				<a-button type="link" @click="handleMachineClick(record.id)">{{ record.name }}</a-button>
			</template>
			<template #shop="{ record }">
				<a-button type="link" @click="handleShopClick(record.shopId)">{{ record.shopName }}</a-button>
			</template>
		</a-table>
	</a-row>
	<div class="paginationStyle">
		<a-pagination show-quick-jumper v-model:current="currentPage" :total="totalSize" @change="pageChange" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { MachineListHttp, shopListHttp, deleteShopHttp } from '@/api/api';
import labelTitle from '@/components/labelTitle.vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { handleSelectEvent } from '@/components/common/tools';
// import { SettingFilled} from '@ant-design/icons-vue';
export default defineComponent({
	name: 'Machine',
	components: {
		labelTitle
	},
	setup() {
		const ROUTER = useRouter();
		let selectList: number[] = [];
		const data = reactive({
			infoVO: {
				id: '',
				name: '',
				serial: '',
				shopName: '',
				type: '',
				placingType: '',
				maxLastOnlineTime: '',
				minLastOnlineTime: '',
				pageIndex: 1,
				pageSize: 10
			},
			shopList: [],
			currentPage: 1,
			totalSize: 1,
			columns: [
				{
					title: 'ID',
					dataIndex: 'id',
					key: 'Id'
				},
				{
					title: 'Name',
					key: 'Label',
					slots: { customRender: 'label' }
				},
				{
					title: 'Shop',
					key: 'Shop',
					slots: { customRender: 'shop' }
				},
				{
					title: 'Type',
					dataIndex: 'type',
					key: 'Type'
				},
				{
					title: 'Serial',
					dataIndex: 'serial',
					key: 'Serial'
				},
				{
					title: 'Placing Type',
					dataIndex: 'placingType',
					key: 'placingType'
				},
				{
					title: 'Last Online',
					dataIndex: 'lastOnlineTime',
					key: 'Last Online'
				},
				{
					title: 'Locked Dates',
					dataIndex: 'lockedDates',
					key: 'Locked Dates'
				}
			],
			tableList: [],
			rowSelection: {
				columnWidth: 50,
				// columnTitle: '全选',
				onChange: (selectedRowKeys: number[], selectedRows: any) => {
					selectList = selectedRows.map((i: any) => i.id);
					console.log(selectList);
				}
			},
			disabledStartDate: (startValue: any) => {
				if (!startValue || !data.infoVO.maxLastOnlineTime) {
					return false;
				}
				return startValue.valueOf() > new Date(data.infoVO.maxLastOnlineTime).valueOf();
			},
			disabledEndDate: (endValue: any) => {
				if (!endValue || !data.infoVO.minLastOnlineTime) {
					return false;
				}
				return new Date(data.infoVO.minLastOnlineTime).valueOf() >= endValue.valueOf();
			},
			shopSearch(value: any) {
				shopListHttp({ name: value.split("'").join(''), pageSize: 999 }).then((res) => {
					data.shopList = res.data.data.list;
				});
			},
			search: () => {
				MachineListHttp(data.infoVO).then((res: any) => {
					data.tableList = res.data.data.list;
					data.totalSize = res.data.data.totalCount;
				});
			},
			handleDelete: () => {
				if (handleSelectEvent(selectList, 'id').length) {
					deleteShopHttp(selectList).then((res: any) => {
						message.info(res.data.msg);
						data.search();
					});
				}
			},
			handleCreate: () => {
				ROUTER.push('MachineEditor');
			},
			handleMachineClick: (id: number) => {
				ROUTER.push({
					path: 'MachineEditor',
					query: { id }
				});
			},
			handleShopClick: (id: number) => {
				ROUTER.push({
					path: 'EditorShop',
					query: { id }
				});
			},
			handleSetting: () => {
				ROUTER.push({
					path: 'MachineGameOptions'
				});
			},
			pageChange: (index: number) => {
				data.infoVO.pageIndex = index;
				data.search();
			}
		});
		onMounted(() => {
			data.search();
		});
		return {
			...toRefs(data)
		};
	}
});
</script>

<style scoped></style>
