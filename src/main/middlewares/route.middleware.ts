import { browserHistory } from 'react-router';

import store from '@/infra/store';

export const middlewareRoutes = (
  permissions: string[],
  redirectRoute: string,
): boolean => {
  const userPermissions: string[] | undefined =
    store?.getState()?.auth?.userinfo?.permissoes;

  if (
    !userPermissions ||
    userPermissions?.length === 0 ||
    permissions?.length === 0
  ) {
    browserHistory.push(redirectRoute);
    return false;
  }

  if (
    userPermissions &&
    permissions.some(permission => userPermissions.indexOf(permission) >= 0)
  ) {
    return true;
  }

  browserHistory.push(redirectRoute);
  return false;
};
