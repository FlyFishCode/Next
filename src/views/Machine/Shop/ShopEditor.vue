<template>
	<labelTitle :value="'ShopEditor'" :btn="flag ? update : create" />
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
			<a-col :span="3" class="labelText">
				{{ 'Owner' }}
			</a-col>
			<a-col :span="9" class="selectSearch">
				<a-select show-search v-model:value="infoVO.ownerId" :default-active-first-option="false" :show-arrow="false" :filter-option="false" :not-found-content="null" allowClear @search="ownerSearch">
					<a-select-option v-for="d in ownerList" :key="d.id">
						<div :title="d.username">{{ d.username }}</div>
					</a-select-option>
				</a-select>
			</a-col>
		</a-row>
		<a-row class="rowStyle">
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
				{{ 'Picture' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.img" />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ 'On Time' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.businessHours" allow-clear />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ 'Attracts' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.title" />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ 'Longtitude' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.longitude" allow-clear />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ 'Latitude' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.latitude" allow-clear />
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
				{{ 'Average Cost' }}
			</a-col>
			<a-col :span="9">
				<a-input v-model:value="infoVO.averageCost" />
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
				{{ 'Memo' }}
			</a-col>
			<a-col :span="21">
				<a-textarea v-model:value="infoVO.memo" :rows="4" allow-clear />
			</a-col>
		</a-row>
		<!-- <div v-if="showTable">
			<a-row class="rowStyle">
				<a-col :span="3" class="labelText">
					{{ 'Life Games' }}
				</a-col>
				<a-col :span="9">
					<a-input v-model:value="infoVO.title" :disabled="disabled" />
				</a-col>
				<a-col :span="3" class="labelText">
					{{ 'Last IP' }}
				</a-col>
				<a-col :span="9">
					<a-input v-model:value="infoVO.title" :disabled="disabled" />
				</a-col>
			</a-row>
			<a-row class="rowStyle">
				<a-col :span="3" class="labelText">
					{{ 'Last Online' }}
				</a-col>
				<a-col :span="5">
					<a-input v-model:value="infoVO.title" :disabled="disabled" />
				</a-col>
				<a-col :span="4">
					<a-input v-model:value="infoVO.title" :disabled="disabled" />
				</a-col>
				<a-col :span="3" class="labelText">
					{{ 'Attracts' }}
				</a-col>
				<a-col :span="9">
					<a-input v-model:value="infoVO.title" :disabled="disabled" />
				</a-col>
			</a-row>
			<a-row class="rowStyle">
				<a-col :span="3" class="labelText">
					{{ 'Current All Credits' }}
				</a-col>
				<a-col :span="9">
					<a-input v-model:value="infoVO.title" :disabled="disabled" />
				</a-col>
				<a-col :span="3" class="labelText">
					{{ 'Life All Credits' }}
				</a-col>
				<a-col :span="9">
					<a-input v-model:value="infoVO.title" :disabled="disabled" />
				</a-col>
			</a-row>
			<a-row class="rowStyle">
				<a-col :span="3" class="labelText">
					{{ 'Current Credits' }}
				</a-col>
				<a-col :span="9">
					<a-input v-model:value="infoVO.title" :disabled="disabled" />
				</a-col>
				<a-col :span="3" class="labelText">
					{{ 'Life Credits' }}
				</a-col>
				<a-col :span="9">
					<a-input v-model:value="infoVO.title" :disabled="disabled" />
				</a-col>
			</a-row>
			<a-row class="rowStyle">
				<a-col :span="3" class="labelText">
					{{ 'Current Free Credits' }}
				</a-col>
				<a-col :span="9">
					<a-input v-model:value="infoVO.title" :disabled="disabled" />
				</a-col>
				<a-col :span="3" class="labelText">
					{{ 'Life Free Credits' }}
				</a-col>
				<a-col :span="9">
					<a-input v-model:value="infoVO.title" :disabled="disabled" />
				</a-col>
			</a-row>
			<a-row class="rowStyle">
				<a-col :span="3" class="labelText">
					{{ 'Current Coins' }}
				</a-col>
				<a-col :span="9">
					<a-input v-model:value="infoVO.title" :disabled="disabled" />
				</a-col>
				<a-col :span="3" class="labelText">
					{{ 'Life Coins' }}
				</a-col>
				<a-col :span="9">
					<a-input v-model:value="infoVO.title" :disabled="disabled" />
				</a-col>
			</a-row>
			<a-row class="rowStyle">
				<a-col :span="3" class="labelText">
					{{ 'Current Amout(cent)' }}
				</a-col>
				<a-col :span="9">
					<a-input v-model:value="infoVO.title" :disabled="disabled" />
				</a-col>
				<a-col :span="3" class="labelText">
					{{ 'Life Amout(cent)' }}
				</a-col>
				<a-col :span="9">
					<a-input v-model:value="infoVO.title" :disabled="disabled" />
				</a-col>
			</a-row>
			<a-row class="rowStyle">
				<a-col :span="3" class="labelText">
					{{ 'Current Cash' }}
				</a-col>
				<a-col :span="9">
					<a-input v-model:value="infoVO.title" :disabled="disabled" />
				</a-col>
				<a-col :span="3" class="labelText">
					{{ 'Life Cash' }}
				</a-col>
				<a-col :span="9">
					<a-input v-model:value="infoVO.title" :disabled="disabled" />
				</a-col>
			</a-row>
		</div> -->
	</div>
	<div v-if="flag">
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
					<a-date-picker v-model:value="machineVO.minLastOnlineTime" />
				</a-col>
				<a-col :span="2">
					<a-date-picker v-model:value="machineVO.maxLastOnlineTime" allow-clear />
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
					{{ 'Life Coins' }}
				</a-col>
				<a-col :span="4">
					<a-input v-model:value="machineVO.title" allow-clear />
				</a-col>
			</a-row>
			<a-row class="rowStyle">
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
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
// import { SettingFilled} from '@ant-design/icons-vue';
import labelTitle from '@/components/labelTitle.vue';
import { useRoute } from 'vue-router';
import { shopSingleInfoHttp, agentListHttp, userListHttp, countryListHttp, areaListHttp, editShopHttp, createShopHttp, shopMachineListHttp } from '@/api/api';
export default defineComponent({
	name: 'ShopEditor',
	components: {
		labelTitle
	},
	setup() {
		const ROUTE = useRoute();
		const data = reactive({
			flag: ROUTE.query.id,
			showTable: false,
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
				memo: '',
			},
			machineVO: {
				id: '',
				name: '',
				shopId: ROUTE.query.id,
				serial: '',
				minLastOnlineTime: '',
				maxLastOnlineTime: '',
				pageIndex: 1,
				pageSize: 10
			},
			countryList: [],
			areaList: [],
			agentList: [],
			ownerList: [],
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
			pageChange: (index: number) => {
				data.machineVO.pageIndex = index;
				data.search();
			},
			handleSearch(value: any) {
				console.log(value);
			},
			handleChange(value: any) {
				console.log(value);
			},
			countryChange: () => {
				data.infoVO.areaId = '';
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getAreaList();
			},
			search: () => {
				shopMachineListHttp(data.machineVO).then((res: any) => {
					data.tableList = res.data.data.list;
					data.total = res.data.data.totalCount;
				});
			},
			create: () => createShopHttp(data.infoVO),
			update: () => editShopHttp(data.infoVO),
			agentSearch: (value: any) => {
				agentListHttp({ name: value.split("'").join('') }).then((res: any) => {
					data.agentList = res.data.data.list;
				});
			},
			ownerSearch: (value: any) => {
				userListHttp({ username: value.split("'").join(''), pageSize: 999 }).then((res: any) => {
					data.ownerList = res.data.data.list;
				});
			}
		});
		const getShopInfo = (id: any) => {
			shopSingleInfoHttp({ shopId: id }).then((res: any) => {
				data.infoVO = res.data.data;
			});
		};
		const getCountryList = () => {
			countryListHttp({}).then((res: any) => {
				data.countryList = res.data.data.list;
			});
		};
		const getAreaList = () => {
			areaListHttp({ countryId: data.infoVO.countryId }).then((res: any) => {
				data.areaList = res.data.data.list;
			});
		};
		const init = () => {
			getCountryList();
			getAreaList();
			data.search();
		};
		onMounted(() => {
			const id = ROUTE.query.id;
			if (id) {
				getShopInfo(id);
				data.showTable = true;
			}
			init();
		});
		return {
			...toRefs(data)
		};
	}
});
</script>

<style scoped></style>
