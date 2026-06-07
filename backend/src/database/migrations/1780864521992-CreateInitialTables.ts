import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialTables1780864521992 implements MigrationInterface {
    name = 'CreateInitialTables1780864521992'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."transactions_type_enum" AS ENUM('INCOME', 'EXPENSE', 'TRANSFER', 'ADJUSTMENT')`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "accountId" integer NOT NULL, "categoryId" integer, "description" character varying NOT NULL, "amount" numeric(15,2) NOT NULL, "type" "public"."transactions_type_enum" NOT NULL, "transactionDate" date NOT NULL, "paymentMethod" character varying, "notes" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."categories_type_enum" AS ENUM('INCOME', 'EXPENSE', 'BOTH')`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "name" character varying NOT NULL, "type" "public"."categories_type_enum" NOT NULL, "color" character varying, "icon" character varying, "active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."investment_operations_operationtype_enum" AS ENUM('BUY', 'SELL', 'DIVIDEND', 'INTEREST', 'DEPOSIT', 'WITHDRAW')`);
        await queryRunner.query(`CREATE TABLE "investment_operations" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "accountId" integer, "assetId" integer NOT NULL, "operationType" "public"."investment_operations_operationtype_enum" NOT NULL, "quantity" numeric(20,8) NOT NULL, "unitPrice" numeric(15,4) NOT NULL, "totalAmount" numeric(15,2) NOT NULL, "fees" numeric(15,2) NOT NULL DEFAULT '0', "taxes" numeric(15,2) NOT NULL DEFAULT '0', "operationDate" date NOT NULL, "notes" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2287d24734d8f5a38d2f7046b53" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "asset_price_history" ("id" SERIAL NOT NULL, "assetId" integer NOT NULL, "price" numeric(15,4) NOT NULL, "priceDate" date NOT NULL, "source" character varying NOT NULL DEFAULT 'MANUAL', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_26d98c4a4679bbe91a268302cd7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_a9b9d513a7ddaa96105b1366d0" ON "asset_price_history"  ("assetId", "priceDate", "source") `);
        await queryRunner.query(`CREATE TYPE "public"."assets_type_enum" AS ENUM('STOCK', 'FII', 'ETF', 'BDR', 'REIT', 'CRYPTO', 'FIXED_INCOME', 'CASH_BOX', 'OTHER')`);
        await queryRunner.query(`CREATE TABLE "assets" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "name" character varying NOT NULL, "symbol" character varying NOT NULL, "type" "public"."assets_type_enum" NOT NULL, "market" character varying, "currency" character varying NOT NULL DEFAULT 'BRL', "sourceSymbol" character varying, "active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_da96729a8b113377cfb6a62439c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_6a1d85bf66b9c0da076e344362" ON "assets"  ("userId", "symbol") `);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."accounts_type_enum" AS ENUM('CHECKING', 'SAVINGS', 'CASH', 'INVESTMENT', 'CREDIT_CARD')`);
        await queryRunner.query(`CREATE TABLE "accounts" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "name" character varying NOT NULL, "type" "public"."accounts_type_enum" NOT NULL, "initialBalance" numeric(15,2) NOT NULL, "currentBalance" numeric(15,2) NOT NULL, "currency" character varying NOT NULL DEFAULT 'BRL', "active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_6bb58f2b6e30cb51a6504599f41" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_26d8aec71ae9efbe468043cd2b9" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_86e965e74f9cc66149cf6c90f64" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_13e8b2a21988bec6fdcbb1fa741" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "investment_operations" ADD CONSTRAINT "FK_eecb5f87f77572b5bf95249bef0" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "investment_operations" ADD CONSTRAINT "FK_b16fc09f6ed14808e7945149448" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "investment_operations" ADD CONSTRAINT "FK_b213bf815cecc03fb3dcdc7411e" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "asset_price_history" ADD CONSTRAINT "FK_dc8af4eb6e561ffe5998cb62e6c" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "assets" ADD CONSTRAINT "FK_d8cf9bdec7d2fad0852aec349c1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_3aa23c0a6d107393e8b40e3e2a6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_3aa23c0a6d107393e8b40e3e2a6"`);
        await queryRunner.query(`ALTER TABLE "assets" DROP CONSTRAINT "FK_d8cf9bdec7d2fad0852aec349c1"`);
        await queryRunner.query(`ALTER TABLE "asset_price_history" DROP CONSTRAINT "FK_dc8af4eb6e561ffe5998cb62e6c"`);
        await queryRunner.query(`ALTER TABLE "investment_operations" DROP CONSTRAINT "FK_b213bf815cecc03fb3dcdc7411e"`);
        await queryRunner.query(`ALTER TABLE "investment_operations" DROP CONSTRAINT "FK_b16fc09f6ed14808e7945149448"`);
        await queryRunner.query(`ALTER TABLE "investment_operations" DROP CONSTRAINT "FK_eecb5f87f77572b5bf95249bef0"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_13e8b2a21988bec6fdcbb1fa741"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_86e965e74f9cc66149cf6c90f64"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_26d8aec71ae9efbe468043cd2b9"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_6bb58f2b6e30cb51a6504599f41"`);
        await queryRunner.query(`DROP TABLE "accounts"`);
        await queryRunner.query(`DROP TYPE "public"."accounts_type_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6a1d85bf66b9c0da076e344362"`);
        await queryRunner.query(`DROP TABLE "assets"`);
        await queryRunner.query(`DROP TYPE "public"."assets_type_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a9b9d513a7ddaa96105b1366d0"`);
        await queryRunner.query(`DROP TABLE "asset_price_history"`);
        await queryRunner.query(`DROP TABLE "investment_operations"`);
        await queryRunner.query(`DROP TYPE "public"."investment_operations_operationtype_enum"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TYPE "public"."categories_type_enum"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP TYPE "public"."transactions_type_enum"`);
    }

}
