// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'es6-promise/auto'
import App from './App'
import ErrorBoudary from './ErrorBoundary'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.config.performance = true
Vue.component(ErrorBoudary.name, ErrorBoudary)

Vue.config.errorHandler = (err, vm, info) => {
  console.error('errorHandler err:', err)
  console.error('errorHandler vm: ', vm)
  console.error('errorHandler info: ', info)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
