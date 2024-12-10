import { HttpClient } from "@/data/protocols/http";
import { ApiUpdateTodo } from "@/data/usecases";

import {
  makeApplicationBaseUrl,
  makeAxiosHttpClient,
} from "@/main/factories/http";

export const makeApiUpdateTodoFactory = (id: string): ApiUpdateTodo => {
  const httpClient: HttpClient = makeAxiosHttpClient();

  return new ApiUpdateTodo(
    makeApplicationBaseUrl(`/api/todos/${id}`),
    httpClient
  );
};
