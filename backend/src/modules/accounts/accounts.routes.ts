import { FastifyInstance } from "fastify";

import { AccountsController } from "./accounts.controller";

const accountsController = new AccountsController();

export async function accountsRoutes(app: FastifyInstance) {
  app.get("/accounts", accountsController.list);
  app.get("/accounts/:id", accountsController.findById);
  app.post("/accounts", accountsController.create);
  app.put("/accounts/:id", accountsController.update);
  app.delete("/accounts/:id", accountsController.delete);
}
