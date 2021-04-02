<template>
	<div>
		<labelTitle :value="$t('default.116')" />
		<div class="searchBox">
			<a-row class="rowStyle">
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
		<a-table bordered :row-selection="shopRowSelection" :columns="dialogColumns" :data-source="dialogTableList" :pagination="false" rowKey="id" class="tableBox"></a-table>
		<a-table bordered :columns="totalColumns" :data-source="totalTableList" :pagination="false" rowKey="id">
			<template #ok="{ record }">
				<a-button size="small" @click="handleClick(record.id)">{{ $t('default.116') }}</a-button>
			</template>
		</a-table>
	</a-modal>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, ref, unref, computed } from 'vue';
import labelTitle from '@/components/labelTitle.vue';
import { agentListHttp, countryListHttp, areaListHttp, shopListHttp, settlementInfoHttp } from '@/api/api';
import { i18n } from '@/components/common/tools';
export default defineComponent({
	name: 'SettlementPage',
	components: {
		labelTitle
	},
	setup() {
		const defaultSelectList: any = ref([]);
		const shopRowSelection = computed(() => {
			return {
				columnWidth: 100,
				// columnTitle: i18n('default.118'),
				selectedRowKeys: unref(defaultSelectList),
				hideDefaultSelections: true,
				onChange: (changableRowKeys: any) => {
					defaultSelectList.value = changableRowKeys;
				}
			};
		});
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
					dataIndex: 'Date',
					key: 'Id'
				},
				{
					title: i18n('default.122'),
					dataIndex: 'NO',
					key: 'NO'
				},
				{
					title: i18n('default.123'),
					dataIndex: 'Coin',
					key: 'NO'
				},
				{
					title: i18n('default.124'),
					dataIndex: 'Notes',
					key: 'NO'
				},
				{
					title: i18n('default.125'),
					dataIndex: 'QR Code',
					key: 'NO'
				},
				{
					title: i18n('default.35'),
					dataIndex: 'Point',
					key: 'NO'
				},
				{
					title: 'Credit',
					dataIndex: 'Credit',
					key: 'NO'
				},
				{
					title: i18n('default.127'),
					dataIndex: '场地收入',
					key: 'NO'
				},
				{
					title: i18n('default.128'),
					dataIndex: '代理收入',
					key: 'NO'
				},
				{
					title: i18n('default.136'),
					dataIndex: '店家/代理拆账比率',
					key: 'NO'
				},
				{
					title: '状态',
					dataIndex: '状态',
					key: 'NO'
				}
			],
			totalColumns: [
				{
					title: i18n('default.123'),
					dataIndex: 'Coin',
					key: 'Coin'
				},
				{
					title: i18n('default.124'),
					dataIndex: 'Notes',
					key: 'Coin'
				},
				{
					title: i18n('default.125'),
					dataIndex: 'QR Code',
					key: 'Coin'
				},
				{
					title: i18n('default.35'),
					dataIndex: 'Point',
					key: 'Coin'
				},
				{
					title: i18n('default.126'),
					dataIndex: 'Total',
					key: 'Coin'
				},
				{
					title: i18n('default.127'),
					dataIndex: '场地收入',
					key: 'Coin'
				},
				{
					title: i18n('default.128'),
					dataIndex: '代理收入',
					key: 'Coin'
				},
				{
					title: '确认本期对账',
					slots: { customRender: 'ok' }
				}
			],
			total: 1,
			shopList: [],
			agentList: [],
			areaList: [],
			countryList: [],
			tableList: [{ shopId: 1 }],
			dialogTableList: [{ id: 1 }],
			totalTableList: [{ id: 1 }],
			handleClick: (id: number) => {
				data.visible = true;
				console.log(id);
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
				settlementInfoHttp(data.infoVO).then((res: any) => {
					if (res.data.data) {
						data.tableList = res.data.data.list;
					}
				});
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
	height: 600px;
	overflow-y: auto;
}
</style>
