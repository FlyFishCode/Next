import { createRouter, createWebHistory } from 'vue-router';
import login from '@/components/login.vue';

const routes = [
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
				component: () => import(/* webpackChunkName: "Advert" */ '../views/Bulletin/Advert/index.vue'),
				meta: [{ label: 'default.1', path: 'Advert' }]
			},
			{
				path: '/ShopEditor',
				name: 'ShopEditor',
				component: () => import(/* webpackChunkName: "ShopEditor" */ '../views/Bulletin/Advert/Shop/ShopEditor.vue'),
				meta: [
					{ label: 'default.1', path: 'Advert' },
					{ label: 'default.109', path: 'ShopEditor' }
				]
			},
			{
				path: '/ShopInfo',
				name: 'ShopInfo',
				component: () => import(/* webpackChunkName: "ShopInfo" */ '../views/Bulletin/Advert/Shop/ShopInfo.vue'),
				meta: [
					{ label: 'default.1', path: 'Advert' },
					{ label: 'default.110', path: 'ShopInfo' }
				]
			},
			{
				path: '/Machine',
				name: 'Machine',
				component: () => import(/* webpackChunkName: "Machine" */ '../views/Machine/Machine/index.vue'),
				meta: [{ label: 'default.3', path: 'Machine' }]
			},
			{
				path: '/EditorMachine',
				name: 'EditorMachine',
				component: () => import(/* webpackChunkName: "EditorMachine" */ '../views/Bulletin/Advert/Machine/MachineEditor.vue'),
				meta: [
					{ label: 'default.1', path: 'Advert' },
					{ label: 'default.111', path: 'EditorMachine' }
				]
			},
			{
				path: '/MachineInfo',
				name: 'MachineInfo',
				component: () => import(/* webpackChunkName: "MachineInfo" */ '../views/Bulletin/Advert/Machine/MachineInfo.vue'),
				meta: [
					{ label: 'default.1', path: 'Advert' },
					{ label: 'default.112', path: 'MachineInfo' }
				]
			},
			{
				path: '/Bulletin',
				name: 'Bulletin',
				component: () => import(/* webpackChunkName: "Bulletin" */ '../views/Bulletin/Bulletin/index.vue')
			},
			{
				path: '/MachineEditor',
				name: 'MachineEditor',
				component: () => import(/* webpackChunkName: "MachineEditor" */ '../views/Machine/Machine/MachineEditor.vue'),
				meta: [
					{ label: 'default.3', path: 'Machine' },
					{ label: 'default.111', path: 'MachineEditor' }
				]
			},
			{
				path: '/Shop',
				name: 'Shop',
				component: () => import(/* webpackChunkName: "Shop" */ '../views/Machine/Shop/index.vue'),
				meta: [{ label: 'default.2', path: 'Shop' }]
			},
			{
				path: '/EditorShop',
				name: 'EditorShop',
				component: () => import(/* webpackChunkName: "EditorShop" */ '../views/Machine/Shop/ShopEditor.vue'),
				meta: [
					{ label: 'default.2', path: 'Shop' },
					{ label: 'default.115', path: 'EditorShop' }
				]
			},
			{
				path: '/ShopGameOptions',
				name: 'ShopGameOptions',
				component: () => import(/* webpackChunkName: "ShopGameOptions" */ '../views/Machine/Shop/ShopGameOptions.vue'),
				meta: [
					{ label: 'default.2', path: 'Shop' },
					{ label: 'default.113', path: 'ShopGameOptions' }
				]
			},
			{
				path: '/MachineGameOptions',
				name: 'MachineGameOptions',
				component: () => import(/* webpackChunkName: "MachineGameOptions" */ '../views/Machine/Machine/MachineGameOptions.vue'),
				meta: [
					{ label: 'default.3', path: 'Machine' },
					{ label: 'default.114', path: 'MachineGameOptions' }
				]
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
			},
			{
				path: '/SettlementInfo',
				name: 'SettlementInfo',
				component: () => import(/* webpackChunkName: "Settlement" */ '../views/Settlement/SettlementInfo.vue'),
				meta: [{ label: 'default.116', path: 'Settlement' }]
			},
			{
				path: '/Settlement',
				name: 'Settlement',
				component: () => import(/* webpackChunkName: "SettlementInfo" */ '../views/Settlement/Settlement.vue'),
				meta: [{ label: 'default.117', path: 'SettlementInfo' }]
			},
			{
				path: '/RechargeRecord',
				name: 'RechargeRecord',
				component: () => import(/* webpackChunkName: "RechargeRecord" */ '../views/Settlement/RechargeRecord.vue'),
				meta: [{ label: 'default.143', path: 'RechargeRecord' }]
			},
			// User
			{
				path: '/User',
				name: 'User',
				component: () => import(/* webpackChunkName: "User" */ '../views/System/User/index.vue'),
				meta: [{ label: 'default.147', path: 'User' }]
			},
			{
				path: '/HistoryLog',
				name: 'HistoryLog',
				component: () => import(/* webpackChunkName: "HistoryLog" */ '../views/System/HistoryLog/index.vue'),
				meta: [{ label: 'default.184', path: 'HistoryLog' }]
			},
			// Player
			{
				path: '/Player',
				name: 'Player',
				component: () => import(/* webpackChunkName: "Player" */ '../views/Player/Player/index.vue'),
				meta: [{ label: 'default.154', path: 'Player' }]
			},
			{
				path: '/PlayerInfo',
				name: 'PlayerInfo',
				component: () => import(/* webpackChunkName: "PlayerInfo" */ '../views/Player/Player/PlayerInfo.vue'),
				meta: [
					{ label: 'default.154', path: 'Player' },
					{ label: 'default.163', path: 'PlayerInfo' }
				]
			},
			// UserCard
			{
				path: '/UserCard',
				name: 'UserCard',
				component: () => import(/* webpackChunkName: "UserCard" */ '../views/Player/UserCard/index.vue'),
				meta: [{ label: 'default.172', path: 'UserCard' }]
			},
			// Country
			{
				path: '/Country',
				name: 'Country',
				component: () => import(/* webpackChunkName: "Country" */ '../views/Country/Country/index.vue'),
				meta: [{ label: 'default.23', path: 'Country' }]
			},
			{
				path: '/Area',
				name: 'Area',
				component: () => import(/* webpackChunkName: "Area" */ '../views/Country/Area/index.vue'),
				meta: [{ label: 'default.24', path: 'Area' }]
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
