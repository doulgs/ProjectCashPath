import prismaClient from "../../prisma/index";
import { AccountType } from "../../types/databaseTypes";

type Account = Pick<AccountType, "name" | "balance" | "image_url" | "userId">;

class CreateAccountService {
  async execute({ name, balance, image_url, userId }: Account) {
    if (name == "") {
      throw new Error("nome da conta é obrigatório");
    }

    if (userId === null) {
      throw new Error("id do usuario é obrigatório");
    }

    const accountExists = await prismaClient.account.findFirst({
      where: {
        AND: [{ name }, { userId }],
      },
    });

    if (accountExists) {
      throw new Error("já existe uma conta com esse nome cadastrada");
    }

    const account = await prismaClient.account.create({
      data: {
        name,
        balance,
        image_url,
        userId,
      },
      select: {
        id: true,
        name: true,
        balance: true,
        image_url: true,
        userId: true,
      },
    });

    return account;
  }
}

export { CreateAccountService };
