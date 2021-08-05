<template>
	<a-row class="label">
		<div class="label-g">{{ value }}</div>
		<div v-if="btn" class="searchButton">
			<a-button type="primary" size="small" @click="handleBtn">{{ $t('default.15') }}</a-button>
		</div>
	</a-row>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { message } from 'ant-design-vue';
// import { SettingFilled} from '@ant-design/icons-vue';
export default defineComponent({
	props: ['value', 'btn'],
	name: 'templete',
	components: {},
	setup(props: any) {
		const data = reactive({
			handleBtn: () => {
				try {
					props.btn().then((res: any) => {
					if (res.data.code === 100) {
						message.success(res.data.msg);
					} else {
						message.warning(res.data.data);
					}
				});
				} catch (error) {
					console.log(error);
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
.label {
	padding: 5px 0;
	display: flex;
	justify-content: space-between;
}
.label-g {
	height: 30px;
	line-height: 30px;
	padding-left: 10px;
}
.label-g::before {
	display: block;
	content: '';
	width: 2px;
	height: 30px;
	position: absolute;
	left: 5px;
	background: #1890ff;
}
</style>
