<template>
	<div>
		<labelTitle :value="$t('default.275')" />
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
						@change="handleShopChange"
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
					<a-date-picker v-model:value="infoVO.minRechargeTime" :disabled-date="disabledStartDate" valueFormat="yyyy-MM-DD 00:00:00" allow-clear />
				</a-col>
				<a-col :span="2" class="datePicker">
					<a-date-picker v-model:value="infoVO.maxRechargeTime" :disabled-date="disabledEndDate" valueFormat="yyyy-MM-DD 23:59:59" allow-clear />
				</a-col>
				<a-col v-if="RoleType === 1" :span="2" class="labelText">
					{{ $t('default.26') }}
				</a-col>
				<a-col v-if="RoleType === 1" :span="3">
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
				<a-col :span="1" class="labelText">
					<a-button type="primary" size="small" @click="search">{{ $t('default.8') }}</a-button>
				</a-col>
			</a-row>
		</div>
		<a-row class="rowStyle">
			<a-table bordered :columns="columns" :data-source="tableList" :pagination="false" rowKey="id"  class="tableStyle">
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
import { agentListHttp, countryListHttp, areaListHttp, shopListHttp, RechargeListHttp,MachineListHttp } from '@/api/api';
import { i18n, getRoleType, handleAddColumns } from '@/components/common/tools';
export default defineComponent({
	name: 'RechargeDetails',
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
				machineName:"",
				machineSerial:"",
				minRechargeTime: '',
				maxRechargeTime: '',
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
					title: i18n('default.277'),
					dataIndex: 'rechargeTime'
				}
			],
			tableList: [{ id: 0 }],
			total: 1,
			shopList: [],
			machineList: [],
			agentList: [],
			areaList: [],
			countryList: [],
			disabledStartDate: (startValue: any) => {
				if (!startValue || !data.infoVO.maxRechargeTime) {
					return false;
				}
				return startValue.valueOf() > new Date(data.infoVO.maxRechargeTime).valueOf();
			},
			disabledEndDate: (endValue: any) => {
				if (!endValue || !data.infoVO.minRechargeTime) {
					return false;
				}
				return new Date(data.infoVO.minRechargeTime).valueOf() >= endValue.valueOf();
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
				RechargeListHttp(data.infoVO).then((res: any) => {
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
