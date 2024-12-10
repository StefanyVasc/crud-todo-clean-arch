import { Todo } from "@/domain/models";

export interface UpdateTodo {
  update: (params: UpdateTodo.Params) => Promise<UpdateTodo.Model>;
}

export namespace UpdateTodo {
  export type Params = {
    id: string;
    title: string;
    completed: boolean;
  };

  export type Model = {
    result: Todo;
    message: string;
    statusCode: number;
  };
}
