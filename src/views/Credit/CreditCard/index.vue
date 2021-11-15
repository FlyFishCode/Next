<template>
	<labelTitle :value="$t('default.137')" />
	<div class="searchBox">
		<a-row class="rowStyle">
			<a-col :span="2" class="labelText" >
				{{ 'ID' }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="infoVO.id" allow-clear/>
			</a-col>
			<a-col :span="2" class="labelText">
				{{ 'Card No' }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="infoVO.cardNo" allow-clear/>
			</a-col>
			<a-col :span="2" class="labelText">
				{{ 'Member' }}
			</a-col>
			<a-col :span="4">
				<a-select class="selectBox" show-search v-model:value="infoVO.memberId" :default-active-first-option="false" :show-arrow="false" :filter-option="false" :not-found-content="null" allowClear @search="memberSearch">
					<a-select-option v-for="d in memberList" :key="d.id">
						<div :title="d.username">{{ d.username }}</div>
					</a-select-option>
				</a-select>
			</a-col>
			<a-col :span="2" class="labelText">
				{{ 'Secret Key' }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="infoVO.secretKey" allow-clear />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ 'All Points' }}
			</a-col>
			<a-col :span="2">
				<a-input v-model:value="infoVO.minAllPoints" allow-clear/>
			</a-col>
			<a-col :span="2">
				<a-input v-model:value="infoVO.maxAllPoints" allow-clear/>
			</a-col>
			<a-col :span="2" class="labelText">
				{{ 'Points' }}
			</a-col>
			<a-col :span="2">
				<a-input v-model:value="infoVO.minPoints" allow-clear/>
			</a-col>
			<a-col :span="2">
				<a-input v-model:value="infoVO.maxPoints" allow-clear/>
			</a-col>
			<a-col :span="2" class="labelText">
				{{ 'Status' }}
			</a-col>
			<a-col :span="4">
				<a-select class="selectBox" v-model:value="infoVO.status" allow-clear>
					<a-select-option :value="1">{{ 'Normal' }}</a-select-option>
					<a-select-option :value="2">{{ 'Losted' }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :span="2" class="labelText">
				{{ 'Type' }}
			</a-col>
			<a-col :span="4">
				<a-select class="selectBox" v-model:value="infoVO.type" allow-clear>
					<a-select-option :value="1">{{ 'Normal' }}</a-select-option>
					<a-select-option :value="2">{{ 'Losted' }}</a-select-option>
				</a-select>
			</a-col>
		</a-row>
		<a-row class="rowStyle" justify='center'>
			<a-col :span="2" class="labelText">
				<a-button type="primary" size="small" @click="search">{{ '搜索' }}</a-button>
			</a-col>
		</a-row>
	</div>
	<a-row class="rowStyle">
		<a-col :span="1">
			<a-button type="danger" size="small" @click="handleDelete">{{ '删除' }}</a-button>
		</a-col>
		<a-col :span="1">
			<a-button type="primary" size="small" @click="handleCreate">{{ '创建' }}</a-button>
		</a-col>
		<a-table bordered :row-selection="rowSelection" :columns="columns" :data-source="tableList" :pagination="false" rowKey="id" class="tableStyle">
			<template #cardNo="{ record }">
				<a-button type="link" @click="handleShopClick(record.id)">{{ record.cardNo }}</a-button>
			</template>
			<template #status="{ record }">{{ record.status === 1 ? 'Normal' :' Losted' }}</template>
			<template #type="{ record }">{{ record.status === 1 ? 'Normal' :' Work' }}</template>
		</a-table>
	</a-row>
	<div class="paginationStyle">
		<a-pagination show-quick-jumper v-model:current="infoVO.pageIndex" :total="total" @change="pageChange" />
	</div>
	<DeleteDialog :visible="visible" @afterClose="afterClose" @handleOk="handleDeleteOk" />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { GameUserListHttp, CreditListHttp, CreditDeleteHttp  } from '@/api/api';
import labelTitle from '@/components/labelTitle.vue';
import { useRouter } from 'vue-router';
import { handleSelectEvent } from '@/components/common/tools';
import { message } from 'ant-design-vue';
import DeleteDialog from '@/components/common/DeleteDialog.vue';
export default defineComponent({
	name: 'Credit Card',
	components: {
		labelTitle,
		DeleteDialog
	},
	setup() {
		const ROUTER = useRouter();
		let selectList: number[] = [];
		const data = reactive({
			visible:false,
			infoVO: {
				id:'',
				cardNo:'',
				password:'',
				allPoints:'',
				points:'',
				status:'',
				type:'',
				memberId:'',
				secretKey:'',
				minPoints:'',
				maxPoints:'',
				minAllPoints:'',
				maxAllPoints:'',
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
					title: 'Card No',
					slots: { customRender: 'cardNo' }
				},
				{
					title: 'Member',
					dataIndex: 'memberName',
				},
				{
					title: 'All Points',
					dataIndex: 'allPoints',
				},
				{
					title: 'Points',
					dataIndex: 'points',
				},
				{
					title: 'Status',
					slots: { customRender: 'status' }
				},
				{
					title: 'Type',
					slots: { customRender: 'type' }
				}
			],
			memberList: [],
			tableList: [{ id: 1 }],
			rowSelection: {
				columnWidth: 50,
				// columnTitle: '全选',
				onChange: (selectedRowKeys: number[], selectedRows: any) => {
					selectList = selectedRows.map((i: any) => i.id);
				}
			},
			memberSearch: (value: any) => {
				GameUserListHttp({ username: value.split("'").join(''), pageSize: 999 }).then((res) => {
						data.memberList = res.data.data.list;
					});
			},
			search: () => {
				CreditListHttp(data.infoVO).then((res: any) => {
					data.tableList = res.data.data.list;
					data.total = res.data.data.totalCount;
				});
			},
			handleDelete: () => {
				if (handleSelectEvent(selectList, 'id')) {
					data.visible = true;
				}
			},
			afterClose: (value: boolean) => {
				data.visible = value;
			},
			handleDeleteOk: () => {
				CreditDeleteHttp(selectList).then(res =>{
					if(res.data.code === 100){
						message.info(res.data.msg);
						data.search();
					}
				})
				data.visible = false;
			},
			handleCreate: () => {
				ROUTER.push('/CreditCardEdit');
			},
			pageChange: () => {
				data.search();
			},
			handleShopClick: (id: number) => {
				ROUTER.push({
					path: 'CreditCardEdit',
					query: { id }
				});
			}
		});
		const init = () => {
			data.search();
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

<style scoped></style>
