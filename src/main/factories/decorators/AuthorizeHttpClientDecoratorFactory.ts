import { UserManager } from 'oidc-client';

import { HttpClient } from '@/data/protocols/http';
import userManager from '@/infra/auth/user-manager';
import { AuthorizeHttpClientDecorator } from '@/main/decorators';
import { makeAxiosHttpClient } from '@/main/factories/http';

export const makeAuthorizeHttpClientDecorator = (): HttpClient => {
  return new AuthorizeHttpClientDecorator(
    userManager as UserManager,
    makeAxiosHttpClient(),
  );
};
