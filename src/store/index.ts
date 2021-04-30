import { createStore } from 'vuex';

export default createStore({
	state: {
		// 当前登录人身份
		// 1:管理员
		// 2:代理商
		// 3:店家
		// 4:买家
		// 5:操作员
		role: 0
	},
	mutations: {
		setRole(state, value) {
			state.role = value;
		}
	},
	actions: {},
	modules: {}
});
