import prismaClient from "../../prisma/index";
import { CategoryType } from "../../types/databaseTypes";

type Category = Pick<CategoryType, "userId">;

class ListAccountService {
  async execute({ userId }: Category) {
    const account = await prismaClient.account.findMany({
      where: {
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

export { ListAccountService };
