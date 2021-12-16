<template>
	<div>
		<labelTitle :value="$t('default.276')" />
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
				<a-col :span="4">
					<a-select
					class="selectBox"
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
					{{ $t('default.262') }}
				</a-col>
				<a-col :span="4">
					<a-select v-model:value="infoVO.countryId" @change="countryChange" class="selectBox" allowClear>
						<a-select-option v-for="item in countryList" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
					</a-select>
				</a-col>
				<a-col :span="2" class="labelText">
					{{ $t('default.263') }}
				</a-col>
				<a-col :span="4">
					<a-select v-model:value="infoVO.areaId" class="selectBox" allowClear>
						<a-select-option v-for="item in areaList" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
					</a-select>
				</a-col>
			</a-row>

			<a-row class="rowStyle">
				<a-col :span="2" class="labelText">
					{{ $t('default.21') }}
				</a-col>
				<a-col :span="4">
					<a-input v-model:value="infoVO.machineSerial" allowClear />
				</a-col>
				<a-col :span="2" class="labelText">
					{{ $t('default.26') }}
				</a-col>
				<a-col :span="4">
					<a-select
					class="selectBox"
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
					<a-date-picker v-model:value="infoVO.minConsumeTime" :disabled-date="disabledStartDate" valueFormat="yyyy-MM-DD 00:00:00" allow-clear />
				</a-col>
				<a-col :span="2" class="datePicker">
					<a-date-picker v-model:value="infoVO.maxConsumeTime" :disabled-date="disabledEndDate" valueFormat="yyyy-MM-DD 23:59:59" allow-clear />
				</a-col>
				<a-col :span="2" class="labelText">
					<a-button type="primary" size="small" @click="search">{{ $t('default.8') }}</a-button>
				</a-col>
			</a-row>
		</div>
		<a-row class="rowStyle">
			<a-table bordered :columns="columns" :data-source="tableList" :pagination="false" rowKey="id" class="tableStyle">
				<template #consumeType="{ record }">
					<div v-if="record.consumeType === 1">{{ $t('default.279') }}</div>
					<div v-if="record.consumeType === 2">{{ $t('default.78') }}</div>
					<div v-if="record.consumeType === 3">{{ $t('default.280') }}</div>
					<div v-if="record.consumeType === 4">{{ $t('default.281') }}</div>
				</template>
				<template #gameType="{ record }">
					<div v-if="record.gameType === 1">{{ $t('default.55') }}</div>
					<div v-if="record.gameType === 2">{{ $t('default.283') }}</div>
					<div v-if="record.gameType === 3">{{ $t('default.284') }}</div>
					<div v-if="record.gameType === 4">{{ $t('default.285') }}</div>
				</template>
				<template #gameName="{ record }">
					<div>{{ getGameName(record.gameName) }}</div>
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
import { agentListHttp, countryListHttp, areaListHttp, shopListHttp, ConsumptionHttp } from '@/api/api';
import { i18n } from '@/components/common/tools';
export default defineComponent({
	name: 'ConsumptionDetails',
	components: {
		labelTitle
	},
	setup() {
		const getGameName = (type: any) =>{
			let str = '';
			switch (type) {
				case 1:
					str = 'default.31'
					break;
				case 2:
					str = 'default.32'
					break;
				case 3:
					str = 'default.33'
					break;
				case 4:
					str = 'default.34'
					break;
				case 5:
					str = 'default.41'
					break;
				case 6:
					str = 'default.42'
					break;
				case 7:
					str = 'default.44'
					break;
				case 8:
					str = 'default.45'
					break;
				case 9:
					str = 'default.50'
					break;
				case 10:
					str = 'default.53'
					break;
				case 11:
					str = 'default.52'
					break;
				case 12:
					str = 'default.54'
					break;
				default:
					str = 'default.51'
					break;
			}
			return i18n(str);
		}
		const data = reactive({
			infoVO: {
				shopId: null,
				shopName: '',
				countryId: '',
				areaId: '',
				agentId: '',
				machineSerial:"",
				minConsumeTime: '',
				maxConsumeTime: '',
				pageIndex: 1,
				pageSize: 10
			},
			columns: [
				{
					title: i18n('default.121'),
					dataIndex: 'shopId'
				},
				{
					title: i18n('default.5'),
					dataIndex: 'shopName'
				},
				{
					title: i18n('default.21'),
					dataIndex: 'machineSerial'
				},
				{
					title: i18n('default.13'),
					dataIndex: 'machineName'
				},
				{
					title: i18n('default.282'),
					slots: { customRender: 'gameType' }
				},
				{
					title: i18n('default.286'),
					slots: { customRender: 'gameName' }
				},
				{
					title: i18n('default.278'),
					dataIndex: 'consumeTime'
				},
				{
					title: i18n('default.149'),
					slots: { customRender: 'consumeType' }
				},
				{
					title: i18n('default.133'),
					dataIndex: 'agentName'
				}
			],
			innerColumns: [
				{
					title: i18n('default.21'),
					dataIndex: 'machineSerial'
				},
				{
					title: i18n('default.13'),
					dataIndex: 'machineName'
				},
				{
					title: i18n('default.123'),
					dataIndex: 'coin'
				},
				{
					title: i18n('default.124'),
					dataIndex: 'cash'
				},
				{
					title: i18n('default.137'),
					dataIndex: 'card'
				},
				{
					title: i18n('default.125'),
					dataIndex: 'qrcode'
				},
				{
					title: i18n('default.78'),
					dataIndex: 'free'
				},
				{
					title: i18n('default.144'),
					dataIndex: 'totalWithFree'
				},
				{
					title: i18n('default.145'),
					dataIndex: 'totalNoFree'
				}
			],
			tableList: [{ id: 0 }],
			total: 1,
			shopList: [],
			agentList: [],
			areaList: [],
			countryList: [],
			disabledStartDate: (startValue: any) => {
				if (!startValue || !data.infoVO.maxConsumeTime) {
					return false;
				}
				return startValue.valueOf() > new Date(data.infoVO.maxConsumeTime).valueOf();
			},
			disabledEndDate: (endValue: any) => {
				if (!endValue || !data.infoVO.minConsumeTime) {
					return false;
				}
				return new Date(data.infoVO.minConsumeTime).valueOf() >= endValue.valueOf();
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
				ConsumptionHttp(data.infoVO).then((res: any) => {
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
			...toRefs(data),
			getGameName
		};
	}
});
</script>

<style scoped></style>
