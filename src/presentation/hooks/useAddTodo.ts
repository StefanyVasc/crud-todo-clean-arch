import { useCallback } from "react";
import { makeApiAddTodoFactory } from "@/main/factories/usecases";
import { useTodoContext } from "@/presentation/hooks";
import { ActionsTodo } from "@/domain/enums/actions-todo.enum";

export const useAddTodo = () => {
  const { dispatch } = useTodoContext();

  const handleAddTodo = useCallback(
    async (title: string) => {
      dispatch({ type: ActionsTodo.SET_LOADING, loading: true });
      try {
        const newTodoResponse = await makeApiAddTodoFactory().create({
          title,
          id: "",
          completed: false,
        });

        if (newTodoResponse && newTodoResponse.result) {
          const newTodo = {
            result: newTodoResponse.result,
            statusCode: newTodoResponse.statusCode || 201,
            success: newTodoResponse.success || true,
          };

          dispatch({ type: ActionsTodo.ADD_TODO, todo: newTodo });
        } else {
          console.error("A resposta da API não contém dados válidos.");
        }
      } catch (err: any) {
        console.error("Ocorreu um erro ao criar o To-Do", err.toString());
        dispatch({ type: ActionsTodo.SET_ERROR, error: err.toString() });
      } finally {
        dispatch({ type: ActionsTodo.SET_LOADING, loading: false });
      }
    },
    [dispatch]
  );

  return {
    handleAddTodo,
  };
};
