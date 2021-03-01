<template>
	<labelTitle :value="'Agent'" />
	<div class="searchBox">
		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ 'ID' }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="infoVO.id" />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ 'Shop' }}
			</a-col>
			<a-col :span="3">
				<a-select v-model:value="infoVO.shop" @change="shopChange" class="selectBox">
					<a-select-option v-for="item in shopList" :key="item.shopId" :value="item.shopName">{{ item.areaName }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :span="3" class="labelText">
				{{ 'Title' }}
			</a-col>
			<a-col :span="3">
				<a-input v-model:value="infoVO.title" />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ 'Url' }}
			</a-col>
			<a-col :span="3">
				<a-input v-model:value="infoVO.url" />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ '创建时间' }}
			</a-col>
			<a-col :span="2">
				<a-date-picker v-model:value="infoVO.time" @change="timeChange" />
			</a-col>
			<a-col :span="2">
				<a-date-picker v-model:value="infoVO.time" />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ '创建者' }}
			</a-col>
			<a-col :span="3">
				<a-select v-model:value="infoVO.shop" @change="shopChange" class="selectBox">
					<a-select-option v-for="item in shopList" :key="item.shopId" :value="item.shopName">{{ item.areaName }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :span="3" class="labelText">
				<a-button type="primary" size="small" @click="search">{{ '搜索' }}</a-button>
			</a-col>
		</a-row>
	</div>
	<a-row class="rowStyle">
		<a-col :span="1">
			<a-button type="danger" size="small" @click="handleDelete">{{ '删除' }}</a-button>
		</a-col>
		<a-col :span="1">
			<a-button type="primary" size="small" @click="handleChange">{{ '修改' }}</a-button>
		</a-col>
		<a-col :span="1">
			<a-button type="primary" size="small" @click="handleCreate">{{ '创建' }}</a-button>
		</a-col>
		<a-table bordered :row-selection="rowSelection" :columns="columns" :data-source="tableList" class="tableStyle"></a-table>
	</a-row>
	<div class="paginationStyle">
		<a-pagination show-quick-jumper v-model:current="currentPage" :total="totalSize" @change="sizeChange" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { loginHttp } from '@/api/api';
import labelTitle from '@/components/labelTitle.vue';
// import { SettingFilled} from '@ant-design/icons-vue';
export default defineComponent({
	name: 'templete',
	components: {
		labelTitle
	},
	setup() {
		const data = reactive({
			infoVO: {
				id: '',
				shop: '',
				title: '',
				url: '',
				time: ''
			},
			currentPage: 1,
			totalSize: 100,
			columns: [
				{
					title: 'ID',
					dataIndex: 'age',
					key: 'Id'
				},
				{
					title: 'Title',
					dataIndex: 'age',
					key: 'Title'
				},
				{
					title: 'Shop',
					dataIndex: 'age',
					key: 'Shop'
				},
				{
					title: 'Url',
					dataIndex: 'age',
					key: 'Url'
				},
				{
					title: '创建者',
					dataIndex: 'age',
					key: '创建者'
				},
				{
					title: '创建时间',
					dataIndex: 'age',
					key: '创建时间'
				}
			],
			tableList: [{}],
			rowSelection: {
				columnWidth: 80,
				// columnTitle: '全选',
				onChange: (selectedRowKeys: number[]) => {
					console.log(selectedRowKeys);
				},
				getCheckboxProps: (record: { disabled: boolean }) => ({
					disabled: record.disabled // Column configuration not to be checked
				})
			},
			shopList: [],
			shopChange: () => {
				console.log(1);
			},
			timeChange: () => {
				console.log(2);
			},
			search: () => {
				loginHttp(data.infoVO).then((res: any) => {
					console.log(res);
				});
				console.log(data.infoVO);
			},
			handleDelete: () => {
				console.log('handleDelete');
			},
			handleChange: () => {
				console.log('handleChange');
			},
			handleCreate: () => {
				console.log('handleCreate');
			},
			sizeChange: (page: number) => {
				console.log(page);
			}
		});
		onMounted(() => {
			data.search();
		});
		return {
			...toRefs(data)
		};
	}
});
</script>

<style scoped></style>
