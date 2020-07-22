import { Request, Response, NextFunction } from 'express';
import { getRepository as context } from 'typeorm';
import { User } from '../models/User';
import { Comment } from '../models/Comment';
import { Post } from '../models/Post';

export const checkUserPost = (req: Request, res: Response, next: NextFunction) => {
    const id = res.locals.jwtPayload.userId;

    const params = req.params

    const post = context(Post).findOne(params, {
        relations: ['user']
    })

    post.then(respPost => {
        const user = context(User).findOne(id, {
            relations: ['role']
        })

        user.then(respUser => {
            if(respPost.user.id == id || respUser.role.name == "ADMIN")
                next();
            else
                res.status(401).json({ message: "Usuario não autorisado"});
        })

    })
}