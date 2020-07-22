import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany, ManyToOne} from "typeorm";
import { User } from "./User";
import { Comment } from "./Comment";

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;
    
    @Column()
    content: string;
    
    @Column()
    likes: number;

    @ManyToOne(type => User)
    @JoinColumn()
    user: number;

    @OneToMany(type => Comment, comment => comment.post)
    comment: Comment[];

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}
