import { useCallback } from "react";
import { useTodoContext } from "@/presentation/hooks";
import { makeApiLoadTodosListFactory } from "@/main/factories/usecases";
import { ActionsTodo } from "@/domain/enums/actions-todo.enum";

export const useLoadTodosList = () => {
  const { dispatch } = useTodoContext();

  const handleLoadTodosList = useCallback(async () => {
    dispatch({ type: ActionsTodo.SET_LOADING, loading: true });
    try {
      const newTodoResponse = await makeApiLoadTodosListFactory().loadAll();

      if (!newTodoResponse || !newTodoResponse.results) {
        throw new Error("Invalid response format");
      }

      dispatch({
        type: ActionsTodo.LOAD_TODOS,
        todos: {
          results: newTodoResponse.results,
        },
      });
    } catch (err: any) {
      if (err instanceof Error) {
        console.error("Error stack:", err.toString());
        dispatch({ type: ActionsTodo.SET_ERROR, error: err.toString() });
      }
    } finally {
      dispatch({ type: ActionsTodo.SET_LOADING, loading: false });
    }
  }, [dispatch]);

  return {
    handleLoadTodosList,
  };
};
