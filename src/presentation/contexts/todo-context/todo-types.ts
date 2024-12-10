import { ActionsTodo } from "@/domain/enums/actions-todo.enum";
import { Todo } from "@/domain/models";

export type TodoState = {
  todos: Todo[];
  loading: boolean;
  error: string | null;
};

export type TodoAction =
  | {
      type: ActionsTodo.LOAD_TODOS;
      todos: {
        results: Todo[];
      };
    }
  | {
      type: ActionsTodo.ADD_TODO;
      todo: {
        result: Todo;
        statusCode: number;
        success: boolean;
      };
    }
  | { type: ActionsTodo.REMOVE_TODO; id: string }
  | {
      type: ActionsTodo.UPDATE_TODO;
      todo: {
        result: Todo;
        message: string;
        statusCode: number;
      };
    }
  | { type: ActionsTodo.TOGGLE_TODO; todo: { id: string; completed: boolean } }
  | { type: ActionsTodo.SET_LOADING; loading: boolean }
  | { type: ActionsTodo.SET_ERROR; error: string };
