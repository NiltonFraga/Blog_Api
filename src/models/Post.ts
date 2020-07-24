import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToMany, ManyToOne } from "typeorm";
import { User } from "./User";
import { Comment } from "./Comment";
import { LikesPost } from "./LikesPost";

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;
    
    @Column()
    content: string;

    @ManyToOne(type => User)
    @JoinColumn()
    user: User;

    @OneToMany(type => Comment, comment => comment.post, {onDelete: "CASCADE"})
    comment: Comment[];

    @OneToMany(type => LikesPost, likes => likes.post, { cascade: true })
    @JoinColumn()
    likes: LikesPost[];

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}
