<template>
	<labelTitle :value="$t('default.223')" :btn="ROUTE.query.id ? update : create" @afterHttp='afterHttp'/>
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
				<a-input v-model:value="infoVO.title" allowClear />
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
			<!-- <a-col :span="4">{{ '图片长宽比例为：2.4:1' }}</a-col> -->
		</a-row>
		<a-row class="rowStyle">
			<div id="editorElem"></div>
		</a-row>
		<!-- 广告链接的预览 -->
	<!-- <showUrlDialog :visible="showUrlDialog" :src="infoVO.thumbnail" @showBoxCancel="showBoxCancel" /> -->
	</div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, reactive, toRefs } from 'vue';
import { countryListHttp, dartsEditHttp, dartsInfoHttp, newsImgUploadHttp } from '@/api/api';
import labelTitle from '@/components/labelTitle.vue';
// import showUrlDialog from '@/components/common/showUrlDialog.vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import { useRoute } from 'vue-router';
import { message } from 'ant-design-vue';
import E from 'wangeditor'
// import { i18n } from '@/components/common/tools';


export default defineComponent({
	name: 'CarouselEdit',
	components: {
		// showUrlDialog,
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
			infoVO: {
				id:'',
				title:'',
				thumbnail:"",
				contents:'',
				countryId: '',
				display:1,
			},
			fileList:[],
      countryList: [{id:'',name:''}],
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
				return dartsEditHttp(data.infoVO)
			},
      update: () => {
				if(!data.infoVO.title){
					message.warning('请输入新闻标题');
					return false;
				}
				return dartsEditHttp(data.infoVO)
			},
			afterHttp:(id: string) =>{
				data.infoVO.id = id
			},
      getInfo:(id: any) =>{
        dartsInfoHttp({id}).then((res: any) =>{
					const response = res.data.data
					data.infoVO.id = response.id
					data.infoVO.title = response.title
					data.infoVO.display = response.display
					data.infoVO.contents = response.contents
					data.infoVO.countryId = response.countryId
					data.fileList = [{ uid: '1', url: response.thumbnail }] as any;
					// eslint-disable-next-line @typescript-eslint/no-use-before-define
					getEditor(true)
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
		});
		const getCountryList = () => {
			countryListHttp({pageSize:999}).then((res: any) => {
				data.countryList = res.data.data.list;
			});
		};
		const getEditor = (flag: boolean) =>{
			const editor = new E("#editorElem");
			nextTick(() => {
        editor.config.onchange = (html: any) => {
          data.infoVO.contents = html;
        };
        editor.config.height = 300;
        editor.config.menus = [
          "head", // 标题
          "bold", // 粗体
          "fontSize", // 字号
          "fontName", // 字体
          "italic", // 斜体
          "underline", // 下划线
          "strikeThrough", // 删除线
          "foreColor", // 文字颜色
          "backColor", // 背景颜色
          "link", // 插入链接
          "list", // 列表
          "justify", // 对齐方式
          // 'quote', // 引用
          // 'emoticon', // 表情
          "image", // 插入图片
          // 'table', // 表格
          // 'video', // 插入视频
          // 'code', // 插入代码
          "undo", // 撤销
          "redo" // 重复
        ];
        editor.config.zIndex = 100;
        // 过滤掉复制文本中自带的样式,默认开启
        editor.config.pasteFilterStyle = false;
        // 自定义处理粘贴的文本内容
        // editor.config.pasteTextHandle = function (content) {
        //   // content 即粘贴过来的内容（html 或 纯文本），可进行自定义处理然后返回
        //   return `<p style='text-align:center;color:red;border-bottom:1px solid #DCDFE6;border-top:1px solid #DCDFE6;'>以下内容来源于网络,或者复制过来</p>${content}<p style='text-align:center;color:red;border-bottom:1px solid #DCDFE6;border-top:1px solid #DCDFE6;'>以上内容来源于网络,或者复制过来</p>`;
        // };
        // editor.config.uploadImgMaxSize = 2 * 1024 * 1024; // 限制图片大小为2M
        // eslint-disable-next-line func-names
        editor.config.linkCheck = function(text: any, link: any) {
          console.log(text); // 插入的文字
          console.log(link); // 插入的链接
          return true; // 返回 true 表示校验成功
          // return '验证失败' // 返回字符串，即校验失败的提示信息
        };
        // 自定义配置颜色（字体颜色、背景色）
        editor.config.colors = ["#000000", "#eeece0", "#1c487f", "#4d80bf", "#c24f4a", "#8baa4a", "#7b5ba1", "#46acc8", "#f9963b", "#ffffff"];
        // 自定义字体
        editor.config.fontNames = ["宋体", "微软雅黑", "Arial", "Tahoma", "Verdana"];
        // 隐藏“网络图片”tab
        editor.config.showLinkImg = false;
        // 下面两个配置，使用其中一个即可显示“上传图片”的tab。但是两者不要同时使用！！！
        // editor.config.uploadImgShowBase64 = true; // 使用 base64 保存图片不建议使用这种，我只是图个方便
        // editor.config.uploadImgServer = "http://47.113.88.23:9091/darts/uploadPictures"; // 上传图片到服务器
        editor.config.customUploadImg = function a(resultFiles: any, insertImgFn: any) {
          const fd = new FormData();
          fd.append("image", resultFiles[0]);
          newsImgUploadHttp(fd).then((res: any) => {
            if (res.data.code === 100) {
              insertImgFn(res.data.data);
            } else {
							message.warning(res.data.msg);
            }
          });
        };
        editor.create();
        if (flag) {
          editor.txt.html(data.infoVO.contents);
        }
      });
		}
		const init = () => {
			getCountryList();
		};
		onMounted(() => {
			init();
			if(ROUTE.query.id){
				data.getInfo(ROUTE.query.id);
			}else{
				getEditor(false);
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
