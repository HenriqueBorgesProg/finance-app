import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index, ManyToOne, JoinColumn } from "typeorm";
import { Asset } from "./Asset";

@Entity("asset_price_history")
@Index(["assetId", "priceDate", "source"], { unique: true })
export class AssetPriceHistory {
    @PrimaryGeneratedColumn("increment")
    id?: number;

    @Column({ type: "int" })
    assetId?: number;

    @Column({ type: "numeric", precision: 15, scale: 4 })
    price?: string;

    @Column({ type: "date" })
    priceDate?: Date;

    @Column({ default: "MANUAL" })
    source?: string;

    @CreateDateColumn()
    createdAt?: Date;

    @ManyToOne(() => Asset, (asset) => asset.priceHistory)
    @JoinColumn({ name: "assetId" })
    asset?: Asset;
}
