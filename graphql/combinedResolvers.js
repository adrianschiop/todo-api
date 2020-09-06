import customScalars from './scalars';
import userResolvers from './user/resolvers';
import todoResolvers from './todo/resolvers';

const combinedResolvers = [customScalars, userResolvers, todoResolvers];

export default combinedResolvers;
