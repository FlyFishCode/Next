<template>
	<labelTitle :value="$t('default.193')" />
	<div class="searchBox">
		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ $t('default.23') }}
			</a-col>
			<a-col :span="4">
				<a-select v-model:value="infoVO.countryId" class="selectBox" allowClear>
					<a-select-option v-for="item in countryList" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.201') }}
			</a-col>
			<a-col :span="6">
				<a-input v-model:value="infoVO.title" allowClear />
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.203') }}
			</a-col>
			<a-col :span="4">
				<a-select v-model:value="infoVO.display" class="selectBox">
					<a-select-option value=" ">{{ $t('default.200') }}</a-select-option>
					<a-select-option :value="1">{{ $t('default.204') }}</a-select-option>
					<a-select-option :value="0">{{ $t('default.205') }}</a-select-option>
				</a-select>
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
		<a-table bordered :row-selection="rowSelection" :columns="columns" :data-source="tableList" :pagination="false" rowKey="id" class="tableStyle">
			<template #img="{ record }">
				<div class="imgBox"><img :src="record.thumbnail" alt=""></div>
			</template>
			<template #name="{ record }">
				<a-button type="link" @click="handleTitleClick(record.id)">{{ record.title }}</a-button>
			</template>
			<template #handle="{ record }">
				<a-checkbox v-model:checked="record.display" @change="checkboxChange(record)"></a-checkbox>
			</template>
		</a-table>
	</a-row>
	<div class="paginationStyle">
		<a-pagination show-quick-jumper v-model:current="infoVO.pageNum" :total="total" @change="pageChange" />
	</div>
	<DeleteDialog :visible="visible" @afterClose="afterClose" @handleOk="handleDeleteOk" />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { dartsListHttp, countryListHttp,dartsDeleteHttp, newsEditorHttp } from '@/api/api';
import labelTitle from '@/components/labelTitle.vue';
import DeleteDialog from '@/components/common/DeleteDialog.vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { handleSelectEvent, i18n } from '@/components/common/tools';
import { useStore } from 'vuex';
// import qs from 'qs'

interface DataProps{
	countryList: [{id: any;name: any}];
}

export default defineComponent({
	name: 'News',
	components: {
		labelTitle,
		DeleteDialog
	},
	setup() {
		const ROUTER = useRouter();
		const STORE = useStore();
		let selectList: number[] = [];
		const data = reactive({
			visible: false,
			total: 0,
			countryList: [],
			agentList: [],
			ownerList: [],
			shopList: [],
			tableList: [],
			status:0,
			infoVO: {
				countryId: '',
				title: '',
				display:' ',
				pageNum: 1,
				pageSize: 10
			},
			columns: [
				{
					title: i18n('default.23'),
					dataIndex: 'countryName',
				},
				{
					title: i18n('default.93'),
					width: 100,
					slots: { customRender: 'img' }
				},
				{
					title: i18n('default.201'),
					slots: { customRender: 'name' }
				},
				{
					title: i18n('default.203'),
					slots: { customRender: 'handle' }
				}
			],
			rowSelection: {
				columnWidth: 50,
				// columnTitle: '全选',
				onChange: (selectedRowKeys: number[]) => {
					selectList = selectedRowKeys;
				}
			},
			handleDelete: () => {
				if (handleSelectEvent(selectList, '').length) {
					data.visible = true;
				}
			},
			afterClose: (value: boolean) => {
				data.visible = value;
			},
			handleDeleteOk: () => {
				dartsDeleteHttp(selectList).then((res: any) => {
					message.warning(res.data.msg);
					data.search();
					selectList = []
				});
				data.visible = false;
			},
			search: () => {
				dartsListHttp(data.infoVO).then((res: any) => {
					res.data.data.list.forEach((i: any) => {
						i.display = Boolean(i.display)
					});
					data.tableList = res.data.data.list;
					data.total = res.data.data.total;
				});
			},
			pageChange: () => {
				data.search();
			},
			handleCreate: () => {
				ROUTER.push({
					path: 'DartsEdit'
				});
			},
			handleTitleClick: (id: number) => {
				ROUTER.push({
					path: 'DartsEdit',
					query: {
						id
					}
				});
			},
			checkboxChange:(row: any) =>{
				const flagData = {
					id:row.id,
					title:row.title,
					contents:row.contents,
					countryId:row.countryId,
					registerDate:row.registerDate,
					display:Number(row.display),
				}
				newsEditorHttp(flagData).then((res: any) =>{
					message.info(res.data.msg)
				})
			}
		});
		const getCountryList = () => {
			countryListHttp({pageSize:999}).then((res: any) => {
				data.countryList = res.data.data.list;
			});
		};
		const init = () => {
			data.search();
			getCountryList();
			data.status = STORE.state.role
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
.imgBox{
	height: 60px;
}
.imgBox img{
	width: 100%;
	height: 100%;
}
</style>
