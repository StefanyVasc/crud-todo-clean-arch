import { UnexpectedError } from "@/domain/errors";
import { HttpClient, HttpStatusCode } from "@/data/protocols/http";
import { LoadTodosList } from "@/domain/usecases";

export class ApiLoadTodosList implements LoadTodosList {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<ApiLoadTodosList.Model>
  ) {}

  async loadAll(): Promise<LoadTodosList.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "GET",
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        if (httpResponse.body) {
          return {
            results: httpResponse.body.results,
          };
        }
      case HttpStatusCode.notModified:
        return {
          results: httpResponse.body?.results || [],
        };

      case HttpStatusCode.noContent:
        return {
          results: [],
        };
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace ApiLoadTodosList {
  export type Model = LoadTodosList.Model;
}
