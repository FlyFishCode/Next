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
				<a-col v-if="handleRoleRules()" :span="2" class="labelText">
					{{ $t('default.23') }}
				</a-col>
				<a-col v-if="handleRoleRules()" :span="4">
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
						<a-select-option v-for="item in searchTypeList" :key="item.id" :value="item.id">{{ item.label }}</a-select-option>
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
			<a-table bordered :columns="columns" :data-source="tableList" :pagination="false" rowKey="id" :onChange="tableChange" class="tableStyle">
				<template #username="{ record }">
					<div v-if="RoleType === '2' && record.type === 3">
						<div>{{ record.username }}</div>
					</div>
					<div v-else>
						<a-button type="link" size="small" @click="handleUserName(record.id)">{{ record.username }}</a-button>
					</div>
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
				<template #handleBtn="{ record }">
					<div v-if="showDeleteBtn(record.type)" class="handleBox">
						<a-button type="primary" size="small" @click="handleResetPassword(record.id)">{{ $t('default.168') }}</a-button>
						<a-button type="danger" size="small" @click="handleBtnClick(record.id)">{{ $t('default.10') }}</a-button>
					</div>
				</template>
			</a-table>
		</a-row>
		<div class="paginationStyle">
			<a-pagination show-quick-jumper v-model:current="infoVO.pageIndex" rowKey="id" :total="total" @change="pageChange" />
		</div>
	</div>
	<a-modal v-model:visible="ResetPasswordDialog" :title="$t('default.168')" @ok="handlePasswordOk" centered>
		<a-form ref="dialogFormRef" :model="resetDialogObj" :rules="resetDialogRules" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
			<a-form-item :label="$t('default.168')" name="password">
				<a-input v-model:value="resetDialogObj.password" type="password" allowClear />
			</a-form-item>
			<a-form-item :label="$t('default.157')" name="comfimPassword">
				<a-input v-model:value="resetDialogObj.comfimPassword" type="password" allowClear />
			</a-form-item>
		</a-form>
	</a-modal>
	<div v-if="visible">
		<a-modal v-model:visible="visible" width="40%" :title="$t('default.147')" :footer="null" centered>
			<a-form ref="formRef" :model="otherObj" :rules="rules" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
				<a-form-item :label="$t('default.148')" name="username">
					<a-input v-model:value="otherObj.username" allowClear :disabled="otherObj.id ? true : false" />
				</a-form-item>
				<a-form-item :label="$t('default.104')" name="nickname">
					<a-input v-model:value="otherObj.nickname" allowClear />
				</a-form-item>
				<a-form-item :label="$t('default.23')" name="countryId">
					<a-select v-model:value="otherObj.countryId">
						<a-select-option v-for="item in countryList" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
					</a-select>
				</a-form-item>
				<a-form-item v-if="!otherObj.id" :label="$t('default.156')" name="password">
					<a-input v-model:value="otherObj.password" type="password" allowClear />
				</a-form-item>
				<a-form-item v-if="!otherObj.id" :label="$t('default.157')" name="confirmPassword">
					<a-input v-model:value="otherObj.confirmPassword" type="password" allowClear />
				</a-form-item>
				<a-form-item :label="$t('default.90')" name="mobile">
					<a-input v-model:value="otherObj.mobile" allowClear />
				</a-form-item>
				<a-form-item :label="$t('default.108')" name="birthday">
					<a-date-picker v-model:value="otherObj.birthday" valueFormat="yyyy-MM-DD 00:00:00" allow-clear />
				</a-form-item>
				<a-form-item :label="$t('default.149')">
					<a-select v-model:value="otherObj.type" class="selectBox" :disabled="typeDisabled">
						<a-select-option v-for="item in dialogTypeList" :key="item.id" :value="item.id">{{ $t(item.label) }}</a-select-option>
					</a-select>
				</a-form-item>
				<a-form-item :label="$t('default.192')" v-if="handleTypeDisplay(otherObj.type)" name="superUserId">
					<a-select
						show-search
						v-model:value="otherObj.superUserId"
						:disabled="superDisabled"
						:default-active-first-option="false"
						:show-arrow="false"
						:filter-option="false"
						:not-found-content="null"
						@search="agentSearch"
					>
						<a-select-option v-for="d in agentList" :key="d.id">
							<div :title="d.name">{{ d.name }}</div>
						</a-select-option>
					</a-select>
				</a-form-item>
				<a-form-item :label="$t('default.105')">
					<a-select v-model:value="otherObj.gender" class="selectBox">
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
	</div>
	<DeleteDialog :visible="deleteVisible" @afterClose="afterClose" @handleOk="handleDeleteOK" />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
