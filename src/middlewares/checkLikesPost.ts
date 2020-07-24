import { Request, Response, NextFunction } from 'express';
import { getRepository as context } from 'typeorm';
import { LikesPost } from '../models/LikesPost';

export const checkLikesPost = (req: Request, res: Response, next: NextFunction) => {
    const id = res.locals.jwtPayload.userId;

    const params = req.params

    const like = context(LikesPost).findOne(params, {
        relations: ['user', 'post']
    })

    like.then(resp => {
        if(resp.user.id == id)
            next();
        else
            res.status(401).json({ message: "Usuario não autorisado"});
    })
}