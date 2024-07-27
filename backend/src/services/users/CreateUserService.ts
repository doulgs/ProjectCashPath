import prismaClient from "../../prisma/index";
import { hash } from "bcryptjs";
import { UserType } from "../../types/databaseTypes";

type User = Pick<UserType, "name" | "email" | "password" | "companyId">;

class CreateUserService {
  async execute({ name, email, password, companyId }: User) {
    if (!name || !email || !password || !companyId) {
      throw new Error("Preencha todos os campos");
    }

    const userExists = await prismaClient.user.findFirst({
      where: {
        OR: [{ email }],
      },
    });

    if (userExists) {
      throw new Error("Usuario já cadastrado");
    }

    const hashedPassword = await hash(password, 8);

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        companyId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        companyId: true,
        createdAt: true,
      },
    });

    return user;
  }
}

export { CreateUserService };
