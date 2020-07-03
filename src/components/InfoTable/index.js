/**
 * Created by lixin on 2019-01-12
 *
 * 详情页面表格
 *
 * data            | Array  | 数组 表格list
 *  |- title       | String | 表格标题
 *  |- len         | Number | 表格每行显示单位，默认6（可不传）必须是偶数
 *  |- list        | Array  | 表格单位数组
 *      |- key     | String | 每个单位的label
 *      |- value   | String | 每个单位的值
 *      |- span    | Number | 每个单位占总数的6分之几 ?/6 （如果有一个传都需要传）
 */
/*
参数例子
[{
  title:'临床信息',
  len:4,// 特殊情况每行显示4个元素 默认6个
  list:[{
    key:'是否IVF',
  },{
    key:'B超',
  },{
    key:'家族遗传史',
  },{
    key:'临床诊断',
    span:3,// Col 一样的属性 占3个位置 么有默认平分
  },{
    key:'备注',
    span:6
  }]
}]
*/
import React, { Component, Fragment } from 'react';
import { Col, Row } from 'antd';
import Ellipsis from '@/components/Ellipsis';

import styles from './index.less';

export default class InfoTable extends Component {
  constructor(props) {
    super(props);
    this.colLen = 6; // 每行显示多少个

    this.globalLen = 6;
  }

  _setListData(data, len) {
    let _list = [];

    let _colLen = 6;

    if (data) {
      _colLen = len || this.colLen;

      this.globalLen = _colLen;

      const _len = Math.ceil(data.length / _colLen);

      // 注册默认数组，假设每个单位key value 都是“-”
      for (let i = 0; i < _len; i++) {
        _list.push(new Array(_colLen).fill({ key: '-', value: '-' }));
      }

      let _index = 0;

      while (_index < _len) {
        const _pos = _index * _colLen; // 记录每次循环到哪

        for (let j = _pos; j < data.length; j++) {
          // 每一轮循环 j 的起始位置不一样，结束位置也不一样

          if (j < _colLen * _index + _colLen) {
            _list[_index][j % _colLen] = data[j];
          }
        }
        _index++;
      }
    }

    // 查看有么有满行占领的
    _list.map((value, index) => {
      _list[index].map(item => {
        if (item.span === 6) {
          _list[index] = [item];
        }
      });
    });

    return _list;
  }

  _getTrItem(data) {
    if (data) {
      return data.map((value, index) => <TrItem key={index} data={value} len={this.globalLen} />);
    }
  }

  // 获取有几行
  _getRow(data, len) {
    if (data) {
      const _list = this._setListData(data, len);

      return _list.map((value, index) => <Row key={index}>{this._getTrItem(value)}</Row>);
    }
  }

  _getItem(data) {
    if (data) {
      return data.map((value, index) => (
        <div key={index}>
          {value.title ? <h1>{value.title}</h1> : ''}

          {this._getRow(value.list, value.len)}
        </div>
      ));
    }
  }

  render() {
    const { data } = this.props;

    return <div className={styles.infoTableBox}>{this._getItem(data)}</div>;
  }
}

const TrItem = props => {
  const _getParams = value => {
    const { data } = props;

    if (data && (data.hasOwnProperty(value) || data.hasOwnProperty(value) == '0')) {
      return data[value];
    }
  };

  const _span = _getParams('span');
  const { len } = props;
  const value = _getParams('value');
  let _width = 4;
  if (len && !_span) {
    _width = 24 / len;
  } else {
    _width = _span ? _span * 4 : 4;
  }

  return (
    <Col className={styles.trItemBox} span={_width}>
      <p>{_getParams('key')}</p>
      <p>
        {props.data.ellipsis ? (
          <Ellipsis lines={1} tooltip overlayStyle={{maxWidth: '700px'}}>
            {value}
          </Ellipsis>
        ) : (
          <span>{value}</span>
        )}
      </p>
    </Col>
  );
};
