<template>
	<div>
		<labelTitle :value="$t('default.172')" />
		<div class="searchBox">
			<a-row class="rowStyle">
				<a-col :span="2" class="labelText">
					{{ 'ID' }}
				</a-col>
				<a-col :span="4">
					<a-input v-model:value="infoVO.id" allowClear />
				</a-col>
				<a-col :span="2" class="labelText">
					{{ $t('default.161') }}
				</a-col>
				<a-col :span="4">
					<a-select
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
					</a-select>
				</a-col>
				<a-col :span="2" class="labelText">
					{{ $t('default.173') }}
				</a-col>
				<a-col :span="2" class="datePicker">
					<a-date-picker v-model:value="infoVO.minBindTime" :disabled-date="disabledStartDate" valueFormat="yyyy-MM-DD 00:00:00" allow-clear />
				</a-col>
				<a-col :span="2" class="datePicker">
					<a-date-picker v-model:value="infoVO.maxBindTime" :disabled-date="disabledEndDate" valueFormat="yyyy-MM-DD 00:00:00" allow-clear />
				</a-col>
				<a-col :span="2" class="labelText">
					{{ $t('default.154') }}
				</a-col>
				<a-col :span="4">
					<a-select
					class="selectBox"
						show-search
						v-model:value="infoVO.memberId"
						:default-active-first-option="false"
						:show-arrow="false"
						:filter-option="false"
						:not-found-content="null"
						placeholder="Enter more than 4"
						@search="MemberSearch"
						allowClear
					>
						<a-select-option v-for="member in memberList" :key="member.id">
							<div :title="member.nickname">{{ member.nickname }}</div>
						</a-select-option>
					</a-select>
				</a-col>
			</a-row>

			<a-row class="rowStyle">
				<a-col :span="2" class="labelText">
					{{ $t('default.149') }}
				</a-col>
				<a-col :span="4">
					<a-select v-model:value="infoVO.type" class="selectBox" allowClear>
						<a-select-option :value="1">{{ 'home' }}</a-select-option>
						<a-select-option :value="2">{{ 'business' }}</a-select-option>
						<a-select-option :value="3">{{ 'league' }}</a-select-option>
					</a-select>
				</a-col>
				<a-col :span="2" class="labelText">
					{{ $t('default.139') }}
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
			<a-col :span="1" id="file">
				<a-upload v-model:file-list="fileList" name="file" :action="uploadObj.src" :headers="uploadObj.headers" @change="handleUploadChange">
					<a-button type="danger" size="small">{{ $t('default.177') }}</a-button>
				</a-upload>
			</a-col>
			<a-col :span="1">
				<a-button type="danger" size="small" @click="download">{{ $t('default.178') }}</a-button>
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-table bordered :columns="columns" :data-source="tableList" :pagination="false" rowKey="id" class="tableStyle">
				<template #card="{ record }">
					<a-button type="link" size="small" @click="handleCardClick(record.id, record.memberName)">{{ record.cardNo }}</a-button>
				</template>
				<template #nickname="{ record }">
					<a-button type="link" size="small" @click="handleMemberName(record.memberId)">{{ record.memberName }}</a-button>
				</template>
				<template #gender="{ record }">
					<div>{{ record.gender ? $t('default.106') : $t('default.107') }}</div>
				</template>
				<template #type="{ record }">
					<div v-if="record.type === 1">{{ 'home' }}</div>
					<div v-if="record.type === 2">{{ 'business' }}</div>
					<div v-if="record.type === 5">{{ 'league' }}</div>
				</template>
				<template #status="{ record }">
					<div v-if="record.status === 1">{{ $t('default.174') }}</div>
					<div v-else>{{ $t('default.175') }}</div>
				</template>
				<template #handle="{ record }">
					<a-button type="danger" size="small" @click="UserCardDelete(record.id)">{{ $t('default.10') }}</a-button>
				</template>
			</a-table>
		</a-row>
		<div class="paginationStyle">
			<a-pagination show-quick-jumper v-model:current="infoVO.pageIndex" :total="total" @change="pageChange" />
		</div>
		<div v-if="visible">
			<a-modal v-model:visible="visible" width="40%" :title="$t('default.176')" :footer="null" centered>
				<a-form ref="formRef" :model="createUserCardObj" :rules="rules" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
					<a-form-item v-if="!userCardId" :label="$t('default.161')" name="cardNo">
						<a-input v-model:value="createUserCardObj.cardNo" allowClear />
					</a-form-item>
					<a-form-item :label="$t('default.154')" name="memberId">
						<a-select
						class="selectBox"
							show-search
							v-model:value="createUserCardObj.memberId"
							:default-active-first-option="false"
							:show-arrow="false"
							:filter-option="false"
							:not-found-content="null"
							@search="MemberSearch"
							allowClear
						>
							<a-select-option v-for="member in memberList" :key="member.id">
								<div :title="member.nickname">{{ member.nickname }}</div>
							</a-select-option>
						</a-select>
					</a-form-item>
					<a-form-item :label="$t('default.149')">
						<a-select v-model:value="createUserCardObj.type" class="selectBox" allowClear>
							<a-select-option :value="1">{{ 'home' }}</a-select-option>
							<a-select-option :value="2">{{ 'business' }}</a-select-option>
							<a-select-option :value="5">{{ 'league' }}</a-select-option>
						</a-select>
					</a-form-item>
					<a-form-item :label="$t('default.139')">
						<a-select v-model:value="createUserCardObj.status" class="selectBox" allowClear>
							<a-select-option :value="1">{{ $t('default.174') }}</a-select-option>
							<a-select-option :value="0">{{ $t('default.175') }}</a-select-option>
						</a-select>
					</a-form-item>
					<a-form-item v-if="!userCardId" label="Secret Key" name="secretKey">
						<a-input v-model:value="createUserCardObj.secretKey" allowClear />
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
		<DeleteDialog :visible="dialogVisible" @afterClose="afterClose" @handleOk="handledialogOK" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
