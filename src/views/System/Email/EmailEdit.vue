<template>
	<labelTitle :value="$t('default.258')" :btn="ROUTE.query.id || infoVO.id  ? update : create" @afterHttp='afterHttp'/>
	<div class="searchBox">
		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ 'label' }}
			</a-col>
			<a-col :span="6">
				<a-input v-model:value="infoVO.label" allowClear />
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.0') }}
			</a-col>
			<a-col :span="6" class="datePicker">
        <a-input v-model:value="infoVO.language" :maxlength='5' allowClear />
			</a-col>
			<a-col :span="2" class="labelText">
				{{ 'Subject' }}
			</a-col>
			<a-col :span="6">
				<a-input v-model:value="infoVO.subject" allowClear />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ 'Content' }}
			</a-col>
			<a-col :span="22">
				<a-textarea v-model:value="infoVO.content" :auto-size="{ minRows: 3, maxRows: 6 }" allowClear />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<div id="editorElem"></div>
		</a-row>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { EmailInfoHttp, EmailAddHttp, EmailUpdateHttp } from '@/api/api';
import labelTitle from '@/components/labelTitle.vue';
import { useRoute } from 'vue-router';
import { message } from 'ant-design-vue';
// import { i18n } from '@/components/common/tools';


export default defineComponent({
	name: 'Email',
	components: {
		labelTitle,
	},
	setup() {
    const ROUTE = useRoute();
		const data = reactive({
			infoVO: {
				id:'',
				label: "",
				content: "",
				subject: "",
				language: ""
			},
			create: () => {
				if(!data.infoVO.label){
					message.warning('请输入标题');
					return false;
				}
				return EmailAddHttp(data.infoVO)
			},
      update: () => {
				if(!data.infoVO.label){
					message.warning('请输入标题');
					return false;
				}
				return EmailUpdateHttp(data.infoVO)
			},
			afterHttp:(id: string) =>{
				data.infoVO.id = id
			},
      getInfo:(id: any) =>{
        EmailInfoHttp({emailTemplateId:id}).then((res: any) =>{
					data.infoVO = res.data.data;
				})
      },
		});
		const init = () => {
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
