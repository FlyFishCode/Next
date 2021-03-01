<template>
	<div>{{ value }}</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
// import { SettingFilled} from '@ant-design/icons-vue';
export default defineComponent({
	name: 'templete',
	components: {},
	setup() {
		const data = reactive({
			value: 'Bulletin'
		});
		return {
			...toRefs(data)
		};
	}
});
</script>

<style scoped></style>
