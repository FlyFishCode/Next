<template>
	<labelTitle :value="$t('default.225')" :btn="ROUTE.query.id || infoVO.id  ? update : create"  @afterHttp='afterHttp'/>
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
			<a-col :span="2">
				<a-select v-model:value="infoVO.cost" class="selectBox">
					<a-select-option :value="1">{{ $t('default.86') }}</a-select-option>
					<a-select-option :value="2">{{ $t('default.228') }}</a-select-option>
					<a-select-option :value="3">{{ $t('default.229') }}</a-select-option>
				</a-select>
			</a-col>
			<a-col v-if="infoVO.cost !== 1" :span="2">
				<a-input v-model:value="infoVO.coins" allowClear />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
		<a-col :span="2" class="labelText">
			{{ $t('default.177') }}
		</a-col>
		<a-col :span="2" class="searchButton">
			<div class="clearfix">
				<a-upload
					:customRequest='handleImgRequest'
					list-type="picture-card"
					v-model:file-list="fileList"
					@preview="handlePreview"
				>
					<div v-if="fileList.length < 1">
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
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { PlayerAddtHttp,PlayerUpdateHttp, PlayerInfoHttp, newsImgUploadHttp } from '@/api/api';
import { PlusOutlined  } from '@ant-design/icons-vue';
import showUrlDialog from '@/components/common/showUrlDialog.vue';
import labelTitle from '@/components/labelTitle.vue';
// import goodTable  from '@/components/common/goodTable.vue';
import { useRoute } from 'vue-router';
import { message } from 'ant-design-vue';
import { i18n } from '@/components/common/tools';


export default defineComponent({
	name: 'PlayerInfo',
	components: {
		showUrlDialog,
		PlusOutlined,
		labelTitle,
	},
	setup() {
    const ROUTE = useRoute();
		const RoleType: any = sessionStorage.getItem('NextRoleType');
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
			fileList:[],
			previewImage:"",
			shopImgList:[],
			index:0,
			infoVO: {
				id:'',
				cost: 1,
				type: 1,
				coins:'',
				display:1,
				category: 1,
				thumbnail:'',
			},
      typeList: [
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
			showBoxCancel: (value: boolean) => {
				data.showUrlDialog = value;
			},
			handleImgRequest:({file}: any) =>{
				const formData = new FormData();
				formData.append("image", file);
				newsImgUploadHttp(formData).then((res: any) =>{
					data.infoVO.thumbnail = res.data.data
					data.fileList = [{ uid: '1', url: res.data.data }] as any;
				})
			},
			handlePreview:(file: any) =>{
				if (!file.url && !file.preview) {
        file.preview = getBase64(file.originFileObj);
      }
      data.previewImage = file.url || file.preview;
      data.previewVisible = true;
			},
			handleCancel:() =>{
				data.previewVisible = false
			},
			create: () => {
				// if(!data.infoVO.name){
				// 	message.warning('请输入选手姓名');
				// 	return false;
				// }
				return PlayerAddtHttp(data.infoVO)
			},
      update: () => {
				// if(!data.infoVO.name){
				// 	message.warning('请输入选手姓名');
				// 	return false;
				// }
				return PlayerUpdateHttp(data.infoVO)
			},
			afterHttp:(id: string) =>{
				data.infoVO.id = id
			},
      getInfo:(playerId: any) =>{
        PlayerInfoHttp({playerId}).then((res: any) =>{
					const response = res.data.data;
					console.log(response)
				})
      },
			afterClose: (value: boolean) => {
				data.visible = value;
			},
			handleVidoePreview:() =>{
				data.showUrlDialog = true
			}
		})
		onMounted(() => {
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
.label-g {
	height: 30px;
	line-height: 30px;
	border-bottom: 2px solid #1890ff;
}
</style>
