<template>
	<div>
		<a-row class="rowStyle">
			<a-tabs v-model:activeKey="optionValue" tab-position="left" class="tabBox">
				<a-tab-pane key="1" :tab="$t('default.29')">
					<div class="gameBox">
						<div class="title-g">{{ $t('default.30') }}</div>
						<a-row class="rowStyle">
							<a-col :span="2" class="labelText">{{ $t('default.31') }}</a-col>
							<a-col :span="2" class="switchBox"
								><a-switch :checked-children="$t('default.47')" :un-checked-children="$t('default.48')" v-model:checked="setting.common.gameSetting[301].available"
							/></a-col>
							<a-col v-show="setting.common.gameSetting[301].available" :span="20" class="showBox">
								<a-col :span="2" class="labelText">{{ $t('default.35') }}</a-col>
								<a-col :span="2">
									<a-input v-model:value="setting.common.gameSetting[301].credits" />
								</a-col>
								<a-col :span="2" class="labelText">{{ $t('default.36') }}</a-col>
								<a-col :span="2">
									<a-input v-model:value="setting.common.gameSetting[301].round" />
								</a-col>
								<a-col :span="2" class="labelText">{{ $t('default.37') }}</a-col>
								<a-col :span="4">
									<a-select class="selectBox" v-model:value="setting.common.gameSetting[301].in">
										<a-select-option v-for="option in gameBeginOptions" :key="option.id">{{ option.label }}</a-select-option>
									</a-select>
								</a-col>
								<a-col :span="2" class="labelText">{{ $t('default.38') }}</a-col>
								<a-col :span="4">
									<a-select class="selectBox" v-model:value="setting.common.gameSetting[301].out">
										<a-select-option v-for="option in gameEndOptions" :key="option.id">{{ option.label }}</a-select-option>
									</a-select>
								</a-col>
								<a-col :span="2" class="labelText">{{ $t('default.39') }}</a-col>
								<a-col :span="2">
									<a-select class="selectBox" v-model:value="setting.common.gameSetting[301].bull">
										<a-select-option v-for="option in bullOptions" :key="option.id">{{ option.label }}</a-select-option>
									</a-select>
								</a-col>
							</a-col>
						</a-row>
						<a-row>
							<a-col :span="2" class="labelText">{{ $t('default.32') }}</a-col>
							<a-col :span="2" class="switchBox"
								><a-switch :checked-children="$t('default.47')" :un-checked-children="$t('default.48')" v-model:checked="setting.common.gameSetting[501].available"
							/></a-col>
							<a-col v-show="setting.common.gameSetting[501].available" :span="20" class="showBox">
								<a-col :span="2" class="labelText">{{ $t('default.35') }}</a-col>
								<a-col :span="2">
									<a-input v-model:value="setting.common.gameSetting[501].credits" />
								</a-col>
								<a-col :span="2" class="labelText">{{ $t('default.36') }}</a-col>
								<a-col :span="2">
									<a-input v-model:value="setting.common.gameSetting[501].round" />
								</a-col>
								<a-col :span="2" class="labelText">{{ $t('default.37') }}</a-col>
								<a-col :span="4">
									<a-select class="selectBox" v-model:value="setting.common.gameSetting[501].in">
										<a-select-option v-for="option in gameBeginOptions" :key="option.id">{{ option.label }}</a-select-option>
									</a-select>
								</a-col>
								<a-col :span="2" class="labelText">{{ $t('default.38') }}</a-col>
								<a-col :span="4">
									<a-select class="selectBox" v-model:value="setting.common.gameSetting[501].out">
										<a-select-option v-for="option in gameEndOptions" :key="option.id">{{ option.label }}</a-select-option>
									</a-select>
								</a-col>
								<a-col :span="2" class="labelText">{{ $t('default.39') }}</a-col>
								<a-col :span="2">
									<a-select class="selectBox" v-model:value="setting.common.gameSetting[501].bull">
										<a-select-option v-for="option in bullOptions" :key="option.id">{{ option.label }}</a-select-option>
									</a-select>
								</a-col>
							</a-col>
						</a-row>
						<a-row class="rowStyle">
							<a-col :span="2" class="labelText">{{ $t('default.33') }}</a-col>
							<a-col :span="2" class="switchBox"
								><a-switch :checked-children="$t('default.47')" :un-checked-children="$t('default.48')" v-model:checked="setting.common.gameSetting[701].available"
							/></a-col>
							<a-col v-show="setting.common.gameSetting[701].available" :span="20" class="showBox">
								<a-col :span="2" class="labelText">{{ $t('default.35') }}</a-col>
								<a-col :span="2">
									<a-input v-model:value="setting.common.gameSetting[701].credits" />
								</a-col>
								<a-col :span="2" class="labelText">{{ $t('default.36') }}</a-col>
								<a-col :span="2">
									<a-input v-model:value="setting.common.gameSetting[701].round" />
								</a-col>
								<a-col :span="2" class="labelText">{{ $t('default.37') }}</a-col>
								<a-col :span="4">
									<a-select class="selectBox" v-model:value="setting.common.gameSetting[701].in">
										<a-select-option v-for="option in gameBeginOptions" :key="option.id">{{ option.label }}</a-select-option>
									</a-select>
								</a-col>
								<a-col :span="2" class="labelText">{{ $t('default.38') }}</a-col>
								<a-col :span="4">
									<a-select class="selectBox" v-model:value="setting.common.gameSetting[701].out">
										<a-select-option v-for="option in gameEndOptions" :key="option.id">{{ option.label }}</a-select-option>
									</a-select>
								</a-col>
								<a-col :span="2" class="labelText">{{ $t('default.39') }}</a-col>
								<a-col :span="2">
									<a-select class="selectBox" v-model:value="setting.common.gameSetting[701].bull">
										<a-select-option v-for="option in bullOptions" :key="option.id">{{ option.label }}</a-select-option>
									</a-select>
								</a-col>
							</a-col>
						</a-row>
						<a-row>
							<a-col :span="2" class="labelText">{{ $t('default.34') }}</a-col>
							<a-col :span="2" class="switchBox"
								><a-switch :checked-children="$t('default.47')" :un-checked-children="$t('default.48')" v-model:checked="setting.common.gameSetting[901].available"
							/></a-col>
							<a-col v-show="setting.common.gameSetting[901].available" :span="20" class="showBox">
								<a-col :span="2" class="labelText">{{ $t('default.35') }}</a-col>
								<a-col :span="2">
									<a-input v-model:value="setting.common.gameSetting[901].credits" />
								</a-col>
								<a-col :span="2" class="labelText">{{ $t('default.36') }}</a-col>
								<a-col :span="2">
									<a-input v-model:value="setting.common.gameSetting[901].round" />
								</a-col>
								<a-col :span="2" class="labelText">{{ $t('default.37') }}</a-col>
								<a-col :span="4">
									<a-select class="selectBox" v-model:value="setting.common.gameSetting[901].in">
										<a-select-option v-for="option in gameBeginOptions" :key="option.id">{{ option.label }}</a-select-option>
									</a-select>
								</a-col>
								<a-col :span="2" class="labelText">{{ $t('default.38') }}</a-col>
								<a-col :span="4">
									<a-select class="selectBox" v-model:value="setting.common.gameSetting[901].out">
										<a-select-option v-for="option in gameEndOptions" :key="option.id">{{ option.label }}</a-select-option>
									</a-select>
								</a-col>
								<a-col :span="2" class="labelText">{{ $t('default.39') }}</a-col>
								<a-col :span="2">
									<a-select class="selectBox" v-model:value="setting.common.gameSetting[901].bull">
										<a-select-option v-for="option in bullOptions" :key="option.id">{{ option.label }}</a-select-option>
									</a-select>
								</a-col>
							</a-col>
						</a-row>
					</div>
					<div class="gameBox">
						<div class="title-g">{{ $t('default.40') }}</div>
						<a-row class="rowStyle">
							<a-col :span="2" class="labelText">{{ $t('default.41') }}</a-col>
							<a-col :span="2" class="switchBox"
								><a-switch :checked-children="$t('default.47')" :un-checked-children="$t('default.48')" v-model:checked="setting.common.gameSetting.stardardCT.available"
							/></a-col>
							<a-col v-show="setting.common.gameSetting.stardardCT.available" :span="8" class="showBox">
								<a-col :span="3" class="labelText">{{ $t('default.35') }}</a-col>
								<a-col :span="9">
									<a-input v-model:value="setting.common.gameSetting.stardardCT.credits" />
								</a-col>
								<a-col :span="3" class="labelText">{{ $t('default.36') }}</a-col>
								<a-col :span="9">
									<a-input v-model:value="setting.common.gameSetting.stardardCT.round" />
								</a-col>
							</a-col>
						</a-row>
						<a-row>
							<a-col :span="2" class="labelText">{{ $t('default.42') }}</a-col>
							<a-col :span="2" class="switchBox"
								><a-switch :checked-children="$t('default.47')" :un-checked-children="$t('default.48')" v-model:checked="setting.common.gameSetting.accumulationCT.available"
							/></a-col>
							<a-col v-show="setting.common.gameSetting.accumulationCT.available" :span="8" class="showBox">
								<a-col :span="3" class="labelText">{{ $t('default.35') }}</a-col>
								<a-col :span="9">
									<a-input v-model:value="setting.common.gameSetting.accumulationCT.credits" />
								</a-col>
								<a-col :span="3" class="labelText">{{ $t('default.36') }}</a-col>
								<a-col :span="9">
									<a-input v-model:value="setting.common.gameSetting.accumulationCT.round" />
								</a-col>
							</a-col>
						</a-row>
					</div>
					<div class="gameBox">
						<div class="title-g">{{ $t('default.43') }}</div>
						<a-row class="rowStyle">
							<a-col :span="2" class="labelText">{{ $t('default.44') }}</a-col>
							<a-col :span="2" class="switchBox"
								><a-switch :checked-children="$t('default.47')" :un-checked-children="$t('default.48')" v-model:checked="setting.common.gameSetting.stardardCUp.available"
							/></a-col>
							<a-col v-show="setting.common.gameSetting.stardardCUp.available" :span="8" class="showBox">
								<a-col :span="3" class="labelText">{{ $t('default.35') }}</a-col>
								<a-col :span="9">
									<a-input v-model:value="setting.common.gameSetting.stardardCUp.credits" />
								</a-col>
								<a-col :span="3" class="labelText">{{ $t('default.36') }}</a-col>
								<a-col :span="9">
									<a-input v-model:value="setting.common.gameSetting.stardardCUp.round" />
								</a-col>
							</a-col>
						</a-row>
						<a-row>
							<a-col :span="2" class="labelText">{{ $t('default.45') }}</a-col>
							<a-col :span="2" class="switchBox"
								><a-switch :checked-children="$t('default.47')" :un-checked-children="$t('default.48')" v-model:checked="setting.common.gameSetting.timeLimitedCUp.available"
							/></a-col>
							<a-col v-show="setting.common.gameSetting.timeLimitedCUp.available" :span="8" class="showBox">
								<a-col :span="3" class="labelText">{{ $t('default.35') }}</a-col>
								<a-col :span="9">
									<a-input v-model:value="setting.common.gameSetting.timeLimitedCUp.credits" />
								</a-col>
								<a-col :span="3" class="labelText">{{ $t('default.46') }}</a-col>
								<a-col :span="9">
									<a-input v-model:value="setting.common.gameSetting.timeLimitedCUp.second" allow-clear />
								</a-col>
							</a-col>
						</a-row>
					</div>
					<div class="gameBox">
						<div class="title-g">{{ $t('default.49') }}</div>
						<a-row class="rowStyle">
							<a-col :span="2" class="labelText">{{ $t('default.50') }}</a-col>
							<a-col :span="2" class="switchBox"
								><a-switch :checked-children="$t('default.47')" :un-checked-children="$t('default.48')" v-model:checked="setting.common.gameSetting.halving.available"
							/></a-col>
							<a-col v-show="setting.common.gameSetting.halving.available" :span="8" class="showBox">
								<a-col :span="3" class="labelText">{{ $t('default.35') }}</a-col>
								<a-col :span="9">
									<a-input v-model:value="setting.common.gameSetting.halving.credits" />
								</a-col>
							</a-col>
						</a-row>
						<a-row class="rowStyle">
							<a-col :span="2" class="labelText">{{ $t('default.51') }}</a-col>
							<a-col :span="2" class="switchBox"
								><a-switch :checked-children="$t('default.47')" :un-checked-children="$t('default.48')" v-model:checked="setting.common.gameSetting.drink.available"
							/></a-col>
							<a-col v-show="setting.common.gameSetting.drink.available" :span="8" class="showBox">
								<a-col :span="3" class="labelText">{{ $t('default.35') }}</a-col>
								<a-col :span="9">
									<a-input v-model:value="setting.common.gameSetting.drink.credits" />
								</a-col>
							</a-col>
						</a-row>
						<a-row class="rowStyle">
							<a-col :span="2" class="labelText">{{ $t('default.52') }}</a-col>
							<a-col :span="2" class="switchBox"
								><a-switch :checked-children="$t('default.47')" :un-checked-children="$t('default.48')" v-model:checked="setting.common.gameSetting.eagleEye.available"
							/></a-col>
							<a-col v-show="setting.common.gameSetting.eagleEye.available" :span="8" class="showBox">
								<a-col :span="3" class="labelText">{{ $t('default.35') }}</a-col>
								<a-col :span="9">
									<a-input v-model:value="setting.common.gameSetting.eagleEye.credits" />
								</a-col>
								<a-col :span="3" class="labelText">{{ $t('default.36') }}</a-col>
								<a-col :span="9">
									<a-select class="selectBox" v-model:value="setting.common.gameSetting.eagleEye.round">
										<a-select-option v-for="option in options" :key="option.id">{{ option.label }}</a-select-option>
									</a-select>
								</a-col>
							</a-col>
						</a-row>
						<a-row class="rowStyle">
							<a-col :span="2" class="labelText">{{ $t('default.53') }}</a-col>
							<a-col :span="2" class="switchBox"
								><a-switch :checked-children="$t('default.47')" :un-checked-children="$t('default.48')" v-model:checked="setting.common.gameSetting.bigbull.available"
							/></a-col>
							<a-col v-show="setting.common.gameSetting.bigbull.available" :span="8" class="showBox">
								<a-col :span="3" class="labelText">{{ $t('default.35') }}</a-col>
								<a-col :span="9">
									<a-input v-model:value="setting.common.gameSetting.bigbull.credits" />
								</a-col>
								<a-col :span="3" class="labelText">{{ $t('default.36') }}</a-col>
								<a-col :span="9">
									<a-select class="selectBox" v-model:value="setting.common.gameSetting.bigbull.round">
										<a-select-option v-for="option in options" :key="option.id">{{ option.label }}</a-select-option>
									</a-select>
								</a-col>
							</a-col>
						</a-row>
						<a-row class="rowStyle">
							<a-col :span="2" class="labelText">{{ $t('default.54') }}</a-col>
							<a-col :span="2" class="switchBox"
								><a-switch :checked-children="$t('default.47')" :un-checked-children="$t('default.48')" v-model:checked="setting.common.gameSetting.crcup.available"
							/></a-col>
							<a-col v-show="setting.common.gameSetting.crcup.available" :span="8" class="showBox">
								<a-col :span="3" class="labelText">{{ $t('default.35') }}</a-col>
								<a-col :span="9">
									<a-input v-model:value="setting.common.gameSetting.crcup.credits" />
								</a-col>
							</a-col>
						</a-row>
					</div>
					<div class="gameBox">
						<div class="title-g">{{ $t('default.55') }}</div>
						<a-row class="rowStyle">
							<a-col :span="2" class="labelText">{{ $t('default.56') }}</a-col>
							<a-col :span="2" class="labelText">{{ $t('default.35') }}</a-col>
							<a-col :span="4">
								<a-input v-model:value="setting.common.gameSetting.online501.credits" />
							</a-col>
							<a-col :span="2" class="labelText">{{ $t('default.57') }}</a-col>
							<a-col :span="2" class="labelText">{{ $t('default.35') }}</a-col>
							<a-col :span="4">
								<a-select class="selectBox" v-model:value="setting.common.gameSetting.online701.credits">
									<a-select-option v-for="option in options" :key="option.id">{{ option.label }}</a-select-option>
								</a-select>
							</a-col>
						</a-row>
						<a-row class="rowStyle">
							<a-col :span="2" class="labelText">{{ $t('default.58') }}</a-col>
							<a-col :span="2" class="labelText">{{ $t('default.35') }}</a-col>
							<a-col :span="4">
								<a-input v-model:value="setting.common.gameSetting.online501DO.credits" />
							</a-col>
							<a-col :span="2" class="labelText">{{ $t('default.59') }}</a-col>
							<a-col :span="2" class="labelText">{{ $t('default.35') }}</a-col>
							<a-col :span="4">
								<a-input v-model:value="setting.common.gameSetting.online701MO.credits" />
							</a-col>
						</a-row>
						<a-row>
							<a-col :span="2" class="labelText">{{ $t('default.41') }}</a-col>
							<a-col :span="2" class="labelText">{{ $t('default.35') }}</a-col>
							<a-col :span="4">
								<a-input v-model:value="setting.common.gameSetting.onlinesdCrcket.credits" />
							</a-col>
						</a-row>
					</div>
				</a-tab-pane>
				<a-tab-pane key="2" :tab="$t('default.60')">
					<a-row class="rowStyle">
						<a-col :span="2" class="labelText">{{ $t('default.61') }}</a-col>
						<a-col :span="2" class="switchBox"><a-switch :checked-children="$t('default.47')" :un-checked-children="$t('default.48')" v-model:checked="setting.common.screenSaverSwitch"/></a-col>
						<a-col v-show="setting.common.screenSaverSwitch" :span="8" class="showBox">
							<a-col :span="10" class="labelText">{{ $t('default.62') }}</a-col>
							<a-col :span="10">
								<a-input v-model:value="setting.common.screenSaverTime" />
							</a-col>
						</a-col>
						<!-- <a-col :span="4" class="labelText">{{ $t('default.129') }}</a-col>
						<a-col :span="2">
							<a-select v-model:value="setting.common.systemSetting.others.shopRatio" @change="shopRatioChange">
								<a-select-option v-for="option in shopRatioList" :key="option.id">{{ option.label }}</a-select-option>
							</a-select>
						</a-col>
						<a-col :span="4" class="labelText">{{ $t('default.130') }}</a-col>
						<a-col :span="2">
							<a-input v-model:value="setting.common.systemSetting.others.agentRatio" :disabled="true" />
						</a-col> -->
					</a-row>

					<a-row class="rowStyle">
						<a-col :span="2" class="labelText">{{ $t('default.65') }}</a-col>
						<a-col :span="2" class="switchBox"><a-switch :checked-children="$t('default.47')" :un-checked-children="$t('default.48')" v-model:checked="setting.common.showTimedSwitch"/></a-col>
						<a-col v-show="setting.common.showTimedSwitch" :span="8" class="showBox">
							<a-col :span="10" class="labelText">{{ $t('default.66') }}</a-col>
							<a-col :span="10">
								<a-input v-model:value="setting.common.showTimed" />
							</a-col>
						</a-col>
					</a-row>

					<a-row class="rowStyle">
						<a-col :span="2" class="labelText">{{ $t('default.63') }}</a-col>
						<a-col :span="2" class="switchBox"><a-switch :checked-children="$t('default.47')" :un-checked-children="$t('default.48')" v-model:checked="setting.common.autoChange"/></a-col>
						<a-col v-show="setting.common.autoChange" :span="8" class="showBox">
							<a-col :span="10" class="labelText">{{ $t('default.64') }}</a-col>
							<a-col :span="10">
								<a-select class="selectBox" v-model:value="setting.common.changingOver">
									<a-select-option v-for="option in options" :key="option.id">{{ option.label }}</a-select-option>
								</a-select>
							</a-col>
						</a-col>
					</a-row>

					<a-row class="rowStyle">
						<a-col :span="2" class="labelText">{{ $t('default.68') }}</a-col>
						<a-col :span="2" class="switchBox"><a-switch :checked-children="$t('default.47')" :un-checked-children="$t('default.48')" v-model:checked="setting.common.emptyDartAlarm"/></a-col>
						<a-col :span="2" class="labelText">{{ $t('default.69') }}</a-col>
						<a-col :span="2" class="switchBox"><a-switch :checked-children="$t('default.47')" :un-checked-children="$t('default.48')" v-model:checked="setting.common.isDebug"/></a-col>
						<a-col :span="2" class="labelText">{{ $t('default.70') }}</a-col>
						<a-col :span="2" class="switchBox"><a-switch :checked-children="$t('default.47')" :un-checked-children="$t('default.48')" v-model:checked="setting.common.mode"/></a-col>
						<a-col :span="2" class="labelText">{{ $t('default.71') }}</a-col>
						<a-col :span="2" class="switchBox"><a-switch :checked-children="$t('default.47')" :un-checked-children="$t('default.48')" v-model:checked="setting.common.creditsBrushSwitch"/></a-col>
						<a-col :span="2" class="labelText">{{ $t('default.72') }}</a-col>
						<a-col :span="2" class="switchBox"><a-switch :checked-children="$t('default.47')" :un-checked-children="$t('default.48')" v-model:checked="setting.common.IDBrushSwitch"/></a-col>
					</a-row>
				</a-tab-pane>
				<a-tab-pane key="3" :tab="$t('default.73')">
					<a-row class="rowStyle">
						<a-col :span="2" class="labelText">{{ $t('default.74') }}</a-col>
						<a-col :span="3" class="switchBox"><a-switch :checked-children="$t('default.47')" :un-checked-children="$t('default.48')" v-model:checked="setting.common.qrcodeSwitch"/></a-col>
						<a-col :span="2" class="labelText">{{ $t('default.75') }}</a-col>
						<a-col :span="3" class="switchBox"><a-switch :checked-children="$t('default.47')" :un-checked-children="$t('default.48')" v-model:checked="setting.common.coinsSwitch"/></a-col>
						<a-col :span="2" class="labelText">{{ $t('default.76') }}</a-col>
						<a-col :span="3" class="switchBox"><a-switch :checked-children="$t('default.47')" :un-checked-children="$t('default.48')" v-model:checked="setting.common.moneySwitch"/></a-col>
						<a-col :span="2" class="labelText">{{ $t('default.77') }}</a-col>
						<a-col :span="3" class="switchBox"
							><a-switch :checked-children="$t('default.47')" :un-checked-children="$t('default.48')" v-model:checked="setting.common.systemSetting.others.isFree"
						/></a-col>
						<a-col v-show="setting.common.systemSetting.others.isFree" :span="4" class="showBox">
							<a-col :span="10" class="labelText">{{ $t('default.78') }}</a-col>
							<a-col :span="14">
								<a-input v-model:value="setting.common.systemSetting.others.freeCoins" allow-clear />
							</a-col>
						</a-col>
					</a-row>
					<a-row class="rowStyle">
						<a-col :span="2" class="labelText">{{ $t('default.79') }}</a-col>
						<a-col :span="3">
							<a-input v-model:value="setting.common.systemSetting.exchange.rmbToCoin" allow-clear />
						</a-col>
						<a-col :span="2" class="labelText">{{ $t('default.80') }}</a-col>
						<a-col :span="3">
							<a-input v-model:value="setting.common.systemSetting.exchange.moneyToCoin" allow-clear />
						</a-col>
						<a-col :span="2" class="labelText">{{ $t('default.81') }}</a-col>
						<a-col :span="3">
							<a-input v-model:value="setting.common.systemSetting.exchange.coinToCrdits" allow-clear />
						</a-col>
					</a-row>
					<a-row class="rowStyle">
						<a-col :span="2" class="labelText">{{ $t('default.82') + '1' }}</a-col>
						<a-col :span="3">
							<a-input v-model:value="setting.common.moneyOpt.money0" allow-clear />
						</a-col>
						<a-col :span="2" class="labelText">{{ $t('default.82') + '2' }}</a-col>
						<a-col :span="3">
							<a-input v-model:value="setting.common.moneyOpt.money1" allow-clear />
						</a-col>
						<a-col :span="2" class="labelText">{{ $t('default.82') + '3' }}</a-col>
						<a-col :span="3">
							<a-input v-model:value="setting.common.moneyOpt.money2" allow-clear />
						</a-col>
						<a-col :span="2" class="labelText">{{ $t('default.82') + '4' }}</a-col>
						<a-col :span="3">
							<a-input v-model:value="setting.common.moneyOpt.money3" allow-clear />
						</a-col>
						<a-col :span="1" class="labelText">{{ $t('default.82') + '5' }}</a-col>
						<a-col :span="3">
							<a-input v-model:value="setting.common.moneyOpt.money4" allow-clear />
						</a-col>
					</a-row>
					<a-row>
						<a-col :span="2" class="labelText">{{ $t('default.82') + '6' }}</a-col>
						<a-col :span="3">
							<a-input v-model:value="setting.common.moneyOpt.money5" allow-clear />
						</a-col>
						<a-col :span="2" class="labelText">{{ $t('default.82') + '7' }}</a-col>
						<a-col :span="3">
							<a-input v-model:value="setting.common.moneyOpt.money6" allow-clear />
						</a-col>
						<a-col :span="2" class="labelText">{{ $t('default.82') + '8' }}</a-col>
						<a-col :span="3">
							<a-input v-model:value="setting.common.moneyOpt.money7" allow-clear />
						</a-col>
						<a-col :span="2" class="labelText">{{ $t('default.82') + '9' }}</a-col>
						<a-col :span="3">
							<a-input v-model:value="setting.common.moneyOpt.money8" allow-clear />
						</a-col>
					</a-row>
				</a-tab-pane>
				<a-tab-pane key="4" :tab="$t('default.119')">
					<a-row class="rowStyle">
						<a-col :span="2" class="labelText">{{ $t('default.67') }}</a-col>
						<a-col :span="5" class="switchBox">
							<a-input v-model:value="setting.others.password" type="password" allow-clear />
						</a-col>
						<a-col :span="2" class="labelText">{{ $t('default.97') }}</a-col>
						<a-col :span="5" class="switchBox">
							<a-input v-model:value="setting.others.shopManagerCard" allow-clear />
						</a-col>
					</a-row>
				</a-tab-pane>
			</a-tabs>
		</a-row>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { deepClone, initDataToNumber, initDataToBoolean } from '@/components/common/tools';
