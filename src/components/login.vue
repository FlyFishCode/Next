<template>
	<div class="login">
		<div class="confim">
			<div class="darkbanner">
				<h3>ADarts</h3>
			</div>
			<div class="form">
				<a-input placeholder="username" v-model:value="userName" class="userBox">
					<template #prefix><user-outlined type="user"/></template>
				</a-input>
				<a-input placeholder="password" v-model:value="passWord" type="password" class="passBox" @keyup.enter="login">
					<template #prefix><LockOutlined /></template>
				</a-input>
				<a-row class="LoginButton">
					<a-button type="primary" size="small" @click="login">{{ $t('default.98') }}</a-button>
				</a-row>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
// import { useStore } from 'vuex';
import { loginHttp } from '@/api/api';
import { MD5 } from '@/components/common/tools';
export default defineComponent({
	name: 'templete',
	components: {
		UserOutlined,
		LockOutlined
	},
	setup() {
		// const STORE = useStore();
		const ROUTER = useRouter();
		const data = reactive({
			userName: '',
			passWord: '',
			login: () => {
				const formData = new FormData();
				formData.append('username', data.userName);
				formData.append('password', MD5(data.passWord));
				loginHttp(formData).then((res: any) => {
					if (res.data.code === 100) {
						const data = res.data.data;
						sessionStorage.setItem('NextUserId', data.userId);
						sessionStorage.setItem('NextToken', data.token);
						sessionStorage.setItem('NextNickname', data.nickname);
						sessionStorage.setItem('NextBirthday', data.birthday || '');
						sessionStorage.setItem('NextGender', data.gender);
						sessionStorage.setItem('NextMobile', data.mobile);
						sessionStorage.setItem('NextUserType', data.type);
						sessionStorage.setItem('NextAgentId', data.agentId);
						// STORE.commit('setRole', data.type);
						message.info(res.data.msg);
						ROUTER.push('index');
					} else {
						message.warning(res.data.msg);
					}
				});
			}
		});
		return {
			...toRefs(data)
		};
	}
});
</script>

<style scoped>
.login {
	height: 100%;
	background: #1abc9c;
}
.userBox {
	margin: 50px 0 20px 0;
}
.confim {
	position: absolute;
	right: 20%;
	top: 20%;
}
.form {
	width: 330px;
	height: 330px;
	font-size: 16px;
	border: 1px solid #eee;
	background: #ffffff;
	padding: 45px 20px 0 20px;
	box-sizing: border-box;
	box-shadow: rgba(0, 0, 0, 0.35) 0px 0px 10px;
}
.LoginButton {
	margin-top: 30px;
}
.LoginButton button {
	width: 100%;
	background: #1abc9c;
	border-color: #1abc9c;
	margin-top: 15px;
	height: 50px;
}
.darkbanner {
	width: 370px;
	background: #424242;
	padding: 8px 10px 10px 40px;
	position: relative;
	left: -20px;
	top: 70px;
	box-sizing: border-box;
	height: 45px;
}
.darkbanner h3 {
	margin: 0;
	color: #ffffff;
}
.darkbanner::after {
	display: inline-block;
	content: ' ';
	position: absolute;
	width: 0;
	height: 0;
	border: 20px solid transparent;
	border-right-color: #424242;
	left: -20px;
	bottom: -20px;
}
</style>
