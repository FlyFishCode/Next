<template>
	<div>
    <labelTitle :value="$t('default.194')" />
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
			<a-col :span="4">
				<a-input v-model:value="infoVO.name" allowClear />
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.203') }}
			</a-col>
			<a-col :span="4">
				<a-select v-model:value="infoVO.status" class="selectBox">
          <a-select-option v-for="item in displayList" :key="item.id" :value="item.id">{{ $t(item.label) }}</a-select-option>
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
				<div class="imgBox"><img :src="record.image" alt=""></div>
			</template>
			<template #name="{ record }">
				<a-button type="link" @click="handleTitleClick(record.id)">{{ record.name }}</a-button>
			</template>
			<template #display="{ record }">
				<a-checkbox v-model:checked="record.status" @change="checkboxChange(record,1)"></a-checkbox>
			</template>
			<template #approval="{ record }">
				<a-checkbox v-model:checked="record.approval" @change="checkboxChange(record,0)"></a-checkbox>
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
import { countryListHttp, carouselListHttp, carouseDeleteHttp,carouselEditorHttp,carouselAdminEditorHttp } from '@/api/api'
import DeleteDialog from '@/components/common/DeleteDialog.vue';
import labelTitle from '@/components/labelTitle.vue';
import { message } from 'ant-design-vue';
import { useStore } from 'vuex';
import { i18n, handleSelectEvent } from '@/components/common/tools';
import { useRouter } from 'vue-router';
// import { SettingFilled} from '@ant-design/icons-vue';
export default defineComponent({
	name: 'Carousel',
	components: {
    DeleteDialog,
    labelTitle
  },
	setup() {
    const STORE = useStore();
    const ROUTER = useRouter()
    let selectList: number[] = [];
		const data = reactive({
      visible:false,
      total:0,
      tableList:[],
      countryList:[{id:'',name:''}],
      infoVO:{
        countryId: '',
				status:' ',
				name:'',
				type:1,
				pageNum: 1,
				pageSize: 10
      },
      displayList:[
        { id: ' ', label: 'default.200' },
				{ id: 1, label: 'default.204' },
				{ id: 0, label: 'default.205' },
      ],
			states:[
				{ id: ' ', label: 'default.200' },
				{ id: 1, label: 'default.170' },
				{ id: 0, label: 'default.171' },
			],
      columns: [
				{
					title: i18n('default.181'),
					dataIndex: 'orderNo',
				},
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
					slots: { customRender: 'display' }
				}
			],
      rowSelection: {
				columnWidth: 50,
				// columnTitle: '全选',
				onChange: (selectedRowKeys: number[]) => {
					selectList = selectedRowKeys;
				}
			},
			checkboxChange:(row: any,type: number) =>{
				if(type){
					const flagData = {
							cdateInt: row.cdateInt,
							countryId: row.countryId,
							id: row.id,
							link: row.link,
							name: row.name,
							image: row.image,
							orderNo: row.orderNo,
							status: Number(row.status),
					}
					carouselEditorHttp(flagData).then((res: any) =>{
						if(res.data.code === 100){
							message.info(res.data.msg)
						}
				})
				}else{
					const flagData = {
						id:row.id,
						approval: Number(row.approval)
					}
					carouselAdminEditorHttp(flagData).then((res: any) =>{
						if(res.data.code === 100){
							message.info(res.data.msg)
						}
				})
				}
			},
      handleDelete: () => {
				if (handleSelectEvent(selectList, '').length) {
					data.visible = true;
				}
			},
      handleCreate: () => {
				ROUTER.push({
					path: 'ShopCarouselEdit'
				});
			},
			handleTitleClick: (id: number) => {
				ROUTER.push({
					path: 'ShopCarouselEdit',
					query: { id }
				});
			},
      afterClose: (value: boolean) => {
				data.visible = value;
			},
      handleDeleteOk: () => {
				carouseDeleteHttp(selectList).then((res: any) => {
					message.warning(res.data.msg);
					data.search();
				});
				data.visible = false;
			},
      pageChange: () => {
				data.search();
			},
      search:() =>{
        carouselListHttp(data.infoVO).then((res: any) =>{
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
			countryListHttp({pageSize:999}).then((res: any) => {
				data.countryList = res.data.data.list;
			});
		};
    const init = ()=>{
      getCountryList();
      data.search()
			if(STORE.state.role === 1){
				data.columns.push({
					title: i18n('default.211'),
					slots: { customRender: 'approval' }
				})
			}
    };
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
</style>
