import request from '@/utils/request';
/**
 * Created by lixin on 2019-03-14
 */


export async function getLizi(params) {
  return request('/api/get/lizi', {
    method: 'POST',
    body: params,
  });
}
