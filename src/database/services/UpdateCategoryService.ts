import { AppDataSource } from "../data-source";
import { Category } from "../entities/Category";

type IRequest = {
  id: string;
  name: string;
  description: string;
};

export class UpdateCategoryService {
  async execute({
    id,
    name,
    description,
  }: IRequest): Promise<Category | Error> {
    const repo = AppDataSource.getRepository(Category);

    const category = await repo.findOne({ where: { id } });

    if (!category) {
      return new Error("Category not found");
    }

    category.name = name ? name : category.name;
    category.description = description ? description : category.description;

    await repo.save(category);

    return category;
  }
}
