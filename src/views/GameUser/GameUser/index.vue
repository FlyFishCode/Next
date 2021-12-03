<template>
	<div>
		<labelTitle :value="$t('default.154')" />
		<div class="searchBox">
			<a-row class="rowStyle">
				<a-col :span="2" class="labelText">
					{{ 'ID' }}
				</a-col>
				<a-col :span="4">
					<a-input v-model:value="infoVO.id" type='number' allowClear />
				</a-col>
				<a-col :span="2" class="labelText">
					{{ $t('default.147') + 'ID' }}
				</a-col>
				<a-col :span="4">
					<a-input v-model:value="infoVO.username" allowClear />
				</a-col>
				<a-col :span="2" class="labelText">
					{{ $t('default.161') }}
				</a-col>
				<a-col :span="4">
					<a-input v-model:value="infoVO.cardNo" allowClear />
					<!-- <a-select
					class="selectBox"
						show-search
						v-model:value="infoVO.cardNo"
						:default-active-first-option="false"
						:show-arrow="false"
						:filter-option="false"
						:not-found-content="null"
						placeholder="Enter more than 4"
						@search="UserCardSearch"
						allowClear
					>
						<a-select-option v-for="card in cardList" :key="card.cardNo">
							<div :title="card.cardNo">{{ card.cardNo }}</div>
						</a-select-option>
					</a-select> -->
				</a-col>
				<a-col :span="2" class="labelText">
					{{ $t('default.104') }}
				</a-col>
				<a-col :span="4">
					<a-input v-model:value="infoVO.nickname" allowClear />
				</a-col>
			</a-row>

			<a-row class="rowStyle">
				<a-col :span="2" class="labelText">
					{{ $t('default.90') }}
				</a-col>
				<a-col :span="4">
					<a-input v-model:value="infoVO.mobile" allowClear />
				</a-col>
				<a-col :span="2" class="labelText">
					{{ $t('default.91') }}
				</a-col>
				<a-col :span="4">
					<a-input v-model:value="infoVO.email" allowClear />
				</a-col>

				<a-col :span="2" class="labelText">
					{{ $t('default.108') }}
				</a-col>
				<a-col :span="2" class="datePicker">
					<a-date-picker v-model:value="infoVO.minBirthday" :disabled-date="disabledStartDate" valueFormat="yyyy-MM-DD 00:00:00" allow-clear />
				</a-col>
				<a-col :span="2" class="datePicker">
					<a-date-picker v-model:value="infoVO.maxBirthday" :disabled-date="disabledEndDate" valueFormat="yyyy-MM-DD 00:00:00" allow-clear />
				</a-col>
				<a-col :span="2" class="labelText">
					{{ $t('default.160') }}
				</a-col>
				<a-col :span="2" class="datePicker">
					<a-date-picker v-model:value="infoVO.minRegisterTime" :disabled-date="disabledMinRegisterTime" valueFormat="yyyy-MM-DD 00:00:00" allow-clear />
				</a-col>
				<a-col :span="2" class="datePicker">
					<a-date-picker v-model:value="infoVO.maxRegisterTime" :disabled-date="disabledMaxRegisterTime" valueFormat="yyyy-MM-DD 00:00:00" allow-clear />
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
					{{ $t('default.2') }}
				</a-col>
				<a-col :span="4">
					<a-select class="selectBox" show-search v-model:value="infoVO.shopId" :default-active-first-option="false" :show-arrow="false" :filter-option="false" :not-found-content="null" allowClear @search="shopSearch">
						<a-select-option v-for="shop in shopList" :key="shop.id">
							<div :title="shop.name">{{ shop.name }}</div>
						</a-select-option>
					</a-select>
				</a-col>
				<a-col :span="2" class="labelText">
					{{ $t('default.105') }}
				</a-col>
				<a-col :span="4">
					<a-select v-model:value="infoVO.gender" class="selectBox" allowClear>
						<a-select-option :value="1">{{ $t('default.106') }}</a-select-option>
						<a-select-option :value="0">{{ $t('default.107') }}</a-select-option>
					</a-select>
				</a-col>
			</a-row>
			<a-row class="rowStyle">
				<a-col :span="2" class="labelText">
					{{ $t('default.162') }}
				</a-col>
				<a-col :span="4">
					<a-select v-model:value="infoVO.status" class="selectBox" allowClear>
						<a-select-option :value="1">{{ $t('default.174') }}</a-select-option>
						<a-select-option :value="0">{{ $t('default.175') }}</a-select-option>
					</a-select>
				</a-col>
				<a-col :span="2" class="labelText">
					<a-button type="primary" size="small" @click="search">{{ $t('default.8') }}</a-button>
				</a-col>
			</a-row>
		</div>
		<a-row class="rowStyle">
			<a-col :span="1">
				<a-button type="primary" size="small" @click="handleCreate">{{ $t('default.9') }}</a-button>
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-table bordered :columns="columns" :data-source="tableList" :pagination="false" rowKey="id" class="tableStyle">
				<template #cardList="{ record }">
					<div class="tableRollBox">
						<div v-for="card in record.cardList" :key="card.id">
							{{ card.cardNo }}
							<!-- <a-button type="link" size="small" @click="handleCardClick(record.id)">{{ card.cardNo }}</a-button> -->
						</div>
					</div>
				</template>
				<template #nickname="{ record }">
					<a-button type="link" size="small" @click="handleUserName(record.id)">{{ record.nickname }}</a-button>
				</template>
				<template #shopName="{ record }">
					<a-button v-if="record.shopName" type="link" size="small" @click="handleShopClick(record.shopId)">{{ record.shopName }}</a-button>
				</template>
				<template #gender="{ record }">
					<div>{{ record.gender ? $t('default.106') : $t('default.107') }}</div>
				</template>
				<template #type="{ record }">
					<div v-if="record.status === 0">{{ $t('default.175') }}</div>
					<div v-if="record.status === 1">{{ $t('default.174') }}</div>
				</template>
				<template #handle="{ record }">
					<div class="handleBtnDiv">
						<a-button type="primary" size="small" @click="handlePassword(record.id)">{{ $t('default.168') }}</a-button>
						<a-button type="danger" size="small" @click="playerDelete(record.id)">{{ $t('default.10') }}</a-button>
					</div>
				</template>
			</a-table>
		</a-row>
		<div class="paginationStyle">
			<a-pagination show-quick-jumper v-model:current="infoVO.pageIndex" :total="total" @change="pageChange" />
		</div>
		<a-modal v-model:visible="visible" width="40%" :title="$t('default.168')" :footer="null" centered>
			<a-row class="rowStyle">
				<a-col :span="4" class="labelText">{{ $t('default.168') }}</a-col>
				<a-col :span="20"><a-input v-model:value="password" type="password" allowClear/></a-col>
			</a-row>
			<a-row class="rowStyle buttonBox">
				<a-col :span="3">
					<a-button @click="handleCancel">{{ $t('default.19') }}</a-button>
				</a-col>
				<a-col :span="3">
					<a-button type="primary" @click="handleOk">{{ $t('default.18') }}</a-button>
				</a-col>
			</a-row>
		</a-modal>
		<DeleteDialog :visible="dialogVisible" @afterClose="afterClose" @handleOk="handledialogOK" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
