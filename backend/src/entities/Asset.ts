import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { AssetType } from "../enums/finance.enums";
import { users } from "./User";
import { investment_operations } from "./InvestmentOperation";
import { asset_price_history } from "./AssetPriceHistory";

@Entity("assets")
@Index(["userId", "symbol"], { unique: true })
export class assets {
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

    @ManyToOne(() => users, (user) => user.assets)
    @JoinColumn({ name: "userId" })
    user?: users;

    @OneToMany(() => investment_operations, (operation) => operation.asset)
    investmentOperations?: investment_operations[];

    @OneToMany(() => asset_price_history, (priceHistory) => priceHistory.asset)
    priceHistory?: asset_price_history[];
}
