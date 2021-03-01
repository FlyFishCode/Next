<template>
	<div>
		<a-modal v-model:visible="flag" title=" " ok-text="ok" cancel-text="cancle" @ok="ok" @cancel="cancel">
			<p>{{ '确认删除?' }}</p>
		</a-modal>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue';
// import { SettingFilled} from '@ant-design/icons-vue';
export default defineComponent({
	name: 'MyDialog',
	props: ['visible'],
	components: {},
	setup(prop: any, ctx: any) {
		const data = reactive({
			flag: false,
			ok: () => {
				ctx.emit('handleOk', true);
			},
			cancel: () => {
				ctx.emit('afterClose', false);
			}
		});
		onMounted(() => {
			data.flag = prop.visible;
		});
		watch(
			() => prop.visible,
			(val) => {
				data.flag = val;
			}
		);
		return {
			...toRefs(data)
		};
	}
});
</script>

<style scoped></style>
