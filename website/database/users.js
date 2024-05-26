const records = [
  {
      id: 1,
      username: 'user',
      password: '123',
      displayName: 'demo user',
      emails: [ {value: 'user@mail.ru'} ],
      data: []
  }, 
  {
      id: 2,
      username: 'oleg',
      password: 'qwerty',
      displayName: 'olegGgG',
      emails: [ {value: 'oleg@mail.ru'} ],
      data: []
  }
];

const findById = function(id, cb) {
  process.nextTick(function () {
      const idx = id - 1;
      if (records[idx]) {
          cb(null, records[idx]);
      } else {
          cb(new Error('User ' + id + ' not exist'));
      };
  });
};

const findByUsername = function(username, cb) {
  process.nextTick(function () {
      for (let i = 0; i < records.length; i++) {
          const record = records[i];
          if (record.username === username) {
              return cb(null, record);
          };
      };
      return cb(null, null);
  });
};

const verifyPassword = (user, password) => {
  return user.password === password;
};

module.exports = { records, findById, findByUsername, verifyPassword };