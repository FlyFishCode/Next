<template>
	<div>
    <labelTitle :value="$t('default.1')" />
    <div class="searchBox">
		<a-row class="rowStyle">
			<a-col :span="2" class="labelText" >
				{{ 'ID' }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="infoVO.id" allow-clear/>
			</a-col>
			<a-col :span="2" class="labelText">
				{{ 'Title' }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="infoVO.title" allow-clear/>
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.262') }}
			</a-col>
			<a-col :span="4">
				<a-select v-model:value="infoVO.countryId" class="selectBox" @change="countryChange" allowClear>
					<a-select-option v-for="item in countryList" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.263') }}
			</a-col>
			<a-col :span="4">
				<a-select v-model:value="infoVO.areaId" class="selectBox" allowClear>
					<a-select-option v-for="item in areaList" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
				</a-select>
			</a-col>
		</a-row>
		<a-row>
			<a-col :span="2" class="labelText">
				{{ $t('default.264') }}
			</a-col>
			<a-col :span="4">
				<a-select v-model:value="infoVO.isPublish" class="selectBox">
          <a-select-option v-for="item in publishList" :key="item.id" :value="item.id">{{ $t(item.label) }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.265') }}
			</a-col>
			<a-col :span="2" class="datePicker">
				<a-date-picker v-model:value="infoVO.minPublishDate" :disabled-date="disabledStartDate" valueFormat="yyyy-MM-DD 00:00:00" allow-clear />
			</a-col>
			<a-col :span="2" class="datePicker">
				<a-date-picker v-model:value="infoVO.maxPublishDate" :disabled-date="disabledEndDate" valueFormat="yyyy-MM-DD 00:00:00" allow-clear />
			</a-col>
			<a-col :span="2" class="labelText">
				{{ 'Announce' }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="infoVO.announce" allow-clear/>
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
				<div class="imgBox"><img :src="record.banner" alt=""></div>
			</template>
			<template #name="{ record }">
				<a-button type="link" @click="handleTitleClick(record.id)">{{ record.title }}</a-button>
			</template>
			<template #display="{ record }">
				<div>{{ record.isPublish ? $t('default.170') : $t('default.171') }}</div>
			</template>
			<template #announce="{ record }">
				<div class="AnnounceBox" :title="record.announce">{{ record.announce }}</div>
			</template>
		</a-table>
	</a-row>
	<div class="paginationStyle">
		<a-pagination show-quick-jumper v-model:current="infoVO.pageNum" :total="total" @change="pageChange" />
	</div>
	<DeleteDialog :visible="visible" @afterClose="afterClose" @handleOk="handleDeleteOk" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { countryListHttp, areaListHttp, BulletinListHttp, BulletinDeleteHttp } from '@/api/api'
import DeleteDialog from '@/components/common/DeleteDialog.vue';
import labelTitle from '@/components/labelTitle.vue';
import { message } from 'ant-design-vue';
// import { useStore } from 'vuex';
import { i18n, handleSelectEvent } from '@/components/common/tools'
import { useRouter } from 'vue-router';
// import { SettingFilled} from '@ant-design/icons-vue';
export default defineComponent({
	name: 'Bulletin',
	components: {
    DeleteDialog,
    labelTitle
  },
	setup() {
    const ROUTER = useRouter()
    let selectList: number[] = [];
		const data = reactive({
      visible:false,
      total:0,
      tableList:[],
      countryList:[],
			areaList:[],
      infoVO:{
				id:"",
				title:"",
				isPublish:' ',
        countryId: '',
				announce:"",
				areaId:'',
				minPublishDate:'',
				maxPublishDate:'',
				pageNum: 1,
				pageSize: 10
      },
      publishList:[
        { id: ' ', label: 'default.200' },
				{ id: 1, label: 'default.170' },
				{ id: 0, label: 'default.171' },
      ],
      columns: [
				{
					title: 'ID',
					dataIndex: 'id',
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
					title: i18n('default.265'),
					dataIndex: 'publishDate',
				},
				{
					title: i18n('default.262'),
					dataIndex: 'countryName',
				},
				{
					title: i18n('default.263'),
					dataIndex: 'areaName',
				},
				{
					title: i18n('default.264'),
					slots: { customRender: 'display' }
				},
				{
					title: 'Announce',
					width: 300,
					slots: { customRender: 'announce' }
				},
			],
      rowSelection: {
				columnWidth: 50,
				// columnTitle: '全选',
				onChange: (selectedRowKeys: number[]) => {
					selectList = selectedRowKeys;
				}
			},
			disabledStartDate: (startValue: any) => {
				if (!startValue || !data.infoVO.maxPublishDate) {
					return false;
				}
				return startValue.valueOf() > new Date(data.infoVO.maxPublishDate).valueOf();
			},
			disabledEndDate: (endValue: any) => {
				if (!endValue || !data.infoVO.minPublishDate) {
					return false;
				}
				return new Date(data.infoVO.minPublishDate).valueOf() >= endValue.valueOf();
			},
      handleDelete: () => {
				if (handleSelectEvent(selectList, '').length) {
					data.visible = true;
				}
			},
      handleCreate: () => {
				ROUTER.push({
					path: 'BulletinEdit'
				});
			},
			handleTitleClick: (id: number) => {
				ROUTER.push({
					path: 'BulletinEdit',
					query: { id }
				});
			},
      afterClose: (value: boolean) => {
				data.visible = value;
			},
      handleDeleteOk: () => {
				BulletinDeleteHttp(selectList).then((res: any) => {
					message.warning(res.data.msg);
					data.search();
				});
				data.visible = false;
			},
			countryChange: () => {
				data.infoVO.areaId = '';
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getAreaList();
			},
      pageChange: () => {
				data.search();
			},
      search:() =>{
        BulletinListHttp(data.infoVO).then((res: any) =>{
          res.data.data.list.forEach((i: any) => {
						i.status = Boolean(i.status)
						i.approval = Boolean(i.approval)
					});
					data.tableList = res.data.data.list;
					data.total = res.data.data.total;
        })
      }
    });
    const getCountryList = () => {
			countryListHttp({ pageSize: 999 }).then((res: any) => {
				data.countryList = res.data.data.list;
			});
		};
		const getAreaList = () => {
			areaListHttp({ countryId: data.infoVO.countryId }).then((res: any) => {
				data.areaList = res.data.data.list;
			});
		};
    const init = ()=>{
			data.search();
      getCountryList();
			getAreaList();
    }
    onMounted(() =>{
      init()
    })
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
.AnnounceBox{
	width: 300px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
