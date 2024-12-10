import { Todo } from "@/domain/models";

export interface AddTodo {
  create: (params: AddTodo.Params) => Promise<AddTodo.Model>;
}

export namespace AddTodo {
  export type Params = Todo;

  export type Model = {
    result: Todo;
    statusCode: number;
    success: boolean;
  };
}
