import { faker } from "@faker-js/faker";

import {
  HttpClient,
  HttpMethod,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
} from "@/data/protocols/http";

export const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: faker.internet.httpMethod(),
  body: {
    name: faker.person.fullName(),
    jobTitle: faker.person.jobTitle(),
  },
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${faker.string.uuid()}`,
  },
});

export class HttpClientSpy<R = unknown> implements HttpClient<R> {
  url?: string;
  method?: HttpMethod;
  body?: unknown;
  headers?: unknown;
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok,
  };

  async request(data: HttpRequest): Promise<HttpResponse<R>> {
    this.url = data.url;
    this.method = data.method;
    this.body = data.body;
    this.headers = data.headers;

    return this.response;
  }
}
