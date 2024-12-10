import { useCallback } from "react";
import { useTodoContext } from "@/presentation/hooks";
import { makeApiDeleteTodoFactory } from "@/main/factories/usecases";
import { ActionsTodo } from "@/domain/enums/actions-todo.enum";

export const useDeleteTodo = () => {
  const { dispatch } = useTodoContext();

  const handleDeleteTodo = useCallback(
    async (id: string) => {
      dispatch({ type: ActionsTodo.SET_LOADING, loading: true });

      try {
        const response = await makeApiDeleteTodoFactory(id).delete({ id });

        console.log("To-Do deletado com sucesso:", response);

        dispatch({ type: ActionsTodo.REMOVE_TODO, id });
      } catch (err: any) {
        console.error("Ocorreu um erro ao deletar o To-Do:", err.toString());
        dispatch({ type: ActionsTodo.SET_ERROR, error: err.toString() });
      } finally {
        dispatch({ type: ActionsTodo.SET_LOADING, loading: false });
      }
    },
    [dispatch]
  );

  return {
    handleDeleteTodo,
  };
};
