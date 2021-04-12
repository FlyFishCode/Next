<template>
	<div>
		<a-modal v-model:visible="flag" centered class="deleteBox" :title="$t('default.10')" ok-text="ok" cancel-text="cancle" @ok="ok" @cancel="cancel">
			<div>确认删除<span class="dangerText">所有数据</span>？（删除数据不可恢复）</div>
		</a-modal>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue';
// import { SettingFilled} from '@ant-design/icons-vue';
export default defineComponent({
	name: 'MyDialog',
	props: ['visible'],
	emits: ['handleAllOk', 'afterAllClose'],
	components: {},
	setup(prop: any, ctx: any) {
		const data = reactive({
			flag: false,
			ok: () => {
				ctx.emit('handleAllOk', true);
			},
			cancel: () => {
				ctx.emit('afterAllClose', false);
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

<style scoped>
.dangerText {
	color: red;
	font-weight: bold;
}
</style>
