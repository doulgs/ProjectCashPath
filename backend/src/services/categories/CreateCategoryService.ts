import prismaClient from "../../prisma/index";
import { CategoryType } from "../../types/databaseTypes";

type Category = Pick<CategoryType, "name" | "description" | "image_url" | "userId">;

class CreateCategoryService {
  async execute({ name, description, image_url, userId }: Category) {
    if (name == "") {
      throw new Error("nome da categoria é obrigatório");
    }

    if (userId === null) {
      throw new Error("id do usuario é obrigatório");
    }

    const categoryExists = await prismaClient.category.findFirst({
      where: {
        AND: [{ name }, { userId }],
      },
    });

    if (categoryExists) {
      throw new Error("já existe um categoria com esse nome cadastrada");
    }

    const category = await prismaClient.category.create({
      data: {
        name,
        description,
        image_url,
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

export { CreateCategoryService };
