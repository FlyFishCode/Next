import axios from 'axios';
// import { message } from 'ant-design-vue';

import { loginUrl, changePassword, userList, countryList, areaList, changeInfo } from '@/api/index';
// Advert
import { AdvertTableList, AdvertTableAdd, AdvertSearch, AdvertChange, AdvertList, MachineInfo, deleteAdvertShop, deleteAdvert, MachineList } from '@/api/Advert/index';

// Machine
import {
	shopList,
	shopSingleInfo,
	editShopinfo,
	createShop,
	shopMachineList,
	deleteShop,
	createMachine,
	editorMachine,
	getMachineInfo,
	getShopMachineSetting,
	setShopMachineSetting,
	setMachineSetting,
	deleteMachine
} from '@/api/Machine/index';

// Agent
import { agentList } from '@/api/Agent/index';

// Settlement
import { settlementList, settlementInfo, machineSettlementList, final, rechargeRecord } from '@/api/Settlement/index';

// System
import { systemUserList, addUser, searchUser, modifyUser } from '@/api/System/index';

// Player
import { playerList, PlayerInfo, PlayerCreate, PlayerUpdate, PlayerDelete, PlayerRestorePassword } from '@/api/Player/index';

const baseURL = '/apw';
const Axios = axios.create({
	baseURL: baseURL,
	timeout: 10000
});

Axios.interceptors.request.use(
	(config) => {
		// 修改获取token时机，解决token验证问题
		const token = sessionStorage.getItem('token');
		const userId = sessionStorage.getItem('userId');
		if (!config.headers.Authorization) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		if (!config.headers.userId) {
			config.headers.userId = userId;
		}
		return config;
	},
	(err) => {
		return Promise.reject(err);
	}
);
Axios.interceptors.response.use(
	(response) => {
		return response;
	},
	(err) => {
		return Promise.reject(err);
	}
);

const getNewUrl = (url: string, data: any = null) => {
	if (data) {
		let src = url + '?';
		for (const [key, value] of Object.entries(data)) {
			src += `${key}=${value}&`;
		}
		return src.substring(0, src.length - 1);
	}
	return url;
};
// 登录
const loginHttp = (data: any) => {
	return Axios.post(loginUrl, data);
};
// 修改密码
const changePasswordHttp = (data: any) => {
	return Axios.post(changePassword, data);
};
// 修改用户信息
const changeInfoHttp = (data: any) => {
	return Axios.post(changeInfo, data);
};
changeInfo;
// 用户列表
const userListHttp = (data: any) => {
	return Axios.post(userList, data);
};
// 国家列表
const countryListHttp = (data: any) => {
	return Axios.post(countryList, data);
};
// 地区列表
const areaListHttp = (data: any) => {
	return Axios.post(areaList, data);
};
// Advert
// 广告列表
const AdvertTableListHttp = (data: any) => {
	return Axios.post(AdvertTableList, data);
};
// 删除广告下的店铺/机器
const deleteAdvertShopHttp = (data: any) => {
	return Axios.post(deleteAdvertShop, data);
};
// 广告删除
const deleteAdvertHttp = (data: any) => {
	return Axios.post(deleteAdvert, data);
};
// 广告添加
const AdvertTableAddHttp = (data: any) => {
	return Axios.post(AdvertTableAdd, data);
};
// 查询广告
const AdvertSearchHttp = (data: any) => {
	return Axios.post(AdvertSearch, data);
};
// 修改广告
const AdvertChangeHttp = (data: any) => {
	return Axios.post(AdvertChange, data);
};
// 查询某个店铺或者机器的广告列表
const AdvertListHttp = (data: any) => {
	return Axios.post(AdvertList, data);
};
// 通过id查询店铺信息
const shopSingleInfoHttp = (data: any) => {
	return Axios.get(getNewUrl(shopSingleInfo, data));
};
// 通过id查询机器信息
const MachineInfoHttp = (data: any) => {
	return Axios.get(getNewUrl(MachineInfo, data));
};
// 查询机器列表
const MachineListHttp = (data: any) => {
	return Axios.post(MachineList, data);
};
// Machine
// 店铺列表
const shopListHttp = (data: any) => {
	return Axios.post(shopList, data);
};
// 修改店铺
const editShopHttp = (data: any) => {
	return Axios.post(editShopinfo, data);
};
// 创建店铺
const createShopHttp = (data: any) => {
	return Axios.post(createShop, data);
};
// 代理商列表
const agentListHttp = (data: any) => {
	return Axios.get(getNewUrl(agentList, data));
};
// 查询店铺下机器列表
const shopMachineListHttp = (data: any) => {
	return Axios.post(shopMachineList, data);
};
// 删除店铺
const deleteShopHttp = (data: any) => {
	return Axios.post(deleteShop, data);
};
// 删除机器
const deleteMachinepHttp = (data: any) => {
	return Axios.post(deleteMachine, data);
};
// 创建机器
const createMachineHttp = (data: any) => {
	return Axios.post(createMachine, data);
};
// 创建机器
const editorMachineHttp = (data: any) => {
	return Axios.post(editorMachine, data);
};
// 查询机器
const getMachineInfoHttp = (data: any) => {
	return Axios.get(getNewUrl(getMachineInfo, data));
};
// 查询店铺下机器设置
const getShopMachineSettingHttp = (data: any) => {
	return Axios.get(getNewUrl(getShopMachineSetting, data));
};
// 修改店铺游戏设置
const setShopMachineSettingHttp = (data: any) => {
	return Axios.post(setShopMachineSetting, data);
};
// 修改机器设置
const setMachineSettingHttp = (data: any) => {
	return Axios.post(setMachineSetting, data);
};

