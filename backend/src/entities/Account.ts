import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { AccountType } from "../enums/finance.enums";
import { User } from "./User";
import { Transaction } from "./Transaction";
import { InvestmentOperation } from "./InvestmentOperation";


@Entity("accounts")
export class Account {
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

    @ManyToOne(() => User, (user) => user.accounts)
    @JoinColumn({ name: "userId" })
    user?: User;

    @OneToMany(() => Transaction, (transaction) => transaction.account)
    transactions?: Transaction[];

    @OneToMany(() => InvestmentOperation, (operation) => operation.account)
    investmentOperations?: InvestmentOperation[];
}
