/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import config from '../config';

const basename = path.basename(__filename);
const db = {};

// Instantiate sequelize with name of database, username and password
const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, config.db);

// Import models
fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);

    db[model.name] = model;
  });

// Add models associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
