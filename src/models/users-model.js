const { v4: uuid } = require("uuid");
const bcrypt = require("bcrypt");

const users = [];

module.exports = {
  getAllUsers: () => users,
  getUserById: (id) => users.find((user) => user.id === id),
  getUserByEmail: (email) => users.find((user) => user.email === email),
  createUser: (name, email, password) => {
    const newUser = {
      id: uuid(),
      name,
      email,
      passwordHash: bcrypt.hashSync(password, 10),
    };
    users.push(newUser);
    return newUser;
  },
};
