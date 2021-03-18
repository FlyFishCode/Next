<template>
	<labelTitle :value="'Shop Game Options'" :btn="create" />
	<a-row class="rowStyle">
		<a-col :span="2" class="labelText">
			<a-button type="primary" size="small" @click="addShop">{{ '添加店铺' }}</a-button>
		</a-col>
	</a-row>
	<a-table bordered :columns="columns" :data-source="tableList" :pagination="false" rowKey="id" class="tableStyle">
		<template #handle="{ record }">
			<a-button size="small" type="danger" @click="handleDelete(record.id)">{{ '删除' }}</a-button>
		</template>
	</a-table>
	<div class="paginationStyle">
		<a-pagination show-quick-jumper v-model:current="pageIndex" :total="total" @change="pageChange" />
	</div>
	<MachineOptions ref="options" />
	<a-modal v-model:visible="visible" title="Basic Modal" :footer="null" centered width="50%" @cancel="cancel">
		<div class="searchBox">
			<a-row class="rowStyle">
				<a-col :span="3" class="labelText">
					{{ 'Name' }}
				</a-col>
				<a-col :span="8">
					<a-input v-model:value="searchVO.name" allowClear />
				</a-col>
				<a-col :span="3" class="labelText">
					{{ 'Shop Address' }}
				</a-col>
				<a-col :span="8" class="selectSearch">
					<a-select
						show-search
						v-model:value="searchVO.shopName"
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
					<a-button type="primary" size="small" @click="search">{{ '搜索' }}</a-button>
				</a-col>
			</a-row>
		</div>
		<a-table bordered :row-selection="shopRowSelection" :columns="dialogShopColumns" :data-source="dialogShopList" :pagination="false" rowKey="id" class="tableStyle"> </a-table>
		<div class="paginationStyle">
			<a-pagination show-quick-jumper v-model:current="searchVO.pageIndex" :total="dialogShopTotal" @change="dialogShopPageChange" />
		</div>
	</a-modal>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs, computed, unref } from 'vue';
import labelTitle from '@/components/labelTitle.vue';
import { shopListHttp, setShopMachineSettingHttp } from '@/api/api';
import MachineOptions from '@/components/common/MachineOptions.vue';
export default defineComponent({
	name: 'ShopEditor',
	components: {
		labelTitle,
		MachineOptions
	},
	setup() {
		const options: any = ref(null);
		let allSelectList: any = [];
		const defaultSelectList: any = ref([]);
		const shopRowSelection = computed(() => {
			return {
				columnWidth: 50,
				selectedRowKeys: unref(defaultSelectList),
				hideDefaultSelections: true,
				onChange: (changableRowKeys: any) => {
					defaultSelectList.value = changableRowKeys;
					// eslint-disable-next-line @typescript-eslint/no-use-before-define
					data.infoVO.shopIds = changableRowKeys;
				}
			};
		});
		const data = reactive({
			visible: false,
			infoVO: {
				common: '',
				others: '',
				shopIds: []
			},
			searchVO: {
				name: '',
				address: '',
				pageIndex: 1,
				pageSize: 10
			},
			pageIndex: 1,
			dialogShopTotal: 1,
			total: 1,
			shopList: [],
			columns: [
				{
					title: 'Shop Name',
					dataIndex: 'name',
					key: 'Label'
				},
				{
					title: 'Shop Address',
					dataIndex: 'serial',
					key: 'Serial'
				},
				{
					title: 'Shop Number',
					dataIndex: 'lastOnlineTime',
					key: 'Time'
				},
				{
					title: 'Type',
					dataIndex: 'type',
					key: 'Type'
				},
				{
					slots: { customRender: 'handle' }
				}
			],
			dialogShopColumns: [
				{
					title: 'Name',
					dataIndex: 'name',
					key: 'Label'
				},
				{
					title: 'Shop Address',
					dataIndex: 'address',
					key: 'address'
				},
				{
					title: 'Shop Number',
					dataIndex: 'machineCount',
					key: 'machineCount'
				},
				{
					title: 'Type',
					dataIndex: 'type',
					key: 'Type'
				}
			],
			tableList: [],
			dialogShopList: [{ id: 1 }],
			addShop: () => {
				data.visible = true;
			},
			cancel: () => {
				allSelectList = [];
				defaultSelectList.value.forEach((i: any) => {
					if (data.shopList.find((j: any) => j.id === i)) {
						allSelectList.push(data.shopList.find((j: any) => j.id === i));
					}
				});
				data.tableList = allSelectList.slice(0, 10);
				data.total = allSelectList.length;
			},
			dialogShopPageChange: (index: number) => {
				data.searchVO.pageIndex = index;
				data.search();
			},
			handleDelete: (id: number) => {
				const selectId = defaultSelectList.value.findIndex((i: number) => i === id);
				if (selectId >= 0) {
					defaultSelectList.value.splice(selectId, 1);
				}
				const tableSelectId = data.tableList.findIndex((i: any) => i.id === id);
				if (selectId >= 0) {
					data.tableList.splice(tableSelectId, 1);
					allSelectList.splice(tableSelectId, 1);
					// data.total = allSelectList.length;
				}
			},
			pageChange: (index: number) => {
				if (index > 1) {
					data.tableList = allSelectList.slice(`${index - 1}0`, `${index}0`);
				} else {
					data.tableList = allSelectList.slice(0, 10);
				}
			},
			shopSearch(value: any) {
				shopListHttp({ name: value.split("'").join(''), pageSize: 999 }).then((res) => {
					data.shopList = res.data.data.list;
				});
			},
			search: () => {
				shopListHttp(data.searchVO).then((res: any) => {
					data.dialogShopList = res.data.data.list;
					data.dialogShopTotal = res.data.data.totalCount;
				});
			},
			create: () => {
				data.infoVO.common = options.value.getData().common;
				data.infoVO.others = options.value.getData().others;
				return setShopMachineSettingHttp(data.infoVO);
			}
		});
		const init = () => {
			data.search();
			data.shopSearch('');
		};
		onMounted(() => {
			init();
		});
		return {
			...toRefs(data),
			shopRowSelection,
			options
		};
	}
});
</script>

<style scoped>
#map {
	height: 500px;
}
</style>
