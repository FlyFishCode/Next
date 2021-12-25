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
					{{ $t('default.13') }}
				</a-col>
				<a-col :span="4">
					<a-select
						class="selectBox"
						show-search
						v-model:value="infoVO.machineName"
						:default-active-first-option="false"
						:show-arrow="false"
						:filter-option="false"
						:not-found-content="null"
						allowClear
						@search="machineSearch($event,'name')"
					>
						<a-select-option v-for="machine in machineList" :key="machine.name">
							<div :title="machine.name">{{ machine.name }}</div>
						</a-select-option>
					</a-select>
				</a-col>
				<a-col :span="2" class="labelText">
					{{ $t('default.21') }}
				</a-col>
				<a-col :span="4">
					<a-select
						class="selectBox"
						show-search
						v-model:value="infoVO.machineSerial"
						:default-active-first-option="false"
						:show-arrow="false"
						:filter-option="false"
						:not-found-content="null"
						allowClear
						@search="machineSearch($event,'serial')"
					>
						<a-select-option v-for="machine in machineList" :key="machine.serial">
							<div :title="machine.serial">{{ machine.serial }}</div>
						</a-select-option>
					</a-select>
				</a-col>
			</a-row>

			<a-row class="rowStyle">
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
				<a-col :span="2" class="labelText">
					{{ $t('default.120') }}
				</a-col>
				<a-col :span="2" class="datePicker">
					<a-date-picker v-model:value="infoVO.minConsumeTime" :disabled-date="disabledStartDate" valueFormat="yyyy-MM-DD 00:00:00" allow-clear />
				</a-col>
				<a-col :span="2" class="datePicker">
					<a-date-picker v-model:value="infoVO.maxConsumeTime" :disabled-date="disabledEndDate" valueFormat="yyyy-MM-DD 23:59:59" allow-clear />
				</a-col>
				<a-col v-if="RoleType === 1" :span="2" class="labelText">
					{{ $t('default.26') }}
				</a-col>
				<a-col v-if="RoleType === 1" :span="4">
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
			</a-row>

			<a-row class="rowStyle">
				<a-col :span="2" class="labelText">
					{{ $t('default.282') }}
				</a-col>
				<a-col :span="4">
					<a-select v-model:value="infoVO.gameType" class="selectBox" allowClear>
						<a-select-option v-for="item in gameTypeList" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
					</a-select>
				</a-col>
				<a-col :span="2" class="labelText">
					{{ $t('default.292') }}
				</a-col>
				<a-col :span="4">
					<a-select v-model:value="infoVO.consumeType" class="selectBox" allowClear>
						<a-select-option v-for="item in consumeTypeList" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
					</a-select>
				</a-col>
				<a-col :span="2" class="labelText">
					{{ $t('default.286') }}
				</a-col>
				<a-col :span="4">
					<a-select v-model:value="infoVO.gameName" class="selectBox" allowClear>
						<a-select-option v-for="item in gameNameList" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
					</a-select>
				</a-col>
				<a-col :span="2" class="labelText">
					<a-button type="primary" size="small" @click="search">{{ $t('default.8') }}</a-button>
				</a-col>
			</a-row>

		</div>
		<a-row class="rowStyle">
			<a-table bordered :columns="columns" :data-source="tableList" :pagination="false" rowKey="id" class="tableStyle">
				<template #gameType="{ record }">
					<div>{{ gameTypeList.find(item => item.id === record.gameType)?.name }}</div>
				</template>
				<template #consumeType="{ record }">
					<div>{{ consumeTypeList.find(item => item.id === record.consumeType)?.name }}</div>
				</template>
				<template #gameName="{ record }">
					<div>{{ gameNameList.find(item => item.id === record.gameName)?.name }}</div>
				</template>
			</a-table>
		</a-row>
		<div class="paginationStyle">
			<a-pagination show-quick-jumper v-model:current="infoVO.pageIndex" :total="total" :show-total="total => `${$t('default.126')} ${total}`" @change="pageChange" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import labelTitle from '@/components/labelTitle.vue';
import { agentListHttp, countryListHttp, areaListHttp, shopListHttp, ConsumptionHttp, MachineListHttp } from '@/api/api';
import { i18n, getRoleType, handleAddColumns } from '@/components/common/tools';
export default defineComponent({
	name: 'ConsumptionDetails',
	components: {
		labelTitle
	},
	setup() {
		const RoleType: any = getRoleType();
		const data = reactive({
			infoVO: {
				shopId: null,
				shopName: '',
				countryId: '',
				areaId: '',
				agentId: '',
				gameType: '',
				gameName: '',
				consumeType: '',
				machineName:"",
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
					title: i18n('default.13'),
					dataIndex: 'machineName'
				},
				{
					title: i18n('default.21'),
					dataIndex: 'machineSerial'
				},
				{
					title: i18n('default.282'),
					slots: { customRender: 'gameType' }
				},
				{
					title: i18n('default.292'),
					slots: { customRender: 'consumeType' }
				},
				{
					title: i18n('default.286'),
					slots: { customRender: 'gameName' }
				},
				{
					title: i18n('default.287'),
					dataIndex: 'consumePoint'
				},
				{
					title: i18n('default.278'),
					dataIndex: 'consumeTime'
				}
			],
			tableList: [{ id: 0 }],
			total: 1,
			shopList: [],
			machineList: [],
			agentList: [],
			areaList: [],
			countryList: [],
			gameTypeList:[
				{ id: 1, name: i18n('default.55') },
				{ id: 2, name: i18n('default.283') },
				{ id: 3, name: i18n('default.284') },
				{ id: 4, name: i18n('default.285') },
				{ id: 5, name: i18n('default.291') }
			],
			gameNameList:[
				{ id: 1, name: i18n('default.31') },
				{ id: 2, name: i18n('default.32') },
				{ id: 3, name: i18n('default.33') },
				{ id: 4, name: i18n('default.34') },
				{ id: 5, name: i18n('default.41') },
				{ id: 6, name: i18n('default.42') },
				{ id: 7, name: i18n('default.44') },
				{ id: 8, name: i18n('default.45') },
				{ id: 9, name: i18n('default.50') },
				{ id: 21, name: i18n('default.53') },
				{ id: 20, name: i18n('default.52') },
				{ id: 22, name: i18n('default.54') },
				{ id: 35, name: i18n('default.51') },
			],
			consumeTypeList:[
				{ id: 1, name: i18n('default.279') },
				{ id: 2, name: i18n('default.78') },
				{ id: 3, name: i18n('default.280') },
				{ id: 4, name: i18n('default.281') }
			],
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
			handleShopChange(shopName: any){
				data.infoVO.machineName = '';
				data.infoVO.machineSerial = '';
				if(shopName){
					MachineListHttp({ shopName: shopName.split("'").join(''), pageSize: 999 }).then((res) => {
					data.machineList = res.data.data.list;
				});
				}
			},
			machineSearch(value: any,type: string) {
				MachineListHttp({ [type]: value.split("'").join(''), pageSize: 999 }).then((res) => {
					data.machineList = res.data.data.list;
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
			data.shopSearch('');
			data.agentSearch('');
			getCountryList();
			getAreaList();
		};
		onMounted(() => {
			init();
			if(RoleType === 1){handleAddColumns(data.columns)}
		});
		return {
			...toRefs(data),
			RoleType
		};
	}
});
</script>

<style scoped></style>
