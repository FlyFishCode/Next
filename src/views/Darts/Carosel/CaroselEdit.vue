<template>
	<labelTitle :value="$t('default.209')" :btn="ROUTE.query.id ? update : create"/>
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
			<a-col :span="10">
				<a-input v-model:value="infoVO.name" allowClear />
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
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ $t('default.92') }}
			</a-col>
			<a-col :span="22">
				<a-input v-model:value="infoVO.link" allowClear />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ $t('default.93') }}
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
			<a-col :span="4">{{ '图片大小建议为：1200px X 250px' }}</a-col>
		</a-row>
		<!-- 广告链接的预览 -->
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { countryListHttp, carouseAddHttp, carouselEditorHttp, carouselInfoHttp, newsImgUploadHttp } from '@/api/api';
import labelTitle from '@/components/labelTitle.vue';
import { useRoute } from 'vue-router';
import { message } from 'ant-design-vue';
import { PlusOutlined } from '@ant-design/icons-vue';
// import E from 'wangeditor'
// import { i18n } from '@/components/common/tools';


export default defineComponent({
	name: 'CarouselEdit',
	components: {
		PlusOutlined,
		labelTitle,
	},
	setup() {
    const ROUTE = useRoute();
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
			previewVisible:false,
			previewImage:"",
			infoVO: {
				id:'',
				name:'',
				link:'',
				image:"",
				contents:'',
				countryId: '',
				target:1,
				status:1,
				type:1,
			},
			fileList:[],
      countryList: [{id:'',name:''}],
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
				if(!data.infoVO.name){
					message.warning('请输入新闻标题');
					return false;
				}
				return carouseAddHttp(data.infoVO)
			},
      update: () => {
				if(!data.infoVO.name){
					message.warning('请输入新闻标题');
					return false;
				}
				return carouselEditorHttp(data.infoVO)
			},
      getInfo:(id: any) =>{
        carouselInfoHttp({id}).then((res: any) =>{
					const response = res.data.data
					data.infoVO.id = response.id
					data.infoVO.name = response.name
					data.infoVO.link = response.link
					data.infoVO.status = response.status
					data.infoVO.countryId = response.countryId
					data.fileList = [{ uid: '1', url: response.image }] as any;
					// eslint-disable-next-line @typescript-eslint/no-use-before-define
					// getEditor(true)
				})
      },
			handleImgRequest:({file}: any) =>{
				const formData = new FormData();
				formData.append("image", file);
				newsImgUploadHttp(formData).then((res: any) =>{
					data.infoVO.image = res.data.data
					data.fileList = [{ uid: '1', url: res.data.data }] as any;
				})
			},
		});
		const getCountryList = () => {
			countryListHttp({pageSize:999}).then((res: any) => {
				data.countryList = res.data.data.list;
			});
		};
		const init = () => {
			getCountryList();
		};
		onMounted(() => {
			init();
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
</style>
