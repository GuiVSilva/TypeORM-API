import { AppDataSource } from "../data-source"; // Importe o AppDataSource
import { Category } from "../entities/Category";

type IRequest = {
  name: string;
  description: string;
};

export class CreateCategoryService {
  async execute({ name, description }: IRequest): Promise<Category | Error> {
    const repo = AppDataSource.getRepository(Category);

    if (await repo.findOne({ where: { name } })) {
      return new Error("Category already exists");
    }

    const category = repo.create({
      name,
      description,
    });

    await repo.save(category);

    return category;
  }
}
