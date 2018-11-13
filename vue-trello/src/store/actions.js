/* eslint-disable no-unused-vars */
import * as type from './mutation-types'
import { Auth, List, Task } from '../api'
/* eslint-enabled no-unused-vars */

export default {
  login: ({ commit }, authInfo) => {
    return Auth.login(authInfo)
      .then(({ token, userId }) => {
        commit(type.AUTH_LOGIN, { token, userId })
      })
      .catch(err => { throw err })
  },

  fetchLists: ({ commit }) => {
    throw new Error('[fetchLists] not supported yet.')
  },

  addTask: ({ commit }) => {
    throw new Error('[addTask] not supported yet.')
  },

  upateTask: ({ commit }) => {
    throw new Error('[updateTask] not supported yet.')
  },

  removeTask: ({ commit }) => {
    throw new Error('[removeTask] not supported yet.')
  },

  logout: ({ commit }) => {
    throw new Error('[logout] not supported yet.')
  }
}
