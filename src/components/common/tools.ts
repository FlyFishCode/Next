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

// 深克隆
const deepClone = (obj: any) => {
	const objClone: any = Array.isArray(obj) ? Object.assign([], []) : Object.assign({}, {});
	if (obj && typeof obj === 'object') {
		for (const key in obj) {
			// eslint-disable-next-line no-prototype-builtins
			if (obj.hasOwnProperty(key)) {
				if (obj[key] && typeof obj[key] === 'object') {
					objClone[key] = deepClone(obj[key]);
				} else {
					objClone[key] = obj[key];
				}
			}
		}
	}
	return objClone;
};

const initDataToNumber = (data: any) => {
	for (const [key, value] of Object.entries(data)) {
		if (value && typeof value === 'object') {
			data = initDataToNumber(value);
		} else if (typeof value === 'boolean') {
			data[key] = Number(value);
		}
	}
};

const initDataToBoolean = (data: any) => {
	// 转换布尔类型为数字类型
	const matchList = [
		'mode',
		'allGameOfMatch',
		'isDebug',
		'showTimedSwitch',
		'emptyDartAlarm',
		'coinsSwitch',
		'moneySwitch',
		'qrcodeSwitch',
		'IDBrushSwitch',
		'creditsBrushSwitch',
		'ledSwitch',
		'screenSaverSwitch',
		'mute',
		'autoChange',
		'available',
		'isFree',
		'isTimeFree'
	];
	for (const [key, value] of Object.entries(data)) {
		if (matchList.includes(key)) {
			data[key] = Boolean(value);
		} else if (value && typeof value === 'object') {
			data = initDataToBoolean(value);
		}
	}
};

export { handleSelectEvent, deepClone, initDataToNumber, initDataToBoolean };
