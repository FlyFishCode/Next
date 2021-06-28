<template>
	<labelTitle :value="$t('default.24')" />
	<div class="searchBox">
		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ 'ID' }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="infoVO.id" allowClear />
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.179') }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="infoVO.name" allowClear />
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.23') }}
			</a-col>
			<a-col :span="4">
				<a-select
				class="selectBox"
					show-search
					v-model:value="infoVO.countryId"
					:default-active-first-option="false"
					:show-arrow="false"
					:filter-option="false"
					:not-found-content="null"
					allowClear
					@search="CountrySearch"
				>
					<a-select-option v-for="shop in shopList" :key="shop.id">
						<div :title="shop.name">{{ shop.name }}</div>
					</a-select-option>
				</a-select>
			</a-col>
			<a-col :span="2" class="labelText">
				{{ $t('default.180') }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="infoVO.code" allowClear />
			</a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :span="2" class="labelText">
				{{ $t('default.181') }}
			</a-col>
			<a-col :span="4">
				<a-input v-model:value="infoVO.sort" allowClear />
			</a-col>
			<a-col :span="2" class="labelText">
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
			<template #country="{ record }">
				<a-button type="link" size="small" @click="handleCountryClick(record.countryId)">{{ record.countryName }}</a-button>
			</template>
		</a-table>
	</a-row>
	<div class="paginationStyle">
		<a-pagination show-quick-jumper v-model:current="infoVO.pageIndex" :total="total" @change="pageChange" />
	</div>
	<div v-if="visible">
		<a-modal v-model:visible="visible" width="40%" :title="$t('default.183')" :footer="null" centered>
			<a-form ref="AreaRef" :model="dialogAreaInfo" :rules="AreaRules" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
				<a-form-item :label="$t('default.179')" name="name">
					<a-input v-model:value="dialogAreaInfo.name" allowClear />
				</a-form-item>
				<a-form-item :label="$t('default.23')" name="countryId">
					<a-select
					class="selectBox"
						show-search
						v-model:value="dialogAreaInfo.countryId"
						:default-active-first-option="false"
						:show-arrow="false"
						:filter-option="false"
						:not-found-content="null"
						allowClear
						@search="CountrySearch"
					>
						<a-select-option v-for="shop in shopList" :key="shop.id">
							<div :title="shop.name">{{ shop.name }}</div>
						</a-select-option>
					</a-select>
				</a-form-item>
				<a-form-item :label="$t('default.180')" name="code">
					<a-input v-model:value="dialogAreaInfo.code" allowClear />
				</a-form-item>
				<a-form-item :label="$t('default.181')" :name="countryId ? 'sort' : ''">
					<a-input v-model:value="dialogAreaInfo.sort" />
				</a-form-item>
			</a-form>
			<a-row class="rowStyle buttonBox">
				<a-col :span="3">
					<a-button @click="handleAreaCancel">{{ $t('default.19') }}</a-button>
				</a-col>
				<a-col :span="3">
					<a-button type="primary" @click="handleAreaOK">{{ $t('default.18') }}</a-button>
				</a-col>
			</a-row>
		</a-modal>
	</div>
	<div v-if="CountryVisible">
		<a-modal v-model:visible="CountryVisible" width="40%" :title="$t('default.182')" :footer="null" centered>
			<a-form ref="CountryRef" :model="dialogCountryInfo" :rules="CountryRules" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
				<a-form-item :label="$t('default.179')" name="name">
					<a-input v-model:value="dialogCountryInfo.name" allowClear />
				</a-form-item>
				<a-form-item :label="$t('default.180')" name="code">
					<a-input v-model:value="dialogCountryInfo.code" allowClear />
				</a-form-item>
				<a-form-item :label="$t('default.181')" name="sort">
					<a-input v-model:value="dialogCountryInfo.sort" allowClear />
				</a-form-item>
			</a-form>
			<a-row class="rowStyle buttonBox">
				<a-col :span="3">
					<a-button @click="handleCountryCancel">{{ $t('default.19') }}</a-button>
				</a-col>
				<a-col :span="3">
					<a-button type="primary" @click="handleCountryOK">{{ $t('default.18') }}</a-button>
				</a-col>
			</a-row>
		</a-modal>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
import labelTitle from '@/components/labelTitle.vue';
import { i18n } from '@/components/common/tools';
import { AreaListHttp, AreaCreateHttp, AreaUpdateHttp, AreaInfoHttp, CountryInfoHttp, countryListHttp, CountryUpdateHttp } from '@/api/api';
import { message } from 'ant-design-vue';
export default defineComponent({
	name: 'Area',
	components: {
		labelTitle
	},
	setup() {
		const AreaRef: any = ref(null);
		const CountryRef: any = ref(null);
		const checkCountry = async (rule: any, value: number) => {
			if (!value) {
				return Promise.reject(i18n('Please select country'));
			}
		};
		const data = reactive({
			visible: false,
			CountryVisible: false,
			countryId: 0,
			infoVO: {
				id: '',
				name: '',
				code: '',
				sort: '',
				countryId: '',
				pageIndex: 1,
				pageSize: 10
			},
			dialogAreaInfo: {
				id: '',
				name: '',
				code: '',
				countryId: '',
				sort: ''
			},
			dialogCountryInfo: {
				id: '',
				name: '',
				code: '',
				sort: ''
			},
			AreaRules: {
				name: [{ required: true, message: 'Please input name', trigger: 'blur' }],
				code: [{ required: true, message: 'Please input code', trigger: 'blur' }],
				// sort: [{ required: true, message: 'Please input sort', trigger: 'blur' }],
				countryId: [{ required: true, message: 'Please select country', validator: checkCountry }]
			},
			CountryRules: {
				name: [{ required: true, message: 'Please input name', trigger: 'blur' }],
				code: [{ required: true, message: 'Please input code', trigger: 'blur' }]
				// sort: [{ required: true, message: 'Please input sort', trigger: 'blur' }]
			},
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
					title: i18n('default.23'),
					slots: { customRender: 'country' }
				},
				{
					title: i18n('default.180'),
					dataIndex: 'code'
				}
			],
			total: 1,
			shopList: [],
			tableList: [],
			search: () => {
				AreaListHttp(data.infoVO).then((res: any) => {
					if (res.data.data) {
						data.tableList = res.data.data.list;
						data.total = res.data.data.totalCount;
					}
				});
			},
			CountrySearch: (value: string) => {
				countryListHttp({ name: value, pageSize: 9999 }).then((res: any) => {
					if (res.data.data) {
						data.shopList = res.data.data.list;
					}
				});
			},
			handleCreate: () => {
				data.dialogAreaInfo.id = '';
				data.dialogAreaInfo.name = '';
				data.dialogAreaInfo.code = '';
				data.dialogAreaInfo.countryId = '';
				data.dialogAreaInfo.sort = '';
				data.countryId = 0;
				data.visible = true;
			},
			handleNameClick: (code: number) => {
				data.visible = true;
				data.countryId = code;
				AreaInfoHttp({ areaId: code }).then((res: any) => {
					if (res.data.data) {
						data.dialogAreaInfo.id = res.data.data.id;
						data.dialogAreaInfo.name = res.data.data.name;
						data.dialogAreaInfo.code = res.data.data.code;
						data.dialogAreaInfo.sort = res.data.data.sort;
						data.dialogAreaInfo.countryId = res.data.data.countryId;
					}
				});
			},
			handleCountryClick: (code: number) => {
				data.CountryVisible = true;
				CountryInfoHttp({ countryId: code }).then((res: any) => {
					if (res.data.data) {
						data.dialogCountryInfo.id = res.data.data.id;
						data.dialogCountryInfo.name = res.data.data.name;
						data.dialogCountryInfo.code = res.data.data.code;
						data.dialogCountryInfo.sort = res.data.data.sort;
					}
				});
			},
			pageChange: (index: number) => {
				data.infoVO.pageIndex = index;
				data.search();
			},
			handleAreaCancel: () => {
				data.visible = false;
			},
			handleCountryCancel: () => {
				data.CountryVisible = false;
			},
			handleAreaOK: () => {
				let server: any = null;
				if (data.countryId) {
					server = AreaUpdateHttp;
				} else {
					server = AreaCreateHttp;
				}
				AreaRef.value
					.validate()
					.then(() => {
						server(data.dialogAreaInfo).then((res: any) => {
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
			},
			handleCountryOK: () => {
				CountryRef.value
					.validate()
					.then(() => {
						CountryUpdateHttp(data.dialogCountryInfo).then((res: any) => {
							if (res.data.code === 100) {
								message.success('ok');
								data.search();
								data.CountryVisible = false;
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
			data.CountrySearch('');
		};
		onMounted(() => {
			init();
		});
		return {
			...toRefs(data),
			AreaRef,
			CountryRef
		};
	}
});
</script>

<style scoped></style>
