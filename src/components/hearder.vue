<template>
	<div>
		<a-row class="hearder">
			<a-col :span="4" class="logoBox">
				<div class="imgBox">
					<img :src="logoImg" alt="" />
				</div>
			</a-col>
			<a-col :span="14">
				<div class="breadCrumb">
					<div v-for="(item, index) in metaList" :key="index">
						<a-button type="link" size="small" @click="ROUTER.push(item.path)">{{ $t(item.label) }}</a-button>
						<span v-if="index !== metaList.length - 1">/</span>
					</div>
				</div>
			</a-col>
			<a-col :span="1" :offset="2" class="languageStyle">{{ $t('default.0') }}</a-col>
			<a-col :span="2" class="languageStyle">
				<a-select v-model:value="$i18n.locale" size="small">
					<a-select-option v-for="item in languageList" :key="item.key" :value="item.key">{{ item.label }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :span="1" class="loginOutBox">
				<div class="box">
					<div class="userBox">
						<UserOutlined />
						<span>{{ username }}</span>
					</div>
					<div class="showBox">
						<div @click="Modify">
							<UserOutlined />
							{{ $t('default.99') }}
						</div>
						<div @click="Change">
							<UserOutlined />
							{{ $t('default.100') }}
						</div>
						<div @click="Logout">
							<UserOutlined />
							{{ $t('default.101') }}
						</div>
					</div>
				</div>
			</a-col>
		</a-row>

		<a-modal v-model:visible="infoVisible" class="deleteBox" :title="$t('default.99')" centered width="50%">
			<a-row class="rowStyle">
				<a-col :span="4" class="labelText">{{ $t('default.90') }}</a-col>
				<a-col :span="8">
					<a-input v-model:value="modifyVO.mobile" allow-clear />
				</a-col>
				<a-col :span="4" class="labelText">{{ $t('default.104') }}</a-col>
				<a-col :span="8">
					<a-input v-model:value="modifyVO.nickname" allow-clear />
				</a-col>
			</a-row>
			<a-row class="rowStyle">
				<a-col :span="4" class="labelText">{{ $t('default.105') }}</a-col>
				<a-col :span="8">
					<a-select v-model:value="modifyVO.gender" class="selectBox" allow-clear>
						<a-select-option :value="0">{{ $t('default.106') }}</a-select-option>
						<a-select-option :value="1">{{ $t('default.107') }}</a-select-option>
					</a-select>
				</a-col>
				<a-col :span="4" class="labelText">{{ $t('default.108') }}</a-col>
				<a-col :span="8" class="datePicker">
					<a-date-picker v-model:value="modifyVO.birthday" />
				</a-col>
			</a-row>
			<template #footer>
				<a-row type="flex" justify="center">
					<a-button type="primary" @click="changeInfoBtn">{{ $t('default.18') }}</a-button>
				</a-row>
			</template>
		</a-modal>

		<a-modal v-model:visible="passwordVisible" class="deleteBox" :title="$t('default.100')" centered>
			<a-row class="rowStyle">
				<a-col :span="6" class="labelText">{{ $t('default.102') }}</a-col>
				<a-col :span="18">
					<a-input v-model:value="infoVO.oldPassword" type="password" allow-clear />
				</a-col>
			</a-row>
			<a-row class="rowStyle">
				<a-col :span="6" class="labelText">{{ $t('default.103') }}</a-col>
				<a-col :span="18">
					<a-input v-model:value="infoVO.newPasswordOne" type="password" allow-clear />
				</a-col>
			</a-row>
			<a-row class="rowStyle">
				<a-col :span="6" class="labelText">{{ $t('default.103') }}</a-col>
				<a-col :span="18">
					<a-input v-model:value="infoVO.newPasswordTwo" type="password" allow-clear />
				</a-col>
			</a-row>
			<template #footer>
				<a-row type="flex" justify="center">
					<a-button type="primary" @click="hancleOk">{{ 'OK' }}</a-button>
				</a-row>
			</template>
		</a-modal>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from 'vue';
import { UserOutlined } from '@ant-design/icons-vue';
import { useRoute, useRouter } from 'vue-router';
import { changePasswordHttp, changeInfoHttp } from '@/api/api';
import { message } from 'ant-design-vue';
import { MD5 } from '@/components/common/tools';
export default defineComponent({
	name: 'hearder',
	components: {
		UserOutlined
	},
	setup() {
		const ROUTER = useRouter();
		const ROUTE = useRoute();
		const metaList = computed(() => {
			const list: any[] = [];
			for (const item of Object.values(ROUTE.meta)) {
				list.push(item);
			}
			return list;
		});
		const data = reactive({
			modifyVO: {
				mobile: sessionStorage.getItem('mobile'),
				nickname: sessionStorage.getItem('nickname'),
				gender: Number(sessionStorage.getItem('gender')),
				birthday: sessionStorage.getItem('birthday')
			},
			infoVO: {
				oldPassword: '',
				newPasswordOne: '',
				newPasswordTwo: ''
			},
			languageList: [
				{ key: 'zh-cn', label: '简体中文' },
				{ key: 'zh-ft', label: '繁体中文' },
				{ key: 'en-us', label: '英文' }
			],
			infoVisible: false,
			passwordVisible: false,
			logoImg: require('@/assets/logo.png'),
			username: sessionStorage.getItem('username'),
			Modify: () => {
				data.infoVisible = true;
			},
			Change: () => {
				data.passwordVisible = true;
			},
			hancleOk: () => {
				if (!data.infoVO.oldPassword || !data.infoVO.newPasswordOne || !data.infoVO.newPasswordTwo) {
					message.warning('请输入密码');
					return;
				}
				if (data.infoVO.newPasswordOne !== data.infoVO.newPasswordTwo) {
					message.warning('两次密码输入不一致');
					data.infoVO.newPasswordTwo = '';
				} else {
					const formData = new FormData();
					formData.append('oldPassword', MD5(data.infoVO.oldPassword));
					formData.append('newPassword', MD5(data.infoVO.newPasswordTwo));
					changePasswordHttp(formData).then((res: any) => {
						if (res.data.code === 100) {
							data.passwordVisible = false;
						}
						message.warning(res.data.msg);
					});
				}
			},
			changeInfoBtn: () => {
				changeInfoHttp(data.modifyVO).then((res) => {
					if (res.data.code === 100) {
						data.infoVisible = false;
					}
					message.warning(res.data.msg);
				});
			},
			Logout: () => {
				sessionStorage.removeItem('userId');
				sessionStorage.removeItem('nickname');
				sessionStorage.removeItem('token');
				ROUTER.push('/');
			}
		});
		return {
			...toRefs(data),
			metaList,
			ROUTER
		};
	}
});
</script>

<style scoped>
.hearder {
	height: 51px;
	border-bottom: 1px solid #999;
}
.logoBox {
	background: #001529;
}
.imgBox {
	height: 50px;
	display: flex;
	border-right: 1px solid #001529;
	justify-content: center;
	align-items: center;
}
.loginOutBox {
	background: #fff;
	display: flex;
	justify-content: flex-end;
}
.userBox {
	line-height: 50px;
	font-size: 20px;
	cursor: pointer;
}
.box:hover .showBox {
	display: block;
}
.showBox {
	width: 150px;
	height: 90px;
	border: 1px solid #999;
	position: absolute;
	z-index: 1;
	right: 0px;
	background: #eee;
	font-size: 14px;
	display: none;
}
.showBox div {
	height: 30px;
	line-height: 30px;
	cursor: pointer;
}
.showBox div:hover {
	background: #888;
	color: #fff;
}
.languageStyle {
	line-height: 50px;
	text-align: center;
}
.languageStyle div {
	width: 100px;
}
.breadCrumb {
	height: 50px;
	line-height: 50px;
	font-size: 16px;
	display: flex;
}
.breadCrumb::before {
	display: block;
	content: '';
	background: red;
	width: 3px;
}
</style>
