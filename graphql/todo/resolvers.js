const todoResolvers = {
  Query: {
    listTodos: (root, { limit }, { models: { Todo } }) => {
      return Todo.findAll({ order: [['id', 'DESC']], limit });
    }
  },
  Mutation: {
    createTodo: (root, { title }, { models: { Todo } }) => {
      return Todo.create({ title, UserId: 1 });
    },

    updateTodo: (root, { id, isCompleted }, { models: { Todo } }) => {
      return Todo.update({
        completed: isCompleted
      }, {
        where: {
          id
        }
      });
    },

    deleteTodo: (root, { id }, { models: { Todo } }) => {
      return Todo.destroy({
        where: {
          id
        }
      });
    }
  }
};

export default todoResolvers;
