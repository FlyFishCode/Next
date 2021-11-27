<template>
	<hearder />
	<a-row class="div">
		<a-col :span="4">
			<a-menu mode="inline" theme="dark" :openKeys="openKeys" v-model:selectedKeys="selectedKeys" style="width:100%;height:100%" @click="handleClick" @openChange="onOpenChange">

				<a-sub-menu v-if="RoleType == '1'" key="1">
					<template #title>
						<span
							><MailOutlined /><span>{{ $t('default.1') }}</span></span
						>
					</template>
					<a-menu-item key="Bulletin">{{ $t('default.1') }}</a-menu-item>
					<a-menu-item key="Advert">{{ $t('default.11') }}</a-menu-item>
				</a-sub-menu>
				<a-sub-menu key="2">
					<template #title>
						<span
							><AppstoreOutlined /><span>{{ $t('default.3') }}</span></span
						>
					</template>
					<a-menu-item key="Shop">{{ $t('default.2') }}</a-menu-item>
					<a-menu-item key="Machine">{{ $t('default.3') }}</a-menu-item>
				</a-sub-menu>

				<!-- <a-sub-menu key="3">
					<template #title>
						<span
							><CreditCardOutlined /><span>{{ $t('default.116') }}</span></span
						>
					</template>
					<a-menu-item key="Settlement">{{ $t('default.117') }}</a-menu-item>
					<a-menu-item key="SettlementInfo">{{ $t('default.116') }}</a-menu-item>
					<a-menu-item key="RechargeRecord">{{ $t('default.143') }}</a-menu-item>
				</a-sub-menu> -->

				<a-sub-menu v-if="RoleType == '1'" key="4">
					<template #title>
						<span
							><UserOutlined /><span>{{ $t('default.154') }}</span></span
						>
					</template>
					<a-menu-item key="GameUser">{{ $t('default.154') }}</a-menu-item>
					<a-menu-item key="GameUserCard">{{ $t('default.172') }}</a-menu-item>
				</a-sub-menu>

				<a-sub-menu v-if="RoleType == '1'" key="5">
					<template #title>
						<span
							><EnvironmentOutlined /><span>{{ $t('default.262') }}</span></span
						>
					</template>
					<a-menu-item key="Country">{{ $t('default.262') }}</a-menu-item>
					<a-menu-item key="Area">{{ $t('default.263') }}</a-menu-item>
				</a-sub-menu>

				<a-sub-menu v-if="RoleType == '1'" key="6">
					<template #title>
						<span
							><CreditCardOutlined /><span>{{ $t('default.137') }}</span></span
						>
					</template>
					<a-menu-item key="CreditCard">{{ $t('default.137') }}</a-menu-item>
					<a-menu-item key="NewsCarousel">{{ $t('default.194') }}</a-menu-item>
				</a-sub-menu>

				<a-sub-menu key="7">
					<template #title>
						<span
							><TeamOutlined /><span>{{ $t('default.212') }}</span></span
						>
					</template>
					<a-menu-item key="Player">{{ $t('default.212') }}</a-menu-item>
				</a-sub-menu>
				<a-sub-menu key="8">
					<template #title>
						<span
							><PushpinOutlined /><span>{{ $t('default.222') }}</span></span
						>
					</template>
					<a-menu-item key="Darts">{{ $t('default.222') }}</a-menu-item>
					<a-menu-item key="DartsCarousel">{{ $t('default.194') }}</a-menu-item>
				</a-sub-menu>
				<a-sub-menu v-if="RoleType == '1'" key="9">
					<template #title>
						<span
							><ShopOutlined /><span>{{ $t('default.224') }}</span></span
						>
					</template>
					<a-menu-item key="PropShop">{{ $t('default.224') }}</a-menu-item>
					<a-menu-item key="PropShopCarousel">{{ $t('default.194') }}</a-menu-item>
				</a-sub-menu>
				<a-sub-menu key="10">
					<template #title>
						<span
							><ScheduleOutlined /><span>{{ $t('default.197') }}</span></span
						>
					</template>
					<a-menu-item key="Match">{{ $t('default.197') + '/' + $t('default.198') }}</a-menu-item>
				</a-sub-menu>
				<a-sub-menu v-if="RoleType == '1'" key="11">
					<template #title>
						<span
							><SettingOutlined /><span>{{ $t('default.146') }}</span></span
						>
					</template>
					<a-menu-item key="User">{{ $t('default.147') }}</a-menu-item>
					<a-menu-item key="Email">{{ $t('default.257') }}</a-menu-item>
					<a-menu-item key="Version">{{ $t('default.259') }}</a-menu-item>
					<a-menu-item key="Setting">{{ $t('default.27') }}</a-menu-item>
					<a-menu-item key="HistoryLog">{{ $t('default.184') }}</a-menu-item>
				</a-sub-menu>
			</a-menu>
		</a-col>
		<a-col :span="20" class="centent">
			<router-view />
		</a-col>
	</a-row>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { TeamOutlined,PushpinOutlined,SettingOutlined,UserOutlined,ShopOutlined,ScheduleOutlined,AppstoreOutlined,CreditCardOutlined, MailOutlined, EnvironmentOutlined } from '@ant-design/icons-vue';
import hearder from '@/components/hearder.vue';
import { useRouter } from 'vue-router';

interface DataProps {
	rootSubmenuKeys: any;
	openKeys: Array<any>;
	selectedKeys: Array<any>;
	handleClick: (e: any) => void;
	onOpenChange: (e: any) => void;
}

export default defineComponent({
	name: 'index',
	components: {
		MailOutlined,
		AppstoreOutlined,
		SettingOutlined,
		CreditCardOutlined,
		EnvironmentOutlined,
		ScheduleOutlined,
		ShopOutlined,
		UserOutlined,
		// ProfileOutlined,
		PushpinOutlined,
		TeamOutlined,
		hearder
	},
	setup() {
		const ROUTER = useRouter();
		const RoleType: any = sessionStorage.getItem('NextUserType');
		// 1：管理员
		const data: DataProps = reactive({
			logoImg: require('@/assets/logo.png'),
			rootSubmenuKeys: ['sub1', 'sub2', 'sub3'],
			openKeys: [],
			selectedKeys: [],
			handleClick: (event: any) => {
				ROUTER.push(event.key);
			},
			onOpenChange(openKeys: any) {
				const latestOpenKey = openKeys.find((key: any) => !data.openKeys.includes(key));
				if (data.rootSubmenuKeys.includes(latestOpenKey)) {
					data.openKeys = openKeys;
				} else {
					data.openKeys = latestOpenKey ? [latestOpenKey] : [];
				}
			}
		});
		return {
			...toRefs(data),
			RoleType
		};
	}
});
</script>
<style scoped>
.div {
	height: 100%;
}
.hearderClass {
	height: 50px;
	border-bottom: 1px solid #fff;
	background: #001529;
}
.longinBox {
	height: 50px;
	border-right: 1px solid #fff;
}
.centent {
	padding: 5px;
}
.breadcrumbBox {
	display: flex;
}
.breadcrumbBox div {
	margin-right: 5px;
}
</style>
