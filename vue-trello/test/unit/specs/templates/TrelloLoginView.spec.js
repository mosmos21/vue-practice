import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import TrelloLoginView from '@/components/templates/TrelloLoginView'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('TrelloLoginView', () => {
  let actions
  let $router
  let store
  let LoginFormComponentStub

  const triggerLogin = (loginView, target) => {
    const loginForm = loginView.find(target)
    loginForm.vm.onlogin('vue@example.com', 'xxx')
  }

  beforeEach(() => {
    LoginFormComponentStub = {
      name: 'TrelloLoginForm',
      props: ['onlogin'],
      render: h => h('p', ['login form'])
    }
    $router = {
      push: sinon.spy()
    }
    actions = {
      login: sinon.stub()
    }
    store = new Vuex.Store({
      store: {},
      actions
    })
  })

  describe('ログイン', () => {
    let loginView

    describe('成功', () => {
      beforeEach(() => {
        loginView = mount(TrelloLoginView, {
          mocks: { $router },
          stubs: {
            'trellog-login-form': LoginFormComponentStub
          },
          store,
          localVue
        })
      })

      it('ボードページのルートにリダイレクトるする', done => {
        actions.login.resolve()
        triggerLogin(loginView, LoginFormComponentStub)
        loginView.vm.$nextTick(() => {
          expect($router.push.called).to.equal(true)
          expect($router.push.args[0][0].push).to.equal('/')
          done()
        })
      })
    })

    describe('失敗', () => {
      beforeEach(() => {
        loginView = mount(TrelloLoginView, {
          stubs: {
            'trello-login-form': LoginFormComponentStub
          },
          store,
          localVue
        })
        sinon.spy(loginView.vm, 'throwReject')
      })

      afterEach(() => {
        loginView.vm.throwReject.restore()
      })

      it('エラー処理が呼び出される', done => {
        const message = 'login failed'
        actions.login.reject(new Error(message))
        triggerLogin(loginView, LoginFormComponentStub)

        loginView.vm.$nextTick(() => {
          const callInfo = loginView.vm.throwReject
          expect(callInfo.called).to.equal(true)
          expect(callInfo.args[0][0].message).to.equal(message)
          done()
        })
      })
    })
  })
})
