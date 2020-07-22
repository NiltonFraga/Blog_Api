import { Request, Response } from "express";
import { PostRepository } from '../repository/post/PostRepository';
import { isNullOrUndefined, isObject } from "util";

const postRepository = new PostRepository();

export const getAll = async (req: Request, res: Response) => {

    const posts = postRepository.index();

    posts.then(resp =>{
        if(!isNullOrUndefined(resp))
            return res.status(200).json(resp);
    })
}

export const getById = async (req: Request, res: Response) => {
    const { id } = req.params
    
    const post = postRepository.show(id);

    post.then(resp =>{
        if(isObject(resp))
            return res.status(200).json(resp);
        else
            return res.status(404).json({ message: resp})
    })
}

export const create = async (req: Request, res: Response) => {
    const post = req.body;

    const newPost = postRepository.create(post);

    newPost.then(resp =>{
        if(!isNullOrUndefined(resp))
            return res.status(200).json(resp);
        else
            return res.status(400).json({ message: resp})
    })
}

export const update = async (req: Request, res: Response) => {
   
    const { id } = req.params;

    const post = req.body;
    
    const newPost = postRepository.update(id, post)

    newPost.then(resp =>{
        if(isObject(resp))
            return res.status(200).json(resp);
        else
            return res.status(404).json({ message: resp});
    })
}

export const remove = async (req: Request, res: Response) => {
    const { id } = req.params;

    const post = postRepository.remove(id)

    post.then(resp =>{
        if(!isNullOrUndefined(resp))
            return res.status(200).json({ message: resp});
        else
            return res.status(404).json({ message: "Usuario não encontrado"});
    })
}