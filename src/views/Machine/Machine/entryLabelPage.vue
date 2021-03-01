<template>
	<labelTitle :value="'MachineEditor'" :btn="create" />
	<div class="searchBox">
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ 'Label' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.title" allow-clear />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ 'Type' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.title" allow-clear />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ 'Shop' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.title" allow-clear />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ 'Password' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.title" allow-clear />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ 'Serial' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.title" allow-clear />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ 'Placing Type' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.title" allow-clear />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ 'Locked Dates' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.title" allow-clear />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ 'Free Mode' }}
			</a-col>
			<a-col :span="9" class="radioStyle">
				<a-radio-group name="radioGroup" v-model:value="infoVO.RoomValue">
					<a-radio :value="true">{{ 'Yes' }}</a-radio>
					<a-radio :value="false">{{ 'No' }}</a-radio>
				</a-radio-group>
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ '301 Max Round' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.title" allow-clear />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ '501 Max Round' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.title" allow-clear />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ '701 Max Round' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.title" allow-clear />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ '901 Max Round' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.title" allow-clear />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ 'CR.S Max Round' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.title" allow-clear />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ 'CR.C Max Round' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.title" allow-clear />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ 'Countup Max Round' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.title" allow-clear />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ 'Countup Timed Max Time' }}
			</a-col>
			<a-col :span="9" class="radioStyle">
				<a-input v-model:value="infoVO.title" allow-clear />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ 'Memo' }}
			</a-col>
			<a-col :span="21">
				<a-textarea v-model:value="infoVO.Memo" :rows="4" allow-clear />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ 'Life Games' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.title" :disabled="disabled" />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ 'Last IP' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.title" :disabled="disabled" />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ 'Last Online' }}
			</a-col>
			<a-col :span="5">
				<a-input v-model:value="infoVO.title" :disabled="disabled" />
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="infoVO.title" :disabled="disabled" />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ 'Attracts' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.title" :disabled="disabled" />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ 'Current All Credits' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.title" :disabled="disabled" />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ 'Life All Credits' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.title" :disabled="disabled" />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ 'Current Credits' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.title" :disabled="disabled" />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ 'Life Credits' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.title" :disabled="disabled" />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ 'Current Free Credits' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.title" :disabled="disabled" />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ 'Life Free Credits' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.title" :disabled="disabled" />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ 'Current Coins' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.title" :disabled="disabled" />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ 'Life Coins' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.title" :disabled="disabled" />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ 'Current Amout(cent)' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.title" :disabled="disabled" />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ 'Life Amout(cent)' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.title" :disabled="disabled" />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ 'Current Cash' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.title" :disabled="disabled" />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ 'Life Cash' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.title" :disabled="disabled" />
			</a-col>
		</a-row>
	</div>
	<labelTitle :value="'Reset History'" />
	<div class="searchBox">
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ 'ID' }}
			</a-col>
			<a-col :span="3">
				<a-input v-model:value="infoVO.title" allow-clear />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ 'Operator' }}
			</a-col>
			<a-col :span="3">
				<a-input v-model:value="infoVO.title" allow-clear />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ 'Cash' }}
			</a-col>
			<a-col :span="3">
				<a-input v-model:value="infoVO.title" allow-clear />
			</a-col>
			<a-col :span="2" class="labelText">
				{{ 'Operator Time' }}
			</a-col>
			<a-col :span="2">
				<a-date-picker v-model:value="infoVO.time" allow-clear />
			</a-col>
			<a-col :span="2">
				<a-date-picker v-model:value="infoVO.time" allow-clear />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ 'All Credits' }}
			</a-col>
			<a-col :span="3">
				<a-input v-model:value="infoVO.title" allow-clear />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ 'Credits' }}
			</a-col>
			<a-col :span="3">
				<a-input v-model:value="infoVO.title" allow-clear />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ 'Free Credits' }}
			</a-col>
			<a-col :span="3">
				<a-input v-model:value="infoVO.title" allow-clear />
			</a-col>
			<a-col :span="2" class="labelText">
				{{ 'Amout(cent)' }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="infoVO.title" allow-clear />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ 'Coins' }}
			</a-col>
			<a-col :span="3">
				<a-input v-model:value="infoVO.title" allow-clear />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ 'Machine' }}
			</a-col>
			<a-col :span="3">
				<a-input v-model:value="infoVO.title" allow-clear />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ 'Name' }}
			</a-col>
			<a-col :span="3">
				<a-input v-model:value="infoVO.title" allow-clear />
			</a-col>
			<a-col :span="2" class="labelText">
				<a-button type="primary" size="small" @click="search">{{ '搜索' }}</a-button>
			</a-col>
		</a-row>
	</div>
	<div>
		<a-table bordered :columns="columns" :data-source="tableList" :pagination="false" rowKey="id" class="tableStyle"></a-table>
	</div>
	<div class="paginationStyle">
		<a-pagination show-quick-jumper v-model:current="currentPage" :total="totalSize" @change="sizeChange" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
// import { SettingFilled} from '@ant-design/icons-vue';
import labelTitle from '@/components/labelTitle.vue';
import { useRoute } from 'vue-router';
export default defineComponent({
	name: 'entryLabelPage',
	components: {
		labelTitle
	},
	setup() {
		const ROUTE = useRoute();
		const data = reactive({
			disabled: true,
			infoVO: {
				title: '',
				shop: '',
				url: '',
				RoomValue: true,
				ParkingValue: true,
				CreditValue: false,
				SupplierValue: false,
				ValidValue: true
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
			tableList: [{ id: 1 }],
			sizeChange: () => {
				console.log(1);
			},
			handleSearch(value: any) {
				console.log(value);
			},
			handleChange(value: any) {
				console.log(value);
			},
			search: () => {
				console.log(1);
			},
			create: () => {
				return 1;
			}
		});
		onMounted(() => {
			console.log(ROUTE.query.id);
		});
		return {
			...toRefs(data)
		};
	}
});
</script>

<style scoped></style>
