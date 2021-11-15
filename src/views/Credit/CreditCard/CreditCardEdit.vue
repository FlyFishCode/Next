<template>
	<labelTitle :value="$t('default.261')" :btn="id || infoVO.id ? update : create"  @afterHttp='afterHttp'/>
	<div class="searchBox">
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ $t('default.161') }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.cardNo" allow-clear />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ $t('default.156') }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.password" type='password' allow-clear />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ 'All Points' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.allPoints" allow-clear />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ 'Points' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.points" allow-clear />
			</a-col>
		</a-row>

		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ $t('default.139') }}
			</a-col>
			<a-col :span="9">
				<a-select class="selectBox" v-model:value="infoVO.status">
					<a-select-option :value="1">{{ 'Normal' }}</a-select-option>
					<a-select-option :value="2">{{ 'Losted' }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :span="3" class="labelText">
				{{ $t('default.149') }}
			</a-col>
			<a-col :span="9">
				<a-select class="selectBox" v-model:value="infoVO.type">
					<a-select-option :value="1">{{ 'Normal' }}</a-select-option>
					<a-select-option :value="2">{{ 'Work' }}</a-select-option>
				</a-select>
			</a-col>
		</a-row>

		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ $t('default.154') }}
			</a-col>
			<a-col :span="9">
				<a-select class="selectBox" show-search v-model:value="infoVO.memberId" :default-active-first-option="false" :show-arrow="false" :filter-option="false" :not-found-content="null" allow-clear @search="memberSearch">
					<a-select-option v-for="d in memberList" :key="d.id">
						<div :title="d.username">{{ d.username }}</div>
					</a-select-option>
				</a-select>
			</a-col>
			<a-col :span="3" class="labelText">
				{{ 'Secret Key' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.secretKey" allow-clear />
			</a-col>
		</a-row>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
// import { SettingFilled } from '@ant-design/icons-vue';
import labelTitle from '@/components/labelTitle.vue';
import { GameUserListHttp, CreditAddHttp, CreditUpdateHttp, CreditInfoHttp } from '@/api/api';
import { useRoute } from 'vue-router';
import { message } from 'ant-design-vue';
export default defineComponent({
	name: 'MachineEditor',
	components: {
		labelTitle,
	},
	setup() {
		const ROUTE = useRoute();
		const id: any = ROUTE.query.id;
		const data = reactive({
			infoVO: {
				id:'',
				cardNo:'',
				password:'',
				allPoints:'',
				points:'',
				status:'',
				type:'',
				memberId:'',
				secretKey:''
			},
			memberList: [],
			memberSearch: (value: string) => {
				GameUserListHttp({ username: value.split("'").join(''), pageSize: 999 }).then((res) => {
					data.memberList = res.data.data.list;
				});
			},
			create: () => {
				if(!data.infoVO.cardNo){
					message.warning('请输入卡号');
					return false;
				}
				return CreditAddHttp(data.infoVO);
			},
			update: () => {
				if(!data.infoVO.cardNo){
					message.warning('请输入卡号');
					return false;
				}
				return CreditUpdateHttp(data.infoVO);
			},
			afterHttp:(id: string) =>{
				data.infoVO.id = id
			},
		});
		const init = (id: any) => {
			CreditInfoHttp({ creditCardId: id }).then((res: any) => {
				data.infoVO = res.data.data;
			});
		};
		onMounted(() => {
			data.memberSearch('');
			if (id) {
				init(id);
			}
		});
		return {
			...toRefs(data),
			id
		};
	}
});
</script>

<style scoped></style>
