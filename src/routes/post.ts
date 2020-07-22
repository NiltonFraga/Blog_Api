import { Router } from  'express';
import { create, getAll, getById, remove, update}  from '../controller/PostController'
import { checkJwt } from "../middlewares/checkJwt";
import { checkUserPost } from "../middlewares/checkUserPost";

const routerPost = Router();

routerPost.get('/post', [checkJwt], getAll);
routerPost.get('/post/:id', [checkJwt], getById);
routerPost.post('/post', [checkJwt], create);
routerPost.put('/post/:id', [checkJwt, checkUserPost], update);
routerPost.delete('/post/:id', [checkJwt, checkUserPost], remove);

export default routerPost;