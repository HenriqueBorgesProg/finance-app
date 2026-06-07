import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";

import { TransactionType } from "../enums/finance.enums";
import { users } from "./User";
import { accounts } from "./Account";
import { categories } from "./Category";

@Entity("transactions")
export class transactions {
    @PrimaryGeneratedColumn("increment")
    id?: number;

    @Column({ type: "int" })
    userId?: number;

    @Column({ type: "int" })
    accountId?: number;

    @Column({ type: "int", nullable: true })
    categoryId?: number | null;

    @Column()
    description?: string;

    @Column({ type: "numeric", precision: 15, scale: 2 })
    amount?: string;

    @Column({ type: "enum", enum: TransactionType })
    type?: TransactionType;

    @Column({ type: "date" })
    transactionDate?: Date;

    @Column({ type: "varchar", nullable: true })
    paymentMethod?: string | null;

    @Column({ type: "text", nullable: true })
    notes?: string | null;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

    @ManyToOne(() => users, (user) => user.transactions)
    @JoinColumn({ name: "userId" })
    user?: users;

    @ManyToOne(() => accounts, (account) => account.transactions)
    @JoinColumn({ name: "accountId" })
    account?: accounts;

    @ManyToOne(() => categories, (category) => category.transactions, { nullable: true })
    @JoinColumn({ name: "categoryId" })
    category?: categories | null;
}
