<template>
	<labelTitle :value="$t('default.224')" />
	<div class="searchBox">
		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ $t('default.149') }}
			</a-col>
			<a-col :span="4">
				<a-select v-model:value="infoVO.type" class="selectBox">
					<a-select-option v-for="item in typeList" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.196') }}
			</a-col>
			<a-col :span="4">
				<a-select v-model:value="infoVO.category" class="selectBox">
					<a-select-option v-for="item in categoryList" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.179') }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="infoVO.name" allowClear />
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.203') }}
			</a-col>
			<a-col :span="4">
				<a-select v-model:value="infoVO.display" class="selectBox">
					<a-select-option :value="1">{{ $t('default.204') }}</a-select-option>
					<a-select-option :value="0">{{ $t('default.205') }}</a-select-option>
				</a-select>
			</a-col>
		</a-row>
		<a-row>
			<a-col :span="2" class="labelText">
				{{ $t('default.227') }}
			</a-col>
			<a-col :span="4">
				<a-select v-model:value="infoVO.cost" class="selectBox">
					<a-select-option :value="1">{{ $t('default.86') }}</a-select-option>
					<a-select-option :value="2">{{ $t('default.228') }}</a-select-option>
					<a-select-option :value="3">{{ $t('default.229') }}</a-select-option>
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
			<template #type="{ record }">
				<div >{{ getTypeName(record.type) }}</div>
			</template>
			<template #name="{ record }">
				<a-button type="link" @click="handleNameClick(record.id)">{{ record.name }}</a-button>
			</template>
			<template #handle="{ record }">
				<a-checkbox v-model:checked="record.display" @change="checkboxChange(record)"></a-checkbox>
			</template>
		</a-table>
	</a-row>
	<div class="paginationStyle">
		<a-pagination show-quick-jumper v-model:current="infoVO.pageIndex" :total="total" @change="pageChange" />
	</div>
	<DeleteDialog :visible="visible" @afterClose="afterClose" @handleOk="handleDeleteOk" />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { PlayerListHttp, PlayerDeleteHttp, newsEditorHttp } from '@/api/api';
import labelTitle from '@/components/labelTitle.vue';
import DeleteDialog from '@/components/common/DeleteDialog.vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { handleSelectEvent, i18n } from '@/components/common/tools';
// import { useStore } from 'vuex';
// import qs from 'qs'
export default defineComponent({
	name: 'Shop',
	components: {
		labelTitle,
		DeleteDialog
	},
	setup() {
		const ROUTER = useRouter();
		// const STORE = useStore();
		const RoleType: any = sessionStorage.getItem('NextRoleType');
		let selectList: number[] = [];
		const data = reactive({
			visible: false,
			total: 0,
			typeList: [
				{ id: 0 ,name: 'All' },
				{ id: 1 ,name: 'Style' },
				{ id: 2 ,name: 'Mark' },
				{ id: 3 ,name: 'Effect' },
				{ id: 4 ,name: 'Sound' },
				{ id: 5 ,name: 'Bull' },
				{ id: 6 ,name: 'Award' },
			],
			categoryList:[
				{ id: 1 ,name: i18n('default.93') },
				{ id: 2 ,name: i18n('default.208') },
				{ id: 3 ,name: i18n('default.226') },
			],
			tableList: [],
			infoVO: {
				name: '',
				cost:'',
				type:0,
				display:1,
				category:1,
				pageIndex: 1,
				pageSize: 10
			},
			columns: [
				{
					title: i18n('default.122'),
					dataIndex: 'id',
				},
				{
					title: i18n('default.149'),
					slots: { customRender: 'type' }
				},
				{
					title: i18n('default.196'),
					width: 100,
					slots: { customRender: 'img' }
				},
				{
					title: i18n('default.179'),
					slots: { customRender: 'name' }
				},
				{
					title: i18n('default.203'),
					slots: { customRender: 'handle' }
				},
				{
					title: i18n('default.227'),
					children: [
            {
							title: i18n('default.149'),
              dataIndex: 'building',
              width: 100,
            },
            {
							title: i18n('default.82'),
              dataIndex: 'number',
              width: 100,
            },
          ],
				}
			],
			rowSelection: {
				columnWidth: 50,
				// columnTitle: '全选',
				onChange: (selectedRowKeys: number[]) => {
					selectList = selectedRowKeys;
				}
			},
			getTypeName:(id: any) =>{
				const list = data.typeList.find((i => i === id))
				return list?.name
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
				PlayerDeleteHttp(selectList).then((res: any) => {
					message.warning(res.data.msg);
					data.search();
				});
				data.visible = false;
			},
			search: () => {
				PlayerListHttp(data.infoVO).then((res: any) => {
					if(res.data.code === 100){
						res.data.data.list.forEach((i: any) => {
							i.display = Boolean(i.display)
						});
						data.tableList = res.data.data.list;
						data.total = res.data.data.totalCount;
					}
				});
			},
			pageChange: () => {
				data.search();
			},
			handleCreate: () => {
				ROUTER.push({
					path: 'ShopEdit'
				});
			},
			handleNameClick: (id: number) => {
				ROUTER.push({
					path: 'ShopEdit',
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
					category:row.category,
					countryId:row.countryId,
					registerDate:row.registerDate,
					display:Number(row.display),
				}
				newsEditorHttp(flagData).then((res: any) =>{
					message.info(res.data.msg)
				})
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
			RoleType
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
