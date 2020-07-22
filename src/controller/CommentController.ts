import { Request, Response } from "express";
import { CommentRepository } from '../repository/comment/CommentRepository';
import { isNullOrUndefined, isObject } from "util";

const commentRepository = new CommentRepository();

export const getById = async (req: Request, res: Response) => {
    const { id } = req.params
    
    const comment = commentRepository.show(id);
    console.log("oi")
    comment.then(resp =>{
        if(isObject(resp))
            return res.status(200).json(resp);
        else
            return res.status(404).json({ message: resp})
    })
}

export const create = async (req: Request, res: Response) => {
    const comment = req.body;

    const newComment = commentRepository.create(comment);

    newComment.then(resp =>{
        if(!isNullOrUndefined(resp))
            return res.status(200).json(resp);
        else
            return res.status(400).json({ message: resp})
    })
}

export const update = async (req: Request, res: Response) => {
   
    const { id } = req.params;

    const comment = req.body;
    
    const newComment = commentRepository.update(id, comment)

    newComment.then(resp =>{
        if(isObject(resp))
            return res.status(200).json(resp);
        else
            return res.status(404).json({ message: resp});
    })
}

export const remove = async (req: Request, res: Response) => {
    const { id } = req.params;

    const post = commentRepository.remove(id)

    post.then(resp =>{
        if(!isNullOrUndefined(resp))
            return res.status(200).json({ message: resp});
        else
            return res.status(404).json({ message: "Usuario não encontrado"});
    })
}