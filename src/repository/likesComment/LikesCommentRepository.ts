import { getRepository as context } from "typeorm";
import { LikesComment } from '../../models/LikesComment';

export class LikesCommentRepository{
    
    public async index(){

        const post = await context(LikesComment).find({
            relations: ['user']
        })

        return post;
    
    }

    public async create(like: LikesComment){

        if(!like.user || !like.comment)
            return 'Parametros incorretos'
        
        const newLike = await context(LikesComment).save({
            user: like.user,
            comment: like.comment,
        });

        return newLike;
    }

    public async remove(id: string){
        
        const like = await context(LikesComment).delete(id);

        if(like.affected == 1){
            await context(LikesComment).findOne(id);
            return 'Like removido' 
        }else{
            return null;
        }

    }
}