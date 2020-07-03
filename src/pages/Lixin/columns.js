import React from 'react';

// 系统设置 角色管理
export const roleManageColumns = [
  {
    title: '角色',
    dataIndex: 'role',
    key: 'role',
    width: '15%',
  },
  {
    title: '用户数',
    dataIndex: 'user_num',
    key: 'user_num',
    className: 'textRight',
    width: '10%',
    render: text => <div style={{ textAlign: 'right' }}>{text}</div>,
  },
  {
    width: '15%',
  },
  {
    title: '描述',
    dataIndex: 'remarks',
    key: 'remarks',
    width: '50%',
  },
];
