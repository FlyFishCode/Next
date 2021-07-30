<template>
	<labelTitle :value="$t('default.213')" :btn="ROUTE.query.id ? update : create"/>
	<div>
		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ $t('default.221') }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="infoVO.name" allowClear />
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.23') }}
			</a-col>
			<a-col :span="4">
				<a-select v-model:value="infoVO.countryId" class="selectBox" allowClear>
					<a-select-option v-for="item in countryList" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
				</a-select>
			</a-col>
			<a-col v-if="RoleType =='1'" :span="2" class="labelText">
				{{ $t('default.26') }}
			</a-col>
			<a-col v-if="RoleType =='1'" :span="4">
				<a-select
					class="selectBox"
						show-search
						v-model:value="infoVO.agentId"
						:default-active-first-option="false"
						:show-arrow="false"
						:filter-option="false"
						:not-found-content="null"
						allowClear
						@search="agentSearch"
				>
					<a-select-option v-for="d in agentList" :key="d.id">
						<div :title="d.name">{{ d.name }}</div>
					</a-select-option>
				</a-select>
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ 'Facebook Link' }}
			</a-col>
			<a-col :span="16">
				<a-input v-model:value="infoVO.facebookLink" allowClear />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ 'Twitter Link' }}
			</a-col>
			<a-col :span="16">
				<a-input v-model:value="infoVO.twitterLink" allowClear />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ 'Other Link' }}
			</a-col>
			<a-col :span="16">
				<a-input v-model:value="infoVO.otherLink" allowClear />
			</a-col>
		</a-row>
    <div class="contentBox">
      <a-row >
        <a-col :span="2" class="labelText">
          {{ $t('default.216') }}
        </a-col>
        <a-col :span="22" class="searchButton">
					<div class="clearfix">
						<a-upload
							:customRequest='handlePlayerImgRequest'
							list-type="picture-card"
							v-model:file-list="palyerImgList"
							@preview="handlePreview"
						>
							<div v-if="palyerImgList.length < 7">
								<plus-outlined />
								<div class="ant-upload-text">Upload</div>
							</div>
						</a-upload>
						<a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
							<img alt="example" style="width: 100%" :src="previewImage" />
						</a-modal>
					</div>
				</a-col>
      </a-row>
    </div>
    <div class="contentBox">
      <a-row class="rowBox">
        <a-col :span="2" class="labelText">
          {{ $t('default.214') }}
        </a-col>
      </a-row>
		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ $t('default.215') }}
			</a-col>
			<a-col :span="2" class="searchButton">
				<div class="clearfix">
					<a-upload
						:customRequest='handleImgRequest'
						list-type="picture-card"
						v-model:file-list="dartsList"
						@preview="handlePreview"
					>
						<div v-if="dartsList.length < 1">
							<plus-outlined />
							<div class="ant-upload-text">Upload</div>
						</div>
					</a-upload>
					<a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
						<img alt="example" style="width: 100%" :src="previewImage" />
					</a-modal>
				</div>
			</a-col>
			<a-col :span="4">{{ '图片大小建议为：1200px X 250px' }}</a-col>
		</a-row>
    <a-row>
      <a-col :span="2" class="labelText">
				{{ 'TIP' }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="infoVO.dartTip	" allowClear />
			</a-col>
      <a-col :span="2" class="labelText">
				{{ 'BARREL' }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="infoVO.dartBarrel" allowClear />
			</a-col>
      <a-col :span="2" class="labelText">
				{{ 'SHAFT' }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="infoVO.dartShaft" allowClear />
			</a-col>
      <a-col :span="2" class="labelText">
				{{ 'FLIGHT' }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="infoVO.dartFlight" allowClear />
			</a-col>
    </a-row>
    </div>
		<div class="contentBox">
			<a-row class="rowBox">
        <a-col :span="2" class="labelText">
          {{ $t('default.217') }}
        </a-col>
      </a-row>
			<a-row class="rowStyle">
				<a-col span='1'>
					<a-button @click="handleDelete" type="danger" size='small'>{{ $t('default.10') }}</a-button>
				</a-col>
				<a-col span='1'>
					<a-button @click="handleAdd" size='small'>{{ $t('default.185') }}</a-button>
				</a-col>
			</a-row>
			<a-table bordered :row-selection='rowSelection' :data-source="dataSource" :columns="columns" rowKey='id'>
				<template #label="{ record }">
					<a-input v-model:value="record.label" allowClear/>
				</template>
				<template #content="{ record }">
					<a-input v-model:value="record.content" allowClear/>
				</template>
			</a-table>
		</div>
		<div class="contentBox">
			<!-- <a-row class="rowBox">
        <a-col :span="2" class="labelText">
          {{ $t('default.218') }}
        </a-col>
      </a-row> -->
			<a-row>
				<a-col :span="2" class="labelText">
					{{ $t('default.219') }}
				</a-col>
				<a-col :span="18">
					<a-input v-model:value="infoVO.videoUrl" allowClear/>
				</a-col>
				<a-col span='1' class="searchButton">
					<a-button @click="handleVidoePreview" type="danger" size='small'>{{ $t('default.206') }}</a-button>
				</a-col>
			</a-row>
		</div>
		<div class="contentBox">
			<a-row>
        <a-col :span="2" class="labelText">
          {{ $t('default.220') }}
        </a-col>
				<a-col :span="22" class="searchButton">
					<div class="clearfix">
						<a-upload
							:customRequest='handleShopImgRequest'
							list-type="picture-card"
							v-model:file-list="shopImgList"
							@preview="handlePreview"
						>
							<div v-if="shopImgList.length < 5">
								<plus-outlined />
								<div class="ant-upload-text">Upload</div>
							</div>
						</a-upload>
						<a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
							<img alt="example" style="width: 100%" :src="previewImage" />
						</a-modal>
					</div>
				</a-col>
			</a-row>
		</div>
		<!-- 广告链接的预览 -->
	<showUrlDialog :visible="showUrlDialog" :src="infoVO.videoUrl" @showBoxCancel="showBoxCancel" />
	<DeleteDialog :visible="visible" @afterClose="afterClose" @handleOk="handleDeleteOk" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { countryListHttp,agentListHttp, PlayerAddtHttp,PlayerUpdateHttp, PlayerInfoHttp, newsImgUploadHttp } from '@/api/api';
import labelTitle from '@/components/labelTitle.vue';
import showUrlDialog from '@/components/common/showUrlDialog.vue';
import DeleteDialog from '@/components/common/DeleteDialog.vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import { useRoute } from 'vue-router';
import { message } from 'ant-design-vue';
import { handleSelectEvent } from '@/components/common/tools';


export default defineComponent({
	name: 'PlayerInfo',
	components: {
		showUrlDialog,
		PlusOutlined,
		DeleteDialog,
		labelTitle,
	},
	setup() {
    const ROUTE = useRoute();
		const RoleType: any = sessionStorage.getItem('NextRoleType');
		let selectList: number[] = [];
		const getBase64 = (file: File) => {
			return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      })
		}
		const data = reactive({
			visible: false,
			showUrlDialog: false,
			previewVisible:false,
			previewImage:"",
			dartsList:[],
			agentList:[],
      palyerImgList:[],
			shopImgList:[],
			index:0,
			infoVO: {
				id:'',
				name:'',
				goods:"",
				picture:'',
				dartImg:'',
				agentId: '',
				countryId: '',
				display:1,
				facebookLink:"",
				twitterLink:"",
				otherLink:"",
				achievement:"",
				dartTip:'',
				dartShaft:'',
				dartBarrel:'',
				dartFlight:'',
				videoUrl:'',
			},
			columns:[
				{
					width:'30%',
          title: 'label',
          dataIndex: 'label',
          slots: { customRender: 'label' },
        },
        {
					width:'70%',
          title: 'content',
          dataIndex: 'content',
          slots: { customRender: 'content' },
        }
			],
      countryList: [{id:'',name:''}],
			dataSource:[],
			rowSelection: {
				columnWidth: 50,
				// columnTitle: '全选',
				onChange: (selectedRowKeys: number[], selectedRows: any) => {
					selectList = selectedRows.map((i: any) => i.id);
				}
			},
			showBoxCancel: (value: boolean) => {
				data.showUrlDialog = value;
			},
			handlePreview:(file: any) =>{
				if (!file.url && !file.preview) {
        file.preview = getBase64(file.originFileObj);
      }
      data.previewImage = file.url || file.preview;
      data.previewVisible = true;
			},
			agentSearch: (value: any) => {
				agentListHttp({ agentName: value.split("'").join(''), pageSize: 999 }).then((res: any) => {
					data.agentList = res.data.data;
				});
			},
			handleCancel:() =>{
				data.previewVisible = false
			},
			create: () => {
				if(!data.infoVO.name){
					message.warning('请输入选手姓名');
					return false;
				}
				data.infoVO.picture = JSON.stringify(data.palyerImgList);
				data.infoVO.dartImg = JSON.stringify(data.dartsList);
				data.infoVO.goods = JSON.stringify(data.shopImgList);
				data.infoVO.achievement = JSON.stringify(data.dataSource);
				return PlayerAddtHttp(data.infoVO)
			},
      update: () => {
				if(!data.infoVO.name){
					message.warning('请输入选手姓名');
					return false;
				}
				data.infoVO.picture = JSON.stringify(data.palyerImgList);
				data.infoVO.dartImg = JSON.stringify(data.dartsList);
				data.infoVO.goods = JSON.stringify(data.shopImgList);
				data.infoVO.achievement = JSON.stringify(data.dataSource);
				return PlayerUpdateHttp(data.infoVO)
			},
      getInfo:(playerId: any) =>{
        PlayerInfoHttp({playerId}).then((res: any) =>{
					const response = res.data.data;
					data.infoVO = response;
					data.palyerImgList = JSON.parse(response.picture);
					data.dartsList = JSON.parse(response.dartImg);
					data.shopImgList = JSON.parse(response.goods);
					data.dataSource = JSON.parse(response.achievement);
				})
      },
			handleImgRequest:({file}: any) =>{
				const formData = new FormData();
				formData.append("image", file);
				newsImgUploadHttp(formData).then((res: any) =>{
					data.dartsList = [{ uid: '1', url: res.data.data }] as any;
				})
			},
      handlePlayerImgRequest:({file}: any) =>{
        const formData = new FormData();
				formData.append("image", file);
				newsImgUploadHttp(formData).then((res: any) =>{
					const obj = {uid:file.lastModified + new Date().getTime(), url:res.data.data} as never;
					data.palyerImgList.push(obj);
					data.palyerImgList = data.palyerImgList.filter((i: any) => i.url)
				})
      },
      handleShopImgRequest:({file}: any) =>{
        const formData = new FormData();
				formData.append("image", file);
				newsImgUploadHttp(formData).then((res: any) =>{
					const obj = {uid:file.lastModified + new Date().getTime(),url:res.data.data} as never;
					data.shopImgList.push(obj);
					data.shopImgList = data.shopImgList.filter((i: any) => i.url)
				})
      },
			afterClose: (value: boolean) => {
				data.visible = value;
			},
			handleDeleteOk: () => {
				selectList.forEach((i: number) =>{
					data.dataSource.splice(data.dataSource.findIndex((j: any) => i === j.id),1)
				})
				data.visible = false;
			},
			handleDelete:() =>{
				if (handleSelectEvent(selectList, '').length) {
					data.visible = true;
				}
			},
			handleAdd:() =>{
				const obj = {id:Math.max(...data.dataSource.map((i: any) => i.id)) > 0 ? Math.max(...data.dataSource.map((i: any) => i.id)) + 1 : data.index+1 ,label:"",content:""} as never;
				data.dataSource.push(obj)
				console.log(data.dataSource)
			},
			handleVidoePreview:() =>{
				data.showUrlDialog = true
			}
		})
		const getCountryList = () => {
			countryListHttp({pageSize:999}).then((res: any) => {
				data.countryList = res.data.data.list;
			});
		};
		const init = () => {
			getCountryList();
			data.agentSearch('');
		};
		onMounted(() => {
			init();
			if(ROUTE.query.id){
				data.getInfo(ROUTE.query.id);
			}
		});
		return {
			...toRefs(data),
			RoleType,
      ROUTE
		};
	}
});
</script>

<style scoped>
#editorElem{
	width: 100%;
}
#editorElem>>>.w-e-text-container{
	height: 400px!important;
}
.rowBox{
  background: #eee;
}
.contentBox{
  border: 1px solid #999;
  margin: 10px 0;
  padding: 10px;
}
</style>
