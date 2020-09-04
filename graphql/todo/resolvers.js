//TODO: Find a cleaner way to check access !!!

const todoResolvers = {
  Query: {
    listTodos: (root, { limit }, { models: { Todo }, checkAccess, authScope }) => {
      checkAccess(authScope);

      return Todo.findAll({ where: { userId: authScope.user.id }, order: [['id', 'DESC']], limit });
    }
  },
  Mutation: {
    createTodo: (root, { title }, { models: { Todo }, checkAccess, authScope }) => {
      checkAccess(authScope);

      return Todo.create({ title, userId: authScope.user.id });
    },

    updateTodo: (root, { id, isCompleted }, { models: { Todo }, checkAccess, authScope }) => {
      checkAccess(authScope);

      return Todo.update({
        completed: isCompleted
      }, {
        where: {
          id,
          userId: authScope.user.id
        }
      });
    },

    deleteTodo: (root, { id }, { models: { Todo }, checkAccess, authScope }) => {
      checkAccess(authScope);

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
