<template>
	<labelTitle :value="'MachineEditor'" :btn="id ? update : create" />
	<div class="searchBox">
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ 'Name' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.name" allow-clear />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ 'Type' }}
			</a-col>
			<a-col :span="9" class="selectSearch">
				<a-select v-model:value="infoVO.type" allow-clear>
					<a-select-option value="A1">A1</a-select-option>
					<a-select-option value="W1">W1</a-select-option>
				</a-select>
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ 'Shop Name' }}
			</a-col>
			<a-col :span="9" class="selectSearch">
				<a-select show-search v-model:value="infoVO.shopId" :default-active-first-option="false" :show-arrow="false" :filter-option="false" :not-found-content="null" allow-clear @search="shopSearch">
					<a-select-option v-for="d in shopList" :key="d.id">
						<div :title="d.name">{{ d.name }}</div>
					</a-select-option>
				</a-select>
			</a-col>
			<a-col :span="3" class="labelText">
				{{ 'Placing Type' }}
			</a-col>
			<a-col :span="9" class="selectSearch">
				<a-select v-model:value="infoVO.placingType">
					<a-select-option :value="1">Free</a-select-option>
					<a-select-option :value="2">Rent</a-select-option>
					<a-select-option :value="3">Sell</a-select-option>
				</a-select>
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ 'Serial' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.serial" allow-clear />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ 'Memo' }}
			</a-col>
			<a-col :span="21">
				<a-textarea v-model:value="infoVO.memo" :rows="4" allow-clear />
			</a-col>
		</a-row>
	</div>
	<MachineOptions ref="options" :gameOptions="infoVO.setting" />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
// import { SettingFilled } from '@ant-design/icons-vue';
import labelTitle from '@/components/labelTitle.vue';
import MachineOptions from '@/components/common/MachineOptions.vue';
import { shopListHttp, createMachineHttp, getMachineInfoHttp, editorMachineHttp } from '@/api/api';
import { useRoute } from 'vue-router';
export default defineComponent({
	name: 'MachineEditor',
	components: {
		labelTitle,
		MachineOptions
	},
	setup() {
		const ROUTE = useRoute();
		const id: any = ROUTE.query.id;
		const options: any = ref(null);
		const data = reactive({
			disabled: true,
			infoVO: {
				id: '',
				name: '',
				type: '',
				shopId: '',
				serial: '',
				memo: '',
				setting: {
					common: '',
					others: ''
				},
				placingType: 1,
				pageIndex: 1,
				pageSize: 10
			},
			currentPage: 1,
			totalSize: 100,
			shopList: [],
			columns: [
				{
					title: 'ID',
					dataIndex: 'age',
					key: 'ID'
				},
				{
					title: 'Operator',
					dataIndex: 'age',
					key: 'Operator'
				},
				{
					title: 'Operator Time',
					dataIndex: 'age',
					key: 'OperatorTime'
				},
				{
					title: 'Cash',
					dataIndex: 'age',
					key: 'Cash'
				},
				{
					title: 'Credits',
					dataIndex: 'age',
					key: 'Credits'
				},
				{
					title: 'Coins',
					dataIndex: 'age',
					key: 'Coins'
				},
				{
					title: 'Name',
					dataIndex: 'age',
					key: 'Name'
				},
				{
					title: 'Machine',
					dataIndex: 'age',
					key: 'Machine'
				},
				{
					title: 'Amout(cent)',
					dataIndex: 'age',
					key: 'Amout(cent)'
				},
				{
					title: 'All Credits',
					dataIndex: 'age',
					key: 'All Credits'
				},
				{
					title: 'Free Credits',
					dataIndex: 'age',
					key: 'Free Credits'
				}
			],
			tableList: [{}],
			shopSearch: (value: string) => {
				shopListHttp({ name: value.split("'").join(''), pageSize: 999 }).then((res: any) => {
					data.shopList = res.data.data.list;
				});
			},
			sizeChange: () => {
				console.log(1);
			},
			handleSearch(value: any) {
				console.log(value);
			},
			handleChange(value: any) {
				console.log(value);
			},
			create: () => {
				data.infoVO.setting = options.value.getData();
				return createMachineHttp(data.infoVO);
			},
			update: () => {
				data.infoVO.setting = options.value.getData();
				return editorMachineHttp(data.infoVO);
			}
		});
		const init = (id: any) => {
			data.shopSearch('');
			getMachineInfoHttp({ machineId: id }).then((res: any) => {
				data.infoVO.id = res.data.data.id;
				data.infoVO.type = res.data.data.type;
				data.infoVO.name = res.data.data.name;
				data.infoVO.shopId = res.data.data.shopId;
				data.infoVO.placingType = res.data.data.placingType;
				data.infoVO.serial = res.data.data.serial;
				data.infoVO.memo = res.data.data.memo;
				options.value.setData(res.data.data.setting);
			});
		};
		onMounted(() => {
			if (id) {
				init(id);
			}
		});
		return {
			...toRefs(data),
			id,
			options
		};
	}
});
</script>

<style scoped></style>
