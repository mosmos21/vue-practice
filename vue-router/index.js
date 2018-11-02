var router = new VueRouter({
  routes: [
    {
      path: '/',
      component: {
        template: '#top'
      }
    },
    {
      path: '/mypage',
      component: {
        template: '#mypage'
      }
    },
    {
      path: '/about',
      component: {
        template: '#about'
      }
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: {
        template: '#detail',
        beforeRouteLeave: function (to, from, next) {
          alert('OK?');
          next();
        }
      },
      beforeEnter: function (to, from, next) {
        console.table(to.params);
        next();
      }
    }
  ]
});

router.beforeEach(function (from, to, next) {
  console.table({ from, to, next });
  next();
});

var vm = new Vue({
  el: '#app',
  router: router,
  data: {
    inputText: ''
  },
  methods: {
    moveToDetail: function () {
      var id = this.inputText;
      router.push({
        name: 'detail',
        params: {
          id: id
        }
      });
    }
  }
});