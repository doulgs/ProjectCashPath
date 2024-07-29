import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";

import { router } from "./router";

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

// INICIAR O SERVIDOR EM UM IP
app.listen(3333, "192.168.1.63", () => console.log("CashPath server online"));

// LOCALHOST
// app.listen(3333, () => console.log("CashPath server online"));
