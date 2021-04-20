<template>
	<labelTitle :value="$t('default.163')" :btn="id ? update : create" />
	<div class="searchBox">
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ $t('default.148') }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.username" :disabled="disabled" />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ $t('default.160') }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.registerTime" :disabled="disabled" />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ $t('default.104') }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.nickname" allow-clear />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ $t('default.164') }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.img" allow-clear />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ $t('default.90') }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.mobile" allow-clear />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ $t('default.91') }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.email" allow-clear />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ $t('default.161') }}
			</a-col>
			<a-col :span="9" class="selectSearch">
				<a-select
					show-search
					v-model:value="infoVO.mainCardNo"
					:default-active-first-option="false"
					:show-arrow="false"
					:filter-option="false"
					:not-found-content="null"
					allow-clear
					@search="shopSearch"
				>
					<a-select-option v-for="d in shopList" :key="d.id">
						<div :title="d.name">{{ d.name }}</div>
					</a-select-option>
				</a-select>
			</a-col>
			<a-col :span="3" class="labelText">
				{{ $t('default.5') }}
			</a-col>
			<a-col :span="9" class="selectSearch">
				<a-select show-search v-model:value="infoVO.shopId" :default-active-first-option="false" :show-arrow="false" :filter-option="false" :not-found-content="null" allow-clear @search="shopSearch">
					<a-select-option v-for="d in shopList" :key="d.id">
						<div :title="d.name">{{ d.name }}</div>
					</a-select-option>
				</a-select>
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ $t('default.105') }}
			</a-col>
			<a-col :span="9" class="selectSearch">
				<a-select v-model:value="infoVO.gender" allow-clear>
					<a-select-option :value="1">{{ $t('default.106') }}</a-select-option>
					<a-select-option :value="2">{{ $t('default.107') }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :span="3" class="labelText">
				{{ $t('default.108') }}
			</a-col>
			<a-col :span="9" class="datePicker">
				<a-date-picker v-model:value="infoVO.birthday" valueFormat="yyyy-MM-DD" />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ $t('default.23') }}
			</a-col>
			<a-col :span="9">
				<a-select v-model:value="infoVO.countryId" class="selectBox" @change="countryChange" allowClear>
					<a-select-option v-for="item in countryList" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :span="3" class="labelText">
				{{ $t('default.24') }}
			</a-col>
			<a-col :span="9">
				<a-select v-model:value="infoVO.areaId" class="selectBox" allowClear>
					<a-select-option v-for="item in areaList" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
				</a-select>
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ $t('default.0') }}
			</a-col>
			<a-col :span="9" class="selectSearch">
				<a-select v-model:value="infoVO.Language">
					<a-select-option :value="1">{{ $t('default.165') }}</a-select-option>
					<a-select-option :value="2">{{ $t('default.166') }}</a-select-option>
					<a-select-option :value="3">{{ $t('default.167') }}</a-select-option>
				</a-select>
			</a-col>
			<a-col v-if="!id" :span="3" class="labelText">
				{{ $t('default.156') }}
			</a-col>
			<a-col v-if="!id" :span="9" class="selectSearch">
				<a-input-password v-model:value="infoVO.password" type="password" />
			</a-col>
		</a-row>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
import labelTitle from '@/components/labelTitle.vue';
import { shopListHttp, PlayerUpdateHttp, countryListHttp, areaListHttp, PlayerInfoHttp, PlayerCreateHttp } from '@/api/api';
import { useRoute } from 'vue-router';
export default defineComponent({
	name: 'PlayerInfo',
	components: {
		labelTitle
	},
	setup() {
		const ROUTE = useRoute();
		const id: any = ROUTE.query.id;
		const options: any = ref(null);
		const data = reactive({
			disabled: false,
			infoVO: {
				id: '',
				username: '',
				nickname: '',
				img: '',
				gender: '',
				shopId: '',
				password: '',
				mainCardNo: '',
				birthday: '',
				areaId: '',
				countryId: '',
				registerTime: '',
				pageIndex: 1,
				pageSize: 10
			},
			currentPage: 1,
			totalSize: 100,
			shopList: [],
			areaList: [],
			countryList: [],
			columns: [
				{
					title: 'ID',
					dataIndex: 'age',
					key: 'ID'
				},
				{
					title: 'Operator',
					dataIndex: 'age',
					key: 'Operator'
				},
				{
					title: 'Operator Time',
					dataIndex: 'age',
					key: 'OperatorTime'
				},
				{
					title: 'Cash',
					dataIndex: 'age',
					key: 'Cash'
				},
				{
					title: 'Credits',
					dataIndex: 'age',
					key: 'Credits'
				},
				{
					title: 'Coins',
					dataIndex: 'age',
					key: 'Coins'
				},
				{
					title: 'Name',
					dataIndex: 'age',
					key: 'Name'
				},
				{
					title: 'Machine',
					dataIndex: 'age',
					key: 'Machine'
				},
				{
					title: 'Amout(cent)',
					dataIndex: 'age',
					key: 'Amout(cent)'
				},
				{
					title: 'All Credits',
					dataIndex: 'age',
					key: 'All Credits'
				},
				{
					title: 'Free Credits',
					dataIndex: 'age',
					key: 'Free Credits'
				}
			],
			tableList: [{}],
			shopSearch: (value: string) => {
				shopListHttp({ name: value.split("'").join(''), pageSize: 999 }).then((res: any) => {
					data.shopList = res.data.data.list;
				});
			},
			countryChange: () => {
				data.infoVO.areaId = '';
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getAreaList();
			},
			sizeChange: () => {
				console.log(1);
			},
			create: () => {
				return PlayerCreateHttp(data.infoVO);
			},
			update: () => {
				data.infoVO.id = id;
				return PlayerUpdateHttp(data.infoVO);
			}
		});
		const getPlayerInfo = (id: number) => {
			PlayerInfoHttp({ memberId: id }).then((res: any) => {
				data.infoVO = res.data.data;
			});
		};
		const getCountryList = () => {
			countryListHttp({}).then((res: any) => {
				data.countryList = res.data.data.list;
			});
		};
		const getAreaList = () => {
			areaListHttp({ countryId: data.infoVO.countryId }).then((res: any) => {
				data.areaList = res.data.data.list;
			});
		};
		const init = (id: any) => {
			data.shopSearch('');
			getCountryList();
			getAreaList();
			if (id) {
				data.disabled = true;
				getPlayerInfo(id);
			}
		};
		onMounted(() => {
			init(id);
		});
		return {
			...toRefs(data),
			id,
			options
		};
	}
});
</script>

<style scoped></style>
