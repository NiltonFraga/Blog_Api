import { User } from '../../models/User';
import * as bcrypt from 'bcrypt';
import { getRepository as context } from "typeorm";
import { isNumber, isUndefined, isNullOrUndefined, isNull } from 'util';
import { Role } from '../../models/Role';

export class UserRepository{
    
    public async index(){

        const user = await context(User).find({
            relations: ['role']
        })

        return user
    
    }

    public async show(id: string){

        const user = await context(User).findOne(id, {
            relations: ["role"]
        });
        
        if(isNullOrUndefined(user))
            return 'Usuario não encontado'

        return user
    }

    public async create(user: any){

        user.name = user.name.trim(' ');
        user.email = user.email.trim(' ');
        user.password = user.password.trim(' ');

        if(!user.name)
            return 'O nome é obrigatorio'
        if(!user.email)
            return 'O email é obrigatorio'
        if(!isNumber(user.role))
            return 'A role é obrigatorio'
        if(!isNumber(user.age))
            return 'A idade é obrigatoria'
        if(!user.password)
            return 'A senha é obrigatoria'

        const hash = await bcrypt.hash(user.password, 8);

        console.log(user)

        const newUser = await context(User).save({
            name: user.name,
            email: user.email,
            role: user.role,
            age: user.age,
            password: hash
        });

        

        return newUser;
    }

    public async update(id: string, user: any){

        const verifyUser = await context(User).findOne(id);

        if(isUndefined(verifyUser))
            return 'Usuario não encontrado'

        user.name = user.name.trim(' ');
        user.email = user.email.trim(' ');
        user.password = user.password.trim(' ');

        if(!user.name)
            return 'O nome é obrigatorio'
        if(!user.email)
            return 'O email é obrigatorio'
        if(!isNumber(user.role))
            return 'A role é obrigatorio'
        if(!isNumber(user.age))
            return 'A idade é obrigatoria'
        if(!user.password)
            return 'A senha é obrigatoria'

        const hash = await bcrypt.hash(user.password, 8);

        const oldUser = await context(User).update(id, {
            name: user.name,
            email: user.email,
            role: user.role,
            age: user.age,
            password: hash
        });

        if(oldUser.affected == 1)
            return await context(User).findOne(id);
        else
            return 'Parametros invalodos'
    }

    public async remove(id: string){
        
        const user = await context(User).delete(id);

        if(user.affected == 1){
            await context(User).findOne(id);
            return 'Usuario removido' 
        }else{
            return null;
        }

    }
}