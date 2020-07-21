import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne} from "typeorm";
import { Role } from "./Role";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @ManyToOne(type => Role)
    @JoinColumn()
    role: number;

    @Column()
    age: number;
    
    @Column()
    password: string;

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}
