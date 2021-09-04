<template>
	<labelTitle :value="$t('default.225')" :btn="ROUTE.query.id || infoVO.id  ? update : create"  @afterHttp='afterHttp'/>
  <div class="searchBox">
		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ $t('default.149') }}
			</a-col>
			<a-col :span="4">
				<a-select v-model:value="defaultType" class="selectBox" @change="onChange">
					<a-select-option v-for="item in typeList" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
				</a-select>
			</a-col>
			<a-col v-if="defaultType === 7" :span="4">
				<a-select v-model:value="defaultAward" class="selectBox">
					<a-select-option v-for="item in otherList" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
				</a-select>
			</a-col>
		</a-row>
		<a-row class="rowStyle">
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
					<a-select-option :value="1">{{ $t('default.170') }}</a-select-option>
					<a-select-option :value="0">{{ $t('default.171') }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.203') }}
			</a-col>
			<a-col :span="4">
				<a-select v-model:value="infoVO.status" class="selectBox">
					<a-select-option :value="1">{{ $t('default.204') }}</a-select-option>
					<a-select-option :value="0">{{ $t('default.205') }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.227') }}
			</a-col>
			<a-col :span="2">
				<a-select v-model:value="infoVO.priceType" class="selectBox">
					<a-select-option :value="1">{{ $t('default.228') }}</a-select-option>
					<a-select-option :value="2">{{ $t('default.229') }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :span="2">
				<a-input v-model:value="infoVO.price" allowClear />
			</a-col>
		</a-row>
		<a-row  class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ $t('default.230') }}
			</a-col>
			<a-col :span="6" class="searchButton">
				<div class="clearfix">
					<a-upload
					:customRequest='handleImgRequest'
					:beforeUpload='beforeUpload'
					list-type="picture-card"
					v-model:file-list="fileList"
					@preview="handlePreview"
					:remove='handleRemove'
				>
					<div v-if="fileList.length < fileListLength">
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
		</a-row>

		<a-row>
			<a-col :span='8' :offset='2'>
				<div v-if="defaultType === 1" class="TipsTitle">{{ $t('default.231') }}</div>
				<div v-if="defaultType === 2" class="TipsTitle">{{ $t('default.232') }}</div>
				<div v-if="defaultType === 3" class="TipsTitle">{{ $t('default.233') }}</div>
				<div v-if="defaultType === 4" class="TipsTitle">{{ $t('default.234') }}</div>
				<div v-if="defaultType === 5" class="TipsTitle">{{ $t('default.235') }}</div>
				<div v-if="defaultType === 6" class="TipsTitle">{{ $t('default.236') }}</div>
				<div v-if="defaultType === 7" class="TipsTitle">{{ $t('default.237') }}</div>
			</a-col>
		</a-row>
		<a-row>
			<a-col :span="6" :offset='2' class="Tooltip">
				<div>1：上传图片格式为：【jpg、jpeg、png】</div>
				<div>2：上传视频格式为：【mp4、webm】</div>
				<div>3：上传音频格式为：【mp3、ogg、mpeg】</div>
			</a-col>
		</a-row>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { shopPropsAddHttp,shopPropsUpdateHttp, shopPropsInfoHttp, newsImgUploadHttp } from '@/api/api';
import { PlusOutlined } from '@ant-design/icons-vue';
import labelTitle from '@/components/labelTitle.vue';
// import goodTable  from '@/components/common/goodTable.vue';
import { useRoute } from 'vue-router';
import { message } from 'ant-design-vue';
// import { i18n } from '@/components/common/tools';

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
	name: 'ShopEdit',
	components: {
		PlusOutlined,
		labelTitle,
	},
	setup() {
    const ROUTE = useRoute();
		// const RoleType: any = sessionStorage.getItem('NextRoleType');
		const imgList = ['jpg','png','jpeg'];
		const videoList = ['mp4'];
		const audioList = ['mp3','ogg','mpeg'];
		const data = reactive({
			visible: false,
			previewVisible:false,
			previewType: 1,
			fileList:[],
			fileListLength:1,
			previewUrl:"",
			defaultType:1,
			defaultAward:'',
			infoVO: {
				id:'',
				type: 0,
				title:'',
				price:'',
				status:1,
				recommend:0,
				priceType: 1,
				url:'',
			},
      typeList: [
				{ id: 1 , name: 'Style' },
				{ id: 2 , name: 'Mark' },
				{ id: 3 , name: 'Effect' },
				{ id: 4 , name: 'Sound' },
				{ id: 5 , name: 'Bull' },
				{ id: 6 , name: 'Bull Sound' },
				{ id: 7 , name: 'Award' },
			],
			otherList:[
				{ id: 71 , name: 'Low Ton' },
				{ id: 72 , name: 'High Ton' },
				{ id: 73 , name: 'Hat Trick' },
				{ id: 78 , name: '9Marks' },
				{ id: 76 , name: 'Ton 80' },
				{ id: 77 , name: 'White Horse' },
				{ id: 74 , name: 'Three In A Bed' },
				{ id: 75 , name: 'Three In The Black' },
			],
			onChange:(value: number) =>{
				switch (value) {
					case 2:
						data.fileListLength = 3
						break;
					case 5:
					case 6:
						data.fileListLength = 2
						break;
					default:
						data.fileListLength = 1;
						break;
				}
				data.fileList = [];
			},
			// Mark upLoad
			beforeUpload:(file: any) =>{
				const type = file.type.split('/')[1];
				let flag = false;
				switch(data.defaultType){
					case 1:
					case 5:
						if(!(imgList.includes(type) || videoList.includes(type))){
							flag = true;
						}
						break;
					case 2:
						if(!imgList.includes(type)){
							flag = true;
						}
						break;
					case 3:
						if(!videoList.includes(type)){
							flag = true;
						}
						break;
					case 4:
					case 6:
						if(!audioList.includes(type)){
							flag = true;
						}
						break;
					default :
					if(!videoList.includes(type)){
							flag = true;
						}
					break;
				}
				if(flag){
					message.error(`[${file.name}] Wrong file format`)
					return Promise.reject('')
				}
			},
			handleImgRequest:({file}: any) =>{
				const formData = new FormData();
				formData.append("image", file);
				newsImgUploadHttp(formData).then((res: any) =>{
					// 设置默认预览图
					// thumbUrl: 'http://adartstest.adarts-cn.com/leagueimage/4318780786a6.jpg'
					const obj = { uid: file.lastModified + new Date().getTime(),type:file.type.split('/')[1], url: res.data.data } as never;
					data.fileList.push(obj);
					data.fileList = data.fileList.filter((i: any) => i.url);
					data.infoVO.url = data.fileList.map((i: any) => i.url).join(',');
				})
			},
			handlePreview:(file: any) =>{
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
			handleRemove:(file: any) =>{
				data.infoVO.url = data.fileList.filter((i: any) => i.url !== file.url).map((i: any) => i.url).join(',');
			},
			handleCancel:() =>{
				data.previewVisible = false
			},
			create: () => {
				if(data.defaultAward){
					data.infoVO.type = data.defaultAward as any;
				}else{
					data.infoVO.type = data.defaultType;
				}
				if(!data.infoVO.title){
					message.warning('请输入道具名称');
					return false;
				}
				return shopPropsAddHttp(data.infoVO)
			},
      update: () => {
				if(data.defaultAward){
					data.infoVO.type = data.defaultAward as any;
				}else{
					data.infoVO.type = data.defaultType;
				}
				if(!data.infoVO.title){
					message.warning('请输入道具名称');
					return false;
				}
				return shopPropsUpdateHttp(data.infoVO)
			},
			afterHttp:(id: string) =>{
				data.infoVO.id = id
			},
      getInfo:(itemId: any) =>{
        shopPropsInfoHttp({itemId}).then((res: any) =>{
					const response = res.data.data;
					data.infoVO = response;
					if(response.url.split(',')){
						response.url.split(',').forEach((i: any,index: number) => {
							const obj = { uid: index + new Date().getTime(),type:response.url.substr(-10).split('.')[1], url: i } as never;
							data.fileList.push(obj)
						});
					}else{
						data.fileList = [{ uid: new Date().getTime(),type:response.url.substr(-10).split('.')[1], url: response.url }] as any;
					}
					if(response.type < 7){
						data.defaultType = response.type;
					}else{
						switch (response.type) {
						case 71:
							data.defaultType = 7;
							data.defaultAward = 71 as any;
							break;
						case 72:
							data.defaultType = 7;
							data.defaultAward = 72 as any;
							break;
						case 73:
							data.defaultType = 7;
							data.defaultAward = 73 as any;
							break;
						case 74:
							data.defaultType = 7;
							data.defaultAward = 74 as any;
							break;
						case 75:
							data.defaultType = 7;
							data.defaultAward = 75 as any;
							break;
						case 76:
							data.defaultType = 7;
							data.defaultAward = 76 as any;
							break;
						case 77:
							data.defaultType = 7;
							data.defaultAward = 77 as any;
							break;
						default:
							data.defaultType = 7;
							data.defaultAward = 78 as any;
							break;
					}
					}
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
.TipsTitle{
	font-size: 20px;
	font-weight: bold;
}
</style>
