import {Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne} from "typeorm";
import { User } from "./User";
import { Post } from "./Post";
import { Comment } from "./Comment";

@Entity()
export class LikesComment {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User)
    @JoinColumn()
    user: User;

    @ManyToOne(type => Comment, comment => comment.likes, {onDelete: "CASCADE"})
    @JoinColumn()
    comment: Comment;

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}
