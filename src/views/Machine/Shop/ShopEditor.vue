<template>
	<labelTitle :value="'ShopEditor'" :btn="id ? update : create" />
	<div class="searchBox">
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ 'Label' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.name" allow-clear />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ 'Type' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.type" allow-clear />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ 'Agent' }}
			</a-col>
			<a-col :span="9" class="selectSearch">
				<a-select show-search v-model:value="infoVO.agentId" :default-active-first-option="false" :show-arrow="false" :filter-option="false" :not-found-content="null" allowClear @search="agentSearch">
					<a-select-option v-for="d in agentList" :key="d.id">
						<div :title="d.name">{{ d.name }}</div>
					</a-select-option>
				</a-select>
			</a-col>
			<!-- <a-col :span="3" class="labelText">
				{{ 'Owner' }}
			</a-col>
			<a-col :span="9" class="selectSearch">
				<a-select show-search v-model:value="infoVO.ownerId" :default-active-first-option="false" :show-arrow="false" :filter-option="false" :not-found-content="null" allowClear @search="ownerSearch">
					<a-select-option v-for="d in ownerList" :key="d.id">
						<div :title="d.username">{{ d.username }}</div>
					</a-select-option>
				</a-select>
			</a-col> -->
			<a-col :span="3" class="labelText">
				{{ 'Attracts' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.title" />
			</a-col>
		</a-row>
		<a-row v-if="isAdmin" class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ 'Country' }}
			</a-col>
			<a-col :span="9">
				<a-select v-model:value="infoVO.countryId" @change="countryChange" class="selectBox" allowClear>
					<a-select-option v-for="item in countryList" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :span="3" class="labelText">
				{{ 'Area' }}
			</a-col>
			<a-col :span="9">
				<a-select v-model:value="infoVO.areaId" class="selectBox" allowClear>
					<a-select-option v-for="item in areaList" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
				</a-select>
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ 'Address' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.address" allow-clear />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ 'Phone' }}
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
				{{ 'Email' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.email" allow-clear />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ 'Website' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.website" allow-clear />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ 'On Time' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.businessHours" allow-clear />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ 'Picture' }}
			</a-col>
			<a-col :span="7">
				<a-input v-model:value="infoVO.img" allow-clear />
			</a-col>
			<a-col :span="2" class="searchButton">
				<a-button size="small" type="primary" @click="preview">{{ '预览' }}</a-button>
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
				{{ 'Longtitude' }}
			</a-col>
			<a-col :span="2">
				<a-input v-model:value="infoVO.longitude" disabled />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ 'Latitude' }}
			</a-col>
			<a-col :span="2">
				<a-input v-model:value="infoVO.latitude" disabled />
			</a-col>
			<a-col :span="2" class="labelText">
				<a-button size="small" type="primary" @click="getPositionMap">{{ '获取' }}</a-button>
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
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ 'Average Cost' }}
			</a-col>
			<a-col :span="21">
				<a-input v-model:value="infoVO.averageCost" />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ 'Memo' }}
			</a-col>
			<a-col :span="21">
				<a-textarea v-model:value="infoVO.memo" :rows="4" allow-clear />
			</a-col>
		</a-row>
	</div>
	<MachineOptions ref="options" />
	<div v-if="id">
		<labelTitle :value="'Machines'" />
		<div class="searchBox">
			<a-row class="rowStyle">
				<a-col :span="2" class="labelText">
					{{ 'ID' }}
				</a-col>
				<a-col :span="4">
					<a-input v-model:value="machineVO.id" allow-clear />
				</a-col>
				<a-col :span="2" class="labelText">
					{{ 'Label' }}
				</a-col>
				<a-col :span="4">
					<a-input v-model:value="machineVO.name" allow-clear />
				</a-col>
				<a-col :span="2" class="labelText">
					{{ 'Serial' }}
				</a-col>
				<a-col :span="4">
					<a-input v-model:value="machineVO.serial" allow-clear />
				</a-col>
				<a-col :span="2" class="labelText">
					{{ 'Current Credits' }}
				</a-col>
				<a-col :span="4">
					<a-input v-model:value="machineVO.title" allow-clear />
				</a-col>
			</a-row>
			<a-row class="rowStyle">
				<a-col :span="2" class="labelText">
					{{ 'Last Online' }}
				</a-col>
				<a-col :span="2">
					<a-date-picker v-model:value="machineVO.minLastOnlineTime" :disabled-date="disabledStartDate" valueFormat="yyyy-MM-DD 00:00:00" allow-clear />
				</a-col>
				<a-col :span="2">
					<a-date-picker v-model:value="machineVO.maxLastOnlineTime" :disabled-date="disabledEndDate" valueFormat="yyyy-MM-DD 23:59:59" allow-clear />
				</a-col>
				<a-col :span="2" class="labelText">
					{{ 'Life Credits' }}
				</a-col>
				<a-col :span="4">
					<a-input v-model:value="machineVO.title" allow-clear />
				</a-col>
				<a-col :span="2" class="labelText">
					{{ 'Current Coins' }}
				</a-col>
				<a-col :span="4">
					<a-input v-model:value="machineVO.title" allow-clear />
				</a-col>
				<a-col :span="2" class="labelText">
					<a-button type="primary" size="small" @click="search">{{ '搜索' }}</a-button>
				</a-col>
			</a-row>
		</div>
		<a-row class="rowStyle">
			<a-table bordered :columns="columns" :data-source="tableList" :pagination="false" class="tableStyle" rowKey="id"></a-table>
		</a-row>
		<div class="paginationStyle">
			<a-pagination show-quick-jumper v-model:current="currentPage" :total="total" @change="pageChange" />
		</div>
	</div>
	<showUrlDialog :visible="urlBox" :src="infoVO.img" @showBoxCancel="showBoxCancel" />
	<a-modal v-model:visible="mapDialog" title="Map" width="50%" :footer="null">
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">{{ 'Longtitude' }}</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.longitude" disabled />
			</a-col>
			<a-col :span="3" class="labelText">{{ 'Latitude' }}</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.latitude" disabled />
			</a-col>
		</a-row>
		<div id="map"></div>
	</a-modal>
