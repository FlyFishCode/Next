<template>
	<div>
		<a-modal v-model:visible="isShow" centered :footer="null" width="40%" @cancel="cancel">
			<div class="modalBox">
				<div v-if="isVideo">
					<video :src="src" controls></video>
				</div>
				<div v-else>
					<img :src="src" alt="地址不正确" />
				</div>
			</div>
		</a-modal>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from 'vue';
// import { SettingFilled} from '@ant-design/icons-vue';
export default defineComponent({
	name: 'showUrlDialog',
	emits: ['showBoxCancel'],
	props: ['visible', 'src'],
	components: {},
	setup(prop, ctx) {
		const data = reactive({
			isVideo: false,
			isShow: false,
			src: '',
			cancel: () => {
				ctx.emit('showBoxCancel', false);
			}
		});
		watch(
			() => [prop.visible, prop.src],
			([visiVal, srcVal]) => {
				data.isShow = visiVal;
				if (srcVal) {
					data.src = srcVal;
					if (data.src.includes('.jpg')) {
						data.isVideo = false;
					} else {
						data.isVideo = true;
					}
				}
			}
		);
		return {
			...toRefs(data)
		};
	}
});
</script>

<style scoped></style>
