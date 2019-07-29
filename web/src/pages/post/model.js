import modelExtend from 'dva-model-extend'
import api from 'api'
import { pathMatchRegexp } from 'utils'
import { pageModel } from 'utils/model'

const { queryPostList, productList } = api

export default modelExtend(pageModel, {
  namespace: 'post',

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/post', location.pathname)) {
          dispatch({
            type: 'query',
            payload: {
              status: 2,
              ...location.query,
            },
          })
        }
      })
    },
  },

  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(productList, payload)
      const { response } = data
      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: response.data.records,
            pagination: {
              current: Number(response.data.pagination.current) || 1,
              pageSize: Number(response.data.pagination.pageSize) || 10,
              total: response.data.pagination.total,
            },
          },
        })
      } else {
        throw data
      }
    },
  },
})
