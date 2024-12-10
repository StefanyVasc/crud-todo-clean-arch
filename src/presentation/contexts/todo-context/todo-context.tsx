import React, { createContext } from "react";
import { TodoState, TodoAction } from "./todo-types";

export const TodoContext = createContext<
  { state: TodoState; dispatch: React.Dispatch<TodoAction> } | undefined
>(undefined);
