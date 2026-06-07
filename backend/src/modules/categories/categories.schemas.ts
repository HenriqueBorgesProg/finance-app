import { CategoryType } from "../../enums/finance.enums";

export interface CreateCategoryInput {
  name: string;
  type: CategoryType;
  color?: string;
  icon?: string;
}

export interface UpdateCategoryInput {
  name?: string;
  type?: CategoryType;
  color?: string;
  icon?: string;
  active?: boolean;
}

export interface ListCategoriesInput {
    type?: CategoryType;
}
