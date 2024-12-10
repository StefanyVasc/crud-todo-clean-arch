export interface DeleteTodo {
  delete: (params: DeleteTodo.Params) => Promise<void>;
}

export namespace DeleteTodo {
  export type ErrorMessage = {
    type: string;
    message: string;
  };

  export type Params = {
    id: string;
  };
}
