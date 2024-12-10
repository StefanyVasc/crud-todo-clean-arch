import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const filePath = path.resolve(process.cwd(), "db.json");

const readTodosFromFile = (): any[] => {
  try {
    const fileData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileData).todos || [];
  } catch {
    throw new Error("Erro ao ler o arquivo de dados.");
  }
};

const writeTodosToFile = (todos: any[]): void => {
  try {
    const data = JSON.stringify({ todos }, null, 2);
    fs.writeFileSync(filePath, data, "utf-8");
  } catch {
    throw new Error("Erro ao salvar os dados no arquivo.");
  }
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== "string") {
    return res.status(400).json({ message: "ID inválido." });
  }

  try {
    const todos = readTodosFromFile();

    if (req.method === "PUT") {
      const { title, completed } = req.body;

      if (title && typeof title !== "string") {
        return res
          .status(400)
          .json({ message: "O título deve ser uma string." });
      }

      if (completed !== undefined && typeof completed !== "boolean") {
        return res
          .status(400)
          .json({ message: "O campo 'completed' deve ser um booleano." });
      }

      const todoIndex = todos.findIndex(
        (todo: { id: { toString: () => string } }) => todo.id.toString() === id
      );

      if (todoIndex === -1) {
        return res.status(404).json({ message: "To-Do não encontrado." });
      }

      todos[todoIndex] = {
        ...todos[todoIndex],
        title: title ?? todos[todoIndex].title,
        completed: completed ?? todos[todoIndex].completed,
      };

      console.log(todos);

      writeTodosToFile(todos);
      return res.status(200).json(todos[todoIndex]);
    }

    if (req.method === "DELETE") {
      const todoIndex = todos.findIndex(
        (todo: { id: { toString: () => string } }) => todo.id.toString() === id
      );

      if (todoIndex === -1) {
        return res.status(404).json({ message: "To-Do não encontrado." });
      }

      const deletedTodo = todos[todoIndex];
      todos.splice(todoIndex, 1);
      writeTodosToFile(todos);

      return res.status(200).json({
        message: "To-Do excluído com sucesso.",
        deletedTodo,
      });
    }

    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    console.error(
      `[${req.method}] Erro ao processar a requisição para o ID ${id}:`,
      error
    );
    return res
      .status(500)
      .json({ message: "Erro interno ao processar a requisição." });
  }
}
