import { UserManager } from 'oidc-client';

import { HttpClient, HttpRequest } from '@/data/protocols/http';

export class AuthorizeHttpClientDecorator {
  constructor(
    private readonly userManager: UserManager,
    private readonly httpGetClient: HttpClient,
  ) {}

  async request(data: HttpRequest) {
    const user = await this.userManager.getUser();

    if (user?.access_token) {
      data = {
        ...data,
        headers: {
          ...(data.headers ?? {}),
          Authorization: `Bearer ${user.access_token}`,
        },
      };
    }

    const httpResponse = await this.httpGetClient.request(data);

    return httpResponse;
  }
}
