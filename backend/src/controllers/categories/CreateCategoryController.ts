import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/categories/CreateCategoryService";
import { CategoryType } from "../../types/databaseTypes";

class CreateCategoryController {
  async handle(req: Request<{}, {}, CategoryType>, res: Response) {
    const { name, description, imageUrl } = req.body;

    const userId = req.user_id;

    const createCategoryService = new CreateCategoryService();

    const category = await createCategoryService.execute({
      name,
      description,
      imageUrl,
      userId,
    });

    return res.json(category);
  }
}

export { CreateCategoryController };
