import { HttpClient } from "@/data/protocols/http";
import { ApiDeleteTodo } from "@/data/usecases";

import {
  makeApplicationBaseUrl,
  makeAxiosHttpClient,
} from "@/main/factories/http";

export const makeApiDeleteTodoFactory = (id: string): ApiDeleteTodo => {
  const httpClient: HttpClient = makeAxiosHttpClient();

  return new ApiDeleteTodo(
    makeApplicationBaseUrl(`/api/todos/${id}`),
    httpClient
  );
};
