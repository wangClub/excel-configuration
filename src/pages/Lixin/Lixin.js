/**
 * Created by lixin on 2019-03-13
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Icon } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ListQuery from '@/components/ListQuery';
import { roleManageColumns } from './columns';
import { roleOptions } from '../../common/options';

const searchs = [{
  type: 'Input',
  label: '角色',
  required: true,
  placeholder: '请输入',
  parameter: 'name',
}, {
  type: 'Select',
  label: '角色1',
  required: false,
  parameter: 'name1',
  placeholder: '请选择',
  options: roleOptions,
  initialValue: 1,
}, {
  type: 'Input',
  label: '角色2',
  required: false,
  placeholder: '请输入',
  parameter: 'name2',
}, {
  type: 'Select',
  label: '角色3',
  required: false,
  parameter: 'name3',
  placeholder: '请选择',
  options: roleOptions,
}, {
  type: 'Select',
  label: '角色4',
  required: false,
  parameter: 'name4',
  placeholder: '请选择',
  options: roleOptions,
}, {
  type: 'RangePicker',
  label: '预计报告日期',
  required: false,
  placeholder: ['开始', '结束'],
  parameter: 'timer',
}];

@connect(({ lixin, loading }) => ({
  lixin,
  loading: loading.effects['lixin/fetch'],
}))
class Lixin extends Component {


  constructor(props) {
    super(props);
    this.columns = [
      ...roleManageColumns,
      {
        title: '操作',
        width: '8%',
        render: this.action,
      },
    ];
  }

  componentDidMount() {
  }



  render() {

    const { loading, lixin } = this.props;
    const { liziData } = lixin;
    const {
      pageNo,
      total,
      dataSource,
      pageTotal,
    } = liziData;

    const btnGroup = <div>
      <Button type="primary">Primary</Button>
      <Button>Default</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="danger">Danger</Button>
      <Icon type="info-circle-o"/>
    </div>;

    const _linkBtn = {
      linkName: '+ 添加',
      linkType: 'default',
      link: '/exception/403',
      onClick: ()=>alert('点我干嘛'),
    };
    return (
      <PageHeaderWrapper title='角色列表'>
        <GridContent>
          <ListQuery bordered={false}
                     loading={loading}
                     buttonGroup={btnGroup}
                     items={searchs}
                     columns={this.columns}
                     request='lixin/fetch'
                     parameter={{lixin:111}}
                     tableData={liziData}
                     pageSize={5}
                     {...this.props}
          />

        </GridContent>
      </PageHeaderWrapper>
    );
  }
}

export default Lixin;
