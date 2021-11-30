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
				{{ $t('default.179') }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="infoVO.title" allowClear />
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.247') }}
			</a-col>
			<a-col :span="4">
				<a-select v-model:value="infoVO.recommend" class="selectBox">
					<a-select-option value="">{{ 'All' }}</a-select-option>
					<a-select-option :value="1">{{ $t('default.170') }}</a-select-option>
					<a-select-option :value="0">{{ $t('default.171') }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.203') }}
			</a-col>
			<a-col :span="4">
				<a-select v-model:value="infoVO.status" class="selectBox">
					<a-select-option value="">{{ 'All' }}</a-select-option>
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
				<a-select v-model:value="infoVO.priceType" class="selectBox">
					<a-select-option value="">{{ 'All' }}</a-select-option>
					<a-select-option :value="1">{{ $t('default.228') }}</a-select-option>
					<a-select-option :value="2">{{ $t('default.229') }}</a-select-option>
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
			<template #aaa="{ record }">
				<a-button type="link" @click="handleNameClick(record.id)">{{ record.title }}</a-button>
			</template>
			<template #img="{ record }">
				<div class="imgBox"><img :src="record.previewImg" alt=""></div>
			</template>
			<template #recommend="{ record }">
				<div>{{ record.recommend === 1?$t('default.170'):$t('default.171') }}</div>
			</template>
			<template #priceType="{ record }">
				<div>{{ record.priceType === 1?$t('default.228'):$t('default.229') }}</div>
			</template>
			<template #handle="{ record }">
				<a-checkbox v-model:checked="record.status" @change="checkboxChange(record)"></a-checkbox>
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
import { shopPropsListHttp, shopPropsDeleteHttp, shopPropsUpdateHttp } from '@/api/api';
import labelTitle from '@/components/labelTitle.vue';
import DeleteDialog from '@/components/common/DeleteDialog.vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { handleSelectEvent, i18n, getRoleType } from '@/components/common/tools';
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
		const RoleType: any = getRoleType();
		let selectList: number[] = [];
		const data = reactive({
			visible: false,
			total: 0,
			typeList: [
				{ id: '' ,name: 'All' },
				{ id: 1 ,name: 'Style' },
				{ id: 2 ,name: 'Mark' },
				{ id: 3 ,name: 'Effect' },
				{ id: 4 ,name: 'Sound' },
				{ id: 5 ,name: 'Bull' },
				{ id: 6 ,name: 'Bull Sound' },
				{ id: 7 ,name: 'Award' },
			],
			tableList: [],
			infoVO: {
				title: '',
				type:'',
				status:'',
				recommend:'',
				priceType:'',
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
					title: i18n('default.268'),
					width: 100,
					slots: { customRender: 'img' }
				},
				{
					title: i18n('default.179'),
					slots: { customRender: 'aaa' }
				},
				{
					title: i18n('default.247'),
					slots: { customRender: 'recommend' }
				},
				{
					title: i18n('default.227'),
					children: [
            {
							title: i18n('default.149'),
              width: 100,
							slots: { customRender: 'priceType' }
            },
            {
							title: i18n('default.82'),
              dataIndex: 'price',
              width: 100,
            },
          ],
				},
				{
					title: i18n('default.203'),
					width:100,
					slots: { customRender: 'handle' }
				},
			],
			rowSelection: {
				columnWidth: 50,
				// columnTitle: '全选',
				onChange: (selectedRowKeys: number[]) => {
					selectList = selectedRowKeys;
				}
			},
			getTypeName:(id: any) =>{
				let str = '';
				switch (id) {
					case 1:
						str = 'Style'
						break;
					case 2:
						str = 'Mark'
						break;
					case 3:
						str = 'Effect'
						break;
					case 4:
						str = 'Sound'
						break;
					case 5:
						str = 'Bull'
						break;
					case 6:
						str = 'Bull Sound'
						break;
					case 7:
						str = 'Award'
						break;
					case 71:
						str = 'Low Ton'
						break;
					case 72:
						str = 'High Ton'
						break;
					case 73:
						str = 'Hat Trick'
						break;
					case 74:
						str = 'Three In A Bed'
						break;
					case 75:
						str = 'Three In The Black'
						break;
					case 76:
						str = 'Ton 80'
						break;
					case 77:
						str = 'White Horse'
						break;
					default:
						str = '9Marks'
						break;
				}
				return str
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
				shopPropsDeleteHttp(selectList).then((res: any) => {
					message.warning(res.data.msg);
					data.search();
				});
				data.visible = false;
			},
			search: () => {
				shopPropsListHttp(data.infoVO).then((res: any) => {
					if(res.data.code === 100){
						res.data.data.list.forEach((i: any) => {
							i.status = Boolean(i.status)
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
					path: 'PropShopEdit'
				});
			},
			handleNameClick: (id: number) => {
				ROUTER.push({
					path: 'PropShopEdit',
					query: {
						id
					}
				});
			},
			checkboxChange:(row: any) =>{
				const flagData = {
					id:row.id,
					url:row.url,
					type:row.type,
					title:row.title,
					price:row.price,
					priceType:row.priceType,
					recommend:row.recommend,
					registerDate:row.registerDate,
					status:Number(Boolean(row.status)),
				}
				shopPropsUpdateHttp(flagData).then((res: any) =>{
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
