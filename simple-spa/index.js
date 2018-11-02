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
      path: '/users/new',
      component: createUser,
      beforeEnter: function (to, from, next) {
        console.log('test');
        if (Auth.isLoggedIn()) {
          next();
        } else {
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          });
        }
      }
    },
    {
      path: '/users/:userId',
      component: userDetail
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/logout',
      beforeEnter: function (to, from, next) {
        Auth.logout();
        next('/login');
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});

var vm = new Vue({
  el: '#app',
  router: router,
  data: {
    Auth: Auth
  }
});