enum State {
	OFF,
	NO = 0,
	ON,
	YES = 1
}
enum EGameBeginOptions {
	OPENIN = 1, //任何方式开镖
	DOUBLEIN = 2, //双倍区开镖
	MASTERIN = 3, //二、三倍区开镖
	MASTERNOBULLIN = 4, //二、三倍区开镖且没有打中红心区
	DOUBLENOBULLIN = 5 //双倍区开镖且没有打中红心区
}
enum EGameEndOptions {
	OPENOUT = 1, //任何方式结镖
	MASTEROUT = 2, //二、三倍区结镖
	DOUBLEOUT = 3, //双倍区结镖
	MASTERNOBULLOUT = 4, //二、三倍区结镖且没有打中红心区
	DOUBLENOBULLOUT = 5 //三倍区结镖且没有打中红心区
}
enum EOtherOptions {
	MAXVOLUME = 100,
	BUSINESSEDITION = 2,
	SINGLEBULL = 2,
	INVALID = 'invalidData'
}
export default defineComponent({
	name: 'MachineOptions',
	components: {},
	props: ['gameOptions'],
	setup() {
		const data = reactive({
			optionValue: '1',
			setting: {
				others: {
					password: '',
					shopManagerCard: ''
				},
				common: {
					startBegin: null,
					matchineID: null,
					mode: Boolean(1),
					allGameOfMatch: Boolean(Boolean(State.ON)),
					isDebug: Boolean(State.OFF), //debug模式
					showTimedSwitch: Boolean(State.ON), //是否开启投标计时
					emptyDartAlarm: Boolean(State.OFF), //是否开启空标报警
					useNetWork: 0,
					actionTime: 750, //0分区延时
					sensitivity: 65, //灵敏度
					coinsSwitch: Boolean(State.ON), //能否投硬币
					moneySwitch: Boolean(State.ON), //能否投纸币
					qrcodeSwitch: Boolean(State.OFF), //能否扫二维码
					IDBrushSwitch: Boolean(State.ON), //能否刷身份卡
					creditsBrushSwitch: Boolean(State.ON), //能否刷点卡
					ledSwitch: Boolean(State.ON), //LED 开关 on/off
					screenSaverTime: 60, //屏保
					screenSaverSwitch: Boolean(State.ON), //开关 on/off
					user: null,
					version: '01.03.10',
					language: 'English', //语言
					mute: Boolean(State.OFF), //静音
					coins: 0, //币值
					credits: 0, //{{ $t('default.35') }}
					freeCredits: 0, //{{ $t('default.35') }}
					cash: 0, //现金
					edition: EOtherOptions.BUSINESSEDITION,
					autoChange: Boolean(State.OFF), //是否自动切
					firstTeam: 'loser',
					changingOver: 3, //切换用户时间
					showTimed: 90, //投镖时间
					moneyOpt: {
						money0: 1,
						money1: 5,
						money2: 10,
						money3: 20,
						money4: 50,
						money5: 100,
						money6: 200,
						money7: 500,
						money8: 1000
					},
					lighteness: {
						mainLighteness: 100,
						boardLighteness: 100,
						logoLighteness: 100,
						outerLighteness: 100
					},
					gameSetting: {
						'301': {
							available: Boolean(State.YES),
							credits: 1,
							round: 10,
							bull: EOtherOptions.SINGLEBULL,
							in: EGameBeginOptions.OPENIN,
							out: EGameEndOptions.OPENOUT,
							second: EOtherOptions.INVALID,
							minRound: 2,
							maxRound: 10
						},
						'501': {
							available: Boolean(State.YES),
							credits: 1,
							round: 15,
							bull: EOtherOptions.SINGLEBULL,
							in: EGameBeginOptions.OPENIN,
							out: EGameEndOptions.OPENOUT,
							second: EOtherOptions.INVALID,
							minRound: 3,
							maxRound: 15
						},
						'701': {
							available: Boolean(State.YES),
							credits: 1,
							round: 15,
							bull: EOtherOptions.SINGLEBULL,
							in: EGameBeginOptions.OPENIN,
							out: EGameEndOptions.OPENOUT,
							second: EOtherOptions.INVALID,
							minRound: 4,
							maxRound: 15
						},
						'901': {
							available: Boolean(State.YES),
							credits: 2,
							round: 20,
							bull: EOtherOptions.SINGLEBULL,
							in: EGameBeginOptions.OPENIN,
							out: EGameEndOptions.OPENOUT,
							second: EOtherOptions.INVALID,
							minRound: 6,
							maxRound: 20
						},
						snow01: {
							//雪分01
							available: Boolean(State.YES),
							credits: 1,
							round: 15,
							bull: EOtherOptions.SINGLEBULL,
							in: EGameBeginOptions.OPENIN,
							out: EGameEndOptions.OPENOUT,
							second: EOtherOptions.INVALID,
							minRound: 3,
							maxRound: 15
						},
						stardardCT: {
							//标准米老鼠
							available: Boolean(State.YES),
							credits: 1,
							round: 15,
							bull: EOtherOptions.INVALID,
							in: EOtherOptions.INVALID,
							out: EOtherOptions.INVALID,
							second: EOtherOptions.INVALID,
							minRound: 3,
							maxRound: 15
						},
						accumulationCT: {
							//加分米老鼠
							available: Boolean(State.YES),
							credits: 1,
							round: 15,
							bull: EOtherOptions.INVALID,
							in: EOtherOptions.INVALID,
							out: EOtherOptions.INVALID,
							second: EOtherOptions.INVALID,
							minRound: 3,
							maxRound: 15
						},
						teamCT: {
							//队际米老鼠
							available: Boolean(State.YES),
							credits: 1,
							round: 15,
							bull: EOtherOptions.INVALID,
							in: EOtherOptions.INVALID,
							out: EOtherOptions.INVALID,
							second: EOtherOptions.INVALID,
							minRound: 3,
							maxRound: 15
						},
						stardardCUp: {
							//标准高分赛
							available: Boolean(State.YES),
							credits: 1,
							round: 8,
							bull: EOtherOptions.INVALID,
							in: EOtherOptions.INVALID,
							out: EOtherOptions.INVALID,
							second: EOtherOptions.INVALID,
							minRound: 1,
							maxRound: 8
						},
						timeLimitedCUp: {
							//限时高分赛
							available: Boolean(State.YES),
							credits: 1,
							round: EOtherOptions.INVALID,
							bull: EOtherOptions.INVALID,
							in: EOtherOptions.INVALID,
							out: EOtherOptions.INVALID,
							second: 60,
							minSecond: 10,
							maxSecond: 60
						},
						halving: {
							//减半
							available: Boolean(State.YES),
							credits: 1,
							round: 9,
							bull: EOtherOptions.INVALID,
							in: EOtherOptions.INVALID,
							out: EOtherOptions.INVALID,
							second: EOtherOptions.INVALID,
							minRound: 9,
							maxRound: 9
						},
						drink: {
							//饮酒
							available: Boolean(State.YES),
							credits: 1,
							round: 9,
							bull: EOtherOptions.INVALID,
							in: EOtherOptions.INVALID,
							out: EOtherOptions.INVALID,
							second: EOtherOptions.INVALID,
							minRound: 9,
							maxRound: 9
						},
						crcup: {
							//米老鼠高分赛
							available: Boolean(State.YES),
							credits: 1,
							round: 8,
							bull: EOtherOptions.INVALID,
							in: EOtherOptions.INVALID,
							out: EOtherOptions.INVALID,
							second: EOtherOptions.INVALID,
							minRound: 8,
							maxRound: 8
						},
						eagleEye: {
							//鹰眼
							available: Boolean(State.YES),
							credits: 1,
							round: 8,
							bull: EOtherOptions.INVALID,
							in: EOtherOptions.INVALID,
							out: EOtherOptions.INVALID,
							second: EOtherOptions.INVALID,
							minRound: 1,
							maxRound: 8
						},
						bigbull: {
							//大红心
							available: Boolean(State.YES),
							credits: 1,
							round: 8,
							bull: EOtherOptions.INVALID,
							in: EOtherOptions.INVALID,
							out: EOtherOptions.INVALID,
							second: EOtherOptions.INVALID,
							minRound: 1,
							maxRound: 8
						},

						HyperJumpUp: {
							available: Boolean(State.YES),
							credits: 1,
							round: 8,
							minRound: 8,
							maxRound: 8
						},
						online501: {
							available: Boolean(State.YES),
							credits: 1,
							round: 15,
							bull: EOtherOptions.SINGLEBULL,
							in: EGameBeginOptions.OPENIN,
							out: EGameEndOptions.OPENOUT,
							second: EOtherOptions.INVALID,
							minRound: 15,
							maxRound: 15
						},
						online501DO: {
							available: Boolean(State.YES),
							credits: 1,
							round: 15,
							bull: EOtherOptions.SINGLEBULL,
							in: EGameBeginOptions.OPENIN,
							out: EGameEndOptions.MASTEROUT,
							second: EOtherOptions.INVALID,
							minRound: 15,
							maxRound: 15
						},
						online701: {
							available: Boolean(State.YES),
							credits: 1,
							round: 15,
							bull: EOtherOptions.SINGLEBULL,
							in: EGameBeginOptions.OPENIN,
							out: EGameEndOptions.OPENOUT,
							second: EOtherOptions.INVALID,
							minRound: 15,
							maxRound: 15
						},
						online701MO: {
							available: Boolean(State.YES),
							credits: 1,
							round: 15,
							bull: EOtherOptions.SINGLEBULL,
							in: EGameBeginOptions.OPENIN,
							out: EGameEndOptions.MASTEROUT,
							second: EOtherOptions.INVALID,
							minRound: 15,
							maxRound: 15
						},
						onlinesdCrcket: {
							available: Boolean(State.YES),
							credits: 1,
							round: 15,
							bull: EOtherOptions.INVALID,
							in: EOtherOptions.INVALID,
							out: EOtherOptions.INVALID,
							second: EOtherOptions.INVALID,
							minRound: 15,
							maxRound: 15
						}
					},
					systemSetting: {
						volume: {
							maxVolume: EOtherOptions.MAXVOLUME,
							buttonVolume: 70,
							gameVolume: 70,
							videoVolume: 70,
							awardVolume: 80,
							promotionVolume: 70
						},
						exchange: {
							moneyToCoin: 1,
							coinToCrdits: 1,
							rmbToCoin: 1
						},
						others: {
							isFree: Boolean(State.YES), //是否免费
							freeCoins: 0, //免费点数
							isTimeFree: Boolean(State.YES), //是否限时免费
							timeFreeData: 0, //免费时长
							shopRatio: 0, // 店铺分账比率
							agentRatio: '100%' // 代理商分账比率
						}
					},
					game: null
				}
			},
			gameBeginOptions: [
				{ id: 1, label: 'OPENIN' },
				{ id: 2, label: 'DOUBLEIN' },
				{ id: 3, label: 'MASTERIN' },
				{ id: 4, label: 'MASTERNOBULLIN' },
				{ id: 5, label: 'DOUBLENOBULLIN' }
			],
			gameEndOptions: [
				{ id: 1, label: 'OPENOUT' },
				{ id: 2, label: 'MASTEROUT' },
				{ id: 3, label: 'DOUBLEOUT' },
				{ id: 4, label: 'MASTERNOBULLOUT' },
				{ id: 5, label: 'DOUBLENOBULLOUT' }
			],
			options: [
				{ id: 1, label: 1 },
				{ id: 2, label: 2 },
				{ id: 3, label: 3 },
				{ id: 4, label: 4 }
			],
			bullOptions: [
				{ id: 1, label: '25/50' },
				{ id: 2, label: '50/50' }
			],
			// shopRatioList: [
			// 	{ id: 0, label: '0%' },
			// 	{ id: 0.1, label: '10%' },
			// 	{ id: 0.2, label: '20%' },
			// 	{ id: 0.3, label: '30%' },
			// 	{ id: 0.4, label: '40%' },
			// 	{ id: 0.5, label: '50%' },
			// 	{ id: 0.6, label: '60%' },
			// 	{ id: 0.7, label: '70%' },
			// 	{ id: 0.8, label: '80%' },
			// 	{ id: 0.9, label: '90%' },
			// 	{ id: 1, label: '100%' }
			// ],
			// shopRatioChange: () => {
			// 	data.setting.common.systemSetting.others.agentRatio = 100 - (data.setting.common.systemSetting.others.shopRatio * 100) + '%';
			// }
		});
		const getData = () => {
			const obj = deepClone(data.setting);
			initDataToNumber(obj);
			obj.others = JSON.stringify(obj.others);
			obj.common = JSON.stringify(obj.common);
			return obj;
		};
		const setData = (obj: any) => {
			obj.others = JSON.parse(obj.others);
			obj.common = JSON.parse(obj.common);
			initDataToBoolean(obj);
			data.setting = obj;
		};
		return {
			...toRefs(data),
			getData,
			setData
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
