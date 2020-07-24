import { Request, Response } from "express";
import { LikesCommentRepository } from '../repository/likesComment/LikesCommentRepository';
import { isNullOrUndefined, isObject } from "util";

const likesCommentRepository = new LikesCommentRepository();

export const getAll = async (req: Request, res: Response) => {

    const likes = likesCommentRepository.index();

    likes.then(resp =>{
        if(!isNullOrUndefined(resp))
            return res.status(200).json(resp);
    })
}

export const create = async (req: Request, res: Response) => {
    const like = req.body;

    const newLike = likesCommentRepository.create(like);

    newLike.then(resp =>{
        if(!isNullOrUndefined(resp))
            return res.status(200).json(resp);
        else
            return res.status(400).json({ message: resp})
    })
}

export const remove = async (req: Request, res: Response) => {
    const { id } = req.params;

    const like = likesCommentRepository.remove(id)

    like.then(resp =>{
        if(!isNullOrUndefined(resp))
            return res.status(200).json({ message: resp});
        else
            return res.status(404).json({ message: "Usuario não encontrado"});
    })
}