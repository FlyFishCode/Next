<template>
	<labelTitle :value="$t('default.163')" :btn="id || infoVO.id  ? update : create"  @afterHttp='afterHttp'/>
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
				<a-input v-model:value="infoVO.registerTime" disabled />
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
				{{ $t('default.139') }}
			</a-col>
			<a-col :span="9">
				<a-select v-model:value="infoVO.status" class="selectBox" allowClear>
					<a-select-option :value="0">{{ $t('default.175') }}</a-select-option>
					<a-select-option :value="1">{{ $t('default.174') }}</a-select-option>
				</a-select>
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
			<a-col :span="9">
				<a-select
					class="selectBox"
					show-search
					v-model:value="infoVO.mainCardId"
					:default-active-first-option="false"
					:show-arrow="false"
					:filter-option="false"
					:not-found-content="null"
					@search="UserCardSearch"
					allowClear
				>
					<a-select-option v-for="card in cardList" :key="card.id" :value='card.id'>
						<div :title="card.cardNo">{{ card.cardNo }}</div>
					</a-select-option>
				</a-select>
			</a-col>
			<a-col :span="3" class="labelText">
				{{ $t('default.5') }}
			</a-col>
			<a-col :span="9">
				<a-select class="selectBox" show-search v-model:value="infoVO.shopId" :default-active-first-option="false" :show-arrow="false" :filter-option="false" :not-found-content="null" allow-clear @search="shopSearch">
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
			<a-col :span="9">
				<a-select class="selectBox" v-model:value="infoVO.gender" allow-clear>
					<a-select-option :value="0">{{ $t('default.107') }}</a-select-option>
					<a-select-option :value="1">{{ $t('default.106') }}</a-select-option>
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
				{{ $t('default.23') }}
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
			<a-col :span="9">
				<a-select class="selectBox" v-model:value="infoVO.language">
					<a-select-option :value="1">{{ $t('default.167') }}</a-select-option>
					<a-select-option :value="2">{{ $t('default.165') }}</a-select-option>
					<a-select-option :value="3">{{ $t('default.269') }}</a-select-option>
					<a-select-option :value="4">{{ $t('default.270') }}</a-select-option>
				</a-select>
			</a-col>
			<a-col v-if="!id" :span="3" class="labelText">
				{{ $t('default.156') }}
			</a-col>
			<a-col v-if="!id" :span="9">
				<a-input-password v-model:value="infoVO.password" type="password" />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
        {{ $t('default.271') }}
      </a-col>
      <a-col :span="4" class="searchButton">
				<div class="clearfix">
					<a-upload
						:customRequest='handlePlayerImgRequest'
						list-type="picture-card"
						v-model:file-list="imgList"
						@preview="handlePreview"
					>
						<div v-if="imgList.length < 1">
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
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
import labelTitle from '@/components/labelTitle.vue';
import { shopListHttp, GameUserUpdateHttp, countryListHttp, areaListHttp, GameUserInfoHttp, GameUserCreateHttp, UserCardListHttp, newsImgUploadHttp } from '@/api/api';
import { useRoute } from 'vue-router';
import { PlusOutlined } from '@ant-design/icons-vue';
import { MD5 } from '@/components/common/tools';
export default defineComponent({
	name: 'PlayerInfo',
	components: {
		labelTitle,
		PlusOutlined
	},
	setup() {
		const ROUTE = useRoute();
		const id: any = ROUTE.query.id;
		const options: any = ref(null);
		const data = reactive({
			disabled: false,
			previewVisible: false,
			previewImage:"",
			infoVO: {
				id: '',
				username: '',
				nickname: '',
				img: '',
				gender: '',
				status:"",
				shopId: '',
				password: '',
				mainCardId: '',
				birthday: '',
				areaId: '',
				countryId: '',
				registerTime: ''
			},
			imgList:[],
			shopList: [],
			areaList: [],
			countryList: [],
			cardList: [{cardNo:''}],
			handlePlayerImgRequest:({file}: any) =>{
        const formData = new FormData();
				formData.append("image", file);
				newsImgUploadHttp(formData).then((res: any) =>{
					const obj = {uid:file.lastModified + new Date().getTime(), url:res.data.data } as never;
					data.imgList.push(obj);
					data.imgList = data.imgList.filter((i: any) => i.url)
					data.infoVO.img = res.data.data;
				})
      },
			handlePreview:(file: any) =>{
      data.previewImage = file.url || file.preview;
      data.previewVisible = true;
			},
			handleCancel:() =>{
				data.previewVisible = false
			},
			shopSearch: (value: string) => {
				shopListHttp({ name: value.split("'").join(''), pageSize: 999 }).then((res: any) => {
					data.shopList = res.data.data.list;
				});
			},
			UserCardSearch(value: any) {
				if (value.length > 1) {
					UserCardListHttp({ cardNo: value.split("'").join(''), pageSize: 999 }).then((res) => {
						data.cardList = res.data.data.list;
					});
				}
			},
			countryChange: () => {
				data.infoVO.areaId = '';
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getAreaList();
			},
			create: () => {
				data.infoVO.password = MD5(data.infoVO.password)
				return GameUserCreateHttp(data.infoVO);
			},
			update: () => {
				data.infoVO.id = id;
				data.infoVO.password = MD5(data.infoVO.password)
				return GameUserUpdateHttp(data.infoVO);
			},
			afterHttp:(id: string) =>{
				data.infoVO.id = id
			},
		});
		const getPlayerInfo = (id: number) => {
			GameUserInfoHttp({ memberId: id }).then((res: any) => {
				data.infoVO = res.data.data;
				const obj = {uid: new Date().getTime(), url:res.data.data.img } as never;
				data.imgList.push(obj);
				data.infoVO.img = res.data.data.img;
				data.UserCardSearch('');
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getAreaList();
			});
		};
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
		const init = (id: any) => {
			data.shopSearch('');
			getCountryList();
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
