import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany} from "typeorm";
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

    @OneToOne(type => User)
    @JoinColumn()
    userId: number;

    @OneToMany(type => Comment, comment => comment.id)
    @JoinColumn()
    commentId: Comment[];

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}
