import { getRepository as context } from "typeorm";
import { isNullOrUndefined } from 'util';
import { Comment } from '../../models/Comment';

export class CommentRepository{

    public async show(id: string){

        const comment = await context(Comment).findOne(id, {
            join: {
                alias: "comment",
                leftJoinAndSelect: {
                    user: "comment.user",
                    likes: "comment.likes",
                    userLikes: "likes.user",
                }
            }
        });
        
        if(isNullOrUndefined(comment))
            return 'Commentario não encontado'

        return comment
    }

    public async create(comment: Comment){

        if(!comment.description)
            return 'O Comentario não pode ser em branco'
        
        const newComment = await context(Comment).save({
            description: comment.description,
            likes: comment.likes,
            user: comment.user,
            post: comment.post
        });

        return newComment;
    }

    public async update(id: string, comment: Comment){

        if(!comment.description)
            return 'O Comentario não pode ser em branco'
        
        const oldComment = await context(Comment).update(id, {
            description: comment.description,
            user: comment.user,
            post: comment.post
        });

        if(oldComment.affected == 1)
            return await context(Comment).findOne(id);
        else
            return 'Parametros invalodos'
    }

    public async remove(id: string){
        
        const comment = await context(Comment).delete(id);

        if(comment.affected == 1){
            await context(Comment).findOne(id);
            return 'Comentario removido' 
        }else{
            return null;
        }

    }
}