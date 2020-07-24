import { getRepository as context } from "typeorm";
import { LikesPost } from '../../models/LikesPost';

export class LikesPostRepository{
    
    public async index(){

        const post = await context(LikesPost).find({
            relations: ['user']
        })

        return post;
    
    }

    public async create(like: LikesPost){

        if(!like.user || !like.post)
            return 'Parametros incorretos'
        
        const newLike = await context(LikesPost).save({
            user: like.user,
            post: like.post,
        });

        return newLike;
    }

    public async remove(id: string){
        
        const like = await context(LikesPost).delete(id);

        if(like.affected == 1){
            await context(LikesPost).findOne(id);
            return 'Like removido' 
        }else{
            return null;
        }

    }
}