var userDetail = {
  template: '#user-detail',
  data: function () {
    return {
      loading: false,
      error: null,
      user: null
    };
  },
  methods: {
    fetchData: function () {
      this.loading = true;
      Api.getUser(this.$route.params.userId, (function (err, user) {
        if (err) {
          this.error = err;
        } else {
          this.user = user;
        }
        this.loading = false;
      }).bind(this));
    }
  },
  created: function () {
    this.fetchData();
  },
  watch: {
    '$route': 'fetchData'
  }
}