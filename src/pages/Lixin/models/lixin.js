/**
 * Created by lixin on 2019-03-14
 */
import { getLizi } from '@/services/lixin';
import { getData } from '../../../data/Lixin/lixin';

export default {
  namespace: 'lixin',

  state: {
    loading: false,
    liziData: {},
  },

  effects: {
    * fetch({ payload }, { call, put }) {
      const response = yield call(getLizi, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        liziData: getData(payload),
      };
    },

  },
};
