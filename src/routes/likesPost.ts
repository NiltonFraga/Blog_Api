import { Router } from  'express';
import { create, getAll, remove}  from '../controller/LikesPostController'
import { checkJwt } from "../middlewares/checkJwt";
import { checkLikesPost } from "../middlewares/checkLikesPost";

const routerLikesPost = Router();

routerLikesPost.get('/likesPost', [checkJwt], getAll);
routerLikesPost.post('/likesPost', [checkJwt], create);
routerLikesPost.delete('/likesPost/:id', [checkJwt, checkLikesPost], remove);

export default routerLikesPost;