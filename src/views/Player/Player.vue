<template>
	<labelTitle :value="$t('default.212')" />
	<div class="searchBox">
		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ $t('default.23') }}
			</a-col>
			<a-col :span="4">
				<a-select v-model:value="infoVO.countryId" class="selectBox" allowClear>
					<a-select-option v-for="item in countryList" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.221') }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="infoVO.name" allowClear />
			</a-col>
			<a-col v-if="RoleType === 1" :span="2" class="labelText">
					{{ $t('default.26') }}
				</a-col>
			<a-col v-if="RoleType === 1" :span="4">
				<a-select
					class="selectBox"
						show-search
						v-model:value="infoVO.agentId"
						:default-active-first-option="false"
						:show-arrow="false"
						:filter-option="false"
						:not-found-content="null"
						allowClear
						@search="agentSearch"
				>
						<a-select-option v-for="d in agentList" :key="d.id">
							<div :title="d.name">{{ d.name }}</div>
						</a-select-option>
					</a-select>
			</a-col>
			<a-col :span="2" class="labelText">
				<a-button type="primary" size="small" @click="search">{{ $t('default.8') }}</a-button>
			</a-col>
		</a-row>
	</div>
	<a-row class="rowStyle">
		<a-col :span="1">
			<a-button type="danger" size="small" @click="handleDelete">{{ $t('default.10') }}</a-button>
		</a-col>
		<a-col :span="1">
			<a-button type="primary" size="small" @click="handleCreate">{{ $t('default.9') }}</a-button>
		</a-col>
		<a-table bordered :row-selection="rowSelection" :columns="columns" :data-source="tableList" :pagination="false" rowKey="id" class="tableStyle">
			<template #picture="{ record }">
				<div class="imgBox"><img :src="JSON.parse(record.picture)[0] ? JSON.parse(record.picture)[0].url :''"></div>
			</template>
			<template #name="{ record }">
				<a-button type="link" @click="handleNameClick(record.id)">{{ record.name }}</a-button>
			</template>
		</a-table>
	</a-row>
	<div class="paginationStyle">
		<a-pagination show-quick-jumper v-model:current="infoVO.pageIndex" :total="total" @change="pageChange" />
	</div>
	<DeleteDialog :visible="visible" @afterClose="afterClose" @handleOk="handleDeleteOk" />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { PlayerListHttp, countryListHttp, PlayerDeleteHttp, newsEditorHttp,agentListHttp } from '@/api/api';
import labelTitle from '@/components/labelTitle.vue';
import DeleteDialog from '@/components/common/DeleteDialog.vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { handleSelectEvent, i18n, getRoleType } from '@/components/common/tools';
// import { useStore } from 'vuex';
// import qs from 'qs'
export default defineComponent({
	name: 'Player',
	components: {
		labelTitle,
		DeleteDialog
	},
	setup() {
		const ROUTER = useRouter();
		// const STORE = useStore();
		const RoleType: any = getRoleType();
		let selectList: number[] = [];
		const data = reactive({
			visible: false,
			total: 0,
			countryList: [],
			agentList: [],
			tableList: [],
			infoVO: {
				name: '',
				agentId:"",
				countryId: '',
				pageIndex: 1,
				pageSize: 10
			},
			columns: [
				{
					title: i18n('default.23'),
					dataIndex: 'countryName',
				},
				{
					title: i18n('default.93'),
					width: 100,
					slots: { customRender: 'picture' }
				},
				{
					title: i18n('default.221'),
					slots: { customRender: 'name' }
				}
			],
			categoryList:[
				{ id: 0, label: 'default.200' },
				{ id: 3, label: 'default.198' },
				{ id: 4, label: 'default.197' },
				{ id: 6, label: 'default.199' },
			],
			rowSelection: {
				columnWidth: 50,
				// columnTitle: '全选',
				onChange: (selectedRowKeys: number[]) => {
					selectList = selectedRowKeys;
				}
			},
			agentSearch: (value: any) => {
				agentListHttp({ agentName: value.split("'").join(''), pageSize: 999 }).then((res: any) => {
					data.agentList = res.data.data;
				});
			},
			handleDelete: () => {
				if (handleSelectEvent(selectList, '').length) {
					data.visible = true;
				}
			},
			afterClose: (value: boolean) => {
				data.visible = value;
			},
			handleDeleteOk: () => {
				PlayerDeleteHttp(selectList).then((res: any) => {
					message.warning(res.data.msg);
					data.search();
				});
				data.visible = false;
			},
			search: () => {
				PlayerListHttp(data.infoVO).then((res: any) => {
					if(res.data.code === 100){
						data.tableList = res.data.data.list;
						data.total = res.data.data.totalCount;
					}
				});
			},
			pageChange: () => {
				data.search();
			},
			handleCreate: () => {
				ROUTER.push({
					path: 'PlayerInfo'
				});
			},
			handleNameClick: (id: number) => {
				ROUTER.push({
					path: 'PlayerInfo',
					query: {
						id
					}
				});
			},
			checkboxChange:(row: any) =>{
				const flagData = {
					id:row.id,
					title:row.title,
					contents:row.contents,
					category:row.category,
					countryId:row.countryId,
					registerDate:row.registerDate,
					display:Number(row.display),
				}
				newsEditorHttp(flagData).then((res: any) =>{
					message.info(res.data.msg)
				})
			}
		});
		const getCountryList = () => {
			countryListHttp({pageSize:999}).then((res: any) => {
				data.countryList = res.data.data.list;
			});
		};
		const handleRole = () => {
			if (RoleType === 1) {
				data.columns.push(
				{
					title: i18n('default.26'),
					dataIndex: 'agentName',
				}
				);
			}
		};
		const init = () => {
			handleRole();
			data.search();
			getCountryList();
			data.agentSearch('');
		};
		onMounted(() => {
			init();
		});
		return {
			...toRefs(data),
			RoleType
		};
	}
});
</script>

<style scoped>
.imgBox{
	height: 60px;
}
.imgBox img{
	width: 100%;
	height: 100%;
}
</style>
