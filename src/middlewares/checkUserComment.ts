import { Request, Response, NextFunction } from 'express';
import { getRepository as context } from 'typeorm';
import { User } from '../models/User';
import { Comment } from '../models/Comment';
import { Post } from '../models/Post';

export const checkUserComment = (req: Request, res: Response, next: NextFunction) => {
    const id = res.locals.jwtPayload.userId;

    const params = req.params

    const comment = context(Comment).findOne(params, {
        relations: ['user']
    })

    comment.then(respComment => {
        const post = context(Post).findOne(respComment.user.id, {
            relations: ['user']
        })
        post.then(respPost => {
            const user = context(User).findOne(id, {
                relations: ['role']
            })
            
            user.then(respUser => {
                if(respComment.user.id == id || respPost.user.id == id || respUser.role.name == "ADMIN"){
                    next();
                }
                else
                    res.status(401).json({ message: "Usuario não autorisado"});
            })
        })
    })
}