import prismaClient from "../../prisma/index";
import { CategoryType } from "../../types/databaseTypes";

type Category = Pick<CategoryType, "userId">;

class ListCategoryService {
  async execute({ userId }: Category) {
    const category = await prismaClient.category.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        image_url: true,
        userId: true,
      },
    });

    return category;
  }
}

export { ListCategoryService };
