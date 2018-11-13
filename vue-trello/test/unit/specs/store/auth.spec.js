import axios from 'axios'

const mockAuth = adapter => {
  const injector = require('inject-loader!@/api/auth')
  const clientMock = injector({
    './client': axios.create({ adapter })
  })
  return clientMock.default
}

describe('Auth API モジュール', () => {
  describe('login', () => {
    const token = 'xxxxxxxx'
    const userId = 1
    const address = 'vue@example.com'
    const password = 'xxx'

    describe('成功', () => {
      it('token, userIdが取得できること', done => {
        const adapter = config => {
          return new Promise((resolve, reject) => {
            resolve({ data: { token, userId }, state: 200 })
          })
        }

        const auth = mockAuth(adapter)
        auth.login({ address, password })
          .then(res => {
            expect(res.token).to.equal(token)
            expect(res.userId).to.equal(userId)
          })
          .then(done)
      })
    })

    describe('失敗', () => {
      it('エラーメッセージを取得できる', done => {
        const message = 'failed login'
        const adapter = config => {
          return new Promise((resolve, reject) => {
            const err = new Error(message)
            err.response = { data: { message }, state: 401 }
            reject(err)
          })
        }
        const auth = mockAuth(adapter)
        auth.login({ address, password })
          .catch(err => {
            expect(err.message).to.equal(message)
          })
          .then(done)
      })
    })
  })
})
