import { UnauthorizedError, UnexpectedError } from "@/domain/errors";
import { HttpClient, HttpStatusCode } from "@/data/protocols/http";
import { AddTodo } from "@/domain/usecases";

export class ApiAddTodo implements AddTodo {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<ApiAddTodo.Model | undefined>
  ) {}

  async create(params: AddTodo.Params): Promise<ApiAddTodo.Model> {
    const body = {
      ...params,
    };

    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "POST",
      body,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.created:
        if (!httpResponse.body) {
          throw new UnexpectedError();
        }

        return {
          result: httpResponse.body.result,
          statusCode: httpResponse.statusCode,
          success: httpResponse.body.success,
        };

      case HttpStatusCode.unauthorized:
        throw new UnauthorizedError();

      default:
        throw new UnexpectedError();
    }
  }
}

export namespace ApiAddTodo {
  export type Model = AddTodo.Model;
}
