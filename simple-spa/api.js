var users = [
  { id: 1, name: 'Alice', description: 'texttexttexttext' },
  { id: 2, name: 'Bob', description: 'texttexttexttext' }
]

var Api = {
  getUsers: function (callback) {
    setTimeout(function () {
      callback(null, users);
    }, 1000);
  },
  getUser: function (userId, callback) {
    setTimeout(function () {
      var arr = users.filter(function (user) {
        return user.id === Number(userId);
      });
      callback(null, arr && arr[0]);
    }, 1000);
  },
  createUser: function (user, callback) {
    setTimeout(function () {
      user.id = users.length + 1;
      users.push(user);
      callback(null, user);
    }, 500);
  }
}

var Auth = {
  login: function (email, pass, callback) {
    setTimeout(function () {
      var res = email === 'vue@example.com' && pass === 'vue';
      if (res) {
        console.log('user logged in at ' + new Date());
        localStorage.token = Math.random().toString(36).substring(7);
      }
      if (callback) {
        callback(res);
      }
    }, 0);
  },
  logout: function () {
    console.log('user logout');
    delete localStorage.token;
  },
  isLoggedIn: function () {
    return !!localStorage.token;
  }
};