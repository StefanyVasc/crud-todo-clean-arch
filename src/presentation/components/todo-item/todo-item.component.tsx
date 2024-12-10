import React, { useState } from "react";
import {
  CheckCircle,
  Checks,
  PencilSimple,
  TrashSimple,
  X,
} from "phosphor-react";
import * as S from "./todo-item.styles";
import {
  useDeleteTodo,
  useTodoContext,
  useToggleTodo,
  useUpdateTodo,
} from "@/presentation/hooks";
import { Input } from "@/presentation/components";

type TodoItemProps = {
  title: string;
  id: string;
};

export const TodoItem: React.FC<TodoItemProps> = ({ title, id }) => {
  const { handleDeleteTodo } = useDeleteTodo();
  const { handleUpdateTodo } = useUpdateTodo();
  const { handleToggleTodo } = useToggleTodo();
  const { state } = useTodoContext();

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const currentTodo = state.todos.find((todo) => todo.id === id);
  const isCompleted = currentTodo?.completed ?? false;

  const handleDelete = async () => {
    if (window.confirm("Tem certeza que deseja excluir este To-Do?")) {
      try {
        await handleDeleteTodo(id);
      } catch (error) {
        console.error("Erro ao excluir o To-Do:", error);
      }
    }
  };

  const handleEdit = () => setIsEditing(true);

  const handleCancelEdit = () => {
    setIsEditing(false);
    setNewTitle(title);
  };

  const handleSaveEdit = async () => {
    if (newTitle.trim() === "") {
      alert("O título não pode estar vazio!");
      return;
    }

    try {
      await handleUpdateTodo({ id, title: newTitle, completed: false });
      setIsEditing(false);
      console.log(state.todos);
    } catch (error) {
      console.error("Erro ao atualizar o To-Do:", error);
    }
  };

  const handleToggleComplete = async () => {
    handleToggleTodo(id);
  };

  return (
    <S.TodoItem id={id}>
      <S.CheckAction>
        <CheckCircle
          size={24}
          onClick={handleToggleComplete}
          color={isCompleted ? "green" : "gray"}
          weight={isCompleted ? "fill" : "regular"}
        />
        {isEditing ? (
          <Input
            placeholder="Digite o novo título"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        ) : (
          <span className={isCompleted ? "completed" : "to-complete"}>
            {title}
          </span>
        )}
      </S.CheckAction>
      <S.ItemActions>
        {isEditing ? (
          <>
            <Checks size={20} onClick={handleSaveEdit} />
            <X size={20} onClick={handleCancelEdit} />
          </>
        ) : (
          <>
            <TrashSimple size={20} onClick={handleDelete} />
            <PencilSimple size={20} onClick={handleEdit} />
          </>
        )}
      </S.ItemActions>
    </S.TodoItem>
  );
};
