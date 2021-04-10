<template>
	<div>
		<labelTitle :value="$t('default.147')" />
		<div class="searchBox">
			<a-row class="rowStyle">
				<a-col :span="2" class="labelText">
					{{ $t('default.148') }}
				</a-col>
				<a-col :span="4">
					<a-input v-model:value="infoVO.username" allowClear />
				</a-col>
				<a-col :span="2" class="labelText">
					{{ $t('default.104') }}
				</a-col>
				<a-col :span="4" class="selectSearch">
					<a-input v-model:value="infoVO.nickname" allowClear />
				</a-col>
				<a-col :span="2" class="labelText">
					{{ $t('default.90') }}
				</a-col>
				<a-col :span="4">
					<a-input v-model:value="infoVO.mobile" allowClear />
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
					{{ $t('default.23') }}
				</a-col>
				<a-col :span="4">
					<a-select v-model:value="infoVO.countryId" class="selectBox" allowClear>
						<a-select-option v-for="item in countryList" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
					</a-select>
				</a-col>
				<!-- <a-col :span="2" class="labelText">
					{{ $t('default.24') }}
				</a-col>
				<a-col :span="4">
					<a-select v-model:value="infoVO.areaId" class="selectBox" allowClear>
						<a-select-option v-for="item in areaList" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
					</a-select>
				</a-col> -->
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
					{{ $t('default.149') }}
				</a-col>
				<a-col :span="4">
					<a-select v-model:value="infoVO.type" class="selectBox" allowClear>
						<a-select-option v-for="item in typeList" :key="item.id" :value="item.id">{{ item.label }}</a-select-option>
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
				<template #username="{ record }">
					<a-button type="link" size="small" @click="handleUserName(record.id)">{{ record.username }}</a-button>
				</template>
				<template #gender="{ record }">
					<div>{{ record.gender ? $t('default.106') : $t('default.107') }}</div>
				</template>
				<template #type="{ record }">
					<div v-if="record.type === 1">{{ $t('default.150') }}</div>
					<div v-if="record.type === 2">{{ $t('default.26') }}</div>
					<div v-if="record.type === 3">{{ $t('default.151') }}</div>
					<div v-if="record.type === 4">{{ $t('default.152') }}</div>
					<div v-if="record.type === 5">{{ $t('default.153') }}</div>
				</template>
			</a-table>
		</a-row>
		<div class="paginationStyle">
			<a-pagination show-quick-jumper v-model:current="infoVO.pageIndex" :total="total" @change="pageChange" />
		</div>
	</div>
	<a-modal v-model:visible="visible" width="40%" :title="$t('default.147')" :footer="null" centered>
		<a-form ref="formRef" :model="dialogObj" :rules="rules" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
			<a-form-item :label="$t('default.148')" name="username">
				<a-input v-model:value="dialogObj.username" />
			</a-form-item>
			<a-form-item :label="$t('default.104')" name="nickname">
				<a-input v-model:value="dialogObj.nickname" />
			</a-form-item>
			<a-form-item :label="$t('default.23')" name="country">
				<a-select v-model:value="dialogObj.countryId">
					<a-select-option v-for="item in countryList" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
				</a-select>
			</a-form-item>
			<a-form-item :label="$t('default.90')" name="mobile">
				<a-input v-model:value="dialogObj.mobile" />
			</a-form-item>
			<a-form-item :label="$t('default.108')" name="birthday">
				<a-date-picker v-model:value="dialogObj.birthday" valueFormat="yyyy-MM-DD 00:00:00" allow-clear />
			</a-form-item>
			<a-form-item :label="$t('default.149')">
				<a-select v-model:value="dialogObj.type" class="selectBox" allowClear>
					<a-select-option v-for="item in typeList" :key="item.id" :value="item.id">{{ item.label }}</a-select-option>
				</a-select>
			</a-form-item>
			<a-form-item :label="$t('default.105')">
				<a-select v-model:value="dialogObj.gender" class="selectBox">
					<a-select-option :value="1">{{ $t('default.106') }}</a-select-option>
					<a-select-option :value="0">{{ $t('default.107') }}</a-select-option>
				</a-select>
			</a-form-item>
		</a-form>
		<a-row class="rowStyle buttonBox">
			<a-col :span="3">
				<a-button @click="handleCancel">{{ $t('default.19') }}</a-button>
			</a-col>
			<a-col :span="3">
				<a-button type="primary" @click="handleOk">{{ $t('default.18') }}</a-button>
			</a-col>
		</a-row>
	</a-modal>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
