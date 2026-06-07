import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { accounts } from "./Account";
import { categories } from "./Category";
import { transactions } from "./Transaction";
import { assets } from "./Asset";
import { investment_operations } from "./InvestmentOperation";


@Entity("users")
export class users {
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

    @OneToMany(() => accounts, (account) => account.user)
    accounts?: accounts[];

    @OneToMany(() => categories, (category) => category.user)
    categories?: categories[];

    @OneToMany(() => transactions, (transaction) => transaction.user)
    transactions?: transactions[];

    @OneToMany(() => assets, (asset) => asset.user)
    assets?: assets[];

    @OneToMany(() => investment_operations, (operation) => operation.user)
    investmentOperations?: investment_operations[];
}
