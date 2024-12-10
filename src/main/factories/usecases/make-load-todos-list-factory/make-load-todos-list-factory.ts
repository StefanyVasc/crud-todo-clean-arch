import { HttpClient } from "@/data/protocols/http";
import { ApiLoadTodosList } from "@/data/usecases";
import {
  makeApplicationBaseUrl,
  makeAxiosHttpClient,
} from "@/main/factories/http";

export const makeApiLoadTodosListFactory = (): ApiLoadTodosList => {
  const httpClient: HttpClient = makeAxiosHttpClient();

  return new ApiLoadTodosList(makeApplicationBaseUrl("/api/todos"), httpClient);
};
