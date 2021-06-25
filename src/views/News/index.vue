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
				{{ $t('default.196') }}
			</a-col>
			<a-col :span="4">
				<a-select v-model:value="infoVO.category" class="selectBox">
					<a-select-option v-for="item in categoryList" :key="item.id" :value="item.id">{{ $t(item.label) }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.201') }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="infoVO.title" allowClear />
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.202') }}
			</a-col>
			<a-col :span="4" class="selectSearch">
				<a-select show-search v-model:value="infoVO.opeatorIdName" :default-active-first-option="false" :show-arrow="false" :filter-option="false" :not-found-content="null" allowClear @search="userSearch">
					<a-select-option v-for="user in userList" :key="user.id">
						<div :title="user.username">{{ user.username }}</div>
					</a-select-option>
				</a-select>
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ $t('default.46') }}
			</a-col>
			<a-col :span="2" class="datePicker">
				<a-date-picker v-model:value="infoVO.registerStartDate" :disabled-date="disabledMinRegisterTime" valueFormat="yyyy-MM-DD 00:00:00" allow-clear />
			</a-col>
			<a-col :span="2" class="datePicker">
				<a-date-picker v-model:value="infoVO.registerEndDate" :disabled-date="disabledMaxRegisterTime" valueFormat="yyyy-MM-DD 23:59:59" allow-clear />
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
			<template #type="{ record }">
				<div>{{ getTypeName(record.category) }}</div>
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
import { newsListHttp, countryListHttp, systemUserListHttp, deleteShopHttp } from '@/api/api';
import labelTitle from '@/components/labelTitle.vue';
import DeleteDialog from '@/components/common/DeleteDialog.vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { handleSelectEvent, i18n } from '@/components/common/tools';
export default defineComponent({
	name: 'News',
	components: {
		labelTitle,
		DeleteDialog
	},
	setup() {
		const ROUTER = useRouter();
		let selectList: number[] = [];
		const data = reactive({
			visible: false,
			infoVO: {
				countryId: '',
				title: '',
				category: 0,
				opeatorIdName:'',
				registerEndDate:"",
				registerStartDate:"",
				pageIndex: 1,
				pageSize: 10
			},
			img: require('@/assets/logo.png'),
			total: 1,
			userList: [],
			countryList: [],
			agentList: [],
			ownerList: [],
			shopList: [],
			tableList: [],
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
					title: i18n('default.46'),
					dataIndex: 'cdateInt',
				},
				{
					title: i18n('default.196'),
					slots: { customRender: 'type' }
				},
				{
					title: i18n('default.202'),
					dataIndex: 'opeatorName',
				}
			],
			categoryList:[
				{ id: 0, label: 'default.200' },
				{ id: 3, label: 'default.198' },
				{ id: 4, label: 'default.197' },
				{ id: 6, label: 'default.199' },
			],
			disabledMinRegisterTime: (startValue: any) => {
				if (!startValue || !data.infoVO.registerEndDate) {
					return false;
				}
				return startValue.valueOf() > new Date(data.infoVO.registerEndDate).valueOf();
			},
			disabledMaxRegisterTime: (endValue: any) => {
				if (!endValue || !data.infoVO.registerStartDate) {
					return false;
				}
				return new Date(data.infoVO.registerStartDate).valueOf() >= endValue.valueOf();
			},
			rowSelection: {
				columnWidth: 50,
				// columnTitle: '全选',
				onChange: (selectedRowKeys: number[]) => {
					selectList = selectedRowKeys;
				}
			},
			getTypeName:(id: number) =>{
				let str = '';
				switch(id){
					case 3:
						str = 'default.198'
						break;
					case 4:
						str = 'default.197'
						break;
					default :
						str = 'default.199';
						break;
				}
				return i18n(str)
			},
			userSearch: (value: string) => {
				systemUserListHttp({ username: value, pageSize: 999 }).then((res: any) => {
					if (data.userList) {
						data.userList = res.data.data.list;
					}
				});
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
				deleteShopHttp(selectList).then((res: any) => {
					message.warning(res.data.msg);
					data.search();
				});
				data.visible = false;
			},
			search: () => {
				newsListHttp(data.infoVO).then((res: any) => {
					data.tableList = res.data.data.list;
					data.total = res.data.data.total;
				});
			},
			pageChange: () => {
				data.search();
			},
			handleCreate: () => {
				ROUTER.push({
					path: 'NewsEdit'
				});
			},
			handleTitleClick: (id: number) => {
				ROUTER.push({
					path: 'NewsEdit',
					query: {
						id
					}
				});
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
		};
		onMounted(() => {
			init();
		});
		return {
			...toRefs(data),
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
