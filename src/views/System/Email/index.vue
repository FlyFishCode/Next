<template>
	<labelTitle :value="$t('default.257')" />
	<div class="searchBox">
		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ 'Id' }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="infoVO.id" allowClear />
			</a-col>
			<a-col :span="2" class="labelText">
				{{ 'Label' }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="infoVO.label" allowClear />
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.0') }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="infoVO.language" allowClear />
			</a-col>
			<a-col :span="2" class="labelText">
				{{ 'Subject' }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="infoVO.subject" allowClear />
			</a-col>
		</a-row>
		<a-row>
			<a-col :span="2" class="labelText">
				{{ 'Content' }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="infoVO.content" allowClear />
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
		<a-table :row-selection='rowSelection' :columns="columns" :data-source="tableList" :pagination="false" rowKey="id" class="tableStyle" bordered>
			<template #label="{ record }">
				<div :title="record.label" class="paramsBox" @click="handleInfo(record.id)">{{ record.label }}</div>
			</template>
			<!-- <template #content="{ record }">
				<div :title="record.content" class="paramsBox" @click="handleInfo(record.id)">{{ record.content }}</div>
			</template> -->
		</a-table>
	</a-row>
	<div class="paginationStyle">
		<a-pagination show-quick-jumper v-model:current="infoVO.pageIndex" :total="total" @change="pageChange" />
	</div>
	<DeleteDialog :visible="visible" @afterClose="afterClose" @handleOk="handleOk" />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import labelTitle from '@/components/labelTitle.vue';
import DeleteDialog from '@/components/common/DeleteDialog.vue';
import { i18n } from '@/components/common/tools';
import { EmailListHttp, EmailDeleteHttp } from '@/api/api';
import { message } from 'ant-design-vue';
export default defineComponent({
	name: 'HistoryLog',
	components: {
		labelTitle,
		DeleteDialog
	},
	setup() {
		const ROUTER = useRouter();
		const data = reactive({
			visible: false,
			selectList:[],
			infoVO: {
				id:'',
				label:'',
				subject:'',
				content:'',
				language:'',
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
					slots: { customRender: 'label' },
				},
				{
					title: i18n('default.0'),
					dataIndex: 'language'
				},
				{
					title: 'Subject',
					dataIndex: 'subject'
				},
				{
					title: 'Content',
					width:400,
					dataIndex: 'content'
				}
			],
			total: 1,
			tableList: [],
			rowSelection: {
				columnWidth: 80,
				onChange: (selectedRowKeys: number[]) => {
						data.selectList = selectedRowKeys as any;
				}
			},
			search: () => {
				EmailListHttp(data.infoVO).then((res: any) => {
					if (res.data.data) {
						data.tableList = res.data.data.list;
						data.total = res.data.data.totalCount;
					}
				});
			},
			handleCreate:() =>{
				ROUTER.push('/EmailEdit')
			},
			handleInfo:(id: any) =>{
				ROUTER.push({
					path: 'EmailEdit',
					query: { id }
				});
			},
			handleDelete:() =>{
				if(data.selectList.length){
					data.visible = true;
				}else{
					message.warning('至少选择一条数据');
				}
			},
			pageChange: (index: number) => {
				data.infoVO.pageIndex = index;
				data.search();
			},
			afterClose: (value: boolean) => {
				data.visible = value;
			},
			handleOk: () => {
				EmailDeleteHttp(data.selectList).then((res: any) => {
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
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	cursor: pointer;
	color: #1980ff;
}
</style>
