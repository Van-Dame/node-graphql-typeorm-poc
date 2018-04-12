import { IDirectiveResolvers, DirectiveResolverFn } from 'graphql-tools';

const isAuthenticated: DirectiveResolverFn<any, any> = (next, source, args, context) => {
  if (context.user) {
    return next();
  }

  throw new Error('Unauthorized! You need to login to access this resource');
}

const hasRole: DirectiveResolverFn<any, any> = (next, source, { role }, context) => {
  const userRole = context.user.isAdmin ? 'Admin' : 'User';
  if (role === userRole) {
    return next();
  }

  throw new Error(`Must have role: ${role}, you have role: ${userRole}`);
}

const directiveResolvers: IDirectiveResolvers<any, any> = {
  isAuthenticated,
  hasRole
};

export default directiveResolvers;
