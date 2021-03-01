import { message } from 'ant-design-vue';
// 表格点击事件
const handleSelectEvent = (list: Array<number>, id: string) => {
	// 原始数据，获取得字段
	let dataArr: Array<number> = [];
	if (list.length) {
		dataArr = list.map((i: any) => i[id]);
	} else {
		message.warning('至少选择一条数据！');
	}
	return dataArr;
};
export { handleSelectEvent };

// 下载
