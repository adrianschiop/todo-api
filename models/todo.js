module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    completed: DataTypes.BOOLEAN
  }, {
    tableName: 'Todos'
  });

  Todo.associate = function (models) {
    // associations
    Todo.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id' });
  };

  return Todo;
};
