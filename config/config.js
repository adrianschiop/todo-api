module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME || 'todo',
    password: process.env.DATABASE_PASSWORD || 'todo',
    database: process.env.DATABASE_NAME || 'todoapp',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
  },
  production: {
    username: process.env.DATABASE_USERNAME || 'todo',
    password: process.env.DATABASE_PASSWORD || 'todo',
    database: process.env.DATABASE_NAME || 'todoapp',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
  },
};