import labelTitle from '@/components/labelTitle.vue';
import DeleteDialog from '@/components/common/DeleteDialog.vue';
import { systemUserListHttp, addUserHttp, modifyUserHttp, searchUserHttp, countryListHttp, agentListHttp, deleteUserHttp, resetUserPasswordHttp } from '@/api/api';
import { i18n } from '@/components/common/tools';
import { message } from 'ant-design-vue';
import { MD5 } from '@/components/common/tools';
import qs from 'qs';
export default defineComponent({
	name: 'SettlementInfo',
	components: {
		labelTitle,
		DeleteDialog
	},
	setup() {
		const formRef: any = ref(null);
		const dialogFormRef: any = ref(null);
		const RoleType: any = sessionStorage.getItem('NextRoleType');
		const checkResetDialogPassword = async (rule: any, value: any) => {
			// eslint-disable-next-line @typescript-eslint/no-use-before-define
			if (data.resetDialogObj.password !== value) {
				return Promise.reject('两次密码不一致！');
			}
		};
		const checkUserName = async (rule: any, value: any) => {
			// const exg = /^[a-zA-Z]\w{4,15}$/;
			if (value) {
				// if (!exg.test(value)) {
				// 	return Promise.reject('字母开头，5-16位，可以数用字母、数字、下划线组合');
				// }
			} else {
				return Promise.reject('Please input username');
			}
		};
		const checkCountry = async (rule: any, value: number) => {
			if (!value) {
				return Promise.reject(i18n('default.155'));
			}
		};
		const checkagent = async (rule: any, value: number) => {
			if (!value) {
				return Promise.reject('Please input agent name');
			}
		};
		const passwordChange = async (rule: any, value: any) => {
			if (!value) {
				return Promise.reject(i18n('default.159'));
			}
			// eslint-disable-next-line @typescript-eslint/no-use-before-define
			if (data.otherObj.password !== value) {
				return Promise.reject(i18n('default.158'));
			} else {
				return Promise.resolve();
			}
		};
		const data = reactive({
			visible: false,
			deleteVisible: false,
			isDisabled: true,
			ResetPasswordDialog: false,
			typeDisabled: false,
			superDisabled: false,
			id: 0,
			resetPassword: '',
			resetUserId: 0,
			resetDialogObj: {
				password: '',
				comfimPassword: ''
			},
			infoVO: {
				sort: 1,
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
				password: '',
				confirmPassword: '',
				mobile: '',
				gender: 1,
				superUserId: '',
				birthday: '',
				countryId: '',
				type: 1
			},
			otherObj: {
				id: 0,
				username: '',
				nickname: '',
				password: '',
				mobile: '',
				gender: 1,
				confirmPassword: '',
				superUserId: '',
				birthday: '',
				countryId: '',
				type: 1
			},
			rules: {
				username: [{ required: true, validator: checkUserName }],
				nickname: [{ required: true, message: 'Please input nickname', trigger: 'blur' }],
				password: [{ required: true, message: i18n('default.159'), trigger: 'blur' }],
				mobile: [{ required: true, message: 'Please input mobile', trigger: 'blur' }],
				confirmPassword: [{ required: true, message: i18n('default.158'), validator: passwordChange }],
				countryId: [
					{
						required: true,
						message: i18n('default.155'),
						validator: checkCountry
					}
				],
				superUserId: [
					{
						required: true,
						message: 'Please input agent name',
						validator: checkagent
					}
				]
			},
			resetDialogRules: {
				password: [{ required: true, message: 'Please input Password', trigger: 'blur' }],
				comfimPassword: [{ required: true, validator: checkResetDialogPassword }]
			},
			columns: [
				{
					title: 'ID',
					dataIndex: 'id',
					sorter: true
				},
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
					title: i18n('default.23'),
					dataIndex: 'countryName'
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
					slots: { customRender: 'type' },
					dataIndex: 'type',
					sorter: true
				},
				{
					title: i18n('default.192'),
					dataIndex: 'superUserName'
				},
				{
					title: i18n('default.169'),
					width: 200,
					slots: { customRender: 'handleBtn' }
				}
			],
			searchTypeList: [
				{ id: 1, label: i18n('default.150') },
				{ id: 2, label: i18n('default.26') },
				{ id: 3, label: i18n('default.151') },
				{ id: 4, label: i18n('default.152') },
				{ id: 5, label: i18n('default.153') }
			],
			dialogTypeList: [
				{ id: 1, label: 'default.150' },
				{ id: 2, label: 'default.26' },
				{ id: 3, label: 'default.151' },
				{ id: 4, label: 'default.152' },
				{ id: 5, label: 'default.153' }
			],
			total: 1,
			agentList: [],
			tableList: [],
			countryList: [],
			areaList: [],
			tableChange: (pagination: any, filters: any, { columnKey, order }: any) => {
				if (columnKey === 'id') {
					if (order === 'ascend') {
						data.infoVO.sort = 1;
					} else {
						data.infoVO.sort = 2;
					}
				}
				if (columnKey === 'type') {
					if (order === 'ascend') {
						data.infoVO.sort = 3;
					} else {
						data.infoVO.sort = 4;
					}
				}
				data.search();
			},
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
			agentSearch: (value: any) => {
				agentListHttp({ agentName: value.split("'").join(''), pageSize: 999 }).then((res: any) => {
					data.agentList = res.data.data;
				});
			},
			afterClose: (value: boolean) => {
				data.deleteVisible = value;
			},
			handleTypeDisplay: (value: number) => {
				if (RoleType === '2') {
					return false;
				}
				if (value === 3 || value === 5) {
					return true;
				} else {
					data.otherObj.superUserId = '';
					return false;
				}
			},
			handleDeleteOK: () => {
				deleteUserHttp([data.id]).then((res: any) => {
					if (res.data.data) {
						message.info(res.data.msg);
						data.deleteVisible = false;
						data.search();
					}
				});
			},
			handlePasswordOk: () => {
				dialogFormRef.value.validate().then(() => {
					const obj = {
						newPassword: MD5(data.resetDialogObj.password),
						userId: data.resetUserId
					};
					resetUserPasswordHttp(qs.stringify(obj)).then((res: any) => {
						if (res.data.code === 100) {
							message.info(res.data.msg);
							data.ResetPasswordDialog = false;
							data.resetDialogObj.password = '';
							data.resetDialogObj.comfimPassword = '';
						} else {
							message.warning(res.data.msg);
						}
					});
				});
			},
			handleBtnClick: (id: number) => {
				data.id = id;
				data.deleteVisible = true;
			},
			handleResetPassword: (id: number) => {
				data.ResetPasswordDialog = true;
				data.resetUserId = id;
			},
			handleRoleRules: () => {
				if (RoleType === '2' || RoleType === '5') {
					return false;
				} else {
					return true;
				}
			},
			showDeleteBtn: (value: number) => {
				if (RoleType === '1' || (RoleType === '2' && value === 5)) {
					return true;
				} else {
					return false;
				}
			},
			handleCreate: () => {
				data.otherObj.id = 0;
				data.otherObj.username = '';
				data.otherObj.nickname = '';
				data.otherObj.countryId = '';
				data.otherObj.password = '';
				data.otherObj.confirmPassword = '';
				data.otherObj.mobile = '';
				data.otherObj.birthday = '';
				data.otherObj.superUserId = '';
				data.otherObj.gender = 1;
				if (RoleType === '2') {
					data.otherObj.type = 5;
					data.dialogTypeList = [{ id: 5, label: 'default.153' }];
				}
				data.visible = true;
			},
			handleUserName: (id: number) => {
				data.otherObj.id = id;
				searchUserHttp({ userId: id }).then((res: any) => {
					const responseData = res.data.data;
					data.otherObj.username = responseData.username;
					data.otherObj.nickname = responseData.nickname;
					data.otherObj.countryId = responseData.countryId;
					data.otherObj.mobile = responseData.mobile;
					data.otherObj.birthday = responseData.birthday;
					data.otherObj.type = responseData.type;
					data.otherObj.superUserId = responseData.superUserId;
					data.otherObj.gender = responseData.gender;
				});
				data.dialogTypeList = [
					{ id: 1, label: 'default.150' },
					{ id: 2, label: 'default.26' },
					{ id: 3, label: 'default.151' },
					{ id: 4, label: 'default.152' },
					{ id: 5, label: 'default.153' }
				];
				if (RoleType === '2') {
					data.typeDisabled = true;
				}
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
				if (data.otherObj.id) {
					flag = modifyUserHttp;
				} else {
					flag = addUserHttp;
				}
				formRef.value
					.validate()
					.then(() => {
						data.dialogObj.id = data.otherObj.id;
						data.dialogObj.username = data.otherObj.username;
						data.dialogObj.nickname = data.otherObj.nickname;
						data.dialogObj.password = MD5(data.otherObj.password);
						data.dialogObj.mobile = data.otherObj.mobile;
						data.dialogObj.gender = data.otherObj.gender;
						data.dialogObj.birthday = data.otherObj.birthday;
						data.dialogObj.superUserId = data.otherObj.superUserId || sessionStorage.getItem('NextUserId') || '';
						data.dialogObj.countryId = data.otherObj.countryId;
						data.dialogObj.type = data.otherObj.type;
						flag(data.dialogObj).then((res: any) => {
							if (res.data.code === 100) {
								message.success('ok');
								data.search();
								data.visible = false;
							} else {
								message.warning(res.data.msg);
							}
						});
					})
					.catch((error: any) => {
						console.log('error', error);
					});
			}
		});
		const getCountryList = () => {
			countryListHttp({}).then((res: any) => {
				if (res.data.data) {
					data.countryList = res.data.data.list;
				}
			});
		};
		const handleRole = () => {
			if (RoleType === '2') {
				data.searchTypeList = [
					{ id: 3, label: i18n('default.151') },
					{ id: 5, label: i18n('default.153') }
				];
				data.columns.splice(data.columns.length - 2, 1);
			}
		};
		const init = () => {
			handleRole();
			data.search();
			data.agentSearch('');
			getCountryList();
		};
		onMounted(() => {
			init();
		});
		return {
			...toRefs(data),
			formRef,
			RoleType,
			dialogFormRef
		};
	}
});
</script>

<style scoped>
#birthday {
	width: 100%;
}
.handleBox {
	display: flex;
	justify-content: space-around;
}
</style>