import labelTitle from '@/components/labelTitle.vue';
import { UserCardListHttp, GameUserListHttp, UserCreateHttp, UserUpdateHttp, UserInfoHttp, UserCardDeleteHttp, UserCardDownloadHttp } from '@/api/api';
import DeleteDialog from '@/components/common/DeleteDialog.vue';
import { i18n, uploadObj } from '@/components/common/tools';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
export default defineComponent({
	name: 'SettlementInfo',
	components: {
		labelTitle,
		DeleteDialog
	},
	setup() {
		const formRef: any = ref(null);
		const fileList: any = ref(null);
		const ROUTER = useRouter();
		const checkMember = async (rule: any, value: number) => {
			if (!value) {
				return Promise.reject(i18n('Please select member'));
			}
		};
		const data = reactive({
			uploadObj,
			visible: false,
			dialogVisible: false,
			userCardId: 0,
			infoVO: {
				id: '',
				cardNo: '',
				memberId: '',
				type: '',
				status: '',
				minBindTime: '',
				maxBindTime: '',
				pageIndex: 1,
				pageSize: 10
			},
			createUserCardObj: {
				cardNo: '',
				memberId: '',
				type: 1,
				status: 1,
				secretKey: ''
			},
			columns: [
				{
					title: 'ID',
					dataIndex: 'id'
				},
				{
					title: i18n('default.161'),
					slots: { customRender: 'card' }
				},
				{
					title: i18n('default.154'),
					slots: { customRender: 'nickname' }
				},
				{
					title: i18n('default.173'),
					dataIndex: 'bindTime'
				},
				{
					title: i18n('default.149'),
					slots: { customRender: 'type' }
				},
				{
					title: i18n('default.139'),
					slots: { customRender: 'status' }
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
			rules: {
				cardNo: [{ required: true, message: 'Please input card', trigger: 'blur' }],
				memberId: [{ required: true, message: 'Please select member', validator: checkMember }],
				secretKey: [{ required: true, message: 'Please input key', trigger: 'blur' }]
			},
			total: 1,
			cardList: [],
			memberList: [],
			tableList: [],
			disabledStartDate: (startValue: any) => {
				if (!startValue || !data.infoVO.maxBindTime) {
					return false;
				}
				return startValue.valueOf() > new Date(data.infoVO.maxBindTime).valueOf();
			},
			disabledEndDate: (endValue: any) => {
				if (!endValue || !data.infoVO.minBindTime) {
					return false;
				}
				return new Date(data.infoVO.minBindTime).valueOf() >= endValue.valueOf();
			},
			UserCardSearch(value: any) {
				if (value.length > 3) {
					UserCardListHttp({ cardNo: value.split("'").join(''), pageSize: 9999 }).then((res) => {
						data.cardList = res.data.data.list;
					});
				}
			},
			MemberSearch(value: any) {
				GameUserListHttp({ nickname: value.split("'").join(''), pageSize: 999 }).then((res) => {
					data.memberList = res.data.data.list;
				});
			},
			handleCardClick: (id: number, memberName: string) => {
				data.visible = true;
				data.userCardId = id;
				data.MemberSearch(memberName);
				UserInfoHttp({ memberCardId: id }).then((res: any) => {
					const responseData = res.data.data;
					data.createUserCardObj.cardNo = responseData.cardNo;
					data.createUserCardObj.memberId = responseData.memberId;
					data.createUserCardObj.type = responseData.type;
					data.createUserCardObj.secretKey = responseData.secretKey;
					data.createUserCardObj.status = responseData.status;
				});
			},
			playerDelete: (id: number) => {
				data.dialogVisible = true;
				data.userCardId = id;
			},
			afterClose: (value: boolean) => {
				data.dialogVisible = value;
			},
			handledialogOK: () => {
				UserCardDeleteHttp([data.userCardId]).then((res: any) => {
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
			handleCreate: () => {
				data.visible = true;
				data.userCardId = 0;
				data.createUserCardObj.cardNo = '';
				data.createUserCardObj.memberId = '';
				data.createUserCardObj.type = 1;
				data.createUserCardObj.status = 1;
				data.createUserCardObj.secretKey = '';
			},
			handleOk: () => {
				interface ObjProp {
					id?: string | number;
					cardNo?: string | number;
					memberId: string | number;
					type: string | number;
					status: string | number;
					secretKey?: string | number;
				}
				let flag: any = null;
				const obj: ObjProp = {
					id: '',
					cardNo: '',
					memberId: '',
					type: '',
					status: '',
					secretKey: ''
				};
				if (data.userCardId) {
					flag = UserUpdateHttp;
					obj.id = data.userCardId;
					obj.memberId = data.createUserCardObj.memberId;
					obj.type = data.createUserCardObj.type;
					obj.status = data.createUserCardObj.status;
				} else {
					flag = UserCreateHttp;
					obj.cardNo = data.createUserCardObj.cardNo;
					obj.memberId = data.createUserCardObj.memberId;
					obj.type = data.createUserCardObj.type;
					obj.status = data.createUserCardObj.status;
					obj.secretKey = data.createUserCardObj.secretKey;
				}
				formRef.value
					.validate()
					.then(() => {
						flag(obj).then((res: any) => {
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
			},
			handleMemberName: (id: number) => {
				ROUTER.push({
					path: 'GameUserInfo',
					query: { id }
				});
			},
			UserCardDelete: (id: number) => {
				data.dialogVisible = true;
				data.userCardId = id;
			},
			pageChange: (index: number) => {
				data.infoVO.pageIndex = index;
				data.search();
			},
			search: () => {
				UserCardListHttp(data.infoVO).then((res: any) => {
					if (res.data.data) {
						data.tableList = res.data.data.list;
						data.total = res.data.data.totalCount;
					}
				});
			},
			handleUploadChange: (info: any) => {
				if (info.file.status === 'done' && info.file.response.code === 100) {
					message.success(`${info.file.response.msg}`);
				}
				if (info.file.status === 'done' && info.file.response.code !== 100) {
					alert(info.file.response.msg);
					// message.error(`${info.file.response.msg}`);
				}
			},
			download: () => {
				UserCardDownloadHttp(data.infoVO).then((res: any) => {
					if (res.data) {
						const url = window.URL.createObjectURL(res.data);
						const a = document.createElement('a');
						document.body.appendChild(a);
						a.href = url;
						a.download = res.headers['content-disposition'].split(' ')[1];
						a.click();
						window.URL.revokeObjectURL(url);
					} else {
						message.error(res.data);
					}
				});
			}
		});
		const init = () => {
			data.search();
		};
		onMounted(() => {
			init();
		});
		return {
			...toRefs(data),
			fileList,
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
#file >>> .ant-upload-list {
	display: none;
}
</style>
