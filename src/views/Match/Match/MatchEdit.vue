<template>
	<labelTitle :value="$t('default.195')" :btn="ROUTE.query.id || infoVO.id  ? update : create" @afterHttp='afterHttp'/>
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
				{{ $t('default.2') }}
			</a-col>
			<a-col :span="4">
				<a-select class="selectBox" show-search v-model:value="infoVO.shopId" :default-active-first-option="false" :show-arrow="false" :filter-option="false" :not-found-content="null" allowClear @search="shopSearch">
					<a-select-option v-for="shop in shopList" :key="shop.name">
						<div :title="shop.name">{{ shop.name }}</div>
					</a-select-option>
				</a-select>
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.46') }}
			</a-col>
			<a-col :span="2" class="datePicker">
				<a-date-picker v-model:value="infoVO.minRegisterTime" :disabled-date="disabledMinRegisterTime" valueFormat="yyyy-MM-DD 00:00:00" allow-clear />
			</a-col>
			<a-col :span="2" class="datePicker">
				<a-date-picker v-model:value="infoVO.maxRegisterTime" :disabled-date="disabledMaxRegisterTime" valueFormat="yyyy-MM-DD 00:00:00" allow-clear />
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.196') }}
			</a-col>
			<a-col :span="4">
				<a-select v-model:value="infoVO.type" class="selectBox">
					<a-select-option v-for="item in typeList" :key="item.id" :value="item.id">{{ $t(item.label) }}</a-select-option>
				</a-select>
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ $t('default.24') }}
			</a-col>
			<a-col :span="4">
				<a-select v-model:value="infoVO.img" class="selectBox">
					<a-select-option v-for="item in imgList" :key="item.id" :value="item.id">{{ $t(item.label) }}</a-select-option>
				</a-select>
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

		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ $t('default.201') }}
			</a-col>
			<a-col :span="22">
				<a-input v-model:value="infoVO.title" allowClear />
			</a-col>
		</a-row>

		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ $t('default.242') }}
			</a-col>
			<a-col :span="22">
				<a-textarea :rows="3" v-model:value="infoVO.title"  allowClear />
			</a-col>
		</a-row>

		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ $t('default.243') }}
			</a-col>
			<a-col :span="22">
				<a-textarea :rows="3" v-model:value="infoVO.title" allowClear />
			</a-col>
		</a-row>

		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ $t('default.244') }}
			</a-col>
			<a-col :span="22">
				<a-textarea :rows="3" v-model:value="infoVO.title" allowClear />
			</a-col>
		</a-row>

		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ $t('default.245') }}
			</a-col>
			<a-col :span="22">
				<a-textarea :rows="3" v-model:value="infoVO.title" allowClear />
			</a-col>
		</a-row>

		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ $t('default.246') }}
			</a-col>
			<a-col :span="22">
				<a-textarea :rows="3" v-model:value="infoVO.title" allowClear />
			</a-col>
		</a-row>

		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ $t('default.188') }}
			</a-col>
			<a-col :span="22">
				<a-textarea :rows="3" v-model:value="infoVO.title" allowClear />
			</a-col>
		</a-row>
		<a-row v-if="infoVO.img === 1" class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ $t('default.24') }}
			</a-col>
			<a-col :span="4" class="searchButton">
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
		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ $t('default.241') }}
			</a-col>
			<a-col :span="20" class="searchButton">
				<div class="clearfix">
					<a-upload
						:customRequest='handleOtherImgRequest'
						list-type="picture-card"
						v-model:file-list="otherImgList"
						@preview="handlePreview"
					>
						<div v-if="otherImgList.length < 5">
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
		<!-- 广告链接的预览 -->
	<showUrlDialog :visible="showUrlDialog" :src="infoVO.thumbnail" @showBoxCancel="showBoxCancel" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { countryListHttp, newsEditorHttp, newsInfoHttp, newsImgUploadHttp,shopListHttp } from '@/api/api';
import labelTitle from '@/components/labelTitle.vue';
import showUrlDialog from '@/components/common/showUrlDialog.vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import { useRoute } from 'vue-router';
import { message } from 'ant-design-vue';
// import { i18n } from '@/components/common/tools';


export default defineComponent({
	name: 'MatchEdit',
	components: {
		showUrlDialog,
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
			time: 0,
			visible: false,
			showUrlDialog: false,
			previewVisible:false,
			previewImage:"",
			infoVO: {
				id:'',
				img: 1,
				type:1,
				minRegisterTime:'',
        maxRegisterTime:"",
				thumbnail:'',
				title:'',
				contents:'',
				category:'',
				countryId: '',
				display:1,
				registerDate: '',
			},
			fileList:[],
			otherImgList:[],
			shopList: [],
      countryList: [{ id:'',name:'' }],
			imgList:[
				{ id: 1, label: 'default.177' },
				{ id: 2, label: 'default.240' },
			],
			typeList:[
				{ id: 1, label: 'default.197' },
				{ id: 2, label: 'default.198' },
			],
			disabledMinRegisterTime: (startValue: any) => {
				if (!startValue || !data.infoVO.maxRegisterTime) {
					return false;
				}
				return startValue.valueOf() > new Date(data.infoVO.maxRegisterTime).valueOf();
			},
			disabledMaxRegisterTime: (endValue: any) => {
				if (!endValue || !data.infoVO.minRegisterTime) {
					return false;
				}
				return new Date(data.infoVO.minRegisterTime).valueOf() >= endValue.valueOf();
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
			handleCancel:() =>{
				data.previewVisible = false
			},
			create: () => {
				if(!data.infoVO.title){
					message.warning('请输入新闻标题');
					return false;
				}
				return newsEditorHttp(data.infoVO)
			},
      update: () => {
				if(!data.infoVO.title){
					message.warning('请输入新闻标题');
					return false;
				}
				return newsEditorHttp(data.infoVO)
			},
			afterHttp:(id: string) =>{
				data.infoVO.id = id
			},
      getInfo:(id: any) =>{
        newsInfoHttp({id}).then((res: any) =>{
					const response = res.data.data
					data.infoVO.id = response.id
					data.infoVO.title = response.title
					data.infoVO.contents = response.contents
					data.infoVO.display = response.display
					data.infoVO.category = response.category
					data.infoVO.countryId = response.countryId
					data.infoVO.thumbnail = response.thumbnail
					data.infoVO.registerDate = response.registerDate
					data.fileList = [{ uid: '1', url: response.thumbnail }] as any;
				})
      },
			handleImgRequest:({file}: any) =>{
				const formData = new FormData();
				formData.append("image", file);
				newsImgUploadHttp(formData).then((res: any) =>{
					data.infoVO.thumbnail = res.data.data
					data.fileList = [{ uid: '1', url: res.data.data }] as any;
				})
			},
			handleOtherImgRequest:({file}: any) =>{
				const formData = new FormData();
				formData.append("image", file);
				newsImgUploadHttp(formData).then((res: any) =>{
					const obj = {uid:file.lastModified + new Date().getTime(), url:res.data.data} as never;
					data.otherImgList.push(obj);
					data.otherImgList = data.otherImgList.filter((i: any) => i.url)
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
			data.shopSearch('');
			if(ROUTE.query.id){
				data.getInfo(ROUTE.query.id);
			}
		};
		onMounted(() => {
			init();
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
