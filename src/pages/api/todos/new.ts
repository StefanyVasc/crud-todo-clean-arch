import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const dbFilePath = path.join(process.cwd(), "db.json");

const readDataFromFile = (): {
  todos: { id: string; title: string; completed: boolean }[];
} => {
  try {
    const data = fs.readFileSync(dbFilePath, "utf-8");
    const parsedData = JSON.parse(data);
    return parsedData;
  } catch (error) {
    console.error("Erro ao ler o arquivo:", error);
    throw new Error("Erro ao ler o arquivo");
  }
};

const saveDataToFile = (data: {
  todos: { id: string; title: string; completed: boolean }[];
}) => {
  try {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Erro ao salvar os dados no arquivo:", error);
    throw new Error("Erro ao salvar dados no arquivo");
  }
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { title } = req.body;

    if (!title || typeof title !== "string") {
      return res.status(400).json({ message: "O título é obrigatório" });
    }

    try {
      const data = readDataFromFile();
      const todos = data.todos || [];

      const newTodo = {
        id: uuidv4(),
        title,
        completed: false,
      };

      todos.push(newTodo);

      const updatedData = { todos };

      saveDataToFile(updatedData);

      return res.status(201).json({
        result: newTodo,
        success: true,
        statusCode: 201,
      });
    } catch (error) {
      console.error("Erro ao processar a requisição POST:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  return res.status(405).json({ message: "Método não permitido" });
}
