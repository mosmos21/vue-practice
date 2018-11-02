var createUser = {
  template: '#create-user',
  data: function () {
    return {
      sending: false,
      user: this.defaultUser(),
      errors: [],
    };
  },
  methods: {
    defaultUser: function () {
      return {
        name: '',
        description: ''
      }
    },
    createUser: function () {
      this.errors = []
      if (this.user.name.trim() === '') {
        this.errors.push('User name is blank!');
      }
      if (this.user.description.trim() === '') {
        this.errors.push('Description is brank!');
      }
      if (0 < this.errors.length) {
        return;
      }
      Api.createUser(this.user, (function (err, user) {
        if (err) {
          this.errors.push(err);
        } else {
          this.errors = [];
          this.user = this.defaultUser();
          alert('User created!');
          this.$router.push('/users');
        }
      }).bind(this));
    }
  }
};