import labelTitle from '@/components/labelTitle.vue';
import { systemUserListHttp, addUserHttp, modifyUserHttp, searchUserHttp, countryListHttp } from '@/api/api';
import { i18n } from '@/components/common/tools';
import { message } from 'ant-design-vue';
export default defineComponent({
	name: 'SettlementInfo',
	components: {
		labelTitle
	},
	setup() {
		const formRef: any = ref(null);
		const data = reactive({
			visible: false,
			infoVO: {
				username: '',
				nickname: '',
				mobile: '',
				gender: '',
				type: '',
				areaId: '',
				countryId: '',
				minBirthday: '',
				maxBirthday: '',
				pageIndex: 1,
				pageSize: 10
			},
			dialogObj: {
				id: 0,
				username: '',
				nickname: '',
				mobile: '',
				gender: 1,
				birthday: '',
				countryId: '',
				type: 1
			},
			rules: {
				username: [{ required: true, message: 'Please input username', trigger: 'blur' }],
				nickname: [{ required: true, message: 'Please input nickname', trigger: 'blur' }],
				country: [
					{
						required: true,
						message: 'Please select country',
						trigger: 'change',
						type: 'string',
						transform: (value: string) => {
							return String(value);
						}
					}
				]
			},
			columns: [
				{
					title: i18n('default.148'),
					slots: { customRender: 'username' }
				},
				{
					title: i18n('default.104'),
					dataIndex: 'nickname'
				},
				{
					title: i18n('default.90'),
					dataIndex: 'mobile'
				},
				{
					title: i18n('default.108'),
					dataIndex: 'birthday'
				},
				{
					title: i18n('default.105'),
					slots: { customRender: 'gender' }
				},
				{
					title: i18n('default.149'),
					slots: { customRender: 'type' }
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
			tableList: [],
			countryList: [],
			areaList: [],
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
			handleCreate: () => {
				data.visible = true;
			},
			handleUserName: (id: number) => {
				data.dialogObj.id = id;
				searchUserHttp({ userId: id }).then((res: any) => {
					const responseData = res.data.data;
					data.dialogObj.username = responseData.username;
					data.dialogObj.nickname = responseData.nickname;
					data.dialogObj.countryId = responseData.countryId;
					data.dialogObj.mobile = responseData.mobile;
					data.dialogObj.birthday = responseData.birthday;
					data.dialogObj.type = responseData.type;
					data.dialogObj.gender = responseData.gender;
				});
				data.visible = true;
			},
			pageChange: (index: number) => {
				data.infoVO.pageIndex = index;
				data.search();
			},
			search: () => {
				systemUserListHttp(data.infoVO).then((res: any) => {
					if (res.data.data) {
						data.tableList = res.data.data.list;
						data.total = res.data.data.totalCount;
					}
				});
			},
			handleCancel: () => {
				data.visible = false;
			},
			handleOk: () => {
				let flag: any = null;
				if (data.dialogObj.id) {
					flag = modifyUserHttp;
				} else {
					flag = addUserHttp;
				}
				formRef.value.validate().then(() => {
					const P1 = new Promise((resolve, reject) => {
						flag(data.dialogObj).then((res: any) => {
							if (res.data.code === 100) {
								resolve(true);
							} else {
								reject(false);
							}
						});
					});
					P1.then(() => {
						data.search();
						message.success('ok');
						data.visible = false;
					}).catch(() => {
						return false;
					});
				});
			}
		});
		const getCountryList = () => {
			countryListHttp({}).then((res: any) => {
				data.countryList = res.data.data.list;
			});
		};
		const init = () => {
			data.search();
			getCountryList();
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
</style>
