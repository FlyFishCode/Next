<template>
	<div class="searchBox">
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ 'Title' }}
			</a-col>
			<a-col :span="6">
				<a-input v-model:value="infoVO.title" allow-clear />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ 'Machine Name' }}
			</a-col>
			<a-col :span="6" class="selectSearch">
				<a-input v-model:value="infoVO.title" allow-clear />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="3" class="labelText">
				{{ 'Creation time' }}
			</a-col>
			<a-col :span="3" class="datePicker">
				<a-date-picker v-model:value="infoVO.stratTime" :disabled-date="disabledStartDate" valueFormat="yyyy-MM-DD 00:00:00" allow-clear />
			</a-col>
			<a-col :span="3" class="datePicker">
				<a-date-picker v-model:value="infoVO.endTime" :disabled-date="disabledEndDate" valueFormat="yyyy-MM-DD 23:59:59" allow-clear />
			</a-col>
			<a-col :span="3" class="labelText">
				{{ 'Url' }}
			</a-col>
			<a-col :span="6">
				<a-input v-model:value="infoVO.url" allow-clear />
			</a-col>
			<a-col :span="3" class="labelText">
				<a-button type="primary" size="small" @click="search">{{ '搜索' }}</a-button>
			</a-col>
		</a-row>
	</div>
	<a-row class="rowStyle">
		<a-col :span="4" id="deleteBtnBox">
			<a-button type="danger" size="small" @click="handleDelete">{{ '删除勾选数据' }}</a-button>
			<a-button type="danger" size="small" @click="handleDeleteAll">{{ '删除所有数据' }}</a-button>
		</a-col>
		<a-col :span="1">
			<a-button type="primary" size="small" @click="handleCreate">{{ '创建' }}</a-button>
		</a-col>
		<a-table bordered :row-selection="rowSelection" :columns="columns" :data-source="tableList" :pagination="false" rowKey="id" class="tableStyle">
			<template #aaa="{ record }">
				<a-button type="link" @click="handleTitleClick(record.id)">{{ record.title }}</a-button>
			</template>
			<template #Machine="{ record }">
				<div v-if="record.machineList.length" class="tableShop">
					<a-button type="link" @click="handleShopClick(record.machineList[0].machineId)">{{ record.machineList[0].machineName }}</a-button>
					<div class="tableRightBox">
						<div>
							<a-button type="danger" size="small" @click="machineDelete(record.id, record.machineList[0].machineId)">{{ '删除' }}</a-button>
						</div>
						<div v-show="record.machineList.length > 1" class="link">
							<span v-if="record.flag" @click="record.flag = !record.flag"><DownOutlined /></span>
							<span v-else @click="record.flag = !record.flag"><UpOutlined /></span>
						</div>
					</div>
				</div>
				<transition enter-active-class="animate__animated animate__fadeInUp">
					<div v-show="record.flag" class="shopItem">
						<div v-for="(item, index) in record.machineList" :key="item.id" class="moreShopBox">
							<div v-if="index" class="moreShopBox">
								<a-button type="link" @click="handleShopClick(item.machineId)">{{ item.machineName }}</a-button>
								<div>
									<a-button type="danger" size="small" @click="machineDelete(record.id, item.machineId)">{{ '删除' }}</a-button>
								</div>
							</div>
						</div>
					</div>
				</transition>
			</template>
			<template #MachineNumber="{ record }">
				<div>{{ record.machineList.length }}</div>
			</template>
			<template #url="{ record }">
				<a-button type="link" @click="handleUrlClick(record.url)">{{ record.url }}</a-button>
			</template>
			<template #handle="{ record }">
				<div class="tableBtn">
					<a-button size="small" type="primary" @click="AdvertEdit(record.id)">{{ 'edit' }}</a-button>
				</div>
			</template>
		</a-table>
	</a-row>
	<template>
		<a-modal v-model:visible="urlBox" :footer="null" width="50%">
			<div class="modalBox">
				<div v-if="isVideo">
					<video :src="src" controls></video>
				</div>
				<div v-else>
					<img :src="src" alt="图片地址不正确" />
				</div>
			</div>
		</a-modal>
	</template>
	<DeleteDialog :visible="visible" @afterClose="afterClose" @handleOk="handleOk" />
	<DeleteAllDialog :visible="allVisible" @afterAllClose="afterAllClose" @handleAllOk="handleAllOk" />
	<div class="paginationStyle">
		<a-pagination show-quick-jumper v-model:current="infoVO.pageIndex" :total="pageTotal" @change="pageChange" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
