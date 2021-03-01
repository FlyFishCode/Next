<template>
	<div>
		<labelTitle :value="'Machine Order'" />
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import labelTitle from '@/components/labelTitle.vue';
// import { SettingFilled} from '@ant-design/icons-vue';
export default defineComponent({
	name: 'Machine Order',
	components: {
		labelTitle
	},
	setup() {
		const data = reactive({});
		return {
			...toRefs(data)
		};
	}
});
</script>

<style scoped></style>
