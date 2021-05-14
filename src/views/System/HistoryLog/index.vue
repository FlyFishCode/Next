<template>
	<labelTitle :value="$t('default.184')" />
	<div class="searchBox">
		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ $t('default.153') }}
			</a-col>
			<a-col :span="3" class="selectSearch">
				<a-select show-search v-model:value="infoVO.userId" :default-active-first-option="false" :show-arrow="false" :filter-option="false" :not-found-content="null" allowClear @search="userSearch">
					<a-select-option v-for="user in userList" :key="user.id">
						<div :title="user.username">{{ user.username }}</div>
					</a-select-option>
				</a-select>
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.190') }}
			</a-col>
			<a-col :span="4" class="selectSearch">
				<a-select v-model:value="infoVO.module" allowClear>
					<a-select-option v-for="modules in moduleList" :key="modules.id" :value="modules.id">{{ modules.label }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.191') }}
			</a-col>
			<a-col :span="3" class="selectSearch">
				<a-select v-model:value="infoVO.type" allowClear>
					<a-select-option :value="1">{{ $t('default.185') }}</a-select-option>
					<a-select-option :value="2">{{ $t('default.10') }}</a-select-option>
					<a-select-option :value="3">{{ $t('default.187') }}</a-select-option>
					<a-select-option :value="4">{{ $t('default.188') }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.46') }}
			</a-col>
			<a-col :span="2" class="datePicker">
				<a-date-picker v-model:value="infoVO.minCreateTime" :disabled-date="disabledMinRegisterTime" valueFormat="yyyy-MM-DD 00:00:00" allow-clear />
			</a-col>
			<a-col :span="2" class="datePicker">
				<a-date-picker v-model:value="infoVO.maxCreateTime" :disabled-date="disabledMaxRegisterTime" valueFormat="yyyy-MM-DD 23:59:59" allow-clear />
			</a-col>
			<a-col :span="2" class="labelText">
				<a-button type="primary" size="small" @click="search">{{ $t('default.8') }}</a-button>
			</a-col>
		</a-row>
	</div>
	<a-row class="rowStyle">
		<a-table bordered :columns="columns" :data-source="tableList" :pagination="false" rowKey="id" class="tableStyle">
			<template #type="{ record }">
				<div>{{ getTypeName(record.module) }}</div>
			</template>
			<template #handleInfo="{ record }">
				<div :title="record.param" class="paramsBox">{{ record.param }}</div>
			</template>
			<template #handle="{ record }">
				<a-button type="danger" size="small" @click="handleDelete(record.id)">{{ $t('default.10') }}</a-button>
			</template>
		</a-table>
	</a-row>
	<div class="paginationStyle">
		<a-pagination show-quick-jumper v-model:current="infoVO.pageIndex" :total="total" @change="pageChange" />
	</div>
	<DeleteDialog :visible="visible" @afterClose="afterClose" @handleOk="handleOk" />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import labelTitle from '@/components/labelTitle.vue';
import DeleteDialog from '@/components/common/DeleteDialog.vue';
import { i18n } from '@/components/common/tools';
import { systemUserListHttp, HistoryLogListHttp, HistoryLogDeleteHttp } from '@/api/api';
import { message } from 'ant-design-vue';
export default defineComponent({
	name: 'HistoryLog',
	components: {
		labelTitle,
		DeleteDialog
	},
	setup() {
		const data = reactive({
			id: 0,
			visible: false,
			infoVO: {
				sort: 1,
				module: '',
				userId: '',
				type: '',
				minCreateTime: '',
				maxCreateTime: '',
				pageIndex: 1,
				pageSize: 10
			},
			disabledMinRegisterTime: (startValue: any) => {
				if (!startValue || !data.infoVO.maxCreateTime) {
					return false;
				}
				return startValue.valueOf() > new Date(data.infoVO.maxCreateTime).valueOf();
			},
			disabledMaxRegisterTime: (endValue: any) => {
				if (!endValue || !data.infoVO.minCreateTime) {
					return false;
				}
				return new Date(data.infoVO.minCreateTime).valueOf() >= endValue.valueOf();
			},
			columns: [
				{
					title: i18n('default.190'),
					slots: { customRender: 'type' }
				},
				{
					title: i18n('default.169'),
					dataIndex: 'operation'
				},
				{
					title: 'IP',
					dataIndex: 'ip'
				},
				{
					title: i18n('default.186'),
					width: 200,
					slots: { customRender: 'handleInfo' }
				},
				{
					title: i18n('default.153'),
					dataIndex: 'username'
				},
				{
					title: i18n('default.46'),
					dataIndex: 'createTime'
				},
				{
					title: i18n('default.169'),
					slots: { customRender: 'handle' }
				}
			],
			total: 1,
			moduleList: [
				{ id: 1, label: i18n('default.98') },
				{ id: 2, label: i18n('default.147') },
				{ id: 3, label: i18n('default.23') },
				{ id: 4, label: i18n('default.24') },
				{ id: 5, label: i18n('default.2') },
				{ id: 6, label: i18n('default.3') },
				{ id: 7, label: i18n('default.11') },
				{ id: 8, label: i18n('default.154') },
				{ id: 9, label: i18n('default.172') }
			],
			userList: [],
			tableList: [],
			search: () => {
				HistoryLogListHttp(data.infoVO).then((res: any) => {
					if (res.data.data) {
						data.tableList = res.data.data.list;
						data.total = res.data.data.totalCount;
					}
				});
			},
			userSearch: (value: string) => {
				systemUserListHttp({ username: value }).then((res: any) => {
					if (data.userList) {
						data.userList = res.data.data.list;
					}
				});
			},
			getTypeName: (value: number) => {
				let str = '';
				switch (value) {
					case 1:
						str = i18n('default.98');
						break;
					case 2:
						str = i18n('default.147');
						break;
					case 3:
						str = i18n('default.23');
						break;
					case 4:
						str = i18n('default.24');
						break;
					case 5:
						str = i18n('default.2');
						break;
					case 6:
						str = i18n('default.3');
						break;
					case 7:
						str = i18n('default.11');
						break;
					case 8:
						str = i18n('default.154');
						break;
					default:
						str = i18n('default.172');
						break;
				}
				return str;
			},
			pageChange: (index: number) => {
				data.infoVO.pageIndex = index;
				data.search();
			},
			afterClose: (value: boolean) => {
				data.visible = value;
			},
			handleDelete: (id: number) => {
				data.visible = true;
				data.id = id;
			},
			handleOk: () => {
				HistoryLogDeleteHttp([data.id]).then((res: any) => {
					if (res.data.data) {
						message.warning(res.data.msg);
						data.visible = false;
						data.search();
					}
				});
			}
		});
		const init = () => {
			data.search();
			data.userSearch('');
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

<style scoped>
.paramsBox {
	width: 200px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
