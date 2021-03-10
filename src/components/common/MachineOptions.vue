<template>
	<div class="gameBox">
		<a-row class="rowStyle">
			<a-tabs v-model:activeKey="optionValue" tab-position="left" class="tabBox">
				<a-tab-pane key="1" tab="游戏设置">
					<a-row class="rowStyle">
						<a-col :span="2" class="labelText">301 游戏</a-col>
						<a-col :span="2" class="switchBox"><a-switch checked-children="开" un-checked-children="关" v-model:checked="details.gameSettings.check301"/></a-col>
						<a-col v-show="details.gameSettings.check301" :span="8" class="showBox">
							<a-col :span="3" class="labelText">点数</a-col>
							<a-col :span="9" class="selectSearch">
								<a-select v-model:value="details.gameSettings.number301">
									<a-select-option v-for="option in options" :key="option.id">{{ option.label }}</a-select-option>
								</a-select>
							</a-col>
							<a-col :span="3" class="labelText">回合</a-col>
							<a-col :span="9" class="selectSearch">
								<a-select v-model:value="details.gameSettings.number301">
									<a-select-option v-for="option in options" :key="option.id">{{ option.label }}</a-select-option>
								</a-select>
							</a-col>
						</a-col>
						<a-col :span="2" class="labelText">501 游戏</a-col>
						<a-col :span="2" class="switchBox"><a-switch checked-children="开" un-checked-children="关" v-model:checked="details.gameSettings.check501"/></a-col>
						<a-col v-show="details.gameSettings.check501" :span="8" class="showBox">
							<a-col :span="3" class="labelText">点数</a-col>
							<a-col :span="9" class="selectSearch">
								<a-select v-model:value="details.gameSettings.number301">
									<a-select-option v-for="option in options" :key="option.id">{{ option.label }}</a-select-option>
								</a-select>
							</a-col>
							<a-col :span="3" class="labelText">回合</a-col>
							<a-col :span="9" class="selectSearch">
								<a-select v-model:value="details.gameSettings.number301">
									<a-select-option v-for="option in options" :key="option.id">{{ option.label }}</a-select-option>
								</a-select>
							</a-col>
						</a-col>
					</a-row>

					<a-row class="rowStyle">
						<a-col :span="2" class="labelText">701 游戏</a-col>
						<a-col :span="2" class="switchBox"><a-switch checked-children="开" un-checked-children="关" v-model:checked="details.gameSettings.check701"/></a-col>
						<a-col v-show="details.gameSettings.check701" :span="8" class="showBox">
							<a-col :span="3" class="labelText">点数</a-col>
							<a-col :span="9" class="selectSearch">
								<a-select v-model:value="details.gameSettings.number301">
									<a-select-option v-for="option in options" :key="option.id">{{ option.label }}</a-select-option>
								</a-select>
							</a-col>
							<a-col :span="3" class="labelText">回合</a-col>
							<a-col :span="9" class="selectSearch">
								<a-select v-model:value="details.gameSettings.number301">
									<a-select-option v-for="option in options" :key="option.id">{{ option.label }}</a-select-option>
								</a-select>
							</a-col>
						</a-col>
						<a-col :span="2" class="labelText">901 游戏</a-col>
						<a-col :span="2" class="switchBox"><a-switch checked-children="开" un-checked-children="关" v-model:checked="details.gameSettings.check901"/></a-col>
						<a-col v-show="details.gameSettings.check901" :span="8" class="showBox">
							<a-col :span="3" class="labelText">点数</a-col>
							<a-col :span="9" class="selectSearch">
								<a-select v-model:value="details.gameSettings.number301">
									<a-select-option v-for="option in options" :key="option.id">{{ option.label }}</a-select-option>
								</a-select>
							</a-col>
							<a-col :span="3" class="labelText">回合</a-col>
							<a-col :span="9" class="selectSearch">
								<a-select v-model:value="details.gameSettings.number301">
									<a-select-option v-for="option in options" :key="option.id">{{ option.label }}</a-select-option>
								</a-select>
							</a-col>
						</a-col>
					</a-row>

					<a-row class="rowStyle">
						<a-col :span="2" class="labelText">标准米老鼠</a-col>
						<a-col :span="2" class="switchBox"><a-switch checked-children="开" un-checked-children="关" v-model:checked="details.gameSettings.mickey"/></a-col>
						<a-col v-show="details.gameSettings.mickey" :span="8" class="showBox">
							<a-col :span="3" class="labelText">点数</a-col>
							<a-col :span="9" class="selectSearch">
								<a-select v-model:value="details.gameSettings.number301">
									<a-select-option v-for="option in options" :key="option.id">{{ option.label }}</a-select-option>
								</a-select>
							</a-col>
							<a-col :span="3" class="labelText">回合</a-col>
							<a-col :span="9" class="selectSearch">
								<a-select v-model:value="details.gameSettings.number301">
									<a-select-option v-for="option in options" :key="option.id">{{ option.label }}</a-select-option>
								</a-select>
							</a-col>
						</a-col>
						<a-col :span="2" class="labelText">加分米老鼠</a-col>
						<a-col :span="2" class="switchBox"><a-switch checked-children="开" un-checked-children="关" v-model:checked="details.gameSettings.addMickey"/></a-col>
						<a-col v-show="details.gameSettings.addMickey" :span="8" class="showBox">
							<a-col :span="3" class="labelText">点数</a-col>
							<a-col :span="9" class="selectSearch">
								<a-select v-model:value="details.gameSettings.number301">
									<a-select-option v-for="option in options" :key="option.id">{{ option.label }}</a-select-option>
								</a-select>
							</a-col>
							<a-col :span="3" class="labelText">回合</a-col>
							<a-col :span="9" class="selectSearch">
								<a-select v-model:value="details.gameSettings.number301">
									<a-select-option v-for="option in options" :key="option.id">{{ option.label }}</a-select-option>
								</a-select>
							</a-col>
						</a-col>
					</a-row>

					<a-row class="rowStyle">
						<a-col :span="2" class="labelText">标准高分赛</a-col>
						<a-col :span="2" class="switchBox"><a-switch checked-children="开" un-checked-children="关" v-model:checked="details.gameSettings.heightMatch"/></a-col>
						<a-col v-show="details.gameSettings.heightMatch" :span="8" class="showBox">
							<a-col :span="3" class="labelText">点数</a-col>
							<a-col :span="9" class="selectSearch">
								<a-select v-model:value="details.gameSettings.number301">
									<a-select-option v-for="option in options" :key="option.id">{{ option.label }}</a-select-option>
								</a-select>
							</a-col>
							<a-col :span="3" class="labelText">回合</a-col>
							<a-col :span="9" class="selectSearch">
								<a-select v-model:value="details.gameSettings.number301">
									<a-select-option v-for="option in options" :key="option.id">{{ option.label }}</a-select-option>
								</a-select>
							</a-col>
						</a-col>
						<a-col :span="2" class="labelText">计时高分赛</a-col>
						<a-col :span="2" class="switchBox"><a-switch checked-children="开" un-checked-children="关" v-model:checked="details.gameSettings.timeHeightMatch"/></a-col>
						<a-col v-show="details.gameSettings.timeHeightMatch" :span="8" class="showBox">
							<a-col :span="3" class="labelText">点数</a-col>
							<a-col :span="9" class="selectSearch">
								<a-select v-model:value="details.gameSettings.number301">
									<a-select-option v-for="option in options" :key="option.id">{{ option.label }}</a-select-option>
								</a-select>
							</a-col>
							<a-col :span="3" class="labelText">回合</a-col>
							<a-col :span="9" class="selectSearch">
								<a-select v-model:value="details.gameSettings.number301">
									<a-select-option v-for="option in options" :key="option.id">{{ option.label }}</a-select-option>
								</a-select>
							</a-col>
						</a-col>
					</a-row>

					<a-row class="rowStyle">
						<a-col :span="2" class="labelText">减半</a-col>
						<a-col :span="2" class="switchBox"><a-switch checked-children="开" un-checked-children="关" v-model:checked="details.gameSettings.halve"/></a-col>
						<a-col v-show="details.gameSettings.halve" :span="8" class="showBox">
							<a-col :span="3" class="labelText">点数</a-col>
							<a-col :span="9" class="selectSearch">
								<a-select v-model:value="details.gameSettings.number301">
									<a-select-option v-for="option in options" :key="option.id">{{ option.label }}</a-select-option>
								</a-select>
							</a-col>
							<a-col :span="3" class="labelText">回合</a-col>
							<a-col :span="9" class="selectSearch">
								<a-select v-model:value="details.gameSettings.number301">
									<a-select-option v-for="option in options" :key="option.id">{{ option.label }}</a-select-option>
								</a-select>
							</a-col>
						</a-col>
						<a-col :span="2" class="labelText">大红心</a-col>
						<a-col :span="2" class="switchBox"><a-switch checked-children="开" un-checked-children="关" v-model:checked="details.gameSettings.bigBull"/></a-col>
						<a-col v-show="details.gameSettings.bigBull" :span="8" class="showBox">
							<a-col :span="3" class="labelText">点数</a-col>
							<a-col :span="9" class="selectSearch">
								<a-select v-model:value="details.gameSettings.number301">
									<a-select-option v-for="option in options" :key="option.id">{{ option.label }}</a-select-option>
								</a-select>
							</a-col>
							<a-col :span="3" class="labelText">回合</a-col>
							<a-col :span="9" class="selectSearch">
								<a-select v-model:value="details.gameSettings.number301">
									<a-select-option v-for="option in options" :key="option.id">{{ option.label }}</a-select-option>
								</a-select>
							</a-col>
						</a-col>
					</a-row>

					<a-row class="rowStyle">
						<a-col :span="2" class="labelText">鹰眼</a-col>
						<a-col :span="2" class="switchBox"><a-switch checked-children="开" un-checked-children="关" v-model:checked="details.gameSettings.eagleEye"/></a-col>
						<a-col v-show="details.gameSettings.eagleEye" :span="8" class="showBox">
							<a-col :span="3" class="labelText">点数</a-col>
							<a-col :span="9" class="selectSearch">
								<a-select v-model:value="details.gameSettings.number301">
									<a-select-option v-for="option in options" :key="option.id">{{ option.label }}</a-select-option>
								</a-select>
							</a-col>
							<a-col :span="3" class="labelText">回合</a-col>
							<a-col :span="9" class="selectSearch">
								<a-select v-model:value="details.gameSettings.number301">
									<a-select-option v-for="option in options" :key="option.id">{{ option.label }}</a-select-option>
								</a-select>
							</a-col>
						</a-col>
						<a-col :span="2" class="labelText">米老鼠高分赛</a-col>
						<a-col :span="2" class="switchBox"><a-switch checked-children="开" un-checked-children="关" v-model:checked="details.gameSettings.heightMickey"/></a-col>
						<a-col v-show="details.gameSettings.heightMickey" :span="8" class="showBox">
							<a-col :span="3" class="labelText">点数</a-col>
							<a-col :span="9" class="selectSearch">
								<a-select v-model:value="details.gameSettings.number301">
									<a-select-option v-for="option in options" :key="option.id">{{ option.label }}</a-select-option>
								</a-select>
							</a-col>
							<a-col :span="3" class="labelText">回合</a-col>
							<a-col :span="9" class="selectSearch">
								<a-select v-model:value="details.gameSettings.number301">
									<a-select-option v-for="option in options" :key="option.id">{{ option.label }}</a-select-option>
								</a-select>
							</a-col>
						</a-col>
					</a-row>

					<a-row class="rowStyle">
						<a-col :span="2" class="labelText">饮酒</a-col>
						<a-col :span="2" class="switchBox"><a-switch checked-children="开" un-checked-children="关" v-model:checked="details.gameSettings.drink"/></a-col>
						<a-col v-show="details.gameSettings.drink" :span="8" class="showBox">
							<a-col :span="3" class="labelText">点数</a-col>
							<a-col :span="9" class="selectSearch">
								<a-select v-model:value="details.gameSettings.number301">
									<a-select-option v-for="option in options" :key="option.id">{{ option.label }}</a-select-option>
								</a-select>
							</a-col>
							<a-col :span="3" class="labelText">回合</a-col>
							<a-col :span="9" class="selectSearch">
								<a-select v-model:value="details.gameSettings.number301">
									<a-select-option v-for="option in options" :key="option.id">{{ option.label }}</a-select-option>
								</a-select>
							</a-col>
						</a-col>
					</a-row>
				</a-tab-pane>
				<a-tab-pane key="2" tab="通用设置">
					<a-row class="rowStyle">
						<a-col :span="2" class="labelText">屏保</a-col>
						<a-col :span="2" class="switchBox"><a-switch checked-children="开" un-checked-children="关" v-model:checked="details.gameSettings.drink"/></a-col>
						<a-col v-show="details.gameSettings.drink" :span="8" class="showBox">
							<a-col :span="5" class="labelText">屏保间隔</a-col>
							<a-col :span="9" class="selectSearch">
								<a-select v-model:value="details.gameSettings.number301">
									<a-select-option v-for="option in options" :key="option.id">{{ option.label }}</a-select-option>
								</a-select>
							</a-col>
						</a-col>
						<a-col :span="2" class="labelText">自动切换</a-col>
						<a-col :span="2" class="switchBox"><a-switch checked-children="开" un-checked-children="关" v-model:checked="details.gameSettings.drink"/></a-col>
						<a-col v-show="details.gameSettings.drink" :span="8" class="showBox">
							<a-col :span="5" class="labelText">自动切换时间</a-col>
							<a-col :span="9" class="selectSearch">
								<a-select v-model:value="details.gameSettings.number301">
									<a-select-option v-for="option in options" :key="option.id">{{ option.label }}</a-select-option>
								</a-select>
							</a-col>
						</a-col>
					</a-row>

					<a-row class="rowStyle">
						<a-col :span="2" class="labelText">投标计时开关</a-col>
						<a-col :span="2" class="switchBox"><a-switch checked-children="开" un-checked-children="关" v-model:checked="details.gameSettings.drink"/></a-col>
						<a-col v-show="details.gameSettings.drink" :span="8" class="showBox">
							<a-col :span="5" class="labelText">投标计时</a-col>
							<a-col :span="9" class="selectSearch">
								<a-select v-model:value="details.gameSettings.number301">
									<a-select-option v-for="option in options" :key="option.id">{{ option.label }}</a-select-option>
								</a-select>
							</a-col>
						</a-col>
						<a-col :span="2" class="labelText">密码设置</a-col>
						<a-col :span="2" class="switchBox"><a-switch checked-children="开" un-checked-children="关" v-model:checked="details.gameSettings.drink"/></a-col>
						<a-col v-show="details.gameSettings.drink" :span="8" class="showBox">
							<a-col :span="5" class="labelText">设置密码</a-col>
							<a-col :span="9" class="selectSearch">
								<a-input v-model:value="details.gameSettings.number301" type='password' allow-clear />
							</a-col>
						</a-col>
					</a-row>

					<a-row class="rowStyle">
						<a-col :span="2" class="labelText">空标报警</a-col>
						<a-col :span="2" class="switchBox"><a-switch checked-children="开" un-checked-children="关" v-model:checked="details.gameSettings.drink"/></a-col>
						<a-col :span="2" class="labelText">测试模式</a-col>
						<a-col :span="2" class="switchBox"><a-switch checked-children="开" un-checked-children="关" v-model:checked="details.gameSettings.drink"/></a-col>
						<a-col :span="2" class="labelText">演示模式</a-col>
						<a-col :span="2" class="switchBox"><a-switch checked-children="开" un-checked-children="关" v-model:checked="details.gameSettings.drink"/></a-col>
						<a-col :span="2" class="labelText">点卡开关</a-col>
						<a-col :span="2" class="switchBox"><a-switch checked-children="开" un-checked-children="关" v-model:checked="details.gameSettings.drink"/></a-col>
						<a-col :span="2" class="labelText">身份卡开关</a-col>
						<a-col :span="2" class="switchBox"><a-switch checked-children="开" un-checked-children="关" v-model:checked="details.gameSettings.drink"/></a-col>
					</a-row>
				</a-tab-pane>
				<a-tab-pane key="3" tab="投币设置"> </a-tab-pane>
			</a-tabs>
		</a-row>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
// import { SettingFilled} from '@ant-design/icons-vue';
export default defineComponent({
	name: 'templete',
	components: {},
	setup() {
		const data = reactive({
			optionValue: '1',
			details: {
				gameSettings: {
					option301:{
						checked: true,
						point:1,
						round:1,
					},
					check301: true,
					check501: true,
					check701: true,
					check901: true,
					mickey: true,
					addMickey: true,
					heightMatch: true,
					timeHeightMatch: true,
					halve: true,
					bigBull: true,
					eagleEye: true,
					heightMickey: true,
					drink: true,
					number301: 1
				},
				generalSettings: {}
			},
			options: [
				{ id: 1, label: 1 },
				{ id: 2, label: 2 },
				{ id: 3, label: 3 },
				{ id: 4, label: 4 }
			]
		});
		return {
			...toRefs(data)
		};
	}
});
</script>

<style scoped>
.gameBox {
	margin: 15px 0;
	padding: 10px;
}
.tabBox {
	width: 100%;
}
.switchBox {
	line-height: 28px;
	text-align: center;
}
.showBox {
	display: flex;
}
</style>
