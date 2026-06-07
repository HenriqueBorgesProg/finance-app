import { FastifyReply, FastifyRequest } from "fastify";

import { CategoryType } from "../../enums/finance.enums";
import { CategoriesService } from "./categories.service";
import { CreateCategoryInput, UpdateCategoryInput } from "./categories.schemas";

const categoriesService = new CategoriesService();

export class CategoriesController {
  async list(request: FastifyRequest, reply: FastifyReply) {
    const query = request.query as {
      type?: CategoryType;
    };

    const categories = await categoriesService.list({
      type: query.type,
    });

    return reply.send(categories);
  }

  async findById(request: FastifyRequest, reply: FastifyReply) {
    const { id: idParam } = request.params as { id: string };

    const id = Number(idParam);

    if (Number.isNaN(id)) {
      return reply.status(400).send({
        message: "ID inválido",
      });
    }

    const category = await categoriesService.findById(id);

    return reply.send(category);
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    const body = request.body as CreateCategoryInput;

    const category = await categoriesService.create(body);

    return reply.status(201).send(category);
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const { id: idParam } = request.params as { id: string };
    const body = request.body as UpdateCategoryInput;

    const id = Number(idParam);

    if (Number.isNaN(id)) {
      return reply.status(400).send({
        message: "ID inválido",
      });
    }

    const category = await categoriesService.update(id, body);

    return reply.send(category);
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const { id: idParam } = request.params as { id: string };

    const id = Number(idParam);

    if (Number.isNaN(id)) {
      return reply.status(400).send({
        message: "ID inválido",
      });
    }

    const result = await categoriesService.delete(id);

    return reply.send(result);
  }
}
