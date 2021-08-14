import { createRouter, createWebHashHistory } from 'vue-router';
import { message } from 'ant-design-vue';

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
			// 玩家
			{
				path: '/GameUser',
				name: 'GameUser',
				component: () => import(/* webpackChunkName: "GameUser" */ '../views/GameUser/GameUser/index.vue'),
				meta: [{ label: 'default.154', path: 'GameUser' }]
			},
			{
				path: '/GameUserInfo',
				name: 'GameUserInfo',
				component: () => import(/* webpackChunkName: "PlayerInfo" */ '../views/GameUser/GameUser/GameUserInfo.vue'),
				meta: [
					{ label: 'default.154', path: 'GameUser' },
					{ label: 'default.163', path: 'UserInfo' }
				]
			},
			// GameUserCard
			{
				path: '/GameUserCard',
				name: 'GameUserCard',
				component: () => import(/* webpackChunkName: "GameUserCard" */ '../views/GameUser/GameUserCard/index.vue'),
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
			},
			{
				path: '/News',
				name: 'News',
				component: () => import(/* webpackChunkName: "News" */ '../views/News/News/index.vue'),
				meta: [{ label: 'default.193', path: 'News' }]
			},
			{
				path: '/NewsEdit',
				name: 'NewsEdit',
				component: () => import(/* webpackChunkName: "NewsEdit" */ '../views/News/News/NewsEdit.vue'),
				meta: [
					{ label: 'default.193', path: 'News' },
					{ label: 'default.195', path: 'NewsEdit' }
				]
			},
			{
				path: '/NewsCarousel',
				name: 'NewsCarousel',
				component: () => import(/* webpackChunkName: "Carousel" */ '../views/News/Carousel/index.vue'),
				meta: [{ label: 'default.194', path: 'NewsCarousel' }]
			},
			{
				path: '/CarouselEdit',
				name: 'CarouselEdit',
				component: () => import(/* webpackChunkName: "CarouselEdit" */ '../views/News/Carousel/CarouselEdit.vue'),
				meta: [
					{ label: 'default.194', path: 'NewsCarousel' },
					{ label: 'default.209', path: 'CarouselEdit' }
				]
			},
			// Player
			{
				path: '/Player',
				name: 'Player',
				component: () => import(/* webpackChunkName: "Player" */ '../views/Player/Player.vue'),
				meta: [
					{ label: 'default.212', path: 'Player' },
				]
			},
			{
				path: '/PlayerInfo',
				name: 'PlayerInfo',
				component: () => import(/* webpackChunkName: "PlayerInfo" */ '../views/Player/PlayerInfo.vue'),
				meta: [
					{ label: 'default.212', path: 'Player' },
					{ label: 'default.213', path: 'PlayerInfo' },
				]
			},
			// Darts
			{
				path: '/Darts',
				name: 'Darts',
				component: () => import(/* webpackChunkName: "Darts" */ '../views/Darts/Darts/index.vue'),
				meta: [
					{ label: 'default.222', path: 'Darts' },
				]
			},
			{
				path: '/DartsEdit',
				name: 'DartsEdit',
				component: () => import(/* webpackChunkName: "DartsEdit" */ '../views/Darts/Darts/DartsEdit.vue'),
				meta: [
					{ label: 'default.222', path: 'Darts' },
					{ label: 'default.223', path: 'DartsEdit' },
				]
			},
			{
				path: '/DartsCarousel',
				name: 'DartsCarousel',
				component: () => import(/* webpackChunkName: "DartsCarousel" */ '../views/Darts/Carosel/index.vue'),
				meta: [
					{ label: 'default.194', path: 'DartsCarousel' },
				]
			},
			{
				path: '/DartsCarouselEdit',
				name: 'DartsCarouselEdit',
				component: () => import(/* webpackChunkName: "DartsCarouselEdit" */ '../views/Darts/Carosel/CaroselEdit.vue'),
				meta: [
					{ label: 'default.194', path: 'DartsCarousel' },
					{ label: 'default.209', path: 'DartsCarouselEdit' },
				]
			},
			// Prop
			{
				path: '/Shop',
				name: 'Shop',
				component: () => import(/* webpackChunkName: "Shop" */ '../views/Shop/Shop/Shop.vue'),
				meta: [
					{ label: 'default.224', path: 'Shop' },
				]
			},
			{
				path: '/ShopEdit',
				name: 'ShopEdit',
				component: () => import(/* webpackChunkName: "ShopEdit" */ '../views/Shop/Shop/ShopEdit.vue'),
				meta: [
					{ label: 'default.224', path: 'Shop' },
					{ label: 'default.225', path: 'ShopEdit' },
				]
			},
			{
				path: '/ShopCarousel',
				name: 'ShopCarousel',
				component: () => import(/* webpackChunkName: "ShopCarousel" */ '../views/Shop/Carosel/index.vue'),
				meta: [
					{ label: 'default.194', path: 'ShopCarousel' },
				]
			},
			{
				path: '/ShopCarouselEdit',
				name: 'ShopCarouselEdit',
				component: () => import(/* webpackChunkName: "ShopCarouselEdit" */ '../views/Shop/Carosel/CaroselEdit.vue'),
				meta: [
					{ label: 'default.194', path: 'ShopCarousel' },
					{ label: 'default.209', path: 'CaroselEdit' },
				]
			}
		]
	},
	{ path: '/:pathMatch(.*)*', redirect: '/' }
];

// createWebHashHistory 带#号
// createWebHistory 不带#号
const router = createRouter({
	// history: createWebHashHistory(process.env.BASE_URL),
	history: createWebHashHistory(),
	routes
});

router.beforeEach((guard: any) => {
	const roleType = sessionStorage.getItem('NextRoleType');
	if (!roleType && guard.name !== 'login') {
		message.error('身份验证失效，请重新登录!');
		if (guard.path !== '/') {
			router.push('/');
		}
	}
});

export default router;
