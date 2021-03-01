<template>
	<labelTitle :value="'MachineCreate'" :btn="create" />
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
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
// import { SettingFilled} from '@ant-design/icons-vue';
import labelTitle from '@/components/labelTitle.vue';
export default defineComponent({
	name: 'MachineCreate',
	components: {
		labelTitle
	},
	setup() {
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
			tableList: [{}],
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
				return 1;
			}
		});
		onMounted(() => {
			console.log(1);
		});
		return {
			...toRefs(data)
		};
	}
});
</script>

<style scoped></style>
