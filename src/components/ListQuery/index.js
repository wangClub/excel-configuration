import React, { Component, Fragment } from 'react';
import { Card, Table, Row, Pagination, Alert, Col } from 'antd';
import Search from '../Search/index';
import JumpLink from '@/components/Button/JumpLink';
import styles from './index.less';

/**
 *
 * loading            | boolean | 加载loading
 * request            | string  | 请求地址
 * tableData          | object  |
 *    |- pageNo       | number  | 当前第几页
 *    |- total        | number  | 总共多少条数据
 *    |- dataSource   | array   | antd组件Table的 dataSource 数据格式（必传）
 *    |- pageTotal    | number  | 总共多少页
 *
 * buttonGroup        | ReactNode/object | 搜索栏下边的按钮，可以是对象，可以使react组件
 *    |- linkName     | string  | 按钮名字
 *    |- linkType     | string  | 按钮类型
 *    |- link         | string  | 按钮跳转链接
 *    |- onClick      | function| 如果按钮不是跳转功能，自定义方法
 *
 * items              | array   | 数组对象，搜索生成页面的对象  具体参考Search组件说明
 * columns            | array   | antd组件Table的 columns 数据格式（必传）
 * bordered           | boolean | Card 是否显示边框 false表示不显示边框，不传或者传true 显示边框
 * scroll             | number  | 滚动
 * rowSelection       | object  | 选择列表数据
 *
 * parameter          | object  | 扩展参数，提交搜索时候需要额外加的
 * pageSize           | number  | 每页显示几条，可不传，默认10条
 * alertMessage       |         | Alert 组件需要的
 * */

export default class ListQuery extends Component {
  constructor(props) {
    super(props);
    this.submitData = null;
  }

  componentDidMount() {

    this._getListData();
  }

  componentWillUnmount() {

  }

  _getListData(params) {
    const { dispatch, request, parameter } = this.props;
    const _params = {
      ...params,
      pageNo: params && params.pageNo ? params.pageNo : 1,
      pageSize: 10,
      ...parameter,
    };
    this.submitData = _params;
    dispatch({
      type: request,
      payload: _params,
    });
  }

  // 重置列表
  onReset = () => {
    this.submitData = null;
    this._getListData();
  };

  // 搜索提交查询
  onSubmit = (err, value) => {

    if (err) {
      return false;
    }

    const _params = {
      ...value,
    };
    this._getListData(_params);
  };

  // 翻页
  pagination = (pageNum) => {
    const params = {
      ...this.submitData,
      pageNo: pageNum,
    };
    this._getListData(params);
  };

  render() {
    const {
      loading,
      items,
      total,
      columns,
      bordered,
      scroll,
      rowSelection,
      alertMessage,
      pageSize,
      isPagination,
      bodyStyle,
      buttonGroup,
      tableData,
    } = this.props;

    return (
      <Card bordered={bordered} style={{ minHeight: 600 }} bodyStyle={bodyStyle}>
        {items ? (
          <Search items={items} loading={loading} onSubmit={this.onSubmit} onReset={this.onReset}/>
        ) : (
          <Fragment/>
        )}

        <div className={styles.btnBox}>

          {
            buttonGroup && buttonGroup.linkName ? (
              <JumpLink style={styles.jumpBtn}
                        type={buttonGroup.linkType || 'primary'}
                        onClick={buttonGroup.onClick}
                        name={buttonGroup.linkName || '+ 新建'}
                        link={buttonGroup.link}
              />
            ) : <Fragment/>
          }

          {
            buttonGroup && !buttonGroup.linkName ? buttonGroup : <Fragment/>
          }
          {
            buttonGroup && !buttonGroup.linkName ? <div className={styles.jumpBtn}></div> : <Fragment/>
          }
        </div>

        {alertMessage ? (
          <Alert className={styles.alert} message={alertMessage} type="info" showIcon/>
        ) : <Fragment/>}

        <Table loading={loading}
               columns={columns}
               dataSource={tableData && tableData.dataSource ? tableData.dataSource : []}
               size="middle"
               className={styles.businessTable}
               rowSelection={rowSelection || null}
               scroll={scroll ? { x: scroll } : {}}
               pagination={false}
        />

        {tableData && tableData.total && tableData.pageTotal && tableData.pageNo ? (
          <Row type='flex' className={styles.paginationBox}>
            {
              !isPagination ? (
                <Fragment>
                  <Col span={6}>{`共${tableData.total} 条记录 第 ${tableData.pageNo} / ${tableData.pageTotal} 页`}</Col>
                  <Col span={18}>
                    <Pagination
                      style={{ float: 'right' }}
                      showQuickJumper
                      current={tableData.pageNo}
                      total={tableData.total}
                      onChange={this.pagination}
                      pageSize={pageSize || 10}
                    />
                  </Col>
                </Fragment>
              ) : (
                <Col span={6}>{`共${total} 条记录`}</Col>
              )
            }

          </Row>
        ) : (
          <Fragment/>
        )}
      </Card>
    );
  }
}
