import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import { User } from "./User";

@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    likes: number;

    @OneToOne(type => User)
    @JoinColumn()
    userId: number;
    
    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}
