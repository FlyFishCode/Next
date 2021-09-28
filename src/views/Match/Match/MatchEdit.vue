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
				{{ $t('default.196') }}
			</a-col>
			<a-col :span="4">
				<a-select v-model:value="infoVO.type" class="selectBox">
					<a-select-option v-for="item in typeList" :key="item.id" :value="item.id">{{ $t(item.label) }}</a-select-option>
				</a-select>
			</a-col>
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
				{{ $t('default.203') }}
			</a-col>
			<a-col :span="4">
				<a-select v-model:value="infoVO.state" class="selectBox">
					<a-select-option :value="1">{{ $t('default.204') }}</a-select-option>
					<a-select-option :value="0">{{ $t('default.205') }}</a-select-option>
				</a-select>
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ $t('default.24') }}
			</a-col>
			<a-col :span="4">
				<a-select v-model:value="imgType" class="selectBox">
					<a-select-option v-for="item in imgList" :key="item.id" :value="item.id">{{ $t(item.label) }}</a-select-option>
				</a-select>
			</a-col>
		</a-row>

		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ $t('default.2') }}
			</a-col>
			<a-col :span="22">
				<a-select class="selectBox"
				show-search
				allowClear
				mode="multiple"
				v-model:value="infoVO.shopIdList"
				:default-active-first-option="false"
				:show-arrow="false"
				:filter-option="false"
				:not-found-content="null"
				@search="shopSearch"
				>
					<a-select-option v-for="shop in shopList" :value='shop.id' :key="shop.id">
						<div :title="shop.name">{{ shop.name }}</div>
					</a-select-option>
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
				<a-textarea :rows="3" v-model:value="infoVO.content"  allowClear />
			</a-col>
		</a-row>

		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ $t('default.243') }}
			</a-col>
			<a-col :span="22">
				<a-textarea :rows="3" v-model:value="infoVO.joinMethod" allowClear />
			</a-col>
		</a-row>

		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ $t('default.244') }}
			</a-col>
			<a-col :span="22">
				<a-textarea :rows="3" v-model:value="infoVO.cost" allowClear />
			</a-col>
		</a-row>

		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ $t('default.245') }}
			</a-col>
			<a-col :span="22">
				<a-textarea :rows="3" v-model:value="infoVO.reward" allowClear />
			</a-col>
		</a-row>

		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ $t('default.246') }}
			</a-col>
			<a-col :span="22">
				<a-textarea :rows="3" v-model:value="infoVO.contact" allowClear />
			</a-col>
		</a-row>

		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ $t('default.188') }}
			</a-col>
			<a-col :span="22">
				<a-textarea :rows="3" v-model:value="infoVO.other" allowClear />
			</a-col>
		</a-row>
		<a-row v-if="imgType === 1" class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ $t('default.24') }}
			</a-col>
			<a-col :span="8" class="searchButton">
				<div class="clearfix">
					<a-upload
						:customRequest='handleImgRequest'
						list-type="picture-card"
						v-model:file-list="fileList"
						@preview="handlePreview"
						:remove='handleImgRemove'
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
			<a-col>{{ `${$t('default.248')}：600px X 650px` }}</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ $t('default.241') }}
			</a-col>
			<a-col :span="8" class="searchButton">
				<div class="clearfix">
					<a-upload
						:customRequest='handleOtherImgRequest'
						list-type="picture-card"
						v-model:file-list="otherImgList"
						@preview="handlePreview"
						:remove='handleRemove'
					>
						<div v-if="otherImgList.length < 4">
							<plus-outlined />
							<div class="ant-upload-text">Upload</div>
						</div>
					</a-upload>
					<a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
						<img alt="example" style="width: 100%" :src="previewImage" />
					</a-modal>
				</div>
			</a-col>
			<a-col>{{ `${$t('default.248')}：200px X 200px` }}</a-col>
		</a-row>
		<!-- 广告链接的预览 -->
	<showUrlDialog :visible="showUrlDialog" :src="infoVO.thumbnail" @showBoxCancel="showBoxCancel" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { countryListHttp,newsImgUploadHttp,shopListHttp, matchAddHttp, matchInfoHttp,matchUpdateHttp } from '@/api/api';
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
		const handleImgUrl = (data: any) =>{
			const arr: any = data.infoVO.shopIdList;
			const obj: any = data.shopList.filter((i: any) => i.id === arr[0])[0];
			data.infoVO.thumbnail = obj.img;
		}
		const data = reactive({
			time: 0,
			imgType:1,
			visible: false,
			showUrlDialog: false,
			previewVisible:false,
			previewImage:"",
			fileList:[],
			otherImgList:[],
			shopList: [],
			infoVO: {
				id:'',
				type:0,
				shopIdList:undefined,
				startDate:'',
        endDate:"",
				picture:'',
				thumbnail:"",
				title:'',
				countryId: '',
				state:1,
				content:"",
				joinMethod:"",
				cost:"",
				reward:"",
				contact:"",
				other:""
			},
      countryList: [{ id:'',name:'' }],
			imgList:[
				{ id: 1, label: 'default.177' },
				{ id: 2, label: 'default.240' },
			],
			typeList:[
				{ id: 0, label: 'default.197' },
				{ id: 1, label: 'default.198' },
			],
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
			showBoxCancel: (value: boolean) => {
				data.showUrlDialog = value;
			},
			handlePreview:(file: any) =>{
				data.previewImage = file.url || file.preview;
				data.previewVisible = true;
			},
			handleCancel:() =>{
				data.previewVisible = false
			},
			create: () => {
				if(!data.infoVO.title){
					message.warning('请输入活动标题');
					return false;
				}
				if(data.imgType === 2){
					handleImgUrl(data);
				}
				return matchAddHttp(data.infoVO)
			},
      update: () => {
				if(!data.infoVO.title){
					message.warning('请输入活动标题');
					return false;
				}
				if(data.imgType === 2){
					handleImgUrl(data);
				}
				return matchUpdateHttp(data.infoVO)
			},
			handleImgRemove:() =>{
				data.infoVO.thumbnail = '';
			},
			handleRemove:(file: any) =>{
				data.infoVO.picture = data.otherImgList.filter((i: any) => i.url !== file.url).map((i: any) => i.url).join(',');
			},
			afterHttp:(id: string) =>{
				data.infoVO.id = id
			},
      getInfo:(activityId: any) =>{
        matchInfoHttp({activityId}).then((res: any) =>{
					const response = res.data.data;
					data.infoVO.id = String(ROUTE.query.id);
					data.infoVO.title = response.title;
					data.infoVO.state = response.state;
					data.infoVO.startDate = response.startDate;
					data.infoVO.endDate = response.endDate;
					data.infoVO.content = response.content;
					data.infoVO.joinMethod = response.joinMethod;
					data.infoVO.cost = response.cost;
					data.infoVO.reward = response.reward;
					data.infoVO.contact = response.contact;
					data.infoVO.other = response.other;
					data.infoVO.picture = response.picture;
					data.infoVO.countryId = response.countryId;
					data.infoVO.shopIdList = response.shopList.map((i: any) => i.shopId);
					data.fileList = [{ uid: '1', url: response.thumbnail }] as any;
					if(response.picture.split(',')){
						response.picture.split(',').forEach((i: any,index: number) => {
							const obj = { uid: index + new Date().getTime(),type:response.picture.substr(-10).split('.')[1], url: i } as never;
							data.otherImgList.push(obj);
						});
					}else{
						data.otherImgList = [{ uid: new Date().getTime(),type:response.picture.substr(-10).split('.')[1], url: response.picture }] as any;
					}
				})
      },
			handleImgRequest:({file}: any) =>{
				const formData = new FormData();
				formData.append("image", file);
				newsImgUploadHttp(formData).then((res: any) =>{
					data.infoVO.thumbnail = res.data.data;
					data.fileList = [{ uid: '1', url: res.data.data }] as any;
				})
			},
			handleOtherImgRequest:({file}: any) =>{
				const formData = new FormData();
				formData.append("image", file);
				newsImgUploadHttp(formData).then((res: any) =>{
					const obj = {uid:file.lastModified + new Date().getTime(), url:res.data.data} as never;
					data.otherImgList.push(obj);
					data.otherImgList = data.otherImgList.filter((i: any) => i.url);
					data.infoVO.picture = data.otherImgList.map((i: any) => i.url).join(',');
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
