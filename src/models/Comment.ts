import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Post } from "./Post";
import { LikesComment } from "./LikesComment";

@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @ManyToOne(type => User)
    @JoinColumn()
    user: User;

    @ManyToOne(type => Post, post => post.comment, {onDelete: "CASCADE"})
    @JoinColumn()
    post: Post;

    @OneToMany(type => LikesComment, likes => likes.comment, {onDelete: "CASCADE"})
    @JoinColumn()
    likes: LikesComment[];
    
    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}
