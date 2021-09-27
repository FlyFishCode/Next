<template>
	<labelTitle :value="$t('default.2')" :btn="id || infoVO.id  ? update : create"  @afterHttp='afterHttp'/>
	<div class="searchBox">
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ $t('default.5') }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.name" allow-clear />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ $t('default.25') }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.type" allow-clear />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ 'Attracts' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.attracts" allow-clear />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ 'Average Cost' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.averageCost" allow-clear />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ $t('default.17') }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.address" allow-clear />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ $t('default.90') }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.phone" allow-clear />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ 'Fax' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.fax" allow-clear />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ $t('default.91') }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.email" allow-clear />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ $t('default.92') }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.website" allow-clear />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ $t('default.249') }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.businessHours" allow-clear />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ $t('default.93') }}
			</a-col>
			<a-col :span="7">
				<a-input v-model:value="infoVO.img" allow-clear />
			</a-col>
			<a-col :span="2" class="searchButton">
				<a-button size="small" type="primary" @click="preview">{{ $t('default.16') }}</a-button>
			</a-col>
			<a-col :span="3" class="labelText">
				{{ 'Supplier' }}
			</a-col>
			<a-col :span="9" class="radioStyle">
				<a-radio-group name="radioGroup" v-model:value="infoVO.supplier">
					<a-radio :value="1">{{ 'Yes' }}</a-radio>
					<a-radio :value="0">{{ 'No' }}</a-radio>
				</a-radio-group>
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ $t('default.94') }}
			</a-col>
			<a-col :span="2">
				<a-input v-model:value="infoVO.longitude" disabled />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ $t('default.95') }}
			</a-col>
			<a-col :span="2">
				<a-input v-model:value="infoVO.latitude" disabled />
			</a-col>
			<a-col :span="2" class="labelText">
				<a-button size="small" type="primary" @click="getPositionMap">{{ $t('default.96') }}</a-button>
			</a-col>
			<a-col :span="3" class="labelText">
				{{ 'Valid' }}
			</a-col>
			<a-col :span="9" class="radioStyle">
				<a-radio-group name="radioGroup" v-model:value="infoVO.isValid">
					<a-radio :value="1">{{ 'Yes' }}</a-radio>
					<a-radio :value="0">{{ 'No' }}</a-radio>
				</a-radio-group>
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ 'Room' }}
			</a-col>
			<a-col :span="9" class="radioStyle">
				<a-radio-group name="radioGroup" v-model:value="infoVO.room">
					<a-radio :value="1">{{ 'Yes' }}</a-radio>
					<a-radio :value="0">{{ 'No' }}</a-radio>
				</a-radio-group>
			</a-col>
			<a-col :span="3" class="labelText">
				{{ 'Parking' }}
			</a-col>
			<a-col :span="9" class="radioStyle">
				<a-radio-group name="radioGroup" v-model:value="infoVO.parking">
					<a-radio :value="1">{{ 'Yes' }}</a-radio>
					<a-radio :value="0">{{ 'No' }}</a-radio>
				</a-radio-group>
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ 'Credit' }}
			</a-col>
			<a-col :span="9" class="radioStyle">
				<a-radio-group name="radioGroup" v-model:value="infoVO.credit">
					<a-radio :value="1">{{ 'Yes' }}</a-radio>
					<a-radio :value="0">{{ 'No' }}</a-radio>
				</a-radio-group>
			</a-col>

			<a-col :span="3" class="labelText">{{ $t('default.129') }}</a-col>
			<a-col :span="3">
				<a-select class="selectBox" v-model:value="infoVO.shopRate" @change="shopRatioChange">
					<a-select-option v-for="option in shopRateList" :key="option.id">{{ option.label }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :span="3" class="labelText">{{ $t('default.130') }}</a-col>
			<a-col :span="3">
				<a-input v-model:value="infoVO.agentRate" :disabled="true" />
			</a-col>
		</a-row>

		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ $t('default.252') }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.budget" />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ $t('default.253') }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.theme" />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ $t('default.250') }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.restDay" />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ $t('default.251') }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.trafficInfo" />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ $t('default.254') }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.service" />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ $t('default.255') }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.shopInfo" />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ $t('default.256') }}
			</a-col>
			<a-col :span="9" class="radioStyle">
				<a-radio-group name="radioGroup" v-model:value="infoVO.open">
					<a-radio :value="1">{{ 'Yes' }}</a-radio>
					<a-radio :value="0">{{ 'No' }}</a-radio>
				</a-radio-group>
			</a-col>
		</a-row>

		<div v-if="isAdmin">
			<a-row class="rowStyle">
				<a-col :span="3" class="labelText">
					{{ $t('default.23') }}
				</a-col>
				<a-col :span="9">
					<a-select v-model:value="infoVO.countryId" @change="countryChange" class="selectBox" allowClear>
						<a-select-option v-for="item in countryList" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
					</a-select>
				</a-col>
				<a-col :span="3" class="labelText">
					{{ $t('default.23') }}
				</a-col>
				<a-col :span="9">
					<a-select v-model:value="infoVO.areaId" class="selectBox" allowClear>
						<a-select-option v-for="item in areaList" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
					</a-select>
				</a-col>
			</a-row>
			<a-row>
				<a-col :span="3" class="labelText">
					{{ $t('default.26') }}
				</a-col>
				<a-col :span="9">
					<a-select class="selectBox" show-search v-model:value="infoVO.agentId" :default-active-first-option="false" :show-arrow="false" :filter-option="false" :not-found-content="null" allowClear @search="agentSearch">
						<a-select-option v-for="d in agentList" :key="d.id">
							<div :title="d.name">{{ d.name }}</div>
						</a-select-option>
					</a-select>
				</a-col>
			</a-row>
		</div>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ $t('default.85') }}
			</a-col>
			<a-col :span="21">
				<a-textarea v-model:value="infoVO.memo" :rows="4" allow-clear />
			</a-col>
		</a-row>
	</div>
	<labelTitle :value="$t('default.3')" />
	<div class="searchBox">
		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ 'ID' }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="machineVO.id" allow-clear />
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.13') }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="machineVO.name" allow-clear />
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.21') }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="machineVO.serial" allow-clear />
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.84') }}
			</a-col>
			<a-col :span="4">
				<a-select class="selectBox" v-model:value="machineVO.placingType" allow-clear>
					<a-select-option :value="1">{{ $t('default.86') }}</a-select-option>
					<a-select-option :value="2">{{ $t('default.87') }}</a-select-option>
					<a-select-option :value="3">{{ $t('default.88') }}</a-select-option>
				</a-select>
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ $t('default.89') }}
			</a-col>
			<a-col :span="2">
				<a-date-picker v-model:value="machineVO.minLastOnlineTime" :disabled-date="disabledStartDate" valueFormat="yyyy-MM-DD 00:00:00" allow-clear />
			</a-col>
			<a-col :span="2">
				<a-date-picker v-model:value="machineVO.maxLastOnlineTime" :disabled-date="disabledEndDate" valueFormat="yyyy-MM-DD 23:59:59" allow-clear />
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.22') }}
			</a-col>
			<a-col :span="4">
				<a-select class="selectBox" v-model:value="machineVO.type" allow-clear>
					<a-select-option value="A1">A1</a-select-option>
					<a-select-option value="W1">W1</a-select-option>
				</a-select>
			</a-col>
			<a-col :span="2" class="labelText">
				<a-button type="primary" size="small" @click="search">{{ $t('default.8') }}</a-button>
			</a-col>
		</a-row>
	</div>
	<a-row class="rowStyle">
		<a-table bordered :columns="columns" :data-source="tableList" :pagination="false" class="tableStyle" rowKey="id">
			<template #PlacingType="{ record }">
				<div v-if="record.placingType === 1">{{ $t('default.86') }}</div>
				<div v-if="record.placingType === 2">{{ $t('default.87') }}</div>
				<div v-if="record.placingType === 3">{{ $t('default.88') }}</div>
			</template>
			<template #gameSetting="{ record }">
				<a-button size="small" type="primary" @click="setGameSetting(record.id)">{{ $t('default.29') }}</a-button>
			</template>
		</a-table>
	</a-row>
	<div class="paginationStyle">
		<a-pagination show-quick-jumper v-model:current="currentPage" :total="total" @change="pageChange" />
	</div>
	<showUrlDialog :visible="urlBox" :src="infoVO.img" @showBoxCancel="showBoxCancel" />
	<a-modal v-model:visible="mapDialog" centered title="Map" width="50%">
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">{{ $t('default.5') }}</a-col>
			<a-col :span="9">
				<a-input id="placeName" v-model:value="mapName" allow-clear />
			</a-col>
			<!-- <a-col :span="2" class="labelText">
				<a-button type="primary" size="small" @click="getPosition">{{ $t('default.8') }}</a-button>
			</a-col> -->
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">{{ $t('default.94') }}</a-col>
			<a-col :span="9">
				<a-input v-model:value="mapInfoObj.longitude" disabled />
			</a-col>
			<a-col :span="3" class="labelText">{{ $t('default.95') }}</a-col>
			<a-col :span="9">
				<a-input v-model:value="mapInfoObj.latitude" disabled />
			</a-col>
		</a-row>
		<div id="map"></div>
		<template #footer>
			<div class="footerBtnClass">
				<a-button key="back" @click="handleCancel">{{ $t('default.19') }}</a-button>
				<a-button key="submit" type="primary" @click="handleOk">{{ $t('default.18') }}</a-button>
			</div>
		</template>
	</a-modal>
	<!-- 机器设置弹框 -->
	<a-modal v-model:visible="MachineSettingDialog" :title="$t('default.29')" width="80%" :footer="null" centered>
		<a-row class="rowStyle" type="flex" justify="end">
			<a-col :sapn="1">
				<a-button type="primary" size="small" @click="saveGameOption">{{ $t('default.15') }}</a-button>
			</a-col>
		</a-row>
		<MachineOptions ref="options" :gameOptions="infoVO.machineSetting" />
	</a-modal>
