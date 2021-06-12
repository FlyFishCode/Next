<template>
	<div>
		<labelTitle :value="$t('default.117')" />
		<div class="searchBox">
			<a-row class="rowStyle">
				<a-col :span="2" class="labelText">
					{{ $t('default.121') }}
				</a-col>
				<a-col :span="4">
					<a-input v-model:value="infoVO.shopId" allowClear />
				</a-col>
				<a-col :span="2" class="labelText">
					{{ $t('default.5') }}
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
					{{ $t('default.23') }}
				</a-col>
				<a-col :span="4">
					<a-select v-model:value="infoVO.countryId" @change="countryChange" class="selectBox" allowClear>
						<a-select-option v-for="item in countryList" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
					</a-select>
				</a-col>
				<a-col :span="2" class="labelText">
					{{ $t('default.24') }}
				</a-col>
				<a-col :span="4">
					<a-select v-model:value="infoVO.areaId" class="selectBox" allowClear>
						<a-select-option v-for="item in areaList" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
					</a-select>
				</a-col>
			</a-row>

			<a-row class="rowStyle">
				<a-col :span="2" class="labelText">
					{{ $t('default.26') }}
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
					{{ $t('default.120') }}
				</a-col>
				<a-col :span="2" class="datePicker">
					<a-date-picker v-model:value="infoVO.minRecordTime" :disabled-date="disabledStartDate" valueFormat="yyyy-MM-DD 00:00:00" allow-clear />
				</a-col>
				<a-col :span="2" class="datePicker">
					<a-date-picker v-model:value="infoVO.maxRecordTime" :disabled-date="disabledEndDate" valueFormat="yyyy-MM-DD 23:59:59" allow-clear />
				</a-col>
				<a-col :span="2" class="labelText">
					{{ $t('default.122') }}
				</a-col>
				<a-col :span="4">
					<a-input v-model:value="infoVO.machineSerial" allowClear />
				</a-col>
				<a-col :span="2" class="labelText">
					{{ $t('default.139') }}
				</a-col>
				<a-col :span="2">
					<a-select v-model:value="infoVO.status" class="selectBox" allowClear>
						<a-select-option v-for="item in stateList" :key="item.id" :value="item.id">{{ item.label }}</a-select-option>
					</a-select>
				</a-col>
				<a-col :span="2" class="labelText">
					<a-button type="primary" size="small" @click="search">{{ $t('default.8') }}</a-button>
				</a-col>
			</a-row>
		</div>
		<a-row class="rowStyle">
			<a-table bordered :columns="columns" :data-source="tableList" :pagination="false" rowKey="shopId" class="tableStyle">
				<template #status="{ record }">
					<div>{{ record.status ? $t('default.135') : $t('default.134') }}</div>
				</template>
				<template #ratio="{ record }">
					<div>{{ `${record.shopRate}%/${record.agentRate}%` }}</div>
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
import { agentListHttp, countryListHttp, areaListHttp, shopListHttp, settlementListHttp } from '@/api/api';
import { i18n } from '@/components/common/tools';
export default defineComponent({
	name: 'SettlementInfo',
	components: {
		labelTitle
	},
	setup() {
		const data = reactive({
			infoVO: {
				shopId: null,
				status: null,
				shopName: '',
				countryId: '',
				areaId: '',
				agentId: '',
				machineSerial: '',
				minRecordTime: '',
				maxRecordTime: '',
				pageIndex: 1,
				pageSize: 10
			},
			columns: [
				{
					title: i18n('default.121'),
					dataIndex: 'shopId',
					key: 'Shop'
				},
				{
					title: i18n('default.5'),
					dataIndex: 'shopName',
					key: 'Label'
				},
				{
					title: i18n('default.120'),
					dataIndex: 'recordTime',
					key: 'Id'
				},
				{
					title: i18n('default.122'),
					dataIndex: 'machineSerial',
					key: 'Type'
				},
				{
					title: i18n('default.123'),
					dataIndex: 'coin',
					key: 'Serial'
				},
				{
					title: i18n('default.124'),
					dataIndex: 'cash',
					key: 'placingType'
				},
				{
					title: i18n('default.137'),
					dataIndex: 'card',
					key: 'card'
				},
				{
					title: i18n('default.125'),
					dataIndex: 'qrcode',
					key: 'Last Online'
				},
				{
					title: i18n('default.78'),
					dataIndex: 'free',
					key: 'Locked Dates'
				},
				{
					title: i18n('default.138'),
					dataIndex: 'total',
					key: 'Locked Dates'
				},
				{
					title: 'LifeTime',
					dataIndex: 'lifetime',
					key: 'Locked Dates'
				},
				{
					title: i18n('default.116'),
					slots: { customRender: 'status' }
				},
				{
					title: i18n('default.136'),
					slots: { customRender: 'ratio' }
				},
				{
					title: i18n('default.133'),
					dataIndex: 'agentName',
					key: 'Locked Dates'
				}
			],
			total: 1,
			shopList: [],
			agentList: [],
			areaList: [],
			countryList: [],
			tableList: [],
			stateList: [
				{ id: 0, label: i18n('default.134') },
				{ id: 1, label: i18n('default.135') }
			],
			disabledStartDate: (startValue: any) => {
				if (!startValue || !data.infoVO.maxRecordTime) {
					return false;
				}
				return startValue.valueOf() > new Date(data.infoVO.maxRecordTime).valueOf();
			},
			disabledEndDate: (endValue: any) => {
				if (!endValue || !data.infoVO.minRecordTime) {
					return false;
				}
				return new Date(data.infoVO.minRecordTime).valueOf() >= endValue.valueOf();
			},
			agentSearch: (value: any) => {
				agentListHttp({ agentName: value.split("'").join(''), pageSize: 999 }).then((res: any) => {
					data.agentList = res.data.data;
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
				data.infoVO.pageIndex = index;
				data.search();
			},
			search: () => {
				settlementListHttp(data.infoVO).then((res: any) => {
					if (res.data.data) {
						data.tableList = res.data.data.list;
						data.total = res.data.data.totalCount;
					}
				});
			}
		});
		const getCountryList = () => {
			countryListHttp({pageSize:999}).then((res: any) => {
				data.countryList = res.data.data.list;
			});
		};
		const getAreaList = () => {
			areaListHttp({ countryId: data.infoVO.countryId }).then((res: any) => {
				data.areaList = res.data.data.list;
			});
		};
		const init = () => {
			data.search();
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
