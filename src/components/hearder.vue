<template>
	<div>
		<a-row class="hearder">
			<a-col :span="4" class="logoBox">
				<div class="imgBox">
					<img :src="logoImg" alt="" />
				</div>
			</a-col>
			<a-col :span="4" :offset="16" class="loginOutBox">
				<div class="box">
					<div class="userBox">
						<UserOutlined />
						<span>{{ userName }}</span>
					</div>
					<div class="showBox">
						<div @click="Modify">
							<UserOutlined />
							{{ 'Modify Account Info' }}
						</div>
						<div @click="Change">
							<UserOutlined />
							{{ 'Change Password' }}
						</div>
						<div @click="Logout">
							<UserOutlined />
							{{ 'Login Out' }}
						</div>
					</div>
				</div>
			</a-col>
		</a-row>

		<a-modal v-model:visible="infoVisible" title="Modify Account Info" centered width="50%">
			<a-row class="rowStyle">
				<a-col :span="4" class="labelText">{{ 'Mobile' }}</a-col>
				<a-col :span="8">
					<a-input v-model:value="modifyVO.mobile" allow-clear />
				</a-col>
				<a-col :span="4" class="labelText">{{ 'Nickname' }}</a-col>
				<a-col :span="8">
					<a-input v-model:value="modifyVO.nickname" allow-clear />
				</a-col>
			</a-row>
			<a-row class="rowStyle">
				<a-col :span="4" class="labelText">{{ 'Gender' }}</a-col>
				<a-col :span="8">
					<a-select v-model:value="modifyVO.gender" class="selectBox" allow-clear>
						<a-select-option value="1">{{ 'Male' }}</a-select-option>
						<a-select-option value="2">{{ 'Female' }}</a-select-option>
					</a-select>
				</a-col>
				<a-col :span="4" class="labelText">{{ 'Birth' }}</a-col>
				<a-col :span="8" class="datePicker">
					<a-date-picker v-model:value="modifyVO.birth" />
				</a-col>
			</a-row>
			<template #footer>
				<a-row type="flex" justify="center">
					<a-button type="primary" @click="changeInfoBtn">{{ 'OK' }}</a-button>
				</a-row>
			</template>
		</a-modal>

		<a-modal v-model:visible="passwordVisible" title="Change Password" centered>
			<a-row class="rowStyle">
				<a-col :span="6" class="labelText">{{ 'Old Password' }}</a-col>
				<a-col :span="18">
					<a-input v-model:value="infoVO.oldPassword" type="password" allow-clear />
				</a-col>
			</a-row>
			<a-row class="rowStyle">
				<a-col :span="6" class="labelText">{{ 'New Password' }}</a-col>
				<a-col :span="18">
					<a-input v-model:value="infoVO.newPasswordOne" type="password" allow-clear />
				</a-col>
			</a-row>
			<a-row class="rowStyle">
				<a-col :span="6" class="labelText">{{ 'New Password' }}</a-col>
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
import { defineComponent, reactive, toRefs } from 'vue';
import { UserOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import { changePasswordHttp } from '@/api/api';
import { message } from 'ant-design-vue';
export default defineComponent({
	name: 'templete',
	components: {
		UserOutlined
	},
	setup() {
		const ROUTER = useRouter();
		const data = reactive({
			modifyVO: {
				mobile: '',
				nickname: sessionStorage.getItem('userName'),
				gender: '',
				birth: ''
			},
			infoVO: {
				oldPassword: '',
				newPasswordOne: '',
				newPasswordTwo: '',
				userId: sessionStorage.getItem('userId') || ''
			},
			infoVisible: false,
			passwordVisible: false,
			logoImg: require('@/assets/logo.png'),
			userName: sessionStorage.getItem('userName'),
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
					formData.append('oldPassword', data.infoVO.oldPassword);
					formData.append('newPassword', data.infoVO.newPasswordTwo);
					formData.append('userId', data.infoVO.userId);
					changePasswordHttp(formData).then((res: any) => {
						message.success(res.data.msg);
						data.passwordVisible = false;
					});
				}
			},
			changeInfoBtn: () => {
				data.infoVisible = false;
			},
			Logout: () => {
				sessionStorage.removeItem('userId');
				sessionStorage.removeItem('username');
				sessionStorage.removeItem('token');
				ROUTER.push('/');
			}
		});
		return {
			...toRefs(data)
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
</style>
