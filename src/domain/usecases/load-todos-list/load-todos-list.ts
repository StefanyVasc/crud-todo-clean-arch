import { Todo } from "@/domain/models";

export interface LoadTodosList {
  loadAll: () => Promise<LoadTodosList.Model | undefined>;
}

export namespace LoadTodosList {
  export type Model = {
    results: Todo[];
  };
}
