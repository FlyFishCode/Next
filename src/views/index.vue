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
				<!-- <a-sub-menu key="sub3">
					<template #title>
						<span><SettingOutlined /><span>Settlement</span></span>
					</template>
					<a-menu-item key="SettlementInfo">SettlementInfo</a-menu-item>
					<a-menu-item key="Settlement">Settlement</a-menu-item>
				</a-sub-menu> -->
			</a-menu>
		</a-col>
		<a-col :span="20" class="centent">
			<!-- <div class="breadcrumbBox">
				<div v-for="(route, index) in routes" :key="index">{{ route.name }}</div>
			</div> -->
			<router-view />
		</a-col>
	</a-row>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { MailOutlined, AppstoreOutlined } from '@ant-design/icons-vue';
import hearder from '@/components/hearder.vue';
import { useRouter } from 'vue-router';

interface DataProps {
	rootSubmenuKeys: any;
	openKeys: Array<any>;
	routes: any;
}

export default defineComponent({
	name: 'index',
	components: {
		MailOutlined,
		AppstoreOutlined,
		// SettingOutlined,
		hearder
	},
	setup() {
		const ROUTER = useRouter();
		// const ROUTE = useRoute();
		const data: DataProps = reactive({
			routes: [],
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
			...toRefs(data)
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
