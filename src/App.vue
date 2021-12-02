<template>
	<router-view />
</template>

<style>
#app {
	height: 100%;
}
.rowStyle {
	margin: 5px 0;
}
.selectBox {
	width: 100%;
}
.tableStyle {
	width: 100%;
}
.tableStyle td {
	text-align: center;
}
.tableStyle .ant-table-thead th {
	text-align: center;
}
/* 日期选择器 */
.datePicker .ant-calendar-picker {
	width: 100%;
}
/* 分页 */
.paginationStyle {
	display: flex;
	justify-content: flex-end;
}
.searchBox {
	background: #eee;
	padding: 10px;
}
/* label */
.labelText {
	text-align: center;
	line-height: 32px;
	font-size: 16px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
/* 搜索条件内btn */
.searchButton {
	text-align: center;
	line-height: 32px;
}

/* 时间组件 */
.datePicker:first-child(span) {
	width: 100%;
}
/* 单选框 */
.radioStyle {
	background: #fff;
}
.radioStyle div {
	width: 100%;
	height: 32px;
	display: flex;
	justify-content: space-around;
}
.radioStyle .ant-radio-wrapper {
	line-height: 32px;
}
.link {
	cursor: pointer;
	color: #1890ff;
	height: 32px;
	line-height: 32px;
}
/* 广告模块链接弹框样式 */
/* .modalBox {
	min-height: 500px;
} */
.modalBox img,
video {
	width: 100%;
}
#deleteBtnBox {
	display: flex;
	justify-content: space-around;
}
.title-g {
	border-bottom: 1px solid #1890ff;
	text-indent: 5px;
}
.title-g::before {
	display: block;
	content: '';
	width: 2px;
	height: 23px;
	position: absolute;
	background: red;
}
/* 弹框下按钮样式 */
.footerBtnClass {
	display: flex;
	justify-content: center;
}
/* 弹框样式 */
/* .ant-modal .ant-modal-content {
	min-height: 800px;
} */
/* 确认删除弹框样式 */
.deleteBox .ant-modal-content {
	min-height: 200px;
}
/*  按钮巨中 */
.buttonBox {
	display: flex;
	justify-content: center;
}
/* 提示 */
.tipsBox{
	display: flex;
	align-items: center;
}
.tipsBox div{
	width: 20px;
	height: 20px;
	border-radius: 50%;
	text-align: center;
	background: yellow;
}
@media screen and (max-width: 1000px) {
	.ant-table-thead > tr > th, .ant-table-tbody > tr > td{
		padding: 0 !important;
	}
	.userBox{
		font-size: 14px !important;
	}
}
</style>
