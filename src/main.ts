import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { createI18n } from 'vue-i18n';

const i18n = createI18n({
	legacy: true,
	locale: 'zh-cn',
	messages: {
		'zh-cn': require('@/i18n/zh-cn')
	}
});

// 引入antd组件
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

// 动画本地引入
import '@/assets/css/animate.min.css';

const app = createApp(App);

// 不需要添加全局 需要使用的地方直接$i18n.locale
app.config.globalProperties.$i18n = i18n;

app.use(Antd);
app.use(store);
app.use(router);
app.mount('#app');