import labelTitle from '@/components/labelTitle.vue';
import { GameUserListHttp, countryListHttp, areaListHttp, shopListHttp, GameUserDeleteHttp, GameUserRestorePasswordHttp } from '@/api/api';
import DeleteDialog from '@/components/common/DeleteDialog.vue';
import { i18n, MD5 } from '@/components/common/tools';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import qs from 'qs';
export default defineComponent({
	name: 'GameUser',
	components: {
		labelTitle,
		DeleteDialog
	},
	setup() {
		const formRef: any = ref(null);
		const ROUTER = useRouter();
		const data = reactive({
			visible: false,
			dialogVisible: false,
			playerId: 0,
			password: '',
			infoVO: {
				id:"",
				username: '',
				nickname: '',
				mobile: '',
				gender: '',
				email: '',
				cardNo: '',
				shopId: '',
				areaId: '',
				status: '',
				countryId: '',
				minBirthday: '',
				maxBirthday: '',
				minRegisterTime: '',
				maxRegisterTime: '',
				pageIndex: 1,
				pageSize: 10
			},
			columns: [
				{
					title: 'ID',
					dataIndex: 'id'
				},
				{
					title: i18n('default.147') + 'ID',
					dataIndex: 'username'
				},
				{
					title: i18n('default.161'),
					slots: { customRender: 'cardList' }
				},
				{
					title: i18n('default.104'),
					dataIndex: 'nickname',
					slots: { customRender: 'nickname' }
				},
				{
					title: i18n('default.90'),
					dataIndex: 'mobile'
				},
				{
					title: i18n('default.23'),
					dataIndex: 'countryName'
				},
				{
					title: i18n('default.23'),
					dataIndex: 'areaName'
				},
				{
					title: i18n('default.108'),
					dataIndex: 'birthday'
				},
				{
					title: i18n('default.160'),
					dataIndex: 'registerTime'
				},
				{
					title: i18n('default.2'),
					dataIndex: 'shopName',
					slots: { customRender: 'shopName' }
				},
				{
					title: i18n('default.105'),
					slots: { customRender: 'gender' }
				},
				{
					title: i18n('default.162'),
					slots: { customRender: 'type' }
				},
				{
					title: i18n('default.169'),
					slots: { customRender: 'handle' }
				}
			],
			typeList: [
				{ id: 1, label: i18n('default.150') },
				{ id: 2, label: i18n('default.26') },
				{ id: 3, label: i18n('default.151') },
				{ id: 4, label: i18n('default.152') },
				{ id: 5, label: i18n('default.153') }
			],
			total: 1,
			shopList: [],
			// cardList: [{cardNo:""}],
			tableList: [],
			countryList: [{id:'',name:""}],
			areaList: [{id:'',name:""}],
			disabledStartDate: (startValue: any) => {
				if (!startValue || !data.infoVO.maxBirthday) {
					return false;
				}
				return startValue.valueOf() > new Date(data.infoVO.maxBirthday).valueOf();
			},
			disabledEndDate: (endValue: any) => {
				if (!endValue || !data.infoVO.minBirthday) {
					return false;
				}
				return new Date(data.infoVO.minBirthday).valueOf() >= endValue.valueOf();
			},
			disabledMinRegisterTime: (startValue: any) => {
				if (!startValue || !data.infoVO.maxRegisterTime) {
					return false;
				}
				return startValue.valueOf() > new Date(data.infoVO.maxRegisterTime).valueOf();
			},
			disabledMaxRegisterTime: (endValue: any) => {
				if (!endValue || !data.infoVO.minRegisterTime) {
					return false;
				}
				return new Date(data.infoVO.minRegisterTime).valueOf() >= endValue.valueOf();
			},
			shopSearch(value: any) {
				shopListHttp({ name: value.split("'").join(''), pageSize: 999 }).then((res) => {
					data.shopList = res.data.data.list;
				});
			},
			// UserCardSearch(value: any) {
			// 	if (value.length > 3) {
			// 		UserCardListHttp({ cardNo: value.split("'").join(''), pageSize: 99999 }).then((res) => {
			// 			data.cardList = res.data.data.list;
			// 		});
			// 	}
			// },
			handlePassword: (id: number) => {
				data.visible = true;
				data.playerId = id;
			},
			playerDelete: (id: number) => {
				data.dialogVisible = true;
				data.playerId = id;
			},
			afterClose: (value: boolean) => {
				data.dialogVisible = value;
			},
			handledialogOK: () => {
				GameUserDeleteHttp([data.playerId]).then((res: any) => {
					if (res.data.code === 100) {
						message.success(res.data.msg);
						data.dialogVisible = false;
						data.search();
					} else {
						message.warning(res.data.msg);
					}
				});
			},
			handleCancel: () => {
				data.visible = false;
			},
			handleOk: () => {
				const obj = {
					memberId: data.playerId,
					newPassword: MD5(data.password)
				};
				GameUserRestorePasswordHttp(qs.stringify(obj)).then((res: any) => {
					if (res.data.code === 100) {
						message.success(res.data.msg);
						data.visible = false;
						data.password = '';
					} else {
						message.warning(res.data.msg);
					}
				});
			},
			countryChange: () => {
				data.infoVO.areaId = '';
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getAreaList();
			},
			handleCreate: () => {
				ROUTER.push({
					path: 'GameUserInfo'
				});
			},
			handleCardClick: (id: number) => {
				ROUTER.push({
					path: 'GameUserInfo',
					query: { id }
				});
			},
			handleUserName: (id: number) => {
				ROUTER.push({
					path: 'GameUserInfo',
					query: { id }
				});
			},
			handleShopClick: (id: number) => {
				ROUTER.push({
					path: 'EditorShop',
					query: { id }
				});
			},
			pageChange: (index: number) => {
				data.infoVO.pageIndex = index;
				data.search();
			},
			search: () => {
				GameUserListHttp(data.infoVO).then((res: any) => {
					if (res.data.data) {
						data.tableList = res.data.data.list;
						data.total = res.data.data.totalCount;
					}
				});
			}
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
			data.search();
			getCountryList();
			getAreaList();
		};
		onMounted(() => {
			init();
		});
		return {
			...toRefs(data),
			formRef
		};
	}
});
</script>

<style scoped>
#birthday {
	width: 100%;
}
.handleBtnDiv {
	display: flex;
	justify-content: space-between;
}
.tableRollBox {
	max-height: 100px;
	overflow-y: auto;
}
</style>