// Settlement 对账列表
const settlementListHttp = (data: any) => {
	return Axios.post(settlementList, data);
};
// 店铺结算列表
const settlementInfoHttp = (data: any) => {
	return Axios.post(settlementInfo, data);
};
// 机器结算列表
const machineSettlementListHttp = (data: any) => {
	return Axios.get(getNewUrl(machineSettlementList, data));
};
// 机器结算
const finalHttp = (data: any) => {
	return Axios.post(final, data);
};
// 机器结算
const rechargeRecordHttp = (data: any) => {
	return Axios.post(rechargeRecord, data);
};

// System
// 用户列表
const systemUserListHttp = (data: any) => {
	return Axios.post(systemUserList, data);
};
// 创建用户
const addUserHttp = (data: any) => {
	return Axios.post(addUser, data);
};
// 查询用户
const searchUserHttp = (data: any) => {
	return Axios.get(getNewUrl(searchUser, data));
};
// 修改用户
const modifyUserHttp = (data: any) => {
	return Axios.post(modifyUser, data);
};

// Player
// 玩家列表
const playerListHttp = (data: any) => {
	return Axios.post(playerList, data);
};
// 查询玩家
const PlayerInfoHttp = (data: any) => {
	return Axios.get(getNewUrl(PlayerInfo, data));
};
// 创建玩家
const PlayerCreateHttp = (data: any) => {
	return Axios.post(PlayerCreate, data);
};
// 修改玩家
const PlayerUpdateHttp = (data: any) => {
	return Axios.post(PlayerUpdate, data);
};
// 删除玩家
const PlayerDeleteHttp = (data: any) => {
	return Axios.post(PlayerDelete, data);
};
// 重置密码
const PlayerRestorePasswordHttp = (data: any) => {
	return Axios.post(PlayerRestorePassword, data);
};

export {
	loginHttp,
	changePasswordHttp,
	AdvertTableListHttp,
	deleteAdvertHttp,
	AdvertTableAddHttp,
	AdvertSearchHttp,
	AdvertChangeHttp,
	shopListHttp,
	AdvertListHttp,
	shopSingleInfoHttp,
	createShopHttp,
	editShopHttp,
	userListHttp,
	countryListHttp,
	areaListHttp,
	agentListHttp,
	shopMachineListHttp,
	deleteShopHttp,
	MachineInfoHttp,
	deleteAdvertShopHttp,
	MachineListHttp,
	createMachineHttp,
	editorMachineHttp,
	getMachineInfoHttp,
	getShopMachineSettingHttp,
	setShopMachineSettingHttp,
	setMachineSettingHttp,
	deleteMachinepHttp,
	changeInfoHttp,
	settlementListHttp,
	settlementInfoHttp,
	machineSettlementListHttp,
	finalHttp,
	rechargeRecordHttp,
	systemUserListHttp,
	addUserHttp,
	searchUserHttp,
	modifyUserHttp,
	playerListHttp,
	PlayerInfoHttp,
	PlayerCreateHttp,
	PlayerUpdateHttp,
	PlayerDeleteHttp,
	PlayerRestorePasswordHttp
};
