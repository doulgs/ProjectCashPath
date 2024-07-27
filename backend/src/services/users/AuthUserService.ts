import prismaClient from "../../prisma/index";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UserType } from "../../types/databaseTypes";

type User = Pick<UserType, "email" | "password">;

class AuthUserService {
  async execute({ email, password }: User) {
    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("Informações para login incorretas");
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Informações para login incorretas");
    }

    const token = sign(
      {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id.toString(),
        expiresIn: "30d",
      }
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    };
  }
}

export { AuthUserService };
