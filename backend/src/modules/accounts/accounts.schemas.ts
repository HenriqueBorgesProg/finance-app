import { AccountType } from "../../enums/finance.enums";

export interface CreateAccountInput {
  name: string;
  type: AccountType;
  initialBalance?: string;
  currency?: string;
}

export interface UpdateAccountInput {
  name?: string;
  type?: AccountType;
  initialBalance?: string;
  currentBalance?: string;
  currency?: string;
}
