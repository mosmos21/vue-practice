var users = [
  { id: 1, name: 'Alice', description: 'texttexttexttext' },
  { id: 2, name: 'Bob', description: 'texttexttexttext' }
]

var api = {
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
      console.log(arr);
      callback(null, arr && arr[0]);
    }, 1000);
  }
}