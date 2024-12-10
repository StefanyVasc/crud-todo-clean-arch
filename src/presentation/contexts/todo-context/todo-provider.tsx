import React, { useReducer, PropsWithChildren } from "react";
import { initialState, todoReducer } from "./todo-reducer";
import { TodoContext } from "./todo-context";

export const TodoProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
