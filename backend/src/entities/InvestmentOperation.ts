import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { InvestmentOperationType } from "../enums/finance.enums";
import { users } from "./User";
import { accounts } from "./Account";
import { assets } from "./Asset";

@Entity("investment_operations")
export class investment_operations {
    @PrimaryGeneratedColumn("increment")
    id?: number;

    @Column({ type: "int" })
    userId?: number;

    @Column({ type: "int", nullable: true })
    accountId?: number | null;

    @Column({ type: "int" })
    assetId?: number;

    @Column({ type: "enum", enum: InvestmentOperationType })
    operationType?: InvestmentOperationType;

    @Column({ type: "numeric", precision: 20, scale: 8 })
    quantity?: string;

    @Column({ type: "numeric", precision: 15, scale: 4 })
    unitPrice?: string;

    @Column({ type: "numeric", precision: 15, scale: 2 })
    totalAmount?: string;

    @Column({ type: "numeric", precision: 15, scale: 2, default: 0 })
    fees?: string;

    @Column({ type: "numeric", precision: 15, scale: 2, default: 0 })
    taxes?: string;

    @Column({ type: "date" })
    operationDate?: Date;

    @Column({ type: "text", nullable: true })
    notes?: string | null;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

    @ManyToOne(() => users, (user) => user.investmentOperations)
    @JoinColumn({ name: "userId" })
    user?: users;

    @ManyToOne(() => assets, (asset) => asset.investmentOperations)
    @JoinColumn({ name: "assetId" })
    asset?: assets;

    @ManyToOne(() => accounts, (account) => account.investmentOperations, { nullable: true })
    @JoinColumn({ name: "accountId" })
    account?: accounts | null;
}
