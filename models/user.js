module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    tableName: 'Users',
  });

  User.associate = function associate(models) {
    // associations
    User.hasMany(models.Todo, { foreignKey: 'userId' });
  };

  return User;
};
