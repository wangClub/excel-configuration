import moment from 'moment';// 时间格式化请用这个，千万别自己写
import { check, nullData } from '../../utils/utils';

/**
 * Created by lixin on 2019-03-14
 */

export const getData = (data) => {

  const _data = check(data);

  let _list = [];

  if (_data) {
    _data.map((value, index) => {

      _list.push({
        key: index,
        code: value.code,// 角色code
        role: value.name, // 角色名字
        user_num: value.count,// 角色占有数量
        remarks: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),// 时间格式化芳芳
      });
    });

    data.data.dataSource = _list;
  }

  return _data ? data.data : nullData();


};

/**
 * 常用使用方法
 *
 * moment(时间戳).format('YYYY-MM-DD HH:mm:ss') // 2019-03-15 08:36:37
 * moment(时间戳).format('YYYY-MM-DD')          // 2019-03-15
 *
 * moment(时间戳).format('YYYY-MM-DD 00:00:00') // 2019-03-15 00:00:00  开始时间
 * moment(时间戳).format('YYYY-MM-DD 23:59:59') // 2019-03-15 23:59:59  结束时间
 *
 * */
