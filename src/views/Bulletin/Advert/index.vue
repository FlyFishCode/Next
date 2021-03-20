<template>
	<a-tabs v-model:activeKey="activeKey">
		<a-tab-pane key="1">
			<template #tab>
				<span>{{ $t('default.2') }}</span>
			</template>
			<shopIndex />
		</a-tab-pane>
		<a-tab-pane key="2">
			<template #tab>
				<span>{{ $t('default.3') }}</span>
			</template>
			<machineIndex />
		</a-tab-pane>
	</a-tabs>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import shopIndex from './Shop/index.vue';
import machineIndex from './Machine/index.vue';
export default defineComponent({
	name: 'Advert',
	components: {
		shopIndex,
		machineIndex
	},
	setup() {
		const data = reactive({
			activeKey: '1'
		});
		return {
			...toRefs(data)
		};
	}
});
</script>

<style scoped>
.tableShop {
	display: flex;
	justify-content: space-between;
}
.shopItem {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
}
.tableBtn {
	display: flex;
	justify-content: space-between;
}
.modalBox img,
video {
	width: 100%;
}
</style>
