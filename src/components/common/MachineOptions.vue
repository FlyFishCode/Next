<template>
	<div class="gameBox">
		<a-row class="rowStyle">
			<a-tabs v-model:activeKey="optionValue" tab-position="left" class="tabBox">
				<a-tab-pane key="1" tab="游戏设置">
					<div class="title-g">标准游戏</div>
					<a-row class="rowStyle">
						<a-col :span="2" class="labelText">301 游戏</a-col>
						<a-col :span="2" class="switchBox"><a-switch checked-children="开" un-checked-children="关" v-model:checked="setting.gameSettings.game301.isOpen"/></a-col>
						<a-col v-show="setting.gameSettings.game301.isOpen" :span="8" class="showBox">
							<a-col :span="3" class="labelText">点数</a-col>
							<a-col :span="9" class="selectSearch">
								<a-input v-model:value="setting.gameSettings.game301.credits" />
							</a-col>
							<a-col :span="3" class="labelText">回合</a-col>
							<a-col :span="9" class="selectSearch">
								<a-select v-model:value="setting.gameSettings.game301.round">
									<a-select-option v-for="option in options" :key="option.id">{{ option.label }}</a-select-option>
								</a-select>
							</a-col>
						</a-col>
						<a-col :span="2" class="labelText">501 游戏</a-col>
						<a-col :span="2" class="switchBox"><a-switch checked-children="开" un-checked-children="关" v-model:checked="setting.gameSettings.game501.isOpen"/></a-col>
						<a-col v-show="setting.gameSettings.game501.isOpen" :span="8" class="showBox">
							<a-col :span="3" class="labelText">点数</a-col>
							<a-col :span="9" class="selectSearch">
								<a-input v-model:value="setting.gameSettings.game501.credits" />
							</a-col>
							<a-col :span="3" class="labelText">回合</a-col>
							<a-col :span="9" class="selectSearch">
								<a-select v-model:value="setting.gameSettings.game501.round">
									<a-select-option v-for="option in options" :key="option.id">{{ option.label }}</a-select-option>
								</a-select>
							</a-col>
						</a-col>
					</a-row>

					<a-row class="rowStyle">
						<a-col :span="2" class="labelText">701 游戏</a-col>
						<a-col :span="2" class="switchBox"><a-switch checked-children="开" un-checked-children="关" v-model:checked="setting.gameSettings.game701.isOpen"/></a-col>
						<a-col v-show="setting.gameSettings.game701.isOpen" :span="8" class="showBox">
							<a-col :span="3" class="labelText">点数</a-col>
							<a-col :span="9" class="selectSearch">
								<a-input v-model:value="setting.gameSettings.game701.credits" />
							</a-col>
							<a-col :span="3" class="labelText">回合</a-col>
							<a-col :span="9" class="selectSearch">
								<a-select v-model:value="setting.gameSettings.game701.round">
									<a-select-option v-for="option in options" :key="option.id">{{ option.label }}</a-select-option>
								</a-select>
							</a-col>
						</a-col>
						<a-col :span="2" class="labelText">901 游戏</a-col>
						<a-col :span="2" class="switchBox"><a-switch checked-children="开" un-checked-children="关" v-model:checked="setting.gameSettings.game901.isOpen"/></a-col>
						<a-col v-show="setting.gameSettings.game901.isOpen" :span="8" class="showBox">
							<a-col :span="3" class="labelText">点数</a-col>
							<a-col :span="9" class="selectSearch">
								<a-input v-model:value="setting.gameSettings.game901.credits" />
							</a-col>
							<a-col :span="3" class="labelText">回合</a-col>
							<a-col :span="9" class="selectSearch">
								<a-select v-model:value="setting.gameSettings.game901.round">
									<a-select-option v-for="option in options" :key="option.id">{{ option.label }}</a-select-option>
								</a-select>
							</a-col>
						</a-col>
					</a-row>
					<div class="title-g">米老鼠</div>
					<a-row class="rowStyle">
						<a-col :span="2" class="labelText">标准米老鼠</a-col>
						<a-col :span="2" class="switchBox"><a-switch checked-children="开" un-checked-children="关" v-model:checked="setting.gameSettings.stdCr.isOpen"/></a-col>
						<a-col v-show="setting.gameSettings.stdCr.isOpen" :span="8" class="showBox">
							<a-col :span="3" class="labelText">点数</a-col>
							<a-col :span="9" class="selectSearch">
								<a-input v-model:value="setting.gameSettings.stdCr.credits" />
							</a-col>
							<a-col :span="3" class="labelText">回合</a-col>
							<a-col :span="9" class="selectSearch">
								<a-select v-model:value="setting.gameSettings.stdCr.round">
									<a-select-option v-for="option in options" :key="option.id">{{ option.label }}</a-select-option>
								</a-select>
							</a-col>
						</a-col>
						<a-col :span="2" class="labelText">加分米老鼠</a-col>
						<a-col :span="2" class="switchBox"><a-switch checked-children="开" un-checked-children="关" v-model:checked="setting.gameSettings.cutThrowCr.isOpen"/></a-col>
						<a-col v-show="setting.gameSettings.cutThrowCr.isOpen" :span="8" class="showBox">
							<a-col :span="3" class="labelText">点数</a-col>
							<a-col :span="9" class="selectSearch">
								<a-input v-model:value="setting.gameSettings.cutThrowCr.credits" />
							</a-col>
							<a-col :span="3" class="labelText">回合</a-col>
							<a-col :span="9" class="selectSearch">
								<a-select v-model:value="setting.gameSettings.cutThrowCr.round">
									<a-select-option v-for="option in options" :key="option.id">{{ option.label }}</a-select-option>
								</a-select>
							</a-col>
						</a-col>
					</a-row>
					<div class="title-g">高分</div>
					<a-row class="rowStyle">
						<a-col :span="2" class="labelText">标准高分赛</a-col>
						<a-col :span="2" class="switchBox"><a-switch checked-children="开" un-checked-children="关" v-model:checked="setting.gameSettings.stdCup.isOpen"/></a-col>
						<a-col v-show="setting.gameSettings.stdCup.isOpen" :span="8" class="showBox">
							<a-col :span="3" class="labelText">点数</a-col>
							<a-col :span="9" class="selectSearch">
								<a-input v-model:value="setting.gameSettings.stdCup.credits" />
							</a-col>
							<a-col :span="3" class="labelText">回合</a-col>
							<a-col :span="9" class="selectSearch">
								<a-select v-model:value="setting.gameSettings.stdCup.round">
									<a-select-option v-for="option in options" :key="option.id">{{ option.label }}</a-select-option>
								</a-select>
							</a-col>
						</a-col>
						<a-col :span="2" class="labelText">计时高分赛</a-col>
						<a-col :span="2" class="switchBox"><a-switch checked-children="开" un-checked-children="关" v-model:checked="setting.gameSettings.timingCup.isOpen"/></a-col>
						<a-col v-show="setting.gameSettings.timingCup.isOpen" :span="8" class="showBox">
							<a-col :span="3" class="labelText">点数</a-col>
							<a-col :span="9" class="selectSearch">
								<a-input v-model:value="setting.gameSettings.timingCup.credits" />
							</a-col>
							<a-col :span="3" class="labelText">时间</a-col>
							<a-col :span="9" class="selectSearch">
								<a-input v-model:value="setting.gameSettings.timingCup.second" allow-clear />
							</a-col>
						</a-col>
					</a-row>
					<div class="title-g">其他游戏</div>
					<a-row class="rowStyle">
						<a-col :span="2" class="labelText">减半</a-col>
						<a-col :span="2" class="switchBox"><a-switch checked-children="开" un-checked-children="关" v-model:checked="setting.gameSettings.halfLt.isOpen"/></a-col>
						<a-col v-show="setting.gameSettings.halfLt.isOpen" :span="8" class="showBox">
							<a-col :span="3" class="labelText">点数</a-col>
							<a-col :span="9" class="selectSearch">
								<a-input v-model:value="setting.gameSettings.halfLt.credits" />
							</a-col>
						</a-col>
						<a-col :span="2" class="labelText">大红心</a-col>
						<a-col :span="2" class="switchBox"><a-switch checked-children="开" un-checked-children="关" v-model:checked="setting.gameSettings.bigBull.isOpen"/></a-col>
						<a-col v-show="setting.gameSettings.bigBull.isOpen" :span="8" class="showBox">
							<a-col :span="3" class="labelText">点数</a-col>
							<a-col :span="9" class="selectSearch">
								<a-input v-model:value="setting.gameSettings.bigBull.credits" />
							</a-col>
							<a-col :span="3" class="labelText">回合</a-col>
							<a-col :span="9" class="selectSearch">
								<a-select v-model:value="setting.gameSettings.bigBull.round">
									<a-select-option v-for="option in options" :key="option.id">{{ option.label }}</a-select-option>
								</a-select>
							</a-col>
						</a-col>
					</a-row>

					<a-row class="rowStyle">
						<a-col :span="2" class="labelText">米老鼠高分赛</a-col>
						<a-col :span="2" class="switchBox"><a-switch checked-children="开" un-checked-children="关" v-model:checked="setting.gameSettings.crCup.isOpen"/></a-col>
						<a-col v-show="setting.gameSettings.crCup.isOpen" :span="8" class="showBox">
							<a-col :span="3" class="labelText">点数</a-col>
							<a-col :span="9" class="selectSearch">
								<a-input v-model:value="setting.gameSettings.crCup.credits" />
							</a-col>
						</a-col>
						<a-col :span="2" class="labelText">鹰眼</a-col>
						<a-col :span="2" class="switchBox"><a-switch checked-children="开" un-checked-children="关" v-model:checked="setting.gameSettings.eagleEye.isOpen"/></a-col>
						<a-col v-show="setting.gameSettings.eagleEye.isOpen" :span="8" class="showBox">
							<a-col :span="3" class="labelText">点数</a-col>
							<a-col :span="9" class="selectSearch">
								<a-input v-model:value="setting.gameSettings.eagleEye.credits" />
							</a-col>
							<a-col :span="3" class="labelText">回合</a-col>
							<a-col :span="9" class="selectSearch">
								<a-select v-model:value="setting.gameSettings.eagleEye.round">
									<a-select-option v-for="option in options" :key="option.id">{{ option.label }}</a-select-option>
								</a-select>
							</a-col>
						</a-col>
					</a-row>

					<a-row class="rowStyle">
						<a-col :span="2" class="labelText">饮酒</a-col>
						<a-col :span="2" class="switchBox"><a-switch checked-children="开" un-checked-children="关" v-model:checked="setting.gameSettings.drink.isOpen"/></a-col>
						<a-col v-show="setting.gameSettings.drink.isOpen" :span="8" class="showBox">
							<a-col :span="3" class="labelText">点数</a-col>
							<a-col :span="9" class="selectSearch">
								<a-input v-model:value="setting.gameSettings.drink.credits" />
							</a-col>
						</a-col>
					</a-row>
					<div class="title-g">网上对战</div>
					<a-row class="rowStyle">
						<a-col :span="1" class="labelText">501</a-col>
						<a-col :span="1" class="labelText">点数</a-col>
						<a-col :span="2" class="selectSearch">
							<a-input v-model:value="setting.gameSettings.online501.credits" />
						</a-col>
						<a-col :span="1" class="labelText">701</a-col>
						<a-col :span="1" class="labelText">点数</a-col>
						<a-col :span="2" class="selectSearch">
							<a-select v-model:value="setting.gameSettings.online701.credits">
								<a-select-option v-for="option in options" :key="option.id">{{ option.label }}</a-select-option>
							</a-select>
						</a-col>
						<a-col :span="1" class="labelText">501DO</a-col>
						<a-col :span="1" class="labelText">点数</a-col>
						<a-col :span="2" class="selectSearch">
							<a-input v-model:value="setting.gameSettings.online501do.credits" />
						</a-col>
						<a-col :span="1" class="labelText">701MO</a-col>
						<a-col :span="1" class="labelText">点数</a-col>
						<a-col :span="2" class="selectSearch">
							<a-input v-model:value="setting.gameSettings.online701mo.credits" />
						</a-col>
						<a-col :span="2" class="labelText">标准米老鼠</a-col>
						<a-col :span="1" class="labelText">点数</a-col>
						<a-col :span="2" class="selectSearch">
							<a-input v-model:value="setting.gameSettings.onlineStdCr.credits" />
						</a-col>
					</a-row>
				</a-tab-pane>
				<a-tab-pane key="2" tab="通用设置">
					<a-row class="rowStyle">
						<a-col :span="2" class="labelText">屏保</a-col>
						<a-col :span="2" class="switchBox"><a-switch checked-children="开" un-checked-children="关" v-model:checked="setting.gameSettings.drink.isOpen"/></a-col>
						<a-col v-show="setting.gameSettings.drink.isOpen" :span="8" class="showBox">
							<a-col :span="5" class="labelText">屏保间隔</a-col>
							<a-col :span="9" class="selectSearch">
								<a-select v-model:value="setting.gameSettings.number301">
									<a-select-option v-for="option in options" :key="option.id">{{ option.label }}</a-select-option>
								</a-select>
							</a-col>
						</a-col>
						<a-col :span="2" class="labelText">自动切换</a-col>
						<a-col :span="2" class="switchBox"><a-switch checked-children="开" un-checked-children="关" v-model:checked="setting.gameSettings.drink.isOpen"/></a-col>
						<a-col v-show="setting.gameSettings.drink.isOpen" :span="8" class="showBox">
							<a-col :span="5" class="labelText">自动切换时间</a-col>
							<a-col :span="9" class="selectSearch">
								<a-select v-model:value="setting.gameSettings.number301">
									<a-select-option v-for="option in options" :key="option.id">{{ option.label }}</a-select-option>
								</a-select>
							</a-col>
						</a-col>
					</a-row>

					<a-row class="rowStyle">
						<a-col :span="2" class="labelText">投标计时开关</a-col>
						<a-col :span="2" class="switchBox"><a-switch checked-children="开" un-checked-children="关" v-model:checked="setting.gameSettings.drink.isOpen"/></a-col>
						<a-col v-show="setting.gameSettings.drink.isOpen" :span="8" class="showBox">
							<a-col :span="5" class="labelText">投标计时</a-col>
							<a-col :span="9" class="selectSearch">
								<a-select v-model:value="setting.gameSettings.number301">
									<a-select-option v-for="option in options" :key="option.id">{{ option.label }}</a-select-option>
								</a-select>
							</a-col>
						</a-col>
						<a-col :span="2" class="labelText">密码设置</a-col>
						<a-col :span="2" class="switchBox">
							<a-input v-model:value="setting.systemSettings.password" type="password" allow-clear />
						</a-col>
					</a-row>

					<a-row class="rowStyle">
						<a-col :span="2" class="labelText">空标报警</a-col>
						<a-col :span="2" class="switchBox"><a-switch checked-children="开" un-checked-children="关" v-model:checked="setting.gameSettings.drink.isOpen"/></a-col>
						<a-col :span="2" class="labelText">测试模式</a-col>
						<a-col :span="2" class="switchBox"><a-switch checked-children="开" un-checked-children="关" v-model:checked="setting.gameSettings.drink.isOpen"/></a-col>
						<a-col :span="2" class="labelText">演示模式</a-col>
						<a-col :span="2" class="switchBox"><a-switch checked-children="开" un-checked-children="关" v-model:checked="setting.gameSettings.drink.isOpen"/></a-col>
						<a-col :span="2" class="labelText">点卡开关</a-col>
						<a-col :span="2" class="switchBox"><a-switch checked-children="开" un-checked-children="关" v-model:checked="setting.gameSettings.drink.isOpen"/></a-col>
						<a-col :span="2" class="labelText">身份卡开关</a-col>
						<a-col :span="2" class="switchBox"><a-switch checked-children="开" un-checked-children="关" v-model:checked="setting.gameSettings.drink.isOpen"/></a-col>
					</a-row>
				</a-tab-pane>
				<a-tab-pane key="3" tab="投币设置">
					<a-row class="rowStyle">
						<a-col :span="2" class="labelText">二维码开关</a-col>
						<a-col :span="3" class="switchBox"><a-switch checked-children="开" un-checked-children="关" v-model:checked="setting.coinSettings.qrcodeSwitch"/></a-col>
						<a-col :span="2" class="labelText">硬币开关</a-col>
						<a-col :span="3" class="switchBox"><a-switch checked-children="开" un-checked-children="关" v-model:checked="setting.coinSettings.coinsSwitch"/></a-col>
						<a-col :span="2" class="labelText">纸币开关</a-col>
						<a-col :span="3" class="switchBox"><a-switch checked-children="开" un-checked-children="关" v-model:checked="setting.coinSettings.moneySwitch"/></a-col>
						<a-col :span="2" class="labelText">是否免费</a-col>
						<a-col :span="3" class="switchBox"><a-switch checked-children="开" un-checked-children="关" v-model:checked="setting.coinSettings.isFree"/></a-col>
						<a-col v-show="setting.coinSettings.isFree" :span="4" class="showBox">
							<a-col :span="10" class="labelText">免费点数</a-col>
							<a-col :span="14" class="selectSearch">
								<a-input v-model:value="setting.coinSettings.freeCredits" allow-clear />
							</a-col>
						</a-col>
					</a-row>
					<a-row class="rowStyle">
						<a-col :span="2" class="labelText">元/币</a-col>
						<a-col :span="3">
							<a-input v-model:value="setting.coinSettings.yuanToCoin" allow-clear />
						</a-col>
						<a-col :span="2" class="labelText">金额/币</a-col>
						<a-col :span="3">
							<a-input v-model:value="setting.coinSettings.moneyToCoin" allow-clear />
						</a-col>
						<a-col :span="2" class="labelText">币/点</a-col>
						<a-col :span="3">
							<a-input v-model:value="setting.coinSettings.coinToCredit" allow-clear />
						</a-col>
					</a-row>
					<a-row class="rowStyle">
						<a-col :span="2" class="labelText">金额1</a-col>
						<a-col :span="3">
							<a-input v-model:value="setting.coinSettings.money1" allow-clear />
						</a-col>
						<a-col :span="2" class="labelText">金额2</a-col>
						<a-col :span="3">
							<a-input v-model:value="setting.coinSettings.money2" allow-clear />
						</a-col>
						<a-col :span="2" class="labelText">金额3</a-col>
						<a-col :span="3">
							<a-input v-model:value="setting.coinSettings.money3" allow-clear />
						</a-col>
						<a-col :span="2" class="labelText">金额4</a-col>
						<a-col :span="3">
							<a-input v-model:value="setting.coinSettings.money4" allow-clear />
						</a-col>
						<a-col :span="1" class="labelText">金额5</a-col>
						<a-col :span="3">
							<a-input v-model:value="setting.coinSettings.money5" allow-clear />
						</a-col>
					</a-row>
					<a-row>
						<a-col :span="2" class="labelText">金额6</a-col>
						<a-col :span="3">
							<a-input v-model:value="setting.coinSettings.money6" allow-clear />
						</a-col>
						<a-col :span="2" class="labelText">金额7</a-col>
						<a-col :span="3">
							<a-input v-model:value="setting.coinSettings.money7" allow-clear />
						</a-col>
						<a-col :span="2" class="labelText">金额8</a-col>
						<a-col :span="3">
							<a-input v-model:value="setting.coinSettings.money8" allow-clear />
						</a-col>
						<a-col :span="2" class="labelText">金额9</a-col>
						<a-col :span="3">
							<a-input v-model:value="setting.coinSettings.money9" allow-clear />
						</a-col>
					</a-row>
				</a-tab-pane>
			</a-tabs>
		</a-row>
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUpdate, reactive, toRefs } from 'vue';
// import { SettingFilled} from '@ant-design/icons-vue';
export default defineComponent({
	name: 'templete',
	components: {},
	props: ['gameOptions'],
	setup(prop: any) {
		const data = reactive({
			optionValue: '1',
			setting: {
				gameSettings: {
					game301: {
						credits: 1,
						isOpen: true,
						round: 10
					},
					game501: {
						credits: 1,
						isOpen: true,
						round: 10
					},
					game701: {
						credits: 1,
						isOpen: true,
						round: 10
					},
					game901: {
						credits: 1,
						isOpen: true,
						round: 10
					},
					game1101: {
						credits: 1,
						isOpen: true,
						round: 10
					},
					game1501: {
						credits: 1,
						isOpen: true,
						round: 10
					},
					bigBull: {
						credits: 1,
						isOpen: true,
						round: 10
					},
					crCup: {
						credits: 1,
						isOpen: true
					},
					cutThrowCr: {
						credits: 1,
						isOpen: true,
						round: 10
					},
					drink: {
						credits: 1,
						isOpen: true
					},
					eagleEye: {
						credits: 1,
						isOpen: true,
						round: 10
					},
					halfLt: {
						credits: 1,
						isOpen: true
					},
					online501: {
						credits: 1
					},
					online501do: {
						credits: 1
					},
					online701: {
						credits: 1
					},
					online701mo: {
						credits: 1
					},
					onlineStdCr: {
						credits: 1
					},
					stdCr: {
						credits: 1,
						isOpen: true,
						round: 10
					},
					stdCup: {
						credits: 1,
						isOpen: true,
						round: 10
					},
					timingCup: {
						credits: 1,
						isOpen: true,
						second: 60
					}
				},
				coinSettings: {
					coinToCredit: 1,
					freeCredits: 1,
					isFree: true,
					coinsSwitch: true,
					money1: 1,
					money2: 5,
					money3: 10,
					money4: 20,
					money5: 50,
					money6: 100,
					money7: 200,
					money8: 500,
					money9: 1000,
					moneySwitch: true,
					moneyToCoin: 1,
					qrcodeSwitch: true,
					yuanToCoin: 1
				},
				systemSettings: {
					language: 1,
					password: '123456'
				}
			},
			options: [
				{ id: 1, label: 1 },
				{ id: 2, label: 2 },
				{ id: 3, label: 3 },
				{ id: 4, label: 4 }
			]
		});
		onBeforeUpdate(() =>{
			if(prop.gameOptions){
				data.setting = prop.gameOptions
			}
		})
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
