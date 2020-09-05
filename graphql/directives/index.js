import { SchemaDirectiveVisitor, AuthenticationError } from 'apollo-server-express';

// @Feedback: I think it would be more optimal to use `index.js` files only for imports/exports as you do in some
// of the files. AuthenticatedDirective could have it's own file: authenticatedDirective.js.
export class AuthenticatedDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const next = field.resolve;

    field.resolve = (source, args, context, info) => {
      if (!context || !context.authScope || !context.authScope.user)
        throw new AuthenticationError('Unauthorized!');

      return next(source, args, context, info);
    };
  }
}