<template>
	<labelTitle :value="$t('default.3')" />
	<div class="searchBox">
		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ 'ID' }}
			</a-col>
			<a-col :span="3">
				<a-input v-model:value="infoVO.id" type='number' allow-clear />
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.13') }}
			</a-col>
			<a-col :span="3">
				<a-input v-model:value="infoVO.name" allow-clear />
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.5') }}
			</a-col>
			<a-col :span="4">
				<a-select class="selectBox" show-search v-model:value="infoVO.shopName" :default-active-first-option="false" :show-arrow="false" :filter-option="false" :not-found-content="null" allowClear @search="shopSearch">
					<a-select-option v-for="shop in shopList" :key="shop.name">
						<div :title="shop.name">{{ shop.name }}</div>
					</a-select-option>
				</a-select>
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.22') }}
			</a-col>
			<a-col :span="4">
				<a-select class="selectBox" v-model:value="infoVO.type" allow-clear>
					<a-select-option value="A1">A1</a-select-option>
					<a-select-option value="W1">W1</a-select-option>
				</a-select>
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ $t('default.21') }}
			</a-col>
			<a-col :span="3">
				<a-input v-model:value="infoVO.serial" allow-clear />
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.84') }}
			</a-col>
			<a-col :span="3">
				<a-select class="selectBox" v-model:value="infoVO.placingType" allow-clear>
					<a-select-option value="1">{{ $t('default.86') }}</a-select-option>
					<a-select-option value="2">{{ $t('default.87') }}</a-select-option>
					<a-select-option value="3">{{ $t('default.88') }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.89') }}
			</a-col>
			<a-col :span="2">
				<a-date-picker v-model:value="infoVO.minLastOnlineTime" :disabled-date="disabledStartDate" valueFormat="yyyy-MM-DD 00:00:00" allow-clear />
			</a-col>
			<a-col :span="2">
				<a-date-picker v-model:value="infoVO.maxLastOnlineTime" :disabled-date="disabledEndDate" valueFormat="yyyy-MM-DD 23:59:59" allow-clear />
			</a-col>
			<a-col v-if="RoleType === 1" :span="2" class="labelText">
				{{ $t('default.26') }}
			</a-col>
			<a-col v-if="RoleType === 1" :span="4">
				<a-select class="selectBox" show-search v-model:value="infoVO.agentId" :default-active-first-option="false" :show-arrow="false" :filter-option="false" :not-found-content="null" allowClear @search="agentSearch">
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
		<a-col :span="1">
			<a-button type="danger" size="small" @click="handleDelete">{{ $t('default.10') }}</a-button>
		</a-col>
		<a-col :span="1">
			<a-button type="primary" size="small" @click="handleCreate">{{ $t('default.9') }}</a-button>
		</a-col>
		<!-- <a-col :span="1">
			<a-button type="primary" size="small" @click="handleSetting">{{ $t('default.27') }}</a-button>
		</a-col> -->
		<a-table bordered :row-selection="rowSelection" :columns="columns" :data-source="tableList" :pagination="false" rowKey="id" class="tableStyle">
			<template #label="{ record }">
				<a-button v-if="record.name" type="link" @click="handleMachineClick(record.id)">{{ record.name }}</a-button>
			</template>
			<template #type="{ record }">
				<div v-if="record.type === 'A1'">{{ 'A1' }}</div>
				<div v-if="record.type === 'W1'">{{ 'W1' }}</div>
			</template>
			<template #shop="{ record }">
				<a-button v-if="record.shopName" type="link" @click="handleShopClick(record.shopId)">{{ record.shopName }}</a-button>
			</template>
			<template #placingType="{ record }">
				<div v-if="record.placingType === 1">{{ $t('default.86') }}</div>
				<div v-if="record.placingType === 2">{{ $t('default.87') }}</div>
				<div v-if="record.placingType === 3">{{ $t('default.88') }}</div>
			</template>
		</a-table>
	</a-row>
	<div class="paginationStyle">
		<a-pagination show-quick-jumper v-model:current="currentPage" :total="totalSize" @change="pageChange" />
	</div>
	<DeleteDialog :visible="visible" @afterClose="afterClose" @handleOk="handleDeleteOk" />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { MachineListHttp, shopListHttp, deleteMachinepHttp, agentListHttp } from '@/api/api';
import labelTitle from '@/components/labelTitle.vue';
import DeleteDialog from '@/components/common/DeleteDialog.vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { handleSelectEvent, i18n, getRoleType } from '@/components/common/tools';
// import { SettingFilled} from '@ant-design/icons-vue';
export default defineComponent({
	name: 'Machine',
	components: {
		labelTitle,
		DeleteDialog
	},
	setup() {
		const ROUTER = useRouter();
		let selectList: number[] = [];
		const RoleType = getRoleType();
		const data = reactive({
			visible: false,
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
			currentPage: 1,
			totalSize: 1,
			columns: [
				{
					title: 'ID',
					dataIndex: 'id',
					key: 'Id'
				},
				{
					title: i18n('default.13'),
					key: 'Label',
					slots: { customRender: 'label' }
				},
				{
					title: i18n('default.17'),
					key: 'Shop',
					slots: { customRender: 'shop' }
				},
				{
					title: i18n('default.22'),
					dataIndex: 'type',
					key: 'Type',
					slots: { customRender: 'type' }
				},
				{
					title: i18n('default.21'),
					dataIndex: 'serial',
					key: 'Serial'
				},
				{
					title: i18n('default.84'),
					key: 'placingType',
					slots: { customRender: 'placingType' }
				},
				{
					title: i18n('default.89'),
					dataIndex: 'lastOnlineTime',
					key: 'Last Online'
				}
			],
			tableList: [],
			shopList: [],
			agentList: [],
			rowSelection: {
				columnWidth: 50,
				// columnTitle: '全选',
				onChange: (selectedRowKeys: number[]) => {
					selectList = selectedRowKeys;
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
			agentSearch: (value: any) => {
				agentListHttp({ agentName: value.split("'").join(''), pageSize: 999 }).then((res: any) => {
					data.agentList = res.data.data;
				});
			},
			search: () => {
				MachineListHttp(data.infoVO).then((res: any) => {
					data.tableList = res.data.data.list;
					data.totalSize = res.data.data.totalCount;
				});
			},
			afterClose: (value: boolean) => {
				data.visible = value;
			},
			handleDeleteOk: () => {
				deleteMachinepHttp(selectList).then((res: any) => {
					message.warning(res.data.msg);
					data.search();
				});
				data.visible = false;
			},
			handleDelete: () => {
				if (handleSelectEvent(selectList, '').length) {
					data.visible = true;
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
			...toRefs(data),
			RoleType
		};
	}
});
</script>

<style scoped></style>
