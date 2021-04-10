<template>
	<div>
		<labelTitle :value="$t('default.116')" />
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
					<a-button type="primary" size="small" @click="search">{{ $t('default.8') }}</a-button>
				</a-col>
			</a-row>
		</div>
		<a-row class="rowStyle">
			<a-table bordered :columns="columns" :data-source="tableList" :pagination="false" rowKey="shopId" class="tableStyle">
				<template #handle="{ record }">
					<a-button type="primary" size="small" @click="handleClick(record.shopId)">{{ $t('default.116') }}</a-button>
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
	<a-modal v-model:visible="visible" width="70%" :title="$t('default.118')" :footer="null" centered>
		<a-table bordered :row-selection="shopRowSelection" :columns="dialogColumns" :data-source="dialogTableList" :pagination="false" rowKey="machineId" class="tableBox">
			<template #time="{ record }">
				<div>{{ record.latestSettlementTime ? record.latestSettlementTime : '-' }}</div>
				<div>{{ getCurrentDate() }}</div>
			</template>
			<template #ratio="{ record }">
				<div>{{ `${record.shopRate}%/${record.agentRate}%` }}</div>
			</template>
			<template #shopMoney="{ record }">
				<div>{{ `${(record.total * record.shopRate) / 100}` }}</div>
			</template>
			<template #agentMoney="{ record }">
				<div>{{ `${(record.total * record.agentRate) / 100}` }}</div>
			</template>
			<template #online="{ record }">
				<div>{{ record.online ? $t('default.140') : $t('default.141') }}</div>
			</template>
		</a-table>
		<a-table bordered :columns="totalColumns" :data-source="totalTableList" :pagination="false" rowKey="machineId">
			<template #ok="{ record }">
				<div v-if="record.machineId">
					<a-button type="primary" size="small" @click="handleSettlement">{{ $t('default.116') }}</a-button>
				</div>
			</template>
		</a-table>
	</a-modal>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, ref, unref, computed } from 'vue';
import labelTitle from '@/components/labelTitle.vue';
import { agentListHttp, countryListHttp, areaListHttp, shopListHttp, settlementInfoHttp, machineSettlementListHttp, finalHttp } from '@/api/api';
import { i18n } from '@/components/common/tools';
import { message } from 'ant-design-vue';
export default defineComponent({
	name: 'SettlementPage',
	components: {
		labelTitle
	},
	setup() {
		const defaultSelectList: any = ref([]);
		const data = reactive({
			visible: false,
			infoVO: {
				shopId: '',
				shopName: '',
				countryId: '',
				areaId: '',
				agentId: '',
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
					slots: { customRender: 'handle' }
				},
				{
					title: i18n('default.136'),
					slots: { customRender: 'ratio' }
				},
				{
					title: i18n('default.133'),
					dataIndex: 'agentName'
				}
			],
			dialogColumns: [
				{
					title: i18n('default.120'),
					slots: { customRender: 'time' }
				},
				{
					title: i18n('default.122'),
					dataIndex: 'machineSerial'
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
					title: i18n('default.138'),
					dataIndex: 'total'
				},
				{
					title: i18n('default.127'),
					slots: { customRender: 'shopMoney' }
				},
				{
					title: i18n('default.128'),
					slots: { customRender: 'agentMoney' }
				},
				{
					title: i18n('default.136'),
					slots: { customRender: 'ratio' }
				},
				{
					title: i18n('default.139'),
					slots: { customRender: 'online' }
				}
			],
			totalColumns: [
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
					title: i18n('default.126'),
					dataIndex: 'total'
				},
				{
					title: i18n('default.127'),
					dataIndex: 'shopMoney'
				},
				{
					title: i18n('default.128'),
					dataIndex: 'agentMoney'
				},
				{
					title: i18n('default.142'),
					slots: { customRender: 'ok' }
				}
			],
			total: 1,
			shopList: [],
			agentList: [],
			countryList: [],
			areaList: [],
			tableList: [{ shopId: 1 }],
			dialogTableList: [],
			totalTableList: [{ machineId: 0 }],
			getCurrentDate: () => {
				const date = new Date();
				const year = date.getFullYear();
				const addZero = (value: string | number) => {
					if (value < 10) {
						value = `0${value}`;
					}
					return value;
				};
				const month: string | number = addZero(date.getMonth() + 1);
				const day: string | number = addZero(date.getDate());
				const hour: string | number = addZero(date.getHours());
				const minute: string | number = addZero(date.getMinutes());
				const second: string | number = addZero(date.getSeconds());
				return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
			},
			handleClick: (shopId: number) => {
				data.visible = true;
				machineSettlementListHttp({ shopId }).then((res: any) => {
					if (res.data.data) {
						data.dialogTableList = res.data.data;
					}
				});
			},
			handleSettlement: () => {
				finalHttp(defaultSelectList.value).then((res: any) => {
					if (res.data.data) {
						data.visible = false;
					}
					message.info(res.data.msg);
				});
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
				settlementInfoHttp(data.infoVO).then((res: any) => {
					if (res.data.data) {
						data.tableList = res.data.data.list;
						data.total = res.data.data.totalCount;
					}
				});
			}
		});
		const shopRowSelection = computed(() => {
			return {
				columnWidth: 100,
				// columnTitle: i18n('default.118'),
				selectedRowKeys: unref(defaultSelectList),
				hideDefaultSelections: true,
				onChange: (changableRowKeys: any, changableRow: any) => {
					defaultSelectList.value = changableRowKeys;
					if (changableRow.length) {
						const obj = {
							coin: 0,
							cash: 0,
							card: 0,
							qrcode: 0,
							total: 0,
							machineId: 0,
							shopMoney: 0,
							agentMoney: 0
						};
						changableRow.forEach((i: any) => {
							obj.coin += i.coin;
							obj.cash += i.cash;
							obj.card += i.card;
							obj.qrcode += i.qrcode;
							obj.total += i.total;
							obj.machineId = i.machineId;
							obj.shopMoney += (i.total * i.shopRate) / 100;
							obj.agentMoney += (i.total * i.agentRate) / 100;
						});
						data.totalTableList = [obj];
					} else {
						data.totalTableList = [];
					}
				}
			};
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
			shopRowSelection
		};
	}
});
</script>

<style scoped>
.tableBox {
	height: 500px;
	overflow-y: auto;
}
</style>
