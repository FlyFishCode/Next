<template>
	<labelTitle :value="$t('default.23')" />
	<div class="searchBox">
		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ 'ID' }}
			</a-col>
			<a-col :span="3">
				<a-input v-model:value="infoVO.id" allowClear />
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.179') }}
			</a-col>
			<a-col :span="3">
				<a-input v-model:value="infoVO.name" allowClear />
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.180') }}
			</a-col>
			<a-col :span="3">
				<a-input v-model:value="infoVO.code" allowClear />
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.181') }}
			</a-col>
			<a-col :span="3">
				<a-input v-model:value="infoVO.sort" allowClear />
			</a-col>
			<a-col :span="1" class="labelText">
				<a-button type="primary" size="small" @click="search">{{ $t('default.8') }}</a-button>
			</a-col>
		</a-row>
	</div>
	<a-row class="rowStyle">
		<a-col :span="1">
			<a-button type="primary" size="small" @click="handleCreate">{{ $t('default.9') }}</a-button>
		</a-col>
	</a-row>
	<a-row class="rowStyle">
		<a-table bordered :columns="columns" :data-source="tableList" :pagination="false" rowKey="id" class="tableStyle">
			<template #name="{ record }">
				<a-button type="link" size="small" @click="handleNameClick(record.id)">{{ record.name }}</a-button>
			</template>
		</a-table>
	</a-row>
	<div class="paginationStyle">
		<a-pagination show-quick-jumper v-model:current="infoVO.pageIndex" :total="total" @change="pageChange" />
	</div>
	<div v-if="visible">
		<a-modal v-model:visible="visible" width="40%" :title="$t('default.182')" :footer="null" centered>
			<a-form ref="formRef" :model="dialogInfo" :rules="rules" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
				<a-form-item :label="$t('default.179')" name="name">
					<a-input v-model:value="dialogInfo.name" allowClear />
				</a-form-item>
				<a-form-item :label="$t('default.180')" name="code">
					<a-input v-model:value="dialogInfo.code" allowClear />
				</a-form-item>
				<a-form-item :label="$t('default.181')" allowClear :name="countryId ? 'sort' : ''">
					<a-input v-model:value="dialogInfo.sort" />
				</a-form-item>
			</a-form>
			<a-row class="rowStyle buttonBox">
				<a-col :span="3">
					<a-button @click="handleCancel">{{ $t('default.19') }}</a-button>
				</a-col>
				<a-col :span="3">
					<a-button type="primary" @click="handleOk">{{ $t('default.18') }}</a-button>
				</a-col>
			</a-row>
		</a-modal>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
import labelTitle from '@/components/labelTitle.vue';
import { i18n } from '@/components/common/tools';
import { CountryListHttp, CountryCreateHttp, CountryUpdateHttp, CountryInfoHttp } from '@/api/api';
import { message } from 'ant-design-vue';
export default defineComponent({
	name: 'Country',
	components: {
		labelTitle
	},
	setup() {
		const formRef: any = ref(null);
		const data = reactive({
			visible: false,
			countryId: 0,
			infoVO: {
				id: '',
				name: '',
				code: '',
				sort: '',
				pageIndex: 1,
				pageSize: 10
			},
			dialogInfo: {
				id: '',
				name: '',
				code: '',
				sort: ''
			},
			rules: {
				name: [{ required: true, message: 'Please input name', trigger: 'blur' }],
				code: [{ required: true, message: 'Please input code', trigger: 'blur' }],
				sort: [{ required: true, message: 'Please input sort', trigger: 'blur' }]
			},
			total: 1,
			columns: [
				{
					title: i18n('default.181'),
					dataIndex: 'sort'
				},
				{
					title: 'ID',
					dataIndex: 'id'
				},
				{
					title: i18n('default.179'),
					slots: { customRender: 'name' }
				},
				{
					title: i18n('default.180'),
					dataIndex: 'code'
				}
			],
			tableList: [],
			search: () => {
				CountryListHttp(data.infoVO).then((res: any) => {
					if (res.data.data) {
						data.tableList = res.data.data.list;
						data.total = res.data.data.totalCount;
					}
				});
			},
			handleCreate: () => {
				data.dialogInfo.name = '';
				data.dialogInfo.code = '';
				data.dialogInfo.sort = '';
				data.countryId = 0;
				data.visible = true;
			},
			handleNameClick: (code: number) => {
				data.visible = true;
				data.countryId = code;
				CountryInfoHttp({ countryId: code }).then((res: any) => {
					if (res.data.data) {
						data.dialogInfo = res.data.data;
					}
				});
			},
			pageChange: (index: number) => {
				data.infoVO.pageIndex = index;
				data.search();
			},
			handleCancel: () => {
				data.visible = false;
			},
			handleOk: () => {
				let server: any = null;
				if (data.countryId) {
					server = CountryUpdateHttp;
				} else {
					server = CountryCreateHttp;
				}
				formRef.value
					.validate()
					.then(() => {
						server(data.dialogInfo).then((res: any) => {
							if (res.data.code === 100) {
								message.success('ok');
								data.search();
								data.visible = false;
							} else {
								message.warning(res.data.msg);
							}
						});
					})
					.catch((error: any) => {
						console.log('error', error);
					});
			}
		});
		const init = () => {
			data.search();
		};
		onMounted(() => {
			init();
		});
		return {
			...toRefs(data),
			formRef
		};
	}
});
</script>

<style scoped></style>
