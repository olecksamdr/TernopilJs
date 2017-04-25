function repeat(operation, times) {
  if (times === 0) return;
  operation();
  return repeat(operation, --times);
}

function loadUsers(userIds, load, done) {
  let
    users = [],
    index = 0;

  repeat(() => {
    // save index in closure
    (function (index) {
      load(userIds[index], (user) => {
        users[index] = user;

        if (index === userIds.length - 1)
          done(users);
      });
    })(index++);
  }, userIds.length - 1);
}

module.exports = loadUsers;
