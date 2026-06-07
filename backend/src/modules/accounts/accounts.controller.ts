import { FastifyReply, FastifyRequest } from "fastify";

import { AccountsService } from "./accounts.service";
import { CreateAccountInput, UpdateAccountInput } from "./accounts.schemas";

const accountsService = new AccountsService();

export class AccountsController {
  async list(_request: FastifyRequest, reply: FastifyReply) {
    const accounts = await accountsService.list();

    return reply.send(accounts);
  }

  async findById(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };

    const account = await accountsService.findById(Number(id));

    return reply.send(account);
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    const body = request.body as CreateAccountInput;

    const account = await accountsService.create(body);

    return reply.status(201).send(account);
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const body = request.body as UpdateAccountInput;

    const account = await accountsService.update(Number(id), body);

    return reply.send(account);
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };

    const result = await accountsService.delete(Number(id));

    return reply.send(result);
  }
}
