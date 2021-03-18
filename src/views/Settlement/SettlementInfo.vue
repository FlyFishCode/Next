<template>
	<div>
		<labelTitle :value="'SettlementInfo'" />
		<div class="searchBox">
			<a-row class="rowStyle">
				<a-col :span="2" class="labelText">
					{{ 'Country' }}
				</a-col>
				<a-col :span="4">
					<a-select v-model:value="infoVO.countryId" @change="countryChange" class="selectBox" allowClear>
						<a-select-option v-for="item in countryList" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
					</a-select>
				</a-col>
				<a-col :span="2" class="labelText">
					{{ 'Area' }}
				</a-col>
				<a-col :span="4">
					<a-select v-model:value="infoVO.areaId" class="selectBox" allowClear>
						<a-select-option v-for="item in areaList" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
					</a-select>
				</a-col>
				<a-col :span="2" class="labelText">
					{{ 'Agent' }}
				</a-col>
				<a-col :span="4" class="selectSearch">
					<a-select
						show-search
						v-model:value="infoVO.agentId"
						:default-active-first-option="false"
						:show-arrow="false"
						:filter-option="false"
						:not-found-content="null"
						allowClear
						@search="agentSearch"
					>
						<a-select-option v-for="d in agentList" :key="d.id">
							<div :title="d.name">{{ d.name }}</div>
						</a-select-option>
					</a-select>
				</a-col>
				<a-col :span="2" class="labelText">
					{{ 'NO' }}
				</a-col>
				<a-col :span="4">
					<a-input v-model:value="infoVO.name" allowClear />
				</a-col>
			</a-row>
			<a-row class="rowStyle">
				<a-col :span="2" class="labelText">
					{{ 'Shop ID' }}
				</a-col>
				<a-col :span="4">
					<a-input v-model:value="infoVO.Id" allowClear />
				</a-col>
				<a-col :span="2" class="labelText">
					{{ 'Shop Name' }}
				</a-col>
				<a-col :span="4" class="selectSearch">
					<a-select
						show-search
						v-model:value="infoVO.shopName"
						:default-active-first-option="false"
						:show-arrow="false"
						:filter-option="false"
						:not-found-content="null"
						allowClear
						@search="shopSearch"
					>
						<a-select-option v-for="shop in shopList" :key="shop.name">
							<div :title="shop.name">{{ shop.name }}</div>
						</a-select-option>
					</a-select>
				</a-col>
				<a-col :span="2" class="labelText">
					{{ 'Date' }}
				</a-col>
				<a-col :span="2" class="datePicker">
					<a-date-picker v-model:value="infoVO.minCreateTime" :disabled-date="disabledStartDate" valueFormat="yyyy-MM-DD 00:00:00" allow-clear />
				</a-col>
				<a-col :span="2" class="datePicker">
					<a-date-picker v-model:value="infoVO.maxCreateTime" :disabled-date="disabledEndDate" valueFormat="yyyy-MM-DD 23:59:59" allow-clear />
				</a-col>
				<a-col :span="2" class="labelText">
					<a-button type="primary" size="small" @click="search">{{ '搜索' }}</a-button>
				</a-col>
			</a-row>
		</div>
		<a-row class="rowStyle">
			<a-table bordered :columns="columns" :data-source="tableList" :pagination="false" rowKey="id" class="tableStyle">
				<template #name="{ record }">
					<a-button type="link" @click="handleShopClick(record.id)">{{ record.name }}</a-button>
				</template>
			</a-table>
		</a-row>
		<div class="paginationStyle">
			<a-pagination show-quick-jumper v-model:current="infoVO.pageIndex" :total="total" @change="pageChange" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import labelTitle from '@/components/labelTitle.vue';
import { agentListHttp, countryListHttp, areaListHttp, shopListHttp } from '@/api/api';
export default defineComponent({
	name: 'SettlementInfo',
	components: {
		labelTitle
	},
	setup() {
		const data = reactive({
			infoVO: {
				id: '',
				shopName: '',
				countryId: '',
				areaId: '',
				type: '',
				agentId: '',
				minCreateTime: '',
				maxCreateTime: '',
				pageIndex: 1,
				pageSize: 10
			},
			columns: [
				{
					title: 'Date',
					dataIndex: 'Date',
					key: 'Id'
				},
				{
					title: 'Shop Name',
					key: 'Label'
				},
				{
					title: 'Shop ID',
					key: 'Shop'
				},
				{
					title: 'NO',
					dataIndex: 'NO',
					key: 'Type'
				},
				{
					title: 'Coin',
					dataIndex: 'Coin',
					key: 'Serial'
				},
				{
					title: 'Notes',
					dataIndex: 'Notes',
					key: 'placingType'
				},
				{
					title: 'QR Code',
					dataIndex: 'QR Code',
					key: 'Last Online'
				},
				{
					title: 'Free point',
					dataIndex: 'lockedDates',
					key: 'Locked Dates'
				},
				{
					title: 'Now Credit',
					dataIndex: 'lockedDates',
					key: 'Locked Dates'
				},
				{
					title: 'LifeTime',
					dataIndex: 'lockedDates',
					key: 'Locked Dates'
				},
				{
					title: 'settlement',
					dataIndex: 'lockedDates',
					key: 'Locked Dates'
				},
				{
					title: 'LifeTime',
					dataIndex: 'lockedDates',
					key: 'Locked Dates'
				},
				{
					title: 'Proxy',
					dataIndex: 'lockedDates',
					key: 'Locked Dates'
				}
			],
			total: 1,
			shopList: [],
			agentList: [],
			areaList: [],
			countryList: [],
			tableList: [],
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
			agentSearch: (value: any) => {
				agentListHttp({ name: value.split("'").join(''), pageSize: 999 }).then((res: any) => {
					data.agentList = res.data.data.list;
				});
			},
			shopSearch(value: any) {
				shopListHttp({ name: value.split("'").join(''), pageSize: 999 }).then((res) => {
					data.shopList = res.data.data.list;
				});
			},
			countryChange: () => {
				data.infoVO.areaId = '';
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getAreaList();
			},
			pageChange: (index: number) => {
				console.log(index);
			},
			search: () => {
				console.log(1);
			}
		});
		const getCountryList = () => {
			countryListHttp({}).then((res: any) => {
				data.countryList = res.data.data.list;
			});
		};
		const getAreaList = () => {
			areaListHttp({ countryId: data.infoVO.countryId }).then((res: any) => {
				data.areaList = res.data.data.list;
			});
		};
		const init = () => {
			data.agentSearch('');
			getCountryList();
			getAreaList();
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
