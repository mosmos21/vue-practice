module.exports = {
  'ログイン': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#app', 1000)
      // .setValue('input#email', 'vue@example.com')
      // .setValue('input#password', 'xxxx')
      .waitForElementPresent('form > .form-actions > button', 1000)
      .click('form > .form-actions > button')
      .waitForElementPresent('#app > p', 1000)
      .assert.urlEquals('http://localhost:8081/#/')
      .end()
  }
}