</template>

<script>
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
import labelTitle from '@/components/labelTitle.vue';
import showUrlDialog from '@/components/common/showUrlDialog.vue';
import { useRoute } from 'vue-router';
import { shopSingleInfoHttp, agentListHttp, countryListHttp, areaListHttp, editShopHttp, createShopHttp, shopMachineListHttp } from '@/api/api';
import { message } from 'ant-design-vue';
import MachineOptions from '@/components/common/MachineOptions.vue';
export default defineComponent({
	name: 'ShopEditor',
	components: {
		labelTitle,
		showUrlDialog,
		MachineOptions
	},
	setup() {
		const ROUTE = useRoute();
		const isAdmin = false;
		const id = ROUTE.query.id;
		const options = ref(null);
		const data = reactive({
			map: false,
			mapDialog: false,
			urlBox: false,
			infoVO: {
				name: '',
				type: '',
				agentId: '',
				ownerId: '',
				countryId: '',
				areaId: '',
				address: '',
				phone: '',
				fax: '',
				email: '',
				website: '',
				img: '',
				businessHours: '',
				title: '',
				longitude: '',
				latitude: '',
				room: 1,
				parking: 1,
				credit: 1,
				supplier: 1,
				isValid: 1,
				averageCost: '',
				memo: ''
			},
			machineVO: {
				id: '',
				name: '',
				shopId: id,
				serial: '',
				minLastOnlineTime: '',
				maxLastOnlineTime: '',
				pageIndex: 1,
				pageSize: 10
			},
			countryList: [],
			areaList: [],
			agentList: [],
			currentPage: 1,
			total: 1,
			columns: [
				{
					title: 'ID',
					dataIndex: 'id',
					key: 'ID'
				},
				{
					title: 'Label',
					dataIndex: 'name',
					key: 'Label'
				},
				{
					title: 'Serial',
					dataIndex: 'serial',
					key: 'Serial'
				},
				{
					title: 'Shop',
					dataIndex: 'shopName',
					key: 'Shop'
				},
				{
					title: 'Time',
					dataIndex: 'lastOnlineTime',
					key: 'Time'
				},
				{
					title: 'Type',
					dataIndex: 'type',
					key: 'Type'
				},
				{
					title: 'Attracts',
					dataIndex: 'age',
					key: 'Attracts'
				}
			],
			tableList: [{ id: 1 }],
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
					data.tableList = res.data.data.list;
					data.total = res.data.data.totalCount;
				});
			},
			create: () => createShopHttp(data.infoVO),
			update: () => {
				console.log(options.value);
				editShopHttp(data.infoVO);
			},
			agentSearch: (value) => {
				agentListHttp({ name: value.split("'").join(''), pageSize: 999 }).then((res) => {
					data.agentList = res.data.data.list;
				});
			}
		});
		const showMap = () => {
			const url = 'https://webapi.amap.com/maps?v=1.4.15&key=4288b5f8c829eba5d80f4664f7e40dcf&callback=load';
			const jsapi = document.createElement('script');
			jsapi.src = url;
			document.head.appendChild(jsapi);
			window.load = () => {
				// eslint-disable-next-line no-undef
				const map = new AMap.Map('map', {
					resizeEnable: true,
					// center: [116.397428, 39.90923],
					zoom: 13
				});
				map.on('click', function(e) {
					data.infoVO.longitude = e.lnglat.getLng();
					data.infoVO.latitude = e.lnglat.getLat();
				});
			};
		};
		const getShopInfo = (id) => {
			shopSingleInfoHttp({ shopId: id }).then((res) => {
				data.infoVO = res.data.data;
			});
		};
		const getCountryList = () => {
			countryListHttp({}).then((res) => {
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
	height: 500px;
}
</style>
