<template>
	<div>
		<labelTitle :value="'Order'" />
		<a-row class="rowStyle">
			<a-col :span="1">
				<a-button type="danger" size="small" @click="handleDelete">{{ '删除' }}</a-button>
			</a-col>
		</a-row>
		<div>
			<a-table bordered :row-selection="rowSelection" :columns="columns" :data-source="tableList" :pagination="false" rowKey="id" class="tableStyle"></a-table>
		</div>
		<div class="paginationStyle">
			<a-pagination show-quick-jumper v-model:current="currentPage" :total="totalSize" @change="sizeChange" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import labelTitle from '@/components/labelTitle.vue';
import { handleSelectEvent } from '@/components/common/tools';
// import { SettingFilled} from '@ant-design/icons-vue';
export default defineComponent({
	name: 'Order',
	components: {
		labelTitle
	},
	setup() {
		let selectList: number[] = [];
		const data = reactive({
			currentPage: 1,
			totalSize: 10,
			columns: [
				{
					title: 'ID',
					dataIndex: 'id'
				},
				{
					title: 'Order No',
					dataIndex: 'title'
				},
				{
					title: 'From',
					dataIndex: 'shop'
				},
				{
					title: 'Amount',
					dataIndex: 'url'
				},
				{
					title: 'Payer Account',
					dataIndex: 'url'
				},
				{
					title: 'Receiver Account',
					dataIndex: 'url'
				},
				{
					title: 'Create Time',
					dataIndex: 'age'
				},
				{
					title: 'Pay Time',
					dataIndex: 'age'
				},
				{
					title: 'Pay Method',
					dataIndex: 'age'
				},
				{
					title: 'Status',
					dataIndex: 'age'
				}
			],
			tableList: [{ id: 1 }],
			rowSelection: {
				columnWidth: 50,
				// columnTitle: '全选',
				onChange: (selectedRowKeys: number[], selectedRows: any) => {
					selectList = selectedRows.map((i: any) => i.id);
					console.log(selectList);
				}
			},
			handleDelete: () => {
				if (handleSelectEvent(selectList, 'id')) {
					console.log('1111111');
				}
			},
			sizeChange: () => {
				console.log(1);
			}
		});
		return {
			...toRefs(data)
		};
	}
});
</script>

<style scoped></style>
