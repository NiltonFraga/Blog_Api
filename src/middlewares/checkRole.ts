import { Request, Response, NextFunction } from 'express';
import { getRepository as context } from 'typeorm';
import { User } from '../models/User'
import { Role } from '../models/Role';

export const checkRole = (roles: Array<string>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const id = res.locals.jwtPayload.userId;

        const userRepository = context(User);

        let user: User;
        let role: Role;

        try{
            user = await userRepository.findOneOrFail(id);
            role = await context(Role).findOne(user.id);
        }catch(id){
            res.status(401).json({ message: "Usuario nao encontrado"})
        }

        if(role.name == roles[0])
            next();
        else
            res.status(401).json({ message: "Usuario sem permisao"});
    } 
}