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
			{{ $t('default.230') }}
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
				<a-modal :visible="previewVisible" :footer="null" centered @cancel="handleCancel">
					<div v-if="previewType === 1">
						<img alt="example" style="width: 100%" :src="previewUrl" />
					</div>
					<div v-if="previewType === 2">
						<video controls style='width: 100%;'>
							<source :src="previewUrl" type="video/mp4">
							<source :src="previewUrl" type="video/webm">
						</video>
					</div>
					<div v-if="previewType === 3">
						<audio controls style='width: 100%;'>
							<source :src="previewUrl" type="audio/mp3">
							<source :src="previewUrl" type="audio/ogg">
							<source :src="previewUrl" type="audio/mpeg">
						</audio>
					</div>
				</a-modal>
			</div>
		</a-col>
		<a-col :span="6" class="Tooltip">
			<div>上传图片格式为：【jpg、jpeg、png】</div>
			<div>上传视频格式为：【mp4、webm】</div>
			<div>上传音频格式为：【mp3、ogg、mpeg】</div>
		</a-col>
	</a-row>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { PlayerAddtHttp,PlayerUpdateHttp, PlayerInfoHttp, newsImgUploadHttp } from '@/api/api';
import { PlusOutlined } from '@ant-design/icons-vue';
import labelTitle from '@/components/labelTitle.vue';
// import goodTable  from '@/components/common/goodTable.vue';
import { useRoute } from 'vue-router';
import { i18n } from '@/components/common/tools';

// interface DataProps {
// 	visible: boolean;
// 	showUrlDialog: boolean;
// 	previewVisible: boolean;
// 	infoVO: {[x: string]: any};
// 	fileList: any[];
// 	typeList: any[];
// 	categoryList: any[];
// 	getInfo: (x: any) => {};
// 	afterHttp: (x: any) => {};
// 	showUrlBox: (x: any) => boolean;
// 	create: () => {};
// 	update: () => {};
// 	handleCancel: () => {};
// 	handlePreview: () => {};
// 	handleImgRequest: () => {};
// 	previewUrl: string;
// }

export default defineComponent({
	name: 'PlayerInfo',
	components: {
		PlusOutlined,
		labelTitle,
	},
	setup() {
    const ROUTE = useRoute();
		// const RoleType: any = sessionStorage.getItem('NextRoleType');
		const data = reactive({
			visible: false,
			previewVisible:false,
			previewType: 1,
			fileList:[],
			previewUrl:"",
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
			handleImgRequest:({file}: any) =>{
				const formData = new FormData();
				formData.append("image", file);
				newsImgUploadHttp(formData).then((res: any) =>{
					// thumbUrl: 'http://adartstest.adarts-cn.com/leagueimage/4318780786a6.jpg'
					data.infoVO.thumbnail = res.data.data;
					data.fileList = [{ uid: file.lastModified + new Date().getTime(),type:file.type.split('/')[1], url: res.data.data }] as any;
				})
			},
			handlePreview:(file: any) =>{
				const imgList = ['jpg','png','jpeg'];
				const videoList = ['mp4'];
				const audioList = ['mp3','ogg','mpeg'];
				if(imgList.includes(file.type)){
					data.previewType = 1
				}
				if(videoList.includes(file.type)){
					data.previewType = 2
				}
				if(audioList.includes(file.type)){
					data.previewType = 3
				}
				data.previewUrl = file.url;
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
			}
		})
		onMounted(() => {
			if(ROUTE.query.id){
				data.getInfo(ROUTE.query.id);
			}
		});
		return {
			...toRefs(data),
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
