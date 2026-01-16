const bcrypt = require('bcrypt');
const { readJson, writeJson } = require('../utils/storage');

const USERS_FILE = 'users.json';

const loadUsers = () => readJson(USERS_FILE, []);

const saveUsers = (users) => writeJson(USERS_FILE, users);

const sanitizeUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt,
});

const findUserByEmail = (email) => loadUsers().find((user) => user.email === email);

const verifyPassword = (user, password) => bcrypt.compare(password, user.passwordHash);

const createUser = async ({ name, email, password, role }) => {
  const users = loadUsers();
  if (users.find((user) => user.email === email)) {
    throw new Error('El email ya existe');
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = {
    id: `usr-${Date.now()}`,
    name,
    email,
    role,
    passwordHash,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  saveUsers(users);
  return sanitizeUser(newUser);
};

const ensureAdminUser = async () => {
  const users = loadUsers();
  if (users.some((user) => user.role === 'admin')) {
    return null;
  }
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    return null;
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const adminUser = {
    id: `usr-${Date.now()}`,
    name: 'Administrador',
    email,
    role: 'admin',
    passwordHash,
    createdAt: new Date().toISOString(),
  };
  users.push(adminUser);
  saveUsers(users);
  return sanitizeUser(adminUser);
};

const updateUserRole = (id, role) => {
  const users = loadUsers();
  const user = users.find((item) => item.id === id);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  user.role = role;
  saveUsers(users);
  return sanitizeUser(user);
};

module.exports = {
  loadUsers,
  saveUsers,
  sanitizeUser,
  findUserByEmail,
  verifyPassword,
  createUser,
  ensureAdminUser,
  updateUserRole,
};
