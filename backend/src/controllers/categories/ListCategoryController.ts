import { Request, Response } from "express";
import { ListCategoryService } from "../../services/categories/ListCategoryService";

class ListCategoryController {
  async handle(req: Request, res: Response) {
    const userId = req.user_id;

    const listCategoryService = new ListCategoryService();

    const categories = await listCategoryService.execute({ userId });

    return res.json(categories);
  }
}

export { ListCategoryController };
