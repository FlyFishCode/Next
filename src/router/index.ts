import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import login from '@/components/login.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'login',
		component: login
	},
	{
		path: '/index',
		name: 'Index',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "index" */ '@/views/index.vue'),
		children: [
			{
				path: '/Advert',
				name: 'Advert',
				component: () => import(/* webpackChunkName: "Advert" */ '../views/Bulletin/Advert/index.vue')
			},
			{
				path: '/ShopEditor',
				name: 'ShopEditor',
				component: () => import(/* webpackChunkName: "ShopEditor" */ '../views/Bulletin/Advert/Shop/ShopEditor.vue')
			},
			{
				path: '/ShopInfo',
				name: 'ShopInfo',
				component: () => import(/* webpackChunkName: "ShopInfo" */ '../views/Bulletin/Advert/Shop/ShopInfo.vue')
			},
			{
				path: '/EditorMachine',
				name: 'EditorMachine',
				component: () => import(/* webpackChunkName: "EditorMachine" */ '../views/Bulletin/Advert/Machine/MachineEditor.vue')
			},
			{
				path: '/MachineInfo',
				name: 'MachineInfo',
				component: () => import(/* webpackChunkName: "MachineInfo" */ '../views/Bulletin/Advert/Machine/MachineInfo.vue')
			},
			{
				path: '/Bulletin',
				name: 'Bulletin',
				component: () => import(/* webpackChunkName: "Bulletin" */ '../views/Bulletin/Bulletin/index.vue')
			},
			{
				path: '/Machine',
				name: 'Machine',
				component: () => import(/* webpackChunkName: "Machine" */ '../views/Machine/Machine/index.vue')
			},
			{
				path: '/MachineEditor',
				name: 'MachineEditor',
				component: () => import(/* webpackChunkName: "MachineEditor" */ '../views/Machine/Machine/MachineEditor.vue')
			},
			{
				path: '/entryLabelPage',
				name: 'entryLabelPage',
				component: () => import(/* webpackChunkName: "entryLabelPage" */ '../views/Machine/Machine/entryLabelPage.vue')
			},
			{
				path: '/EditorShop',
				name: 'EditorShop',
				component: () => import(/* webpackChunkName: "EditorShop" */ '../views/Machine/Shop/ShopEditor.vue')
			},
			{
				path: '/Shop',
				name: 'Shop',
				component: () => import(/* webpackChunkName: "Shop" */ '../views/Machine/Shop/index.vue')
			},
			{
				path: '/ShopGameOptions',
				name: 'ShopGameOptions',
				component: () => import(/* webpackChunkName: "ShopGameOptions" */ '../views/Machine/Shop/ShopGameOptions.vue')
			},
			{
				path: '/MachineGameOptions',
				name: 'MachineGameOptions',
				component: () => import(/* webpackChunkName: "MachineGameOptions" */ '../views/Machine/Machine/MachineGameOptions.vue')
			},
			{
				path: '/CreditCard',
				name: 'CreditCard',
				component: () => import(/* webpackChunkName: "CreditCard" */ '../views/Credit/CreditCard/index.vue')
			},
			{
				path: '/MachineOrder',
				name: 'MachineOrder',
				component: () => import(/* webpackChunkName: "MachineOrder" */ '../views/Credit/MachineOrder/index.vue')
			},
			{
				path: '/Order',
				name: 'Order',
				component: () => import(/* webpackChunkName: "Order" */ '../views/Credit/Order/index.vue')
			}
		]
	},
	{ path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

export default router;
