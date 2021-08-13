<template>
	<a-row class="rowStyle">
		<a-table bordered :row-selection="rowSelection" :columns="columns" :data-source="tableList" :pagination="false" rowKey="id" class="tableStyle">
			<template #name="{ record }">
				<a-button type="link" @click="handleTitleClick(record.id)">{{ record.title }}</a-button>
			</template>
			<template #handle="{ record }">
        <div class="goodTableBox">
          <a-select v-model:value="record.type" style="width: 40%" @change="handleChange">
            <a-select-option value="1">{{ $t('default.86') }}</a-select-option>
            <a-select-option value="2">{{ '金币' }}</a-select-option>
            <a-select-option value="3">{{ '游戏币' }}</a-select-option>
          </a-select>
          <a-input v-if="record.type !== '1'"  style="width: 50%" v-model:value="record.count" />
        </div>
			</template>
		</a-table>
	</a-row>
	<DeleteDialog :visible="visible" @afterClose="afterClose" @handleOk="handleDeleteOk" />
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from 'vue';
import DeleteDialog from '@/components/common/DeleteDialog.vue';
import { message } from 'ant-design-vue';
import { handleSelectEvent, i18n } from '@/components/common/tools';
// import qs from 'qs'

interface DataProps{
	countryList: [{id: any;name: any}];
}

export default defineComponent({
	name: 'goodTable',
  props: ['data'],
	components: {
		DeleteDialog
	},
	setup(prop: any) {
		let selectList: number[] = [];
		const data = reactive({
			visible: false,
			shopList: [],
			tableList: prop.data,
			status:0,
			infoVO: {
				countryId: '',
				title: '',
				display:' ',
				pageNum: 1,
				pageSize: 10
			},
			columns: [
				{
					title: i18n('default.179'),
          width:'60%',
					dataIndex: 'name',
				},
				{
					title: i18n('default.27'),
          width:'40%',
					slots: { customRender: 'handle' }
				}
			],
			rowSelection: {
				columnWidth: 50,
				// columnTitle: '全选',
				onChange: (selectedRowKeys: number[]) => {
					selectList = selectedRowKeys;
				}
			},
      handleTitleClick:(id: any) =>{
        console.log(id)
      },
      handleChange:() =>{
        console.log(1)
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
				data.visible = false;
			},
		});
    watch(
			() => prop.data,
			(val) => {
				data.tableList = val;
			}
		);
		return {
			...toRefs(data)
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
.goodTableBox{
  display: flex;
}
</style>
