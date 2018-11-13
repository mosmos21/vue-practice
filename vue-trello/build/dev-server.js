const bodyParser = require('body-parser');

module.exports = app => {
  app.use(bodyParser.json());

  const users = {
    'vue@example.com': {
      password: 'xxxx',
      userId: 1,
      token: 'xxxxxxxx'
    }
  }

  app.post('/auth/login', (req, res) => {
    const { email, password } = req.body
    const user = users[email]
    if (user) {
      if (user.password === password) {
        res.json({ userId: user.userId, token: user.token })
      } else {
        res.status(401).json({ message: 'ログインに失敗しました' })
      }
    } else {
      res.status(404).json({ message: 'ユーザが登録されていません' })
    }
  })
};