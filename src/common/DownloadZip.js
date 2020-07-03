import { message } from 'antd';

/**
 * Created by lixin on 2019-02-28
 *
 * url      | String    |  接口地址
 * params   | FormData  |  参数
 */

export const download = (url, params) => new Promise((resolve, reject) => {
  // 参数有问题直接抛出异常
  if (!url || !params) {
    reject();
  }
  const _tmpArr = Object.keys(params) || [];

  const _formData = new FormData();

  _tmpArr.map(value => {
    if (params[value] || params[value] === 0) {
      _formData.append(value, params[value])
    } 
  });

  let xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.responseType = 'blob';
  xhr.onload = function(e) {
    if (this.status === 200) {
      // 将blob对象转换成json对象，当不能下载接口返回的不是流的时候可以转换成功
      const reader = new FileReader();

      reader.onload = event => {
        try {
          const _data = JSON.parse(event.target.result);

          if (_data && _data.code) {
            if (_data.code !== '000000') {
              message.error(_data.msg);
              // 接口返回不能下载，返回失败，可以在失败中做某些未知的处理
              reject();
            }
          }
        } catch (error) {
          // 接口返回对象是blob，不能被转换成json，正常下载文件

          const blob = this.response;
          const filename = `${Date.now()}.zip`;

          if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, filename);
          } else {
            const a = document.createElement('a');
            const link = window.URL.createObjectURL(blob);
            a.href = link;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(link);
          }
        }
      };
      reader.readAsText(this.response);
    }
    resolve();
  };
  xhr.send(_formData);
});
