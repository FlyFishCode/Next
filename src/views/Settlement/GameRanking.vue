<template>
	<div></div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
// import { SettingFilled} from '@ant-design/icons-vue';
export default defineComponent({
	name: 'templete',
	components: {},
	setup() {
		const data = reactive({});
		return {
			...toRefs(data)
		};
	}
});
</script>

<style scoped></style>
