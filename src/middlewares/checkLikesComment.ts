import { Request, Response, NextFunction } from 'express';
import { getRepository as context } from 'typeorm';
import { LikesComment } from '../models/LikesComment';

export const checkLikesComment = (req: Request, res: Response, next: NextFunction) => {
    const id = res.locals.jwtPayload.userId;

    const params = req.params

    const like = context(LikesComment).findOne(params, {
        relations: ['user', 'comment']
    })

    like.then(resp => {
        if(resp.user.id == id)
            next();
        else
            res.status(401).json({ message: "Usuario não autorisado"});
    })
}