</template>

<script>
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
import labelTitle from '@/components/labelTitle.vue';
import showUrlDialog from '@/components/common/showUrlDialog.vue';
import { useRoute } from 'vue-router';
import { shopSingleInfoHttp, agentListHttp, countryListHttp, areaListHttp, editShopHttp, createShopHttp, shopMachineListHttp, setMachineSettingHttp, getMachineInfoHttp } from '@/api/api';
import { message } from 'ant-design-vue';
import MachineOptions from '@/components/common/MachineOptions.vue';
import { i18n } from '@/components/common/tools';
import Axios from 'axios';
export default defineComponent({
	name: 'ShopEditor',
	components: {
		labelTitle,
		showUrlDialog,
		MachineOptions
	},
	setup() {
		const ROUTE = useRoute();
		const isAdmin = true;
		const id = ROUTE.query.id;
		const options = ref({});
		let currentMachineId = '';
		const data = reactive({
			map: false,
			mapDialog: false,
			urlBox: false,
			MachineSettingDialog: false,
			infoVO: {
				id: id,
				name: '',
				type: '',
				agentId: '',
				countryId: '',
				areaId: '',
				attracts: '',
				address: '',
				phone: '',
				fax: '',
				email: '',
				website: '',
				img: '',
				businessHours: '',
				longitude: '',
				latitude: '',
				room: 1,
				parking: 1,
				credit: 1,
				supplier: 1,
				isValid: 1,
				averageCost: '',
				memo: '',
				shopRate: 0,
				open:1,
				budget:'',
				restDay:'',
				trafficInfo:'',
				theme:'',
				service:'',
				shopInfo:'',
				agentRate: '100%',
				machineSetting: {}
			},
			machineVO: {
				id: '',
				name: '',
				type: '',
				shopId: id,
				serial: '',
				placingType: '',
				minLastOnlineTime: '',
				maxLastOnlineTime: '',
				pageIndex: 1,
				pageSize: 10
			},
			mapInfoObj: {
				longitude: '',
				latitude: ''
			},
			mapName: '',
			countryList: [{ id:'',name:'' }],
			areaList: [{ id:'',name:'' }],
			agentList: [{ id:'',name:'' }],
			currentPage: 1,
			total: 1,
			columns: [
				{
					title: 'ID',
					dataIndex: 'id',
					key: 'ID'
				},
				{
					title: i18n('default.13'),
					dataIndex: 'name',
					key: 'Shop Name'
				},
				{
					title: i18n('default.21'),
					dataIndex: 'serial',
					key: 'Serial'
				},
				{
					title: i18n('default.22'),
					dataIndex: 'type',
					key: 'Type'
				},
				{
					title: i18n('default.89'),
					dataIndex: 'lastOnlineTime',
					key: 'Time'
				},
				{
					title: i18n('default.84'),
					dataIndex: 'Placing Type',
					slots: { customRender: 'PlacingType' }
				}
				// {
				// 	title: i18n('default.29'),
				// 	slots: { customRender: 'gameSetting' }
				// }
			],
			tableList: [{ id: 1 }],
			shopRateList: [
				{ id: 0, label: '0%' },
				{ id: 10, label: '10%' },
				{ id: 20, label: '20%' },
				{ id: 30, label: '30%' },
				{ id: 40, label: '40%' },
				{ id: 50, label: '50%' },
				{ id: 60, label: '60%' },
				{ id: 70, label: '70%' },
				{ id: 80, label: '80%' },
				{ id: 90, label: '90%' },
				{ id: 100, label: '100%' }
			],
			shopRatioChange: () => {
				data.infoVO.agentRate = `${100 - data.infoVO.shopRate}%`;
			},
			disabledStartDate: (startValue) => {
				if (!startValue || !data.machineVO.maxLastOnlineTime) {
					return false;
				}
				return startValue.valueOf() > new Date(data.machineVO.maxLastOnlineTime).valueOf();
			},
			disabledEndDate: (endValue) => {
				if (!endValue || !data.machineVO.minLastOnlineTime) {
					return false;
				}
				return new Date(data.machineVO.minLastOnlineTime).valueOf() >= endValue.valueOf();
			},
			preview: () => {
				if (data.infoVO.img) {
					data.urlBox = true;
				} else {
					message.warning('请添加广告链接');
				}
			},
			handleCancel: () => {
				data.mapDialog = false;
			},
			handleOk: () => {
				data.infoVO.longitude = data.mapInfoObj.longitude;
				data.infoVO.latitude = data.mapInfoObj.latitude;
				data.mapDialog = false;
			},
			showBoxCancel: (value) => {
				data.urlBox = value;
			},
			getPositionMap: () => {
				data.mapDialog = true;
				if (!data.map) {
					// eslint-disable-next-line @typescript-eslint/no-use-before-define
					showMap();
					data.map = true;
				}
			},
			pageChange: (index) => {
				data.machineVO.pageIndex = index;
				data.search();
			},
			countryChange: () => {
				data.infoVO.areaId = '';
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getAreaList();
			},
			search: () => {
				shopMachineListHttp(data.machineVO).then((res) => {
					if (res.data.data) {
						data.tableList = res.data.data.list;
						data.total = res.data.data.totalCount;
					}
				});
			},
			create: () => {
				data.infoVO.agentRate = data.infoVO.agentRate.split('%')[0]
				return createShopHttp(data.infoVO);
			},
			update: () => {
				data.infoVO.agentRate = data.infoVO.agentRate.split('%')[0]
				return editShopHttp(data.infoVO);
			},
			afterHttp:(id) =>{
				data.infoVO.id = id
			},
			setGameSetting: (id) => {
				getMachineInfoHttp({ machineId: id }).then((res) => {
					if (res.data.data.setting) {
						options.value.setData(res.data.data.setting);
					}
				});
				data.MachineSettingDialog = true;
				currentMachineId = id;
			},
			saveGameOption: () => {
				const obj = {
					machineIds: [currentMachineId],
					common: options.value.getData().common,
					others: options.value.getData().others
				};
				setMachineSettingHttp(obj).then((res) => {
					if (res.data.code == 100) {
						data.MachineSettingDialog = false;
					}
					message.warning(res.data.msg);
				});
			},
			agentSearch: (value) => {
				agentListHttp({ agentName: value.split("'").join(''), pageSize: 999 }).then((res) => {
					data.agentList = res.data.data;
				});
			},
			getPosition: () => {
				Axios.get(`https://restapi.amap.com/v3/place/text?key=a9cef5218eebe10876a9bedfe7207454&keywords=${data.mapName}`).then((res) => {
					console.log(res.data.pois);
				});
			}
		});
		const showMap = () => {
			const url = 'https://webapi.amap.com/maps?v=1.4.15&key=4288b5f8c829eba5d80f4664f7e40dcf&callback=load';
			const jsapi = document.createElement('script');
			jsapi.src = url;
			document.head.appendChild(jsapi);
			window.load = () => {
				let geolocation = null;
				let auto = null;
				// eslint-disable-next-line no-undef
				const map = new AMap.Map('map', {
					resizeEnable: true,
					zoom: 13
				});
				// 添加插件
				map.plugin(['AMap.Autocomplete', 'AMap.Geolocation'], function() {
					// eslint-disable-next-line no-undef
					geolocation = new AMap.Geolocation({
						enableHighAccuracy: true, //是否使用高精度定位，默认:true
						timeout: 5000, //超过5秒后停止定位，默认：无穷大
						maximumAge: 0, //定位结果缓存0毫秒，默认：0
						convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
						showButton: true, //显示定位按钮，默认：true
						buttonPosition: 'RB', //定位按钮停靠位置，默认：'LB'，左下角
						showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
						showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
						panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
						zoomToAccuracy: true //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
					});
					map.addControl(geolocation);
					geolocation.getCurrentPosition();
				});
				const select = (ev) => {
					const obj = ev.poi;
					if (obj.location) {
						// eslint-disable-next-line no-undef
						const marker = new AMap.Marker({
							// eslint-disable-next-line no-undef
							position: new AMap.LngLat(obj.location.lng, obj.location.lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
							title: obj.name
						});
						map.add(marker);
						map.setZoomAndCenter(14, [obj.location.lng, obj.location.lat]);
						marker.on('click', (e) => {
							const { lng, lat } = e.lnglat;
							data.mapInfoObj.longitude = lng;
							data.mapInfoObj.latitude = lat;
						});
					}
				};
				// eslint-disable-next-line no-undef
				auto = new AMap.Autocomplete({ input: 'placeName' });
				// eslint-disable-next-line no-undef
				AMap.event.addListener(auto, 'select', select); //注册监听，当选中某条记录时会触发
				map.on('click', function(e) {
					data.mapInfoObj.longitude = e.lnglat.getLng();
					data.mapInfoObj.latitude = e.lnglat.getLat();
				});
			};
		};
		const setInfoData = (response) => {
			data.infoVO.name = response.name;
			data.infoVO.type = response.type;
			data.infoVO.shopRate = response.shopRate;
			data.infoVO.agentRate = `${response.agentRate}%`;
			data.infoVO.agentId = response.agentId;
			data.infoVO.attracts = response.attracts;
			data.infoVO.address = response.address;
			data.infoVO.phone = response.phone;
			data.infoVO.fax = response.fax;
			data.infoVO.email = response.email;
			data.infoVO.website = response.website;
			data.infoVO.website = response.website;
			data.infoVO.businessHours = response.businessHours;
			data.infoVO.img = response.img;
			data.infoVO.supplier = response.supplier;
			data.infoVO.longitude = response.longitude;
			data.infoVO.latitude = response.latitude;
			data.infoVO.isValid = response.isValid;
			data.infoVO.room = response.room;
			data.infoVO.parking = response.parking;
			data.infoVO.credit = response.credit;
			data.infoVO.averageCost = response.averageCost;
			data.infoVO.memo = response.memo;
			if (isAdmin) {
				data.infoVO.countryId = response.countryId;
				data.infoVO.areaId = response.areaId;
				data.infoVO.agentId = response.agentId;
			}
		};
		// const getMachineSetting = (id) => {
		// 	getShopMachineSettingHttp({ shopId: id }).then((res) => {
		// 		data.infoVO.machineSetting.common = JSON.parse(res.data.data.common);
		// 		data.infoVO.machineSetting.others = JSON.parse(res.data.data.others);
		// 		initDataToBoolean(data.infoVO.machineSetting.common);
		// 		options.value.setData(data.infoVO.machineSetting);
		// 	});
		// };
		const getShopInfo = (id) => {
			shopSingleInfoHttp({ shopId: id }).then((res) => {
				setInfoData(res.data.data);
			});
		};
		const getCountryList = () => {
			countryListHttp({pageSize:999}).then((res) => {
				data.countryList = res.data.data.list;
			});
		};
		const getAreaList = () => {
			areaListHttp({ countryId: data.infoVO.countryId }).then((res) => {
				data.areaList = res.data.data.list;
			});
		};
		const init = (id) => {
			getCountryList();
			getAreaList();
			data.agentSearch('');
			data.search();
			if (id) {
				getShopInfo(id);
			}
		};
		onMounted(() => {
			init(id);
		});
		return {
			...toRefs(data),
			options,
			id,
			isAdmin
		};
	}
});
</script>

<style scoped>
#map {
	height: 600px;
}
#map >>> .amap-copyright,
#map >>> .amap-logo {
	display: none !important;
}
</style>
