import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const getTodos = () => {
  const filePath = path.resolve(process.cwd(), "db.json");
  const fileData = fs.readFileSync(filePath, "utf-8");
  const json = JSON.parse(fileData);
  return {
    results: json.todos,
  };
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const todos = getTodos();
      return res.status(200).json(todos);
    } catch (error) {
      console.error("Erro ao ler os todos do arquivo:", error);
      return res
        .status(500)
        .json({ message: "Erro interno ao processar a requisição." });
    }
  }

  console.log(res);

  return res.status(405).json({ message: "Method Not Allowed" });
}
