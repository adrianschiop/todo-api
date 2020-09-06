const todoResolvers = {
  Query: {
    listTodos: (root, { isCompleted = null, limit }, { models: { Todo }, authScope }) => {
      const filters = {};

      if (isCompleted !== null) {
        filters.completed = isCompleted;
      }

      return Todo.findAll({ where: { ...filters, userId: authScope.user.id }, order: [['id', 'DESC']], limit });
    },
  },
  Mutation: {
    createTodo: (root, { title }, { models: { Todo }, authScope }) => Todo.create({ title, userId: authScope.user.id, completed: false }),

    updateTodo: (root, { id, isCompleted }, { models: { Todo }, authScope }) => Todo.update({
      completed: isCompleted,
    }, {
      where: {
        id,
        userId: authScope.user.id,
      },
    }).then(response => response[0]),

    deleteTodo: (root, { id }, { models: { Todo }, authScope }) => Todo.destroy({
      where: {
        id,
        userId: authScope.user.id,
      },
    }),
  },
};

export default todoResolvers;
