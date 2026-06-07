import { AppDataSource } from "../../database/data-source";
import { Account } from "../../entities/Account";
import { CreateAccountInput, UpdateAccountInput } from "./accounts.schemas";

const accountRepository = AppDataSource.getRepository(Account);

export class AccountsService {
  private readonly defaultUserId = 1;

  async list() {
    return accountRepository.find({
      where: {
        userId: this.defaultUserId,
        active: true,
      },
      order: {
        name: "ASC",
      },
    });
  }

  async findById(id: number) {
    const account = await accountRepository.findOne({
      where: {
        id,
        userId: this.defaultUserId,
        active: true,
      },
    });

    if (!account) {
      throw new Error("Conta não encontrada");
    }

    return account;
  }

  async create(data: CreateAccountInput) {
    const account = accountRepository.create({
      userId: this.defaultUserId,
      name: data.name,
      type: data.type,
      initialBalance: data.initialBalance ?? "0",
      currentBalance: data.initialBalance ?? "0",
      currency: data.currency ?? "BRL",
      active: true,
    });

    return accountRepository.save(account);
  }

  async update(id: number, data: UpdateAccountInput) {
    const account = await this.findById(id);

    if (data.name !== undefined) account.name = data.name;
    if (data.type !== undefined) account.type = data.type;
    if (data.initialBalance !== undefined) account.initialBalance = data.initialBalance;
    if (data.currentBalance !== undefined) account.currentBalance = data.currentBalance;
    if (data.currency !== undefined) account.currency = data.currency;

    return accountRepository.save(account);
  }

  async delete(id: number) {
    const account = await this.findById(id);

    account.active = false;

    await accountRepository.save(account);

    return {
      message: "Conta inativada com sucesso",
    };
  }
}
