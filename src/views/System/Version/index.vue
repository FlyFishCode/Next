<template>
	<labelTitle :value="$t('default.259')" />
	<div class="searchBox">
		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ 'ID' }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="infoVO.id" type='number' allowClear />
			</a-col>
			<a-col :span="2" class="labelText">
				{{ 'Label' }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="infoVO.label" allowClear />
			</a-col>
			<a-col :span="2" class="labelText">
				{{ 'Code' }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="infoVO.code" allowClear />
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.149') }}
			</a-col>
			<a-col :span="4">
				<a-select class="selectBox" v-model:value="infoVO.type" allowClear>
					<a-select-option v-for="item in typeList" :key="item.id" :value="item.id">{{ item.label }}</a-select-option>
				</a-select>
			</a-col>
		</a-row>
		<a-row>
			<a-col :span="2" class="labelText">
				{{ 'Url' }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="infoVO.url" allowClear />
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
	</a-row>
	<a-row class="rowStyle">
		<a-table :row-selection='rowSelection' bordered :columns="columns" :data-source="tableList" :pagination="false" rowKey="id" class="tableStyle">
			<template #type="{ record }">
				<div class="link" @click="handleInfo(record.id)">{{ getTypeStr(record.type) }}</div>
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
// import { i18n } from '@/components/common/tools';
import { VersionListHttp, VersionDeleteHttp } from '@/api/api';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
export default defineComponent({
	name: 'HistoryLog',
	components: {
		labelTitle,
		DeleteDialog
	},
	setup() {
		const ROUER = useRouter();
		const data = reactive({
			selectList:[],
			visible: false,
			infoVO: {
				id:'',
				type:'',
				label:'',
				code:'',
				url:'',
				pageIndex: 1,
				pageSize: 10
			},
			columns: [
				{
					title: 'ID',
					dataIndex: 'id'
				},
				{
					title: 'Label',
					dataIndex: 'label'
				},
				{
					title: 'Type',
					slots: { customRender: 'type' }
				},
				{
					title: 'Code',
					dataIndex: 'code'
				},
				{
					title: 'Url',
					dataIndex: 'url'
				}
			],
			total: 1,
			tableList: [],
			typeList:[
				{ id:1, label:'GameAppHome' },
				{ id:2, label:'GameAppBusiness' },
				{ id:3, label:'MemberApp' }
			],
			rowSelection: {
				columnWidth: 80,
				onChange: (selectedRowKeys: number[]) => {
						data.selectList = selectedRowKeys as any;
				}
			},
			getTypeStr:(id: any) =>{
				return data.typeList.find(item => item.id === id)?.label
			},
			search: () => {
				VersionListHttp(data.infoVO).then((res: any) => {
					if (res.data.data) {
						data.tableList = res.data.data.list;
						data.total = res.data.data.totalCount;
					}
				});
			},
			handleCreate:() =>{
				ROUER.push('VersionEdit')
			},
			handleInfo:(id: any) =>{
				ROUER.push({
					path:'VersionEdit',
					query:{id}
				})
			},
			pageChange: (index: number) => {
				data.infoVO.pageIndex = index;
				data.search();
			},
			afterClose: (value: boolean) => {
				data.visible = value;
			},
			handleDelete: () => {
				if(data.selectList.length){
					data.visible = true;
				}else{
					message.warning('至少选择一条数据');
				}
			},
			handleOk: () => {
				VersionDeleteHttp(data.selectList).then((res: any) => {
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
