var router = new VueRouter({
  routes: [
    {
      path: '/',
      component: { template: '#top' }
    },
    {
      path: '/users',
      component: userList
    },
    {
      path: '/users/:userId',
      name: 'userDetail',
      component: userDetail
    }
  ]
});

var vm = new Vue({
  el: '#app',
  router: router,
});