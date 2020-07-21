import { Request, Response } from "express";
import { RoleRepository } from "../repository/role/RoleRepository";
import { isNullOrUndefined, isObject } from "util";

const roleRepository = new RoleRepository();

export const getAll = async (req: Request, res: Response) => {
    const roles = roleRepository.index();

    roles.then(resp =>{
        if(!isNullOrUndefined(resp))
            return res.status(200).json(resp);
    })
    
}

export const create = async (req: Request, res: Response) => {
    const role = req.body;

    const newRole = roleRepository.create(role);

    newRole.then(resp =>{
        if(!isNullOrUndefined(resp))
            return res.status(200).json(resp);
        else
            return res.status(400).json({ message: resp})
    })
}

export const update = async (req: Request, res: Response) => {
    const { id } = req.params;

    const role = req.body;
    
    const newRole = roleRepository.update(id, role)

    newRole.then(resp =>{
        if(isObject(resp))
            return res.status(200).json(resp);
        else
            return res.status(404).json({ message: resp});
    })
}

export const remove = async (req: Request, res: Response) => {
    const { id } = req.params;

    const role = roleRepository.remove(id)

    role.then(resp =>{
        if(!isNullOrUndefined(resp))
            return res.status(200).json({ message: resp});
        else
            return res.status(404).json({ message: "Role não encontrado"});
    })
}