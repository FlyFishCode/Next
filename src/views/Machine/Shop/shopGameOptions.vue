<template>
	<labelTitle :value="$t('default.2')" :btn="create" />
	<a-row class="rowStyle">
		<a-col :span="2" class="labelText">
			<a-button type="primary" size="small" @click="addShop">{{ $t('default.28') }}</a-button>
		</a-col>
	</a-row>
	<a-table bordered :columns="columns" :data-source="tableList" :pagination="false" rowKey="id" class="tableStyle">
		<template #handle="{ record }">
			<a-button size="small" type="danger" @click="handleDelete(record.id)">{{ $t('default.10') }}</a-button>
		</template>
	</a-table>
	<div class="paginationStyle">
		<a-pagination show-quick-jumper v-model:current="pageIndex" :total="total" @change="pageChange" />
	</div>
	<MachineOptions ref="options" />
	<a-modal v-model:visible="visible" class="dialogBox" :title="$t('default.2')" centered width="50%">
		<div class="searchBox">
			<a-row class="rowStyle">
				<a-col :span="3" class="labelText">
					{{ $t('default.5') }}
				</a-col>
				<a-col :span="8">
					<a-input v-model:value="searchVO.name" allowClear />
				</a-col>
				<a-col :span="3" class="labelText">
					{{ $t('default.17') }}
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
					<a-button type="primary" size="small" @click="search">{{ $t('default.8') }}</a-button>
				</a-col>
			</a-row>
		</div>
		<a-table bordered :row-selection="shopRowSelection" :columns="dialogShopColumns" :data-source="dialogShopList" :pagination="false" rowKey="id" class="tableStyle"> </a-table>
		<div class="paginationStyle">
			<a-pagination show-quick-jumper v-model:current="searchVO.pageIndex" :total="dialogShopTotal" @change="dialogShopPageChange" />
		</div>
		<template #footer>
			<div class="footerBtnClass">
				<a-button key="back" @click="handleCancel">{{ $t('default.19') }}</a-button>
				<a-button key="submit" type="primary" @click="handleOk">{{ $t('default.18') }}</a-button>
			</div>
		</template>
	</a-modal>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs, computed, unref } from 'vue';
import labelTitle from '@/components/labelTitle.vue';
import { shopListHttp, setShopMachineSettingHttp } from '@/api/api';
import MachineOptions from '@/components/common/MachineOptions.vue';
import { i18n } from '@/components/common/tools';
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
					title: i18n('default.5'),
					dataIndex: 'name',
					key: 'Label'
				},
				{
					title: i18n('default.17'),
					dataIndex: 'address',
					key: 'address'
				},
				// {
				// 	title: 'aaaaaaaaaaaaaa',
				// 	dataIndex: 'lastOnlineTime',
				// 	key: 'Time'
				// },
				{
					title: i18n('default.25'),
					dataIndex: 'type',
					key: 'Type'
				},
				{
					slots: { customRender: 'handle' }
				}
			],
			dialogShopColumns: [
				{
					title: i18n('default.5'),
					dataIndex: 'name',
					key: 'Label'
				},
				{
					title: i18n('default.17'),
					dataIndex: 'address',
					key: 'address'
				},
				{
					title: i18n('default.12'),
					dataIndex: 'machineCount',
					key: 'machineCount'
				},
				{
					title: i18n('default.25'),
					dataIndex: 'type',
					key: 'Type'
				}
			],
			tableList: [],
			dialogShopList: [{ id: 1 }],
			addShop: () => {
				data.visible = true;
			},
			handleOk: () => {
				allSelectList = [];
				defaultSelectList.value.forEach((i: any) => {
					if (data.shopList.find((j: any) => j.id === i)) {
						allSelectList.push(data.shopList.find((j: any) => j.id === i));
					}
				});
				data.tableList = allSelectList.slice(0, 10);
				data.total = allSelectList.length;
				data.visible = false;
			},
			handleCancel: () => {
				data.visible = false;
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
