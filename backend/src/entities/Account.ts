import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { AccountType } from "../enums/finance.enums";
import { users } from "./User";
import { transactions } from "./Transaction";
import { investment_operations } from "./InvestmentOperation";


@Entity("accounts")
export class accounts {
    @PrimaryGeneratedColumn("increment")
    id?: number;

    @Column({ type: "int" })
    userId?: number;

    @Column()
    name?: string;

    @Column({ type: "enum", enum: AccountType })
    type?: AccountType;

    @Column({ type: "numeric", precision: 15, scale: 2 })
    initialBalance?: string;

    @Column({ type: "numeric", precision: 15, scale: 2 })
    currentBalance?: string;

    @Column({ default: "BRL" })
    currency?: string;

    @Column({ default: true })
    active?: boolean;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

    @ManyToOne(() => users, (user) => user.accounts)
    @JoinColumn({ name: "userId" })
    user?: users;

    @OneToMany(() => transactions, (transaction) => transaction.account)
    transactions?: transactions[];

    @OneToMany(() => investment_operations, (operation) => operation.account)
    investmentOperations?: investment_operations[];
}
