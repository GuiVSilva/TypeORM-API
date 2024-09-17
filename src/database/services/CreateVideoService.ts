import { AppDataSource } from "../data-source";
import { Category } from "../entities/Category";
import { Videos } from "../entities/Videos";

type IRequest = {
  name: string;
  description: string;
  duration: number;
  category_id: string;
};

export class CreateVideoService {
  async execute({
    name,
    description,
    duration,
    category_id,
  }: IRequest): Promise<Videos | Error> {
    const repo = AppDataSource.getRepository(Videos);
    const repoCategory = AppDataSource.getRepository(Category);

    const category = await repoCategory.findOne({ where: { id: category_id } });

    if (!category) {
      return new Error("Category does not exist");
    }

    const video = repo.create({
      name,
      description,
      duration,
      category,
    });

    await repo.save(video);

    return video;
  }
}
