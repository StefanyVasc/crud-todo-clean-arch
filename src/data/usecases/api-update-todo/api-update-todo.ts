import { HttpClient, HttpStatusCode } from "@/data/protocols/http";
import { UpdateTodoEnum } from "@/domain/enums";
import { UnexpectedError } from "@/domain/errors";
import { Todo } from "@/domain/models";
import { UpdateTodo } from "@/domain/usecases";

export class ApiUpdateTodo implements UpdateTodo {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<ApiUpdateTodo.Model>
  ) {}

  async update(params: UpdateTodo.Params): Promise<UpdateTodo.Model> {
    const body = {
      ...params,
    };

    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "PUT",
      body,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.noContent:
      case HttpStatusCode.ok:
        return {
          result: httpResponse.body as unknown as Todo,
          statusCode: httpResponse.statusCode,
          message: UpdateTodoEnum.SUCCESS,
        };
      case HttpStatusCode.badRequest:
        return {
          result: { id: "", title: "", completed: false },
          statusCode: httpResponse.statusCode,
          message: UpdateTodoEnum.ERROR,
        };
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace ApiUpdateTodo {
  export type Model = UpdateTodo.Model;
}
