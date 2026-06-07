import { In } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import { Category } from "../../entities/Category";
import { ListCategoriesInput, CreateCategoryInput, UpdateCategoryInput } from "./categories.schemas";
import { CategoryType } from "../../enums/finance.enums";


 const categoryRepository = AppDataSource.getRepository(Category);

 export class CategoriesService {
    private readonly defaultUserId = 1;

    async list(filters?: ListCategoriesInput) {
        const where: any = {
                userId: this.defaultUserId,
                active: true,
           };
           if(filters?.type === CategoryType.INCOME) {
             where.type = In([CategoryType.INCOME, CategoryType.BOTH]);
           }

           if(filters?.type === CategoryType.EXPENSE) {
             where.type = In([CategoryType.EXPENSE, CategoryType.BOTH]);
           }

           if(filters?.type === CategoryType.BOTH) {
             where.type = CategoryType.BOTH;
           }
        return categoryRepository.find({
            where,
            order: {
                name: "ASC",
            },
        });
    }

    async findById(id: number) {
         const category = await categoryRepository.findOne({
            where: {
                id,
                userId: this.defaultUserId,
                active: true,
            }
        });

        if(!category) {
            throw new Error("Category não encontrada");
        }

        return category;
    }

    async create(data: CreateCategoryInput)  {
        const category = categoryRepository.create({
            userId: this.defaultUserId,
            name: data.name,
            type: data.type,
            color: data.color,
            icon: data.icon,
            active: true,
        });
        return categoryRepository.save(category);
    }

    async update(id: number ,data: UpdateCategoryInput) {
        const category = await this.findById(id);
        if(category.name !== undefined) category.name = data.name;
        if(category.type !== undefined) category.type = data.type;
        if(category.color !== undefined) category.color = data.color;
        if(category.icon !== undefined) category.icon = data.icon;
        if(category.active !== undefined) category.active = data.active;

        return categoryRepository.save(category);
    }

    async delete(id: number) {
        const category = await this.findById(id);

        category.active = false;

        await categoryRepository.save(category);

        return {
            message: "Categoria inativada com sucesso",
        };
    }
 }

