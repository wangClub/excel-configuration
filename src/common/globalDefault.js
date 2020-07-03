/**
 * Created by lixin on 2019-03-13
 *
 * 写全局展示的文字，比如项目名称，logo地址等
 *
 */

import React, { Fragment } from 'react';
import { Icon } from 'antd';


/**
 * 项目默认设置
 * */
export const DEFAULT_SETTING = {
  otherLogin: true,// 是否使用其它登录方式
  register: true,// 是否使用注册功能
  mobile: false,// 是否使用手机号登录功能
};



/**
 * 项目名称
 * */
export const PROJECT_NAME = 'Template';



/**
 * 登录页面 项目名称下 项目简介
 * */
export const PROJECT_INTRO = 'Ant Design 是西湖区最具影响力的 Web 设计规范global';



/**
 * Logo
 * */
export const LOGO = '';


/**
 * 权限名字，用于判定是否登录的标识，每个项目都应该不一样
 * */
export const AUTHORITY = 'annoroad-template-authority';


/**
 * Copyright
 * */
export const COPYRIGHT = (
  <Fragment>
    Copyright <Icon type="copyright"/> 2018 蚂蚁金服体验技术部出品 global
  </Fragment>
);


/**
 * 登录页面links
 * */
export const LOGIN_LINKS = [
  {
    key: 'help',
    title: '帮助 global',
    href: '',
  },
  {
    key: 'privacy',
    title: '隐私 global',
    href: '',
  },
  {
    key: 'terms',
    title: '条款 global',
    href: '',
  },
];

