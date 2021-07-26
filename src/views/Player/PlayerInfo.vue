<template>
	<labelTitle :value="$t('default.213')" :btn="ROUTE.query.id ? update : create"/>
	<div>
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
				{{ $t('default.207') }}
			</a-col>
			<a-col :span="4" class="datePicker">
				<a-date-picker v-model:value="infoVO.registerDate" valueFormat="yyyy-MM-DD 00:00:00" allow-clear />
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.196') }}
			</a-col>
			<a-col :span="4">
				<a-select v-model:value="infoVO.category" class="selectBox">
					<a-select-option v-for="item in categoryList" :key="item.id" :value="item.id">{{ $t(item.label) }}</a-select-option>
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
						<div v-if="palyerImgList.length < 8">
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
    <a-row>
      <a-col :span="2" class="labelText">
				{{ 'TIP' }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="infoVO.title" allowClear />
			</a-col>
      <a-col :span="2" class="labelText">
				{{ 'BARREL' }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="infoVO.title" allowClear />
			</a-col>
      <a-col :span="2" class="labelText">
				{{ 'SHAFT' }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="infoVO.title" allowClear />
			</a-col>
      <a-col :span="2" class="labelText">
				{{ 'FLIGHT' }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="infoVO.title" allowClear />
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
					<a-button @click="handleAdd" type="primary" size='small'>{{ $t('default.185') }}</a-button>
				</a-col>
			</a-row>
			<a-table bordered :data-source="dataSource" :columns="columns" rowKey='id'>
				<template #label="{ record }">
					<a-input v-model:value="record.label" @pressEnter="handleChangeTitle(record)" allowClear/>
				</template>
				<template #content="{ record }">
					<a-input v-model:value="record.content" @pressEnter="handleChangeContent(record)" allowClear/>
				</template>
				<template #handle>
					<a-button type="primary" size='small'>{{$t('default.15')}}</a-button>
				</template>
			</a-table>
		</div>
		<!-- 广告链接的预览 -->
	<showUrlDialog :visible="showUrlDialog" :src="infoVO.thumbnail" @showBoxCancel="showBoxCancel" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { countryListHttp, newsEditorHttp, newsInfoHttp, newsImgUploadHttp } from '@/api/api';
import labelTitle from '@/components/labelTitle.vue';
import showUrlDialog from '@/components/common/showUrlDialog.vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import { useRoute } from 'vue-router';
import { message } from 'ant-design-vue';
import { i18n } from '@/components/common/tools';


export default defineComponent({
	name: 'Shop',
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
			visible: false,
			showUrlDialog: false,
			previewVisible:false,
			previewImage:"",
			fileList:[],
      palyerImgList:[],
			infoVO: {
				id:'',
				thumbnail:'',
				title:'',
				contents:'',
				category:'',
				countryId: '',
				display:1,
				registerDate: '',
			},
			columns:[
				{
					width:'20%',
          title: 'label',
          dataIndex: 'label',
          slots: { customRender: 'label' },
        },
        {
					width:'70%',
          title: 'content',
          dataIndex: 'content',
          slots: { customRender: 'content' },
        },
        {
					width:'10%',
          title: i18n('default.169'),
          slots: { customRender: 'handle' },
        },
			],
      countryList: [{id:'',name:''}],
			categoryList:[
				{ id: 3, label: 'default.198' },
				{ id: 4, label: 'default.197' },
				{ id: 6, label: 'default.199' },
			],
			dataSource:[
				{
					id:1,
					label:'AAAAAAAAAAAAAA',
					content:'BBBBBBBBBBBBBB'
				}
			],
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
      handlePlayerImgRequest:({file}: any) =>{
        const formData = new FormData();
				formData.append("image", file);
				newsImgUploadHttp(formData).then((res: any) =>{
					const obj = {uid:file.lastModified,url:res.data.data} as never;
					data.palyerImgList.push(obj);
					data.palyerImgList = data.palyerImgList.filter((i: any) => i.url)
					console.log(data.palyerImgList)
				})
      },
			handleDelete:() =>{
				console.log(1)
			},
			handleAdd:() =>{
				let index = 0
				data.dataSource.push({
					id:index++,
					label:'',
					content:''
				})
			},
			handleChangeTitle:(row: any) =>{
				console.log(row)
			},
			handleChangeContent:(row: any) =>{
				console.log(row)
			}
		})
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
.rowBox{
  background: #eee;
}
.contentBox{
  border: 1px solid #999;
  margin: 10px 0;
  padding: 10px;
}
</style>
