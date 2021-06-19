<template>
	<labelTitle :value="$t('default.195')" :btn="ROUTE.query.id ? update : create"/>
	<div class="searchBox">
		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ 'ID' }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="infoVO.id" allowClear />
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.5') }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="infoVO.name" allowClear />
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.23') }}
			</a-col>
			<a-col :span="4">
				<a-select v-model:value="infoVO.countryId" @change="countryChange" class="selectBox" allowClear>
					<a-select-option v-for="item in countryList" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.24') }}
			</a-col>
			<a-col :span="4">
				<a-select v-model:value="infoVO.areaId" class="selectBox" allowClear>
					<a-select-option v-for="item in areaList" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
				</a-select>
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ $t('default.25') }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="infoVO.type" allowClear />
			</a-col>
		</a-row>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { shopListHttp, countryListHttp, areaListHttp, agentListHttp } from '@/api/api';
import labelTitle from '@/components/labelTitle.vue';
import { useRoute } from 'vue-router';
// import { i18n } from '@/components/common/tools';
export default defineComponent({
	name: 'Shop',
	components: {
		labelTitle,
	},
	setup() {
    const ROUTE = useRoute();
		const data = reactive({
			visible: false,
			infoVO: {
				id: '',
				name: '',
				countryId: '',
				areaId: '',
				type: '',
				agentId: '',
			},
			areaList: [],
      countryList: [],
			agentList: [],
			countryChange: () => {
				data.infoVO.areaId = '';
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getAreaList();
			},
			agentSearch: (value: any) => {
				agentListHttp({ agentName: value.split("'").join(''), pageSize: 999 }).then((res: any) => {
					data.agentList = res.data.data;
				});
			},
			create: () => {
				shopListHttp(data.infoVO).then((res: any) => {
          console.log(res);
				});
			},
      update: () => {
				shopListHttp(data.infoVO).then((res: any) => {
          console.log(res);
				});
			},
      getInfo:() =>{
        console.log(1);
      },
		});
		const getCountryList = () => {
			countryListHttp({pageSize:999}).then((res: any) => {
				data.countryList = res.data.data.list;
			});
		};
		const getAreaList = () => {
			areaListHttp({ countryId: data.infoVO.countryId }).then((res: any) => {
				data.areaList = res.data.data.list;
			});
		};
		const init = () => {
			data.getInfo();
			getCountryList();
			getAreaList();
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

<style scoped></style>
