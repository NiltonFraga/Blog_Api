import * as bcrypt from 'bcrypt';
import { getRepository as context } from "typeorm";
import { isNumber, isUndefined, isNullOrUndefined, isNull } from 'util';
import { Role } from '../../models/Role';

export class RoleRepository{
    
    public async index(){

        const role = await context(Role).find()

        return role
    
    }

    public async show(id: string){

        const role = await context(Role).findOne(id);
        
        if(isNullOrUndefined(role))
            return 'Role não encontado'

        return role
    }

    public async create(role: any){

        role.name = role.name.trim(' ');

        if(!role.name)
            return 'O nome é obrigatorio'
        
        const newRole = await context(Role).save({
            name: role.name,
        });

        return newRole;
    }

    public async update(id: string, role: any){

        const verifyRole = await context(Role).findOne(id);

        if(isUndefined(verifyRole))
            return 'Role não encontrado'

        role.name = role.name.trim(' ');
        
        if(!role.name)
            return 'O nome é obrigatorio'

        const oldRole = await context(Role).update(id, {
            name: role.name,
        });

        if(oldRole.affected == 1)
            return await context(Role).findOne(id);
        else
            return 'Parametros invalodos'
    }

    public async remove(id: string){
        
        const role = await context(Role).delete(id);

        if(role.affected == 1){
            await context(Role).findOne(id);
            return 'Role removida' 
        }else{
            return null;
        }

    }
}