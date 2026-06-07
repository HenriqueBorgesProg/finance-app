import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { InvestmentOperationType } from "../enums/finance.enums";
import { User } from "./User";
import { Account } from "./Account";
import { Asset } from "./Asset";

@Entity("investment_operations")
export class InvestmentOperation {
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

    @ManyToOne(() => User, (user) => user.investmentOperations)
    @JoinColumn({ name: "userId" })
    user?: User;

    @ManyToOne(() => Asset, (asset) => asset.investmentOperations)
    @JoinColumn({ name: "assetId" })
    asset?: Asset;

    @ManyToOne(() => Account, (account) => account.investmentOperations, { nullable: true })
    @JoinColumn({ name: "accountId" })
    account?: Account | null;
}
