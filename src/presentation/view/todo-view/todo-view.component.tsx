import { useEffect, useState } from "react";
import { Box, Button, Input, TodoList } from "@/presentation/components";
import {
  useLoadTodosList,
  useAddTodo,
  useTodoContext,
} from "@/presentation/hooks";
import * as S from "./todo-view.styles";

export const TodoView = () => {
  const [title, setTitle] = useState("");
  const { state } = useTodoContext();
  const { handleAddTodo } = useAddTodo();
  const { handleLoadTodosList } = useLoadTodosList();

  const { todos, loading } = state;

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert("Por favor, digite um título!");
      return;
    }
    await handleAddTodo(title);
    setTitle("");
  };

  useEffect(() => {
    if (todos.length === 0) {
      handleLoadTodosList();
    }

    console.log(todos);
  }, [handleLoadTodosList, todos]);

  return (
    <S.GridContainer>
      <S.RowContainer>
        <S.ColumnContainer $fullWidth>
          <Box title="Criar Novo To-Do">
            <div className="input-container">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título do To-Do"
              />
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? "Criando..." : "Criar"}
              </Button>
            </div>
          </Box>
        </S.ColumnContainer>
      </S.RowContainer>

      <S.RowContainer>
        <S.ColumnContainer>
          <Box title="To-Dos">
            <TodoList />
          </Box>
        </S.ColumnContainer>
        <S.ColumnContainer>
          <Box title="Done">
            <div>... em construção</div>
            {todos.map((todo) => (
              <div key={todo.id}>{todo.title}</div>
            ))}
          </Box>
        </S.ColumnContainer>
      </S.RowContainer>
    </S.GridContainer>
  );
};
