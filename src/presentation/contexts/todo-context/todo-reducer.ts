import { ActionsTodo } from "@/domain/enums/actions-todo.enum";
import { TodoState, TodoAction } from "./todo-types";

export const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

export const todoReducer = (
  state: TodoState,
  action: TodoAction
): TodoState => {
  switch (action.type) {
    case ActionsTodo.LOAD_TODOS:
      return {
        ...state,
        todos: [
          ...state.todos,
          ...action.todos.results.filter(
            (newTodo) => !state.todos.some((todo) => todo.id === newTodo.id)
          ),
        ],
      };

    case ActionsTodo.ADD_TODO:
      return { ...state, todos: [...state.todos, action.todo.result] };

    case ActionsTodo.REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };

    case ActionsTodo.UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.todo.result.id
            ? { ...todo, ...action.todo.result }
            : todo
        ),
      };

    case ActionsTodo.TOGGLE_TODO: {
      const { id, completed } = action.todo;
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !completed } : todo
        ),
      };
    }

    case ActionsTodo.SET_LOADING:
      return { ...state, loading: action.loading };

    case ActionsTodo.SET_ERROR:
      return { ...state, error: action.error };

    default:
      return state;
  }
};
