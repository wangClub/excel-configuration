/**
 * Created by lixin on 2019-01-18
 */
export const NEW_BATCH_NO_PATTERN = /^.{1,50}$/;
export const NEW_ROLE_NAME_PATTERN = /^.{1,15}$/;// 角色名称
export const NEW_ROLE_ADMIN_PATTERN = /^.{1,10}$/;// 角色名称
export const NEW_ROLE_REMARK_PATTERN = /^.{0,100}$/;// 角色备注
export const REPORT_EXPLAIN_REMARK_PATTERN = /^.{0,900}$/;// 报告说明

// 密码位数验证
export const PASSWORD = /^[A-Za-z0-9]{6,16}$/;
