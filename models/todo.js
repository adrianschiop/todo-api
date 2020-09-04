module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    UserId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    completed: DataTypes.BOOLEAN,
  }, {});

  Todo.associate = function (models) {
    // associations
    Todo.belongsTo(models.User);
  };

  return Todo;
};
