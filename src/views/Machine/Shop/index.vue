<template>
	<labelTitle :value="'Shop'" />
	<div class="searchBox">
		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ 'ID' }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="infoVO.id" allowClear />
			</a-col>
			<a-col :span="2" class="labelText">
				{{ 'Label' }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="infoVO.name" allowClear />
			</a-col>
			<a-col :span="2" class="labelText">
				{{ 'Country' }}
			</a-col>
			<a-col :span="4">
				<a-select v-model:value="infoVO.countryId" @change="countryChange" class="selectBox" allowClear>
					<a-select-option v-for="item in countryList" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :span="2" class="labelText">
				{{ 'Area' }}
			</a-col>
			<a-col :span="4">
				<a-select v-model:value="infoVO.areaId" class="selectBox" allowClear>
					<a-select-option v-for="item in areaList" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
				</a-select>
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ 'Type' }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="infoVO.type" allowClear />
			</a-col>
			<a-col v-if="isAdmin" :span="2" class="labelText">
				{{ 'Agent' }}
			</a-col>
			<a-col v-if="isAdmin" :span="4" class="selectSearch">
				<a-select show-search v-model:value="infoVO.agentId" :default-active-first-option="false" :show-arrow="false" :filter-option="false" :not-found-content="null" allowClear @search="agentSearch">
					<a-select-option v-for="d in agentList" :key="d.id">
						<div :title="d.name">{{ d.name }}</div>
					</a-select-option>
				</a-select>
			</a-col>
			<a-col :span="2" class="labelText">
				<a-button type="primary" size="small" @click="search">{{ '搜索' }}</a-button>
			</a-col>
		</a-row>
	</div>
	<a-row class="rowStyle">
		<a-col :span="1">
			<a-button type="danger" size="small" @click="handleDelete">{{ '删除' }}</a-button>
		</a-col>
		<!-- <a-col :span="1">
			<a-button type="primary" size="small" @click="handleChange">{{ '修改' }}</a-button>
		</a-col> -->
		<a-col :span="1">
			<a-button type="primary" size="small" @click="handleCreate">{{ '创建' }}</a-button>
		</a-col>
		<a-table bordered :row-selection="rowSelection" :columns="columns" :data-source="tableList" :pagination="false" rowKey="id" class="tableStyle">
			<template #name="{ record }">
				<a-button type="link" @click="handleShopClick(record.id)">{{ record.name }}</a-button>
			</template>
		</a-table>
	</a-row>
	<div class="paginationStyle">
		<a-pagination show-quick-jumper v-model:current="infoVO.pageIndex" :total="total" @change="pageChange" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { shopListHttp, countryListHttp, areaListHttp, agentListHttp, userListHttp } from '@/api/api';
import labelTitle from '@/components/labelTitle.vue';
import { useRouter } from 'vue-router';
import { handleSelectEvent } from '@/components/common/tools';
export default defineComponent({
	name: 'Shop',
	components: {
		labelTitle
	},
	setup() {
		const ROUTER = useRouter();
		let selectList: number[] = [];
		const data = reactive({
			isAdmin: false,
			infoVO: {
				id: '',
				name: '',
				countryId: '',
				areaId: '',
				type: '',
				agentId: '',
				pageIndex: 1,
				pageSize: 10
			},
			total: 1,
			columns: [
				{
					title: 'ID',
					dataIndex: 'id',
					key: 'Id'
				},
				{
					title: 'Label',
					dataIndex: 'name',
					key: 'Name',
					slots: { customRender: 'name' }
				},
				{
					title: 'Agent',
					dataIndex: 'agentName',
					key: 'Agent'
				},
				{
					title: 'Country',
					dataIndex: 'countryName',
					key: 'Country'
				},
				{
					title: 'Area',
					dataIndex: 'areaName',
					key: 'Area'
				},
				{
					title: 'Type',
					dataIndex: 'type',
					key: 'Type'
				}
			],
			countryList: [],
			areaList: [],
			agentList: [],
			ownerList: [],
			tableList: [{ id: 1 }],
			rowSelection: {
				columnWidth: 50,
				// columnTitle: '全选',
				onChange: (selectedRowKeys: number[], selectedRows: any) => {
					selectList = selectedRows.map((i: any) => i.id);
				}
			},
			shopList: [],
			countryChange: () => {
				data.infoVO.areaId = '';
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getAreaList();
			},
			timeChange: () => {
				console.log(2);
			},
			agentSearch: (value: any) => {
				agentListHttp({ name: value.split("'").join(''), pageSize: 999 }).then((res: any) => {
					data.agentList = res.data.data.list;
				});
			},
			ownerSearch: (value: any) => {
				userListHttp({ username: value.split("'").join(''), pageSize: 999 }).then((res: any) => {
					data.ownerList = res.data.data.list;
				});
			},
			search: () => {
				shopListHttp(data.infoVO).then((res: any) => {
					data.tableList = res.data.data.list;
					data.total = res.data.data.totalCount;
				});
			},
			handleDelete: () => {
				if (handleSelectEvent(selectList, 'id')) {
					console.log('1111111');
				}
			},
			handleChange: () => {
				console.log('handleChange');
			},
			handleCreate: () => {
				ROUTER.push({
					path: 'EditorShop'
				});
			},
			pageChange: () => {
				data.search();
			},
			handleShopClick: (id: number) => {
				ROUTER.push({
					path: 'EditorShop',
					query: {
						id
					}
				});
			}
		});
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
			data.search();
			getCountryList();
			getAreaList();
		};
		onMounted(() => {
			init();
		});
		return {
			...toRefs(data)
		};
	}
});
</script>

<style scoped></style>
