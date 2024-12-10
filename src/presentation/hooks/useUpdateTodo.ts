import { useCallback } from "react";
import { makeApiUpdateTodoFactory } from "@/main/factories/usecases";
import { useTodoContext } from "@/presentation/hooks";
import { UpdateTodoEnum } from "@/domain/enums";
import { ActionsTodo } from "@/domain/enums/actions-todo.enum";

export const useUpdateTodo = () => {
  const { dispatch } = useTodoContext();

  const handleUpdateTodo = useCallback(
    async (data: { id: string; title: string; completed: boolean }) => {
      dispatch({ type: ActionsTodo.SET_LOADING, loading: true });

      try {
        const response = await makeApiUpdateTodoFactory(data.id).update(data);

        const updatedTodo = {
          result: response.result,
          message: UpdateTodoEnum.SUCCESS,
          statusCode: response.statusCode,
        };
        dispatch({ type: ActionsTodo.UPDATE_TODO, todo: updatedTodo });
      } catch (err: any) {
        console.error("Ocorreu um erro ao atualizar o To-Do:", err.toString());
        dispatch({ type: ActionsTodo.SET_ERROR, error: err.toString() });
      } finally {
        dispatch({ type: ActionsTodo.SET_LOADING, loading: false });
      }
    },
    [dispatch]
  );

  return {
    handleUpdateTodo,
  };
};
