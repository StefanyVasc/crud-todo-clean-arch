import { HttpClient } from "@/data/protocols/http";
import { ApiAddTodo } from "@/data/usecases";
import {
  makeApplicationBaseUrl,
  makeAxiosHttpClient,
} from "@/main/factories/http";

export const makeApiAddTodoFactory = (): ApiAddTodo => {
  const httpClient: HttpClient = makeAxiosHttpClient();

  return new ApiAddTodo(makeApplicationBaseUrl("/api/todos/new"), httpClient);
};
