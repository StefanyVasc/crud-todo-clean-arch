import React from "react";
import { TodoItem } from "@/presentation/components";
import * as S from "./todo-list.styles";
import { useTodoContext } from "@/presentation/hooks";

export const TodoList: React.FC = () => {
  const { state } = useTodoContext();

  const { todos } = state;

  return (
    <S.TodoList>
      {todos.length === 0 && <div>Nenhum To-Do encontrado</div>}
      {todos.map((todo) => (
        <TodoItem key={todo.id} title={todo.title} id={todo.id} />
      ))}
    </S.TodoList>
  );
};
