import { Request, Response } from "express";
import { LikesPostRepository } from '../repository/likesPost/LikesPostRepository';
import { isNullOrUndefined, isObject } from "util";

const likesPostRepository = new LikesPostRepository();

export const getAll = async (req: Request, res: Response) => {

    const likes = likesPostRepository.index();

    likes.then(resp =>{
        if(!isNullOrUndefined(resp))
            return res.status(200).json(resp);
    })
}

export const create = async (req: Request, res: Response) => {
    const like = req.body;

    const newLike = likesPostRepository.create(like);

    newLike.then(resp =>{
        if(!isNullOrUndefined(resp))
            return res.status(200).json(resp);
        else
            return res.status(400).json({ message: resp})
    })
}

export const remove = async (req: Request, res: Response) => {
    const { id } = req.params;

    const like = likesPostRepository.remove(id)

    like.then(resp =>{
        if(!isNullOrUndefined(resp))
            return res.status(200).json({ message: resp});
        else
            return res.status(404).json({ message: "Usuario não encontrado"});
    })
}