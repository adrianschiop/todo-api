// @Feedback: It would be great to have an intermediary layer between GrqphQL and the ORM, so the GraphQL layer does
// not need to work with ORM directly. Some kind of repository layer for example. For a small app like this of course
// it's not necessary.
const todoResolvers = {
  Query: {
    listTodos: (root, { isCompleted = null, limit }, { models: { Todo }, authScope }) => {
      // @Feedback: Why `let` over `const` in this case?
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
          // @Feedback: Thumbs up for this extra condition 👍
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
