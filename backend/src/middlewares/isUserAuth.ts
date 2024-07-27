import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

type PayLoad = {
  sub: string;
};

export function isUserAuth(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ error: "Token not provided" });
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as PayLoad;

    req.user_id = Number(sub);

    return next();
  } catch (error) {
    return res.status(401).end();
  }
}
