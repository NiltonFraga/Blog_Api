import { Router } from  'express';
import { create, getAll, remove, update}  from '../controller/RoleController'
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const routerRole = Router();

routerRole.get('/role', [checkJwt], getAll);
routerRole.post('/role', [checkJwt, checkRole(["ADMIN"])], create);
routerRole.put('/role/:id', [checkJwt, checkRole(["ADMIN"])], update);
routerRole.delete('/role/:id', [checkJwt, checkRole(["ADMIN"])], remove);

export default routerRole;