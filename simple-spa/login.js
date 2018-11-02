var login = {
  template: '#login',
  data: function () {
    return {
      email: 'vue@example.com',
      pass: '',
      error: false
    }
  },
  methods: {
    login: function () {
      Auth.login(this.email, this.pass, (function (isLoggedIn) {
        if (isLoggedIn) {
          this.$router.replace(this.$route.query.redirect || '/');
        } else {
          this.error = true;
        }
      }).bind(this));
    }
  }
};