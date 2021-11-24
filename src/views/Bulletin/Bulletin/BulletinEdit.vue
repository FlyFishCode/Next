<template>
	<labelTitle :value="$t('default.258')" :btn="ROUTE.query.id || infoVO.id  ? update : create" @afterHttp='afterHttp'/>
	<div class="searchBox">
    <a-row class="rowStyle">
      <a-col :span="2" class="labelText">
				{{ 'Title' }}
			</a-col>
			<a-col :span="22">
				<a-input v-model:value="infoVO.title" allowClear />
			</a-col>
    </a-row>
		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ $t('default.262') }}
			</a-col>
			<a-col :span="4">
				<a-select v-model:value="infoVO.countryId" class="selectBox" @change="countryChange" allowClear>
					<a-select-option v-for="item in countryList" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.263') }}
			</a-col>
			<a-col :span="4">
				<a-select v-model:value="infoVO.areaId" class="selectBox" allowClear>
					<a-select-option v-for="item in areaList" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
				</a-select>
			</a-col>
      <a-col :span="2" class="labelText">
				{{ $t('default.264') }}
			</a-col>
			<a-col :span="4">
				<a-select v-model:value="infoVO.isPublish" class="selectBox">
          <a-select-option v-for="item in publishList" :key="item.id" :value="item.id">{{ $t(item.label) }}</a-select-option>
				</a-select>
			</a-col>
      <a-col :span="2" class="labelText">
				{{ $t('default.265') }}
			</a-col>
			<a-col :span="4" class="datePicker">
				<a-date-picker v-model:value="infoVO.publishDate"  valueFormat="yyyy-MM-DD 00:00:00" allow-clear />
			</a-col>
		</a-row>
    <a-row>
      <a-col :span="2" class="labelText">
				{{ $t('default.194') }}
			</a-col>
      <a-col :span="4" class="searchButton">
				<div class="clearfix">
					<a-upload
					:customRequest='handleImgRequest'
					list-type="picture-card"
					v-model:file-list="fileList"
					@preview="handlePreview"
					:remove='handleRemove'
				>
					<div v-if="fileList.length < 1">
						<plus-outlined />
						<div class="ant-upload-text">Upload</div>
					</div>
					</a-upload>
					<a-modal :visible="previewVisible" :footer="null" centered @cancel="handleCancel">
						<img alt="example" style="width: 100%" :src="previewUrl" />
					</a-modal>
				</div>
			</a-col>
      <a-col :span="2" class="labelText">
				{{ 'Url' }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="infoVO.url" allowClear />
			</a-col>
    </a-row>
		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ 'Content' }}
			</a-col>
			<a-col :span="22">
				<div id="editorElem"></div>
			</a-col>
		</a-row>
    <a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ 'Announce' }}
			</a-col>
			<a-col :span="22">
				<a-textarea v-model:value="infoVO.announce" :rows="4" allowClear/>
			</a-col>
		</a-row>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, nextTick } from 'vue';
import { countryListHttp, areaListHttp, BulletinInfoHttp, BulletinAddHttp, BulletinUpdateHttp, newsImgUploadHttp } from '@/api/api';
import labelTitle from '@/components/labelTitle.vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import { useRoute } from 'vue-router';
import { message } from 'ant-design-vue';
import E from 'wangeditor';
// import { i18n } from '@/components/common/tools';


export default defineComponent({
	name: 'BulletinEdit',
	components: {
		labelTitle,
    PlusOutlined
	},
	setup() {
    const ROUTE = useRoute();
    let editor = {} as any;
		const data = reactive({
      previewUrl:"",
      previewVisible:false,
      countryList:[],
			areaList:[],
      fileList:[],
			infoVO: {
				id:'',
        url:'',
				title: "",
        isPublish:1,
        countryId: '',
				areaId:'',
        banner:"",
        publishDate:"",
        content:"",
				announce: "",
			},
      publishList:[
				{ id: 1, label: 'default.170' },
				{ id: 0, label: 'default.171' },
      ],
      countryChange: () => {
				data.infoVO.areaId = '';
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getAreaList();
			},
      handleImgRequest:({file}: any) =>{
				const formData = new FormData();
				formData.append("image", file);
				newsImgUploadHttp(formData).then((res: any) =>{
					// 设置默认预览图
					// thumbUrl: 'http://adartstest.adarts-cn.com/leagueimage/4318780786a6.jpg'
					const obj = { uid: file.lastModified + new Date().getTime(), url: res.data.data } as never;
					data.fileList.push(obj);
          data.fileList = data.fileList.filter((i: any) => i.url);
          data.infoVO.banner = res.data.data;
				})
			},
      handlePreview:(file: any) =>{
				data.previewUrl = file.url;
				data.previewVisible = true;
			},
      handleRemove:() =>{
        data.fileList = []
				data.infoVO.banner = '';
			},
			handleCancel:() =>{
				data.previewVisible = false
			},
			create: () => {
				if(!data.infoVO.title){
					message.warning('请输入标题');
					return false;
				}
				return BulletinAddHttp(data.infoVO)
			},
      update: () => {
				if(!data.infoVO.title){
					message.warning('请输入标题');
					return false;
				}
				return BulletinUpdateHttp(data.infoVO)
			},
			afterHttp:(id: string) =>{
				data.infoVO.id = id
			},
      getInfo:(id: any) =>{
        BulletinInfoHttp({ bulletinId: id }).then((res: any) =>{
					data.infoVO = res.data.data;
					data.fileList.push({ uid: new Date().getTime(), url: res.data.data.banner } as never)
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
					getEditor(true)
				})
      },
		});
    const getCountryList = () => {
			countryListHttp({ pageSize: 999 }).then((res: any) => {
				data.countryList = res.data.data.list;
			});
		};
		const getAreaList = () => {
			areaListHttp({ countryId: data.infoVO.countryId }).then((res: any) => {
				data.areaList = res.data.data.list;
			});
		};
    const getEditor = (flag: boolean) =>{
			editor = new E("#editorElem");
			nextTick(() => {
        editor.config.onchange = (html: any) => {
          data.infoVO.content = html;
        };
        editor.config.height = 200;
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
          editor.txt.html(data.infoVO.content);
        }
      });
		}
		const init = () => {
      getCountryList();
      getAreaList();
			if(ROUTE.query.id){
				data.getInfo(ROUTE.query.id);
			}else{
				getEditor(false);
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
