import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { CategoryType } from "../enums/finance.enums";
import { User } from "./User";
import { Transaction } from "./Transaction";

@Entity("categories")
export class Category {
    @PrimaryGeneratedColumn("increment")
    id?: number;

    @Column({ type: "int" })
    userId?: number;

    @Column()
    name?: string;

    @Column({ type: "enum", enum: CategoryType })
    type?: CategoryType;

    @Column({ type: "varchar", nullable: true })
    color?: string | null;

    @Column({ type: "varchar", nullable: true })
    icon?: string | null;

    @Column({ default: true })
    active?: boolean;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

    @ManyToOne(() => User, (user) => user.categories)
    @JoinColumn({ name: "userId" })
    user?: User;

    @OneToMany(() => Transaction, (transaction) => transaction.category)
    transactions?: Transaction[];
}
