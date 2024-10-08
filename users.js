// src/users.js
let users = [
  { id: 1, username: 'admin', password: 'password', roles: ['SuperAdmin'] },
  { id: 2, username: 'user1', password: 'user1pass', roles: ['User'] },
];

function findUser(username, password) {
  return users.find(user => user.username === username && user.password === password);
}

module.exports = { findUser };
