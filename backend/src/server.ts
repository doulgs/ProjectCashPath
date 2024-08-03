import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";

import { router } from "./router";

// Configurar dotenv para carregar as variáveis de ambiente
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Rotas e outros middlewares
app.use(router);

// Middleware de tratamento de erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

// Obter o IP do arquivo .env
const IP_CONNECTION = process.env.IP_CONNECTION || "localhost";

// INICIAR O SERVIDOR NO IP OBTIDO DO .ENV
app.listen(3333, IP_CONNECTION, () =>
  console.log(`CashPath server online at ${IP_CONNECTION}:3333`)
);
