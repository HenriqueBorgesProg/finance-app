import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { AssetType } from "../enums/finance.enums";
import { User } from "./User";
import { InvestmentOperation } from "./InvestmentOperation";
import { AssetPriceHistory } from "./AssetPriceHistory";

@Entity("assets")
@Index(["userId", "symbol"], { unique: true })
export class Asset {
    @PrimaryGeneratedColumn("increment")
    id?: number;

    @Column({ type: "int" })
    userId?: number;

    @Column()
    name?: string;

    @Column()
    symbol?: string;

    @Column({ type: "enum", enum: AssetType })
    type?: AssetType;

    @Column({ type: "varchar", nullable: true })
    market?: string | null;

    @Column({ default: "BRL" })
    currency?: string;

    @Column({ type: "varchar", nullable: true })
    sourceSymbol?: string | null;

    @Column({ default: true })
    active?: boolean;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

    @ManyToOne(() => User, (user) => user.assets)
    @JoinColumn({ name: "userId" })
    user?: User;

    @OneToMany(() => InvestmentOperation, (operation) => operation.asset)
    investmentOperations?: InvestmentOperation[];

    @OneToMany(() => AssetPriceHistory, (priceHistory) => priceHistory.asset)
    priceHistory?: AssetPriceHistory[];
}
