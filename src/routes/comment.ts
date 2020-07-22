import { Router } from  'express';
import { create, getById, remove, update}  from '../controller/CommentController'
import { checkJwt } from "../middlewares/checkJwt";
import { checkUserComment } from "../middlewares/checkUserComment";

const routerComment = Router();

routerComment.get('/comment/:id', [checkJwt], getById);
routerComment.post('/comment', [checkJwt], create);
routerComment.put('/comment/:id', [checkJwt, checkUserComment], update);
routerComment.delete('/comment/:id', [checkJwt, checkUserComment], remove);

export default routerComment;