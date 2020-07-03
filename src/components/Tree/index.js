/**
 * Created by lx on 2019/1/6.
 */
import React, {Component, Fragment} from 'react';
import {Tree} from 'antd';

const TreeNode = Tree.TreeNode;

class TreeList extends Component {

  _getTreeNode(data) {
    if (data) {
      return data.map((value) => {
        return <TreeNode title={value.name} key={value.nodeCode}>
          {
            value.children ? this._getTreeNode(value.children) : <Fragment/>
          }
        </TreeNode>
      })
    }

  }

  onCheck = (checkedKeys) => {

    if (this.props.onCheck) {
      this.props.onCheck(checkedKeys);
    }
  }

  render() {
    const {
      data,
      checkedKeys
    } = this.props;
    console.log('tree', checkedKeys);
    return (
      <div>
        {
          data ? <Tree checkable onCheck={this.onCheck} defaultExpandedKeys={checkedKeys} checkedKeys={checkedKeys}>
              {this._getTreeNode(data)}
            </Tree>
            : <center>loading tree</center>
        }
      </div>
    )
  }
}

export default TreeList;
