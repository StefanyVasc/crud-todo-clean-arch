import {
  BadRequestError,
  NotFoundError,
  UnexpectedError,
} from "@/domain/errors";
import { HttpClient, HttpStatusCode } from "@/data/protocols/http";
import { DeleteTodo } from "@/domain/usecases";

export class ApiDeleteTodo implements DeleteTodo {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<ApiDeleteTodo.Model>
  ) {}

  async delete(params: DeleteTodo.Params): Promise<void> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "DELETE",
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        break;
      case HttpStatusCode.notFound:
        throw new NotFoundError("Recurso não encontrado.");
      case HttpStatusCode.badRequest: {
        if (httpResponse.body) {
          const { messages } = httpResponse.body;
          throw new BadRequestError(messages[0].message, messages[0].type);
        }
      }

      default:
        throw new UnexpectedError();
    }
  }
}

export namespace ApiDeleteTodo {
  export type ErrorMessage = {
    type: string;
    message: string;
  };

  export type Model = {
    success: boolean;
    messages: ErrorMessage[];
    statusCode: number;
  };
}
