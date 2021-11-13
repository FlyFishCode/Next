<template>
	<labelTitle :value="$t('default.27')" :btn="update"/>
	<div class="searchBox">
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ 'Username' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.username" />
			</a-col>
      <a-col :span="3" class="labelText">
				{{ 'Password' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.password" />
			</a-col>
		</a-row>
    <a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ 'Server' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.server" />
			</a-col>
      <a-col :span="3" class="labelText">
				{{ 'From' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.from" />
			</a-col>
		</a-row>
    <a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ 'Host' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.host" />
			</a-col>
      <a-col :span="3" class="labelText">
				{{ 'Port' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.port" />
			</a-col>
		</a-row>
    <a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ 'Enable' }}
			</a-col>
			<a-col :span="9">
				<a-radio-group v-model:value="infoVO.enable" class='radioBox'>
          <a-radio :value="1">YES</a-radio>
          <a-radio :value="0">NO</a-radio>
        </a-radio-group>
			</a-col>
      <a-col :span="3" class="labelText">
				{{ 'SSL' }}
			</a-col>
			<a-col :span="9">
				<a-radio-group v-model:value="infoVO.ssl"  class='radioBox'>
          <a-radio :value="1">YES</a-radio>
          <a-radio :value="0">NO</a-radio>
        </a-radio-group>
			</a-col>
		</a-row>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import labelTitle from '@/components/labelTitle.vue';
// import { SettingInfoHttp, SettingUpdateHttp  } from '@/api/api';
import { useRoute } from 'vue-router';
// import Axios from 'axios';
export default defineComponent({
	name: 'PlayerInfo',
	components: {
		labelTitle,
	},
	setup() {
    const ROUTE = useRoute();
		const id: any = ROUTE.query.id;
		const data = reactive({
			previewImage:"",
			infoVO: {
        from: "",
        host: "",
        password: "",
        port: '',
        server: "",
        ssl: 1,
        enable: 1,
        username: ""
			},
			update: () => {
				// return SettingUpdateHttp(data.infoVO);
			}
		});
		const getInfo = () => {
			// SettingInfoHttp().then((res: any) => {
			// 	data.infoVO = res.data.data;
			// });
		};
		const init = () => {
			getInfo()
		};
		onMounted(() => {
			init();
		});
		return {
			...toRefs(data),
			id
		};
	}
});
</script>

<style scoped>
.radioBox{
  height: 32px;
  line-height: 32px;
  background: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
