import { mount } from '@vue/test-utils'
import TrelloLoginForm from '@/components/molecules/TrelloLoginForm'

describe('TrelloLoginForm', () => {
  describe('プロパティ', () => {
    describe('validation', () => {
      let loginForm
      beforeEach(done => {
        loginForm = mount(TrelloLoginForm, {
          propsData: { onlogin: () => { } }
        })
        loginForm.vm.$nextTick(done)
      })

      describe('email', () => {
        describe('require', () => {
          describe('何も入力されていない', () => {
            it('validation.email.requiredがinvald', () => {
              loginForm.setData({ email: '' })
              expect(loginForm.vm.validation.email.required).to.equal(false)
            })
          })

          describe('入力されている', () => {
            it('validation.email.requiredがvalid', () => {
              loginForm.setData({ email: 'vue@example.com' })
              expect(loginForm.vm.validation.email.required).to.equal(true)
            })
          })

          describe('format', () => {
            describe('メールアドレス形式でない入力', () => {
              it('validation.email.formatがinvalid', () => {
                loginForm.setData({ email: 'vue' })
                expect(loginForm.vm.validation.email.format).to.equal(false)
              })
            })

            describe('メールアドレス形式', () => {
              it('validation.email.formatがvalid', () => {
                loginForm.setData({ email: 'vue@example.com' })
                expect(loginForm.vm.validation.email.format).to.equal(true)
              })
            })
          })
        })
      })

      describe('password', () => {
        describe('required', () => {
          describe('何も入力していない', () => {
            it('validation.password.requiredがinvalid', () => {
              loginForm.setData({ password: '' })
              expect(loginForm.vm.validation.password.required).to.equal(false)
            })
          })

          describe('入力されている', () => {
            it('validation.password.requiredがvalid', () => {
              loginForm.setData({ password: 'xxx' })
              expect(loginForm.vm.validation.password.required).to.equal(true)
            })
          })
        })
      })
    })
  })

  describe('valid', () => {
    let loginForm
    beforeEach(done => {
      loginForm = mount(TrelloLoginForm, {
        propsData: { onLogin: () => { } }
      })
      loginForm.vm.$nextTick(done)
    })

    describe('バリデーション全項目OK', () => {
      it('validになる', () => {
        loginForm.setData({
          email: 'vue@example.com',
          password: 'xxx'
        })
        expect(loginForm.vm.valid).to.equal(true)
      })
    })

    describe('バリデーションNGあり', () => {
      it('invalidになる', () => {
        loginForm.setData({
          email: 'vue@example.com',
          password: ''
        })
        expect(loginForm.vm.valid).to.equal(false)
      })
    })
  })

  describe('disableLoginAction', () => {
    let loginForm
    beforeEach(done => {
      loginForm = mount(TrelloLoginForm, {
        propsData: { onlogin: () => { } }
      })
      loginForm.vm.$nextTick(done)
    })

    describe('バリテーションNG項目あり', () => {
      it('ログイン処理無効', () => {
        loginForm.setData({
          email: 'vue@example.com',
          password: ''
        })
        expect(loginForm.vm.disableLoginAction).to.equal(true)
      })
    })

    describe('バリテーションOK & ログイン処理中でない', () => {
      it('ログイン処理有効', () => {
        loginForm.setData({
          email: 'vue@example.com',
          password: 'xxx'
        })
        expect(loginForm.vm.disableLoginAction).to.equal(false)
      })
    })

    describe('バリテーションOK & ログイン処理中', () => {
      it('ログイン処理無効', () => {
        loginForm.setData({
          email: 'vue@example.com',
          password: 'xxx',
          progress: true
        })
        expect(loginForm.vm.disableLoginAction).to.equal(true)
      })
    })
  })

  describe('onlogin', () => {
    let loginForm
    let onloginStub

    beforeEach(done => {
      onloginStub = sinon.stub()
      loginForm = mount(TrelloLoginForm, {
        propsData: { onlogin: onloginStub }
      })
      loginForm.setData({
        email: 'vue@example.com',
        password: 'xxx'
      })
      loginForm.vm.$nextTick(done)
    })

    describe('resolve', () => {
      it('resolveされる', done => {
        onloginStub.resolves()

        // click event
        loginForm.find('button').trigger('click')
        expect(onloginStub.called).to.equal(false)
        expect(loginForm.error).to.equal('')
        expect(loginForm.vm.disableLoginActionn).to.equal(true)

        // update state
        loginForm.vm.$nextTick(() => {
          expect(onloginStub.called).to.equal(true)
          const authInfo = onloginStub.args[0][0]
          expect(authInfo.email).to.equal(loginForm.vm.email)
          expect(authInfo.password).to.equal(loginForm.vm.password)
          loginForm.vm.$nextTick(() => {
            expect(loginForm.vm.error).to.equal('')
            expect(loginForm.vm.disableLoginAvtion).to.equal(false)
            done()
          })
        })
      })
    })

    describe('reject', () => {
      it('rejectされる', done => {
        onloginStub.rejects(new Error('login error!'))

        loginForm.find('button').trigger('click')
        expect(onloginStub.called).to.equal(false)
        expect(loginForm.vm.error).to.equal('')
        expect(loginForm.vm.disableLoginAction).to.equal(true)

        loginForm.vm.$nextTick(() => {
          expect(onloginStub.called).to.equal(true)
          const authInfo = onloginStub.args[0][0]
          expect(authInfo.email).to.equal(loginForm.vm.email)
          expect(authInfo.password).to.equal(loginForm.vm.password)
          loginForm.vm.$nextTick(() => {
            expect(loginForm.vm.error).to.equal('login error!')
            expect(loginForm.vm.disableLoginAvtion).to.equal(false)
            done()
          })
        })
      })
    })
  })
})
