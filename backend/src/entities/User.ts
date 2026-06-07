import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Account } from "./Account";
import { Category } from "./Category";
import { Transaction } from "./Transaction";
import { Asset } from "./Asset";
import { InvestmentOperation } from "./InvestmentOperation";


@Entity("users")
export class User {
    @PrimaryGeneratedColumn("increment")
    id?: number;

    @Column()
    name?: string;

    @Column({ type: "varchar", unique: true, nullable: true })
    email?: string | null;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

    @OneToMany(() => Account, (account) => account.user)
    accounts?: Account[];

    @OneToMany(() => Category, (category) => category.user)
    categories?: Category[];

    @OneToMany(() => Transaction, (transaction) => transaction.user)
    transactions?: Transaction[];

    @OneToMany(() => Asset, (asset) => asset.user)
    assets?: Asset[];

    @OneToMany(() => InvestmentOperation, (operation) => operation.user)
    investmentOperations?: InvestmentOperation[];
}
