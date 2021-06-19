<template>
	<labelTitle :value="$t('default.193')" />
	<div class="searchBox">
		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ 'ID' }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="infoVO.id" allowClear />
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.5') }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="infoVO.name" allowClear />
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
				{{ $t('default.25') }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="infoVO.type" allowClear />
			</a-col>
			<a-col v-if="isAdmin" :span="2" class="labelText">
				{{ $t('default.26') }}
			</a-col>
			<a-col v-if="isAdmin" :span="4" class="selectSearch">
				<a-select show-search v-model:value="infoVO.agentId" :default-active-first-option="false" :show-arrow="false" :filter-option="false" :not-found-content="null" allowClear @search="agentSearch">
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
		<a-col :span="1">
			<a-button type="primary" size="small" @click="handleSetting">{{ $t('default.27') }}</a-button>
		</a-col>
		<a-table bordered :row-selection="rowSelection" :columns="columns" :data-source="tableList" :pagination="false" rowKey="id" class="tableStyle">
			<template #name="{ record }">
				<a-button type="link" @click="handleShopClick(record.id)">{{ record.name }}</a-button>
			</template>
		</a-table>
	</a-row>
	<div class="paginationStyle">
		<a-pagination show-quick-jumper v-model:current="infoVO.pageIndex" :total="total" @change="pageChange" />
	</div>
	<DeleteDialog :visible="visible" @afterClose="afterClose" @handleOk="handleDeleteOk" />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { shopListHttp, countryListHttp, areaListHttp, agentListHttp, userListHttp, deleteShopHttp } from '@/api/api';
import labelTitle from '@/components/labelTitle.vue';
import DeleteDialog from '@/components/common/DeleteDialog.vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { handleSelectEvent, i18n } from '@/components/common/tools';
export default defineComponent({
	name: 'Shop',
	components: {
		labelTitle,
		DeleteDialog
	},
	setup() {
		const ROUTER = useRouter();
		let selectList: number[] = [];
		const isAdmin = sessionStorage.getItem('NextUserType');
		const data = reactive({
			visible: false,
			infoVO: {
				id: '',
				name: '',
				countryId: '',
				areaId: '',
				type: '',
				agentId: '',
				pageIndex: 1,
				pageSize: 10
			},
			total: 1,
			columns: [
				{
					title: 'ID',
					dataIndex: 'id',
					key: 'Id'
				},
				{
					title: i18n('default.5'),
					dataIndex: 'name',
					key: 'Name',
					slots: { customRender: 'name' }
				},
				{
					title: i18n('default.26'),
					dataIndex: 'agentName',
					key: 'Agent'
				},
				{
					title: i18n('default.23'),
					dataIndex: 'countryName',
					key: 'Country'
				},
				{
					title: i18n('default.24'),
					dataIndex: 'areaName',
					key: 'Area'
				},
				{
					title: i18n('default.25'),
					dataIndex: 'type',
					key: 'Type'
				}
			],
			countryList: [],
			areaList: [],
			agentList: [],
			ownerList: [],
			tableList: [{ id: 1 }],
			rowSelection: {
				columnWidth: 50,
				// columnTitle: '全选',
				onChange: (selectedRowKeys: number[]) => {
					selectList = selectedRowKeys;
				}
			},
			shopList: [],
			countryChange: () => {
				data.infoVO.areaId = '';
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getAreaList();
			},
			agentSearch: (value: any) => {
				agentListHttp({ agentName: value.split("'").join(''), pageSize: 999 }).then((res: any) => {
					data.agentList = res.data.data;
				});
			},
			ownerSearch: (value: any) => {
				userListHttp({ username: value.split("'").join(''), pageSize: 999 }).then((res: any) => {
					data.ownerList = res.data.data.list;
				});
			},
			handleDelete: () => {
				if (handleSelectEvent(selectList, '').length) {
					data.visible = true;
				}
			},
			afterClose: (value: boolean) => {
				data.visible = value;
			},
			handleDeleteOk: () => {
				deleteShopHttp(selectList).then((res: any) => {
					message.warning(res.data.msg);
					data.search();
				});
				data.visible = false;
			},
			search: () => {
				shopListHttp(data.infoVO).then((res: any) => {
					data.tableList = res.data.data.list;
					data.total = res.data.data.totalCount;
				});
			},
			handleSetting: () => {
				ROUTER.push({
					path: 'ShopGameOptions'
				});
			},
			pageChange: () => {
				data.search();
			},
			handleCreate: () => {
				ROUTER.push({
					path: 'NewsEdit'
				});
			},
			handleShopClick: (id: number) => {
				ROUTER.push({
					path: 'EditorShop',
					query: {
						id
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
			getCountryList();
			getAreaList();
		};
		onMounted(() => {
			init();
		});
		return {
			...toRefs(data),
			isAdmin
		};
	}
});
</script>

<style scoped></style>
