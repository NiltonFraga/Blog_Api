import { getRepository as context } from "typeorm";
import { isNumber, isUndefined, isNullOrUndefined, isNull } from 'util';
import { Post } from '../../models/Post';

export class PostRepository{
    
    public async index(){

        const post = await context(Post).find({
            relations: ['user', 'comment', 'likes']
        })

        return post;
    
    }

    public async show(id: string){

        const post = await context(Post).findOne(id, {
            relations: ['user', 'comment', 'likes']
        });
        
        if(isNullOrUndefined(post))
            return 'Post não encontado'

        return post
    }

    public async create(post: Post){

        if(!post.description && !post.content)
            return 'O post não pode ser em branco'
        
        const newPost = await context(Post).save({
            description: post.description,
            content: post.content,
            likes: post.likes,
            user: post.user
        });

        return newPost;
    }

    public async update(id: string, post: Post){

        const verifyPost = await context(Post).findOne(id);

        if(isUndefined(verifyPost))
            return 'Post não encontrado'

        if(!post.description && !post.content)
            return 'O post não pode ser em branco'
        
        const oldPost = await context(Post).update(id, {
            description: post.description,
            content: post.content,
            likes: verifyPost.likes,
            user: post.user,
        });

        if(oldPost.affected == 1)
            return await context(Post).findOne(id, {
                relations: ['user', 'comment']
            });
        else
            return 'Parametros invalodos'
    }

    public async remove(id: string){

        const post = await context(Post).delete(id);

        if(post.affected == 1){
            await context(Post).findOne(id);
            return 'Post removido' 
        }else{
            return null;
        }

    }
}