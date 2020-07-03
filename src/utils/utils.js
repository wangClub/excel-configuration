import React from 'react';
import { parse } from 'qs';


export function getUserMessage() {
  const _userData = getItem('LOGIN_MESSAGE') ? JSON.parse(getItem('LOGIN_MESSAGE')) : false;

  if (_userData) {
    return _userData;
  }

  return false;
}

export function setItem(key, value) {
  sessionStorage.setItem(key, value);
}

export function getItem(key) {
  const data = sessionStorage.getItem(key);
  if (data) {
    return data;
  } else {
    return false;
  }
}

export function removeItem(key) {
  sessionStorage.removeItem(key);
}

export function clear() {
  localStorage.clear();
}

// 返回列表默认结构，所有异常处理都在mock做，列表只做显示 ，不关心数据
export function nullData() {
  return {
    pageNo: 0,
    pageSize: 10,
    pageTotal: 10,
    total: 10,
    dataSource: [],
  };
}

// 判断接口数据是否正常
export function check(data) {
  const _body = dataCheck(data, 'data');
  const _data = _body ? dataCheck(_body, 'datas') : false;
  if (_data) {
    return _data;
  }
  return false;
}

// 对象异常校验，并返回
export function dataCheck(data, value) {
  if (data && data.hasOwnProperty(value)) {
    return data[value];
  } else {
    return false;
  }
}




export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}


export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
  return reg.test(path);
}

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export function isAntdPro() {
  return window.location.hostname === 'preview.pro.ant.design';
}
