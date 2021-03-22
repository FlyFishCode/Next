<template>
	<labelTitle :value="$t('default.3')" :btn="create" />
	<a-row class="rowStyle">
		<a-col :span="2" class="labelText">
			<a-button type="primary" size="small" @click="addShop">{{ $t('default.83') }}</a-button>
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
	<a-modal v-model:visible="visible" :title="$t('default.3')" :footer="null" centered width="50%" @cancel="cancel">
		<div class="searchBox">
			<a-row class="rowStyle">
				<a-col :span="3" class="labelText">
					{{ $t('default.13') }}
				</a-col>
				<a-col :span="8">
					<a-input v-model:value="searchVO.name" allowClear />
				</a-col>
				<a-col :span="3" class="labelText">
					{{ $t('default.21') }}
				</a-col>
				<a-col :span="8" class="selectSearch">
					<a-input v-model:value="searchVO.serial" allowClear />
				</a-col>
				<a-col :span="2" class="labelText">
					<a-button type="primary" size="small" @click="search">{{ $t('default.8') }}</a-button>
				</a-col>
			</a-row>
		</div>
		<a-table bordered :row-selection="shopRowSelection" :columns="dialogShopColumns" :data-source="dialogMachineList" :pagination="false" rowKey="id" class="tableStyle"> </a-table>
		<div class="paginationStyle">
			<a-pagination show-quick-jumper v-model:current="searchVO.pageIndex" :total="dialogMachineTotal" @change="dialogMachinePageChange" />
		</div>
	</a-modal>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs, computed, unref } from 'vue';
import labelTitle from '@/components/labelTitle.vue';
import { MachineListHttp, setMachineSettingHttp } from '@/api/api';
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
		const defaultSelectList: any = ref([]);
		let allSelectList: any = [];
		const shopRowSelection = computed(() => {
			return {
				columnWidth: 50,
				selectedRowKeys: unref(defaultSelectList),
				hideDefaultSelections: true,
				onChange: (changableRowKeys: any) => {
					defaultSelectList.value = changableRowKeys;
					// eslint-disable-next-line @typescript-eslint/no-use-before-define
					data.infoVO.machineIds = changableRowKeys;
				}
			};
		});
		const data = reactive({
			visible: false,
			infoVO: {
				common: '',
				others: '',
				machineIds: []
			},
			searchVO: {
				name: '',
				serial: '',
				pageIndex: 1,
				pageSize: 10
			},
			total: 1,
			pageIndex: 1,
			dialogMachineTotal: 1,
			columns: [
				{
					title: i18n('default.13'),
					dataIndex: 'name',
					key: 'Label'
				},
				{
					title: i18n('default.21'),
					dataIndex: 'serial',
					key: 'Serial'
				},
				{
					title: i18n('default.22'),
					dataIndex: 'type',
					key: 'Type'
				},
				{
					slots: { customRender: 'handle' }
				}
			],
			dialogShopColumns: [
				{
					title: i18n('default.13'),
					dataIndex: 'name',
					key: 'Label'
				},
				{
					title: i18n('default.21'),
					dataIndex: 'serial',
					key: 'serial'
				},
				{
					title: i18n('default.22'),
					dataIndex: 'type',
					key: 'Type'
				}
			],
			tableList: [],
			allMachineList: [],
			dialogMachineList: [{ id: 1 }],
			addShop: () => {
				data.visible = true;
			},
			cancel: () => {
				allSelectList = [];
				defaultSelectList.value.forEach((i: any) => {
					if (data.allMachineList.find((j: any) => j.id === i)) {
						allSelectList.push(data.allMachineList.find((j: any) => j.id === i));
					}
				});
				data.tableList = allSelectList.slice(0, 10);
				data.total = allSelectList.length;
			},
			dialogMachinePageChange: (index: number) => {
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
				}
			},
			pageChange: (index: number) => {
				if (index > 1) {
					data.tableList = allSelectList.slice(`${index - 1}0`, `${index}0`);
				} else {
					data.tableList = allSelectList.slice(0, 10);
				}
			},
			search: () => {
				MachineListHttp(data.searchVO).then((res: any) => {
					data.dialogMachineList = res.data.data.list;
					data.dialogMachineTotal = res.data.data.totalCount;
				});
				MachineListHttp({ pageSize: 999999 }).then((res: any) => {
					data.allMachineList = res.data.data.list;
				});
			},
			create: () => {
				data.infoVO.common = options.value.getData().common;
				data.infoVO.others = options.value.getData().others;
				return setMachineSettingHttp(data.infoVO);
			}
		});
		const init = () => {
			data.search();
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
