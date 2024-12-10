import { ActionsTodo } from "@/domain/enums/actions-todo.enum";
import { useTodoContext } from "@/presentation/hooks";

export const useToggleTodo = () => {
  const { state, dispatch } = useTodoContext();

  const handleToggleTodo = (id: string) => {
    const currentTodo = state.todos.find((todo) => todo.id === id);
    if (!currentTodo) return;

    const updatedTodo = { ...currentTodo, completed: !currentTodo.completed };

    console.log(updatedTodo);

    dispatch({
      type: ActionsTodo.TOGGLE_TODO,
      todo: updatedTodo,
    });
  };

  return {
    handleToggleTodo,
  };
};
