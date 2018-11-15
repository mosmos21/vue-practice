import * as types from './mutation-types'

export default {
  [types.AUTH_LOGIN](state, payload) {
    state.auth = payload
  },

  [types.FETCH_ALL_TASKLIST](state, payload) {
    throw new Error('[FETCH_ALL_TASKLIST] not supported yet.')
  },

  [types.ADD_TASK](state, payload) {
    throw new Error('[ADD_TASK] not supported yet.')
  },

  [types.UPDATE_TASK](state, payload) {
    throw new Error('[UPDATE_TASK] not supported yet.')
  },

  [types.REMOVE_TASK](state, payload) {
    throw new Error('[REMOVE_TASK] not supported yet.')
  },

  [types.AUTH_LOGOUT](state) {
    throw new Error('[AUTH_LOGOUT] not supported yet.')
  }
}
