import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

const App = {
  name: 'App',
  render: h => h('router-view')
}

const Top = {
  name: 'top',
  render: h => h('p', ['top'])
}

const Login = {
  name: 'top',
  render: h => h('p', ['login'])
}

const mockAuthorizeToken = store => {
  const injector = require('inject-loader!@/router/guards')
  const storeMock = injector({
    '../store': store
  })
  return storeMock.authorizeToken
}

const setup = state => {
  const store = new Vuex.Store({ state })
  const router = new VueRouter({
    routes: [{
      path: '/',
      component: Top,
      meta: { requireAuth: true }
    }, {
      path: '/login',
      component: Login
    }]
  })
  router.beforeEach(mockAuthorizeToken(store))
  return mount(App, {
    localVue,
    store,
    router
  })
}

const localVue = createLocalVue()

localVue.use(VueRouter)
localVue.use(Vuex)

describe('beforeEach ガードフック', () => {
  describe('認証トークンあり', () => {
    it('そのまま解決する', () => {
      const app = setup({
        auth: {
          token: 'xxxxxxxx',
          userid: 1
        }
      })
      expect(app.text()).to.equal('top')
    })
  })

  describe('認証トークンなし', () => {
    it('Loginにリダイレクトする', () => {
      const app = setup({})
      expect(app.text()).to.equal('login')
    })
  })
})