// import labelTitle from '@/components/labelTitle.vue';
import { useRouter } from 'vue-router';
import { handleSelectEvent } from '@/components/common/tools';
import { message } from 'ant-design-vue';
import DeleteDialog from '@/components/common/DeleteDialog.vue';
import DeleteAllDialog from '@/components/common/DeleteAllDialog.vue';
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';
import { AdvertTableListHttp, deleteAdvertHttp, shopListHttp, deleteMachineShopHttp } from '@/api/api';
export default defineComponent({
	name: 'Advert',
	components: {
		// labelTitle,
		DownOutlined,
		UpOutlined,
		DeleteDialog,
		DeleteAllDialog
	},
	setup() {
		const ROUTER = useRouter();
		let selectList: number[] = [];
		const data = reactive({
			activeKey: '1',
			urlBox: false,
			isVideo: true,
			visible: false,
			allVisible: false,
			src: '',
			infoVO: {
				title: '',
				name: '',
				url: '',
				type: 2,
				minCreateTime: '',
				maxCreateTime: '',
				pageIndex: 1,
				pageSize: 10
			},
			pageTotal: 1,
			columns: [
				{
					title: 'Title',
					dataIndex: 'title',
					slots: { customRender: 'aaa' }
				},
				{
					title: 'Machine',
					dataIndex: 'Machine',
					slots: { customRender: 'Machine' }
				},
				{
					title: 'Url',
					dataIndex: 'url',
					slots: { customRender: 'url' }
				},
				{
					title: 'Machine Number',
					slots: { customRender: 'MachineNumber' }
				},
				{
					title: 'Creation time',
					dataIndex: 'createTime'
				},
				{
					slots: { customRender: 'handle' }
				}
			],
			shopList: [],
			tableList: [],
			createrList: [],
			rowSelection: {
				columnWidth: 50,
				// columnTitle: '全选',
				onChange: (selectedRowKeys: number[], selectedRows: any) => {
					selectList = selectedRows.map((i: any) => i.id);
				}
			},
			disabledStartDate: (startValue: any) => {
				if (!startValue || !data.infoVO.maxCreateTime) {
					return false;
				}
				return startValue.valueOf() > new Date(data.infoVO.maxCreateTime).valueOf();
			},
			disabledEndDate: (endValue: any) => {
				if (!endValue || !data.infoVO.minCreateTime) {
					return false;
				}
				return new Date(data.infoVO.minCreateTime).valueOf() >= endValue.valueOf();
			},
			machineDelete: (id: number, machineId: number) => {
				const obj = {
					advertIds: [id],
					machineId,
					deleteAll: false
				};
				deleteMachineShopHttp(obj).then((res: any) => {
					message.success(res.data.msg);
					data.search();
				});
			},
			search: () => {
				AdvertTableListHttp(data.infoVO).then((res: any) => {
					res.data.data.list.forEach((i: any) => (i.flag = false));
					data.tableList = res.data.data.list;
					data.pageTotal = res.data.data.totalCount;
				});
			},
			handleShopClick: (id: number) => {
				ROUTER.push({
					path: 'MachineInfo',
					query: { id }
				});
			},
			handleUrlClick: (url: string) => {
				data.urlBox = true;
				if (url.includes('.mp4')) {
					data.isVideo = true;
				} else {
					data.isVideo = false;
				}
				data.src = url;
			},
			handleOk: () => {
				const obj = {
					advertIds: selectList,
					deleteAll: false
				};
				deleteAdvertHttp(obj).then((res: any) => {
					message.success(res.data.msg);
					data.visible = false;
					data.search();
				});
			},
			handleAllOk: () => {
				const obj = {
					advertIds: [],
					deleteAll: true
				};
				deleteAdvertHttp(obj).then((res: any) => {
					message.success(res.data.msg);
					data.allVisible = false;
					data.search();
				});
			},
			afterClose: (value: boolean) => {
				data.visible = value;
			},
			afterAllClose: (value: boolean) => {
				data.allVisible = value;
			},
			handleDelete: () => {
				if (handleSelectEvent(selectList, 'id').length) {
					data.visible = true;
				}
			},
			handleDeleteAll: () => {
				data.allVisible = true;
			},
			AdvertEdit: (id: number) => {
				ROUTER.push({
					path: 'MachineEditor',
					query: { id }
				});
			},
			handleTitleClick: (id: number) => {
				ROUTER.push({
					path: 'MachineEditor',
					query: { id }
				});
			},
			handleMachineClick: (id: number) => {
				ROUTER.push({
					path: 'MachineInfo',
					query: { id }
				});
			},
			handleCreate: () => {
				ROUTER.push('MachineEditor');
			},
			pageChange: () => {
				AdvertTableListHttp(data.infoVO).then((res: any) => {
					data.tableList = res.data.data.list;
				});
			}
		});
		const getShopList = () => {
			shopListHttp({ name: '', pageSize: 999 }).then((res: any) => {
				data.shopList = res.data.data.list;
			});
		};
		const init = () => {
			data.search();
			getShopList();
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

<style scoped>
.tableShop {
	display: flex;
	justify-content: space-between;
}
.tableRightBox {
	display: flex;
	justify-content: space-between;
	width: 80px;
	line-height: 32px;
}
.moreShopBox {
	width: 100%;
	line-height: 32px;
	display: flex;
	justify-content: space-between;
}
.shopItem {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	max-height: 150px;
	overflow-y: auto;
}
.tableBtn {
	display: flex;
	justify-content: space-between;
}
</style>
