import mutations from '@/store.mutations'

describe('AUTH_LOGINミューテーション', () => {
  it('ミューテーションのペイロード値が状態authに設定されている', () => {
    const state = {}
    const token = 'xxxxxxxx'
    const userId = '1'

    mutations.AUTH_LOGIN(state, { token, userId })
    expect(state.auth.token).to.equal(token)
    expect(state.auth.userId).to.equal(userId)
  })
})
