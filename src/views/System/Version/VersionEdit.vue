<template>
	<labelTitle :value="$t('default.260')" :btn="id || infoVO.id  ? update : create"  @afterHttp='afterHttp'/>
	<div class="searchBox">
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ 'Label' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.label" />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ 'Type' }}
			</a-col>
			<a-col :span="9">
				<a-select class="selectBox" v-model:value="infoVO.type" allowClear>
					<a-select-option v-for="item in typeList" :key="item.id" :value="item.id">{{ item.label }}</a-select-option>
				</a-select>
			</a-col>
      <a-col :span="3" class="labelText">
				{{ 'Code' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.code" />
			</a-col>
      <a-col :span="3" class="labelText">
				{{ 'Url' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.url" />
			</a-col>
		</a-row>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import labelTitle from '@/components/labelTitle.vue';
import { VersionAddHttp, VersionUpdateHttp, VersionInfoHttp } from '@/api/api';
import { useRoute } from 'vue-router';
export default defineComponent({
	name: 'PlayerInfo',
	components: {
		labelTitle,
	},
	setup() {
    const ROUTE = useRoute();
		const id: any = ROUTE.query.id;
		const data = reactive({
			infoVO: {
				id:'',
				type: '',
				code: "",
				url: "",
				label: ''
			},
			typeList:[
				{ id: 1, label:'GameAppHome' },
				{ id: 2, label:'GameAppBusiness' },
				{ id: 3, label:'MemberApp' }
			],
			create: () => {
				return VersionAddHttp(data.infoVO);
			},
			update: () => {
				data.infoVO.id = id;
				return VersionUpdateHttp(data.infoVO);
			},
			afterHttp:(id: string) =>{
				data.infoVO.id = id
			},
		});
		const getInfo = (id: number) => {
			VersionInfoHttp({ versionId: id }).then((res: any) => {
				data.infoVO = res.data.data;
			});
		};
		const init = (id: any) => {
			if (id) {
				getInfo(id);
			}
		};
		onMounted(() => {
			init(id);
		});
		return {
			...toRefs(data),
			id
		};
	}
});
</script>

<style scoped></style>
