import React, { Component } from 'react';
import { Form, Row, Col, Input, Select, Button, DatePicker, AutoComplete } from 'antd';
import styles from './index.less';

const FormItem = Form.Item;

const { Option } = AutoComplete || Select;
const { RangePicker } = DatePicker;

/**
 *   lixin 2013.4.19
 *   items [{     | array     | 数组包含元素对象
 *   type         | string    | 类型 判断是选择还是输入 名字按照antd组件名字传入
 *   label        | string    | 标题
 *   required     | boolean   | 是否必填项  true / false
 *   placeholder  | string    | 描述
 *   parameter    | string    | 参数名字
 *   options      | array     | 如果type为Select必须传，否则认为此组件是Input
 *   pattern      |           | 正则
 *   initialValue | string    | 默认值
 *   }]
 *
 *
 *   onSubmit     | function  | 提交方法
 *
 *   未完待续...
 *
 * */
@Form.create()
class Search extends Component {
  constructor(props) {
    super(props);

    this.colLength = 4; // 每行显示个数，暂时因为栅格布局不能修改
    this.colCount = 0;
  }

  // 根据items长度判断需要显示几行
  getChildren(items, getFieldDecorator, loading) {
    const len = items.length + 1;
    const rowLen = Math.ceil(len / this.colLength);

    const rowArr = [];
    for (let i = 0, j = rowLen; i < j; i++) {
      rowArr.push(<Row key={i}>{this.getColItem(items, getFieldDecorator, i, loading)}</Row>);
    }
    const count = this.colLength - ((items.length % this.colLength) + 1);
    for (let k = 0; k < count; k++) {
      rowArr[rowLen - 1].props.children.push(
        <Col key={k + 10} xl={{ span: 6, offset: 0 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
      );
    }
    // console.log("row循环了",rowArr[rowLen-1])

    // console.log("this is the end")
    rowArr[rowLen - 1].props.children.push(
      <Col key="-1" xl={{ span: 6, offset: 0 }}>
        <FormItem style={{ paddingRight: '24px' }}>
          <Button
            type="default"
            htmlType="button"
            style={{ float: 'right' }}
            onClick={this.handleReset}
          >
            重置
          </Button>
          <Button
            loading={loading}
            type="primary"
            style={{ marginRight: '10px', float: 'right' }}
            htmlType="submit"
          >
            查询
          </Button>
        </FormItem>
      </Col>
    );

    // console.log("zouzouzozuozu",rowArr)
    return rowArr;
  }

  // 为每行里边塞Col
  getColItem(items, getFieldDecorator, start, loading) {
    // console.log("load",items)

    const colArr = [];

    const _this = this;

    // 从items数组第几个元素开始循环
    const _start = start * this.colLength;

    // 剩余几个对象没有遍历渲染
    const _surplus = items.length - _start;

    let len;
    // 如果剩下的小于3 长度直接登录items的长度
    if (_surplus < this.colLength) {
      len = items.length;
    } else {
      // 如果剩下的大于3，那么长度等于开始索引加3
      len = _start + this.colLength;
    }

    for (let i = _start, j = len; i < j; i++) {
      const index = i;
      const value = items[i];
      let _type = value.type;

      let _options;
      if (value.hasOwnProperty('options')) {
        _options = value.options;
      } else if (_type === 'RangePicker') {
        //
      } else {
        _type = 'Input';
      }
      let _rulesType = 'number';

      if (_type === 'Input' || _type === 'AutoComplete') {
        _rulesType = 'string';
      } else if (_type === 'RangePicker') {
        _rulesType = 'array';
      }

      const screenWidth = window.screen.width;
      const className = screenWidth > 1440 ? styles.labelItem : '';
      colArr.push(
        <Col
          style={{ height: 48 }}
          key={index}
          xl={{ span: 6 }}
          lg={{ span: 8 }}
          md={{ span: 12 }}
          sm={24}
        >
          <FormItem
            label={value.label}
            className={className}
            style={{ paddingLeft: '24px', paddingRight: '24px' }}
          >
            {getFieldDecorator(value.parameter, {
              rules: [
                {
                  required: value.required,
                  message: value.placeholder,
                  pattern: value.pattern ? value.pattern : '',
                  type: _rulesType,
                },
              ],
              initialValue: value.initialValue,
            })(_this.switchItem(_type, value.placeholder, _options))}
          </FormItem>
        </Col>
      );
    }

    return colArr;
  }

  // 如果是Select需要传入options
  switchItem(which, placeholder, options) {
    const _this = this;
    switch (which) {
      case 'Input':
        return <Input placeholder={placeholder} />;
      case 'Select':
        return (
          <Select placeholder={placeholder} style={{ width: '100%' }}>
            {_this.getOption(options)}
          </Select>
        );
      case 'RangePicker':
        return (
          <RangePicker
            style={{ width: '100%' }}
            placeholder={placeholder || ['开始时间', '结束时间']}
          />
        );
      case 'AutoComplete':
        return (
          <AutoComplete
            placeholder={placeholder}
            dataSource={options}
            filterOption={(inputValue, option) =>
              option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
          />
        );
      default:
        return <Input placeholder={placeholder} />;
    }
  }

  getOption(data, flag) {
    if (!data) {
      return;
    }
    if (flag === 'auto') {
      return data.map((value, index) => <Option key={index}>{value.value}</Option>);
    }
    return data.map((value, index) => (
      <Option key={index} value={value.key}>
        {value.value}
      </Option>
    ));
  }

  // 重置输入框内容
  handleReset = () => {
    this.props.form.resetFields();
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  // 提交
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      this.props.onSubmit(err, fieldsValue);
    });
  };

  render() {
    const { items, form, loading } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Form onSubmit={this.handleSubmit} layout="horizontal" hideRequiredMark className={styles.tableListForm}>
        {this.getChildren(items, getFieldDecorator, loading)}

        {this.props.children}
      </Form>
    );
  }
}

export default Search;
