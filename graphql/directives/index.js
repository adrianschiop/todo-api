/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import { SchemaDirectiveVisitor, AuthenticationError } from 'apollo-server-express';

export class AuthenticatedDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const next = field.resolve;

    field.resolve = (source, args, context, info) => {
      if (!context || !context.authScope || !context.authScope.user) {
        throw new AuthenticationError('Unauthorized!');
      }

      return next(source, args, context, info);
    };
  }
}
