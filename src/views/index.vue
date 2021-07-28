<template>
	<hearder />
	<a-row class="div">
		<a-col :span="4">
			<a-menu mode="inline" theme="dark" :openKeys="openKeys" v-model:selectedKeys="selectedKeys" style="width:100%;height:100%" @click="handleClick" @openChange="onOpenChange">
				<a-sub-menu key="sub1">
					<template #title>
						<span
							><MailOutlined /><span>{{ $t('default.1') }}</span></span
						>
					</template>
					<!-- <a-menu-item key="Bulletin">Bulletin</a-menu-item> -->
					<a-menu-item key="Advert">{{ $t('default.11') }}</a-menu-item>
				</a-sub-menu>
				<a-sub-menu key="sub2">
					<template #title>
						<span
							><AppstoreOutlined /><span>{{ $t('default.3') }}</span></span
						>
					</template>
					<a-menu-item key="Shop">{{ $t('default.2') }}</a-menu-item>
					<a-menu-item key="Machine">{{ $t('default.3') }}</a-menu-item>
				</a-sub-menu>
				<a-sub-menu key="sub3">
					<template #title>
						<span
							><CreditCardOutlined /><span>{{ $t('default.116') }}</span></span
						>
					</template>
					<a-menu-item key="Settlement">{{ $t('default.117') }}</a-menu-item>
					<a-menu-item key="SettlementInfo">{{ $t('default.116') }}</a-menu-item>
					<a-menu-item key="RechargeRecord">{{ $t('default.143') }}</a-menu-item>
				</a-sub-menu>
				<a-sub-menu key="sub4">
					<template #title>
						<span
							><UserOutlined /><span>{{ $t('default.154') }}</span></span
						>
					</template>
					<a-menu-item key="User">{{ $t('default.154') }}</a-menu-item>
					<a-menu-item key="UserCard">{{ $t('default.172') }}</a-menu-item>
				</a-sub-menu>
				<a-sub-menu key="sub5">
					<template #title>
						<span
							><EnvironmentOutlined /><span>{{ $t('default.23') }}</span></span
						>
					</template>
					<a-menu-item key="Country">{{ $t('default.23') }}</a-menu-item>
					<a-menu-item key="Area">{{ $t('default.24') }}</a-menu-item>
				</a-sub-menu>
				<a-sub-menu key="sub6">
					<template #title>
						<span
							><ProfileOutlined /><span>{{ $t('default.193') }}</span></span
						>
					</template>
					<a-menu-item key="News">{{ $t('default.193') }}</a-menu-item>
					<a-menu-item key="NewsCarousel">{{ $t('default.194') }}</a-menu-item>
				</a-sub-menu>
				<a-sub-menu key="sub7">
					<template #title>
						<span
							><TeamOutlined /><span>{{ $t('default.212') }}</span></span
						>
					</template>
					<a-menu-item key="Player">{{ $t('default.212') }}</a-menu-item>
				</a-sub-menu>
				<a-sub-menu key="sub8">
					<template #title>
						<span
							><PushpinOutlined /><span>{{ $t('default.222') }}</span></span
						>
					</template>
					<a-menu-item key="Darts">{{ $t('default.222') }}</a-menu-item>
					<a-menu-item key="DartsCarousel">{{ $t('default.194') }}</a-menu-item>
				</a-sub-menu>
				<a-sub-menu v-if="RoleType !== '5'" key="sub100">
					<template #title>
						<span
							><SettingOutlined /><span>{{ $t('default.146') }}</span></span
						>
					</template>
					<a-menu-item key="User">{{ $t('default.147') }}</a-menu-item>
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
import { MailOutlined, AppstoreOutlined, SettingOutlined, CreditCardOutlined, UserOutlined, EnvironmentOutlined, ProfileOutlined,TeamOutlined,PushpinOutlined } from '@ant-design/icons-vue';
import hearder from '@/components/hearder.vue';
import { useRouter } from 'vue-router';

interface DataProps {
	rootSubmenuKeys: any;
	openKeys: Array<any>;
}

export default defineComponent({
	name: 'index',
	components: {
		MailOutlined,
		AppstoreOutlined,
		SettingOutlined,
		CreditCardOutlined,
		EnvironmentOutlined,
		UserOutlined,
		ProfileOutlined,
		PushpinOutlined,
		TeamOutlined,
		hearder
	},
	setup() {
		const ROUTER = useRouter();
		const RoleType: any = sessionStorage.getItem('NextRoleType');
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
				if (!data.rootSubmenuKeys.includes(latestOpenKey)) {
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
