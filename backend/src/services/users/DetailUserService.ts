import prismaClient from "../../prisma/index";
import {} from "../../types/databaseTypes";

type ExecuteProps = {
  userId: number;
};

class DetailUserService {
  async execute({ userId }: ExecuteProps) {
    const user = await prismaClient.user.findFirst({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
        accounts: true,
        categories: true,
        transactions: true,
        companyId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }
}

export { DetailUserService };
