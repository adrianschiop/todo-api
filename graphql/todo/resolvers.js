const todoResolvers = {
  Query: {
    listTodos: (root, { isCompleted = null, limit }, { models: { Todo }, authScope }) => {
      let filters = {};

      if (isCompleted !== null)
        filters.completed = isCompleted;

      return Todo.findAll({ where: { ...filters, userId: authScope.user.id }, order: [['id', 'DESC']], limit });
    }
  },
  Mutation: {
    createTodo: (root, { title }, { models: { Todo }, authScope }) => {
      return Todo.create({ title, userId: authScope.user.id, completed: false });
    },

    updateTodo: (root, { id, isCompleted }, { models: { Todo }, authScope }) => {
      return Todo.update({
        completed: isCompleted
      }, {
        where: {
          id,
          userId: authScope.user.id
        }
      });
    },

    deleteTodo: (root, { id }, { models: { Todo }, authScope }) => {
      return Todo.destroy({
        where: {
          id,
          userId: authScope.user.id
        }
      });
    }
  }
};

export default todoResolvers;
