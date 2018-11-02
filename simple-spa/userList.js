var userList = {
  template: '#user-list',
  data: function () {
    return {
      loading: false,
      error: null,
      users: []
    }
  },
  methods: {
    fetchData: function () {
      this.loading = true;
      Api.getUsers((function (err, users) {
        if (err) {
          this.error = err;
        } else {
          this.users = users;
        }
        this.loading = false;
      }).bind(this));
    },
  },
  created: function () {
    this.fetchData();
  },
  watch: {
    '$route': 'fetchData'
  }
}