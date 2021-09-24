<template>
	<labelTitle :value="$t('default.197') + '/' + $t('default.198')" />
	<div class="searchBox">
		<a-row class="rowStyle">
      <a-col :span="2" class="labelText">
				{{ 'ID' }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="infoVO.activityId" allowClear />
			</a-col>
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
			<a-col :span="4">
				<a-input v-model:value="infoVO.title" allowClear />
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.238') }}
			</a-col>
			<a-col :span="4">
				<a-select class="selectBox" show-search v-model:value="infoVO.creatorId" :default-active-first-option="false" :show-arrow="false" :filter-option="false" :not-found-content="null" allowClear @search="creatorSearch">
					<a-select-option v-for="creator in creatorList" :key="creator.id">
						<div :title="creator.nickname">{{ creator.nickname }}</div>
					</a-select-option>
				</a-select>
			</a-col>
		</a-row>
		<a-row>
      <a-col :span="2" class="labelText">
				{{ $t('default.46') }}
			</a-col>
			<a-col :span="2" class="datePicker">
				<a-date-picker v-model:value="infoVO.startDate" :disabled-date="disabledMinRegisterTime" valueFormat="yyyy-MM-DD 00:00:00" allow-clear />
			</a-col>
			<a-col :span="2" class="datePicker">
				<a-date-picker v-model:value="infoVO.endDate" :disabled-date="disabledMaxRegisterTime" valueFormat="yyyy-MM-DD 23:59:59" allow-clear />
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.2') }}
			</a-col>
			<a-col :span="4">
				<a-select class="selectBox" show-search v-model:value="infoVO.shopId" :default-active-first-option="false" :show-arrow="false" :filter-option="false" :not-found-content="null" allowClear @search="shopSearch">
					<a-select-option v-for="shop in shopList" :value='shop.id' :key="shop.name">
						<div :title="shop.name">{{ shop.name }}</div>
					</a-select-option>
				</a-select>
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.203') }}
			</a-col>
			<a-col :span="4">
				<a-select v-model:value="infoVO.state" class="selectBox">
					<a-select-option value="">{{ 'All' }}</a-select-option>
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
		<a-table bordered :row-selection="rowSelection" :columns="columns" :data-source="tableList" :pagination="false" rowKey="activityId" class="tableStyle">
      <template #img="{ record }">
        <div class="imgBox"><img :src='record.thumbnail' alt=""></div>
			</template>
      <template #name="{ record }">
				<a-button type="link" @click="handleNameClick(record.activityId)">{{ record.title }}</a-button>
			</template>
			<template #shop="{ record }">
				<div v-for="shop in record.shopList" :key="shop.shopId">
					<div>{{ shop.shopName }}</div>
				</div>
			</template>
      <template #Date="{ record }">
				<div>{{ `${record.startDate} ${record.endDate}` }}</div>
			</template>
			<template #handle="{ record }">
				<a-checkbox v-model:checked="record.state" @change="checkboxChange(record)"></a-checkbox>
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
import { countryListHttp,shopListHttp,matchListHttp, matchDeleteHttp, matchUpdateHttp,systemUserListHttp } from '@/api/api';
import labelTitle from '@/components/labelTitle.vue';
import DeleteDialog from '@/components/common/DeleteDialog.vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { handleSelectEvent, i18n } from '@/components/common/tools';
// import { useStore } from 'vuex';
// import qs from 'qs'
export default defineComponent({
	name: 'Match',
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
      time: 0,
			visible: false,
			total: 0,
      shopList: [],
			tableList: [],
      creatorList:[],
      countryList: [],
			infoVO: {
				state:'',
				activityId: '',
        title:'',
        shopId:"",
        creatorId:"",
				countryId:'',
        startDate:'',
        endDate:"",
				pageNum: 1,
				pageSize: 10
			},
			columns: [
				{
					title: 'ID',
					dataIndex: 'activityId',
				},
        {
					title: i18n('default.93'),
					slots: { customRender: 'img' }
				},
				{
					title: i18n('default.23'),
					dataIndex: 'countryName',
				},
				{
					title: i18n('default.201'),
					slots: { customRender: 'name' }
				},
				{
					title: i18n('default.2'),
          slots: { customRender: 'shop' }
				},
				{
					title: i18n('default.238'),
          dataIndex: 'creatorName',
				},
        {
					title: i18n('default.46'),
          slots: { customRender: 'Date' }
				},
        {
					title: i18n('default.204'),
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
      disabledMinRegisterTime: (startValue: any) => {
				if (!startValue || !data.infoVO.endDate) {
					return false;
				}
				return startValue.valueOf() > new Date(data.infoVO.endDate).valueOf();
			},
			disabledMaxRegisterTime: (endValue: any) => {
				if (!endValue || !data.infoVO.startDate) {
					return false;
				}
				return new Date(data.infoVO.startDate).valueOf() >= endValue.valueOf();
			},
      shopSearch(value: any) {
        const fn = () =>{
          shopListHttp({ name: value.split("'").join(''), pageSize: 999 }).then((res) => {
            data.shopList = res.data.data.list;
          });
        }
        if(data.time){
          clearTimeout(data.time)
          data.time = setTimeout(fn,500)
        }else{
          data.time = setTimeout(fn,500)
        }
			},
			creatorSearch:(value: any) =>{
				const fn = () =>{
          systemUserListHttp({ name: value.split("'").join(''), pageSize: 999 }).then((res) => {
            data.creatorList = res.data.data.list;
          });
        }
        if(data.time){
          clearTimeout(data.time)
          data.time = setTimeout(fn,500)
        }else{
          data.time = setTimeout(fn,500)
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
				matchDeleteHttp(selectList).then((res: any) => {
					message.warning(res.data.msg);
					data.search();
				});
				data.visible = false;
			},
			search: () => {
				matchListHttp(data.infoVO).then((res: any) => {
					if(res.data.code === 100){
						res.data.data.list.forEach((i: any) => {
							i.state = Boolean(i.state)
						});
						data.tableList = res.data.data.list;
						data.total = res.data.data.total;
						console.log(data.tableList)
					}
				});
			},
			pageChange: () => {
				data.search();
			},
			handleCreate: () => {
				ROUTER.push({
					path: 'MatchEdit'
				});
			},
			handleNameClick: (id: number) => {
				ROUTER.push({
					path: 'MatchEdit',
					query: {
						id
					}
				});
			},
			checkboxChange:(row: any) =>{
				const flagData = {
					id:row.activityId,
					startDate:row.startDate,
					endDate:row.endDate,
					title:row.title,
					thumbnail:row.thumbnail,
					shopIdList:row.shopList.map((i: any) => i.shopId),
					state:Number(row.state),
				}
				matchUpdateHttp(flagData).then((res: any) =>{
					message.info(res.data.msg)
				})
			}
		});
    const getCountryList = () => {
			countryListHttp({ pageSize : 999 }).then((res: any) => {
				data.countryList = res.data.data.list;
			});
		};
		const init = () => {
      getCountryList();
			data.search();
			data.creatorSearch('');
			shopListHttp({ name: '', pageSize: 999 }).then((res) => {
        data.shopList = res.data.data.list;
      });
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
	width: 60px;
}
.imgBox img{
	width: 100%;
	height: 100%;
}
</style>
