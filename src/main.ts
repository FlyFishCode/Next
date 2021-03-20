import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { createI18n } from 'vue-i18n';
// 引入el table组件
// import { ElTable, ElTableColumn, ElPagination } from 'element-plus';
// import 'element-plus/lib/theme-chalk/index.css';

const i18n = createI18n({
	legacy: true,
	locale: 'zh-cn',
	messages: {
		'zh-cn': require('@/i18n/zh-cn'),
		'zh-ft': require('@/i18n/zh-ft'),
		'en-us': require('@/i18n/en-us')
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
// app.use(ElTable);
// app.component('el-table', ElTable);
// app.component('el-table-column', ElTableColumn);
// app.component('el-pagination', ElPagination);
app.use(i18n);
app.use(store);
app.use(router);
app.mount('#app');
