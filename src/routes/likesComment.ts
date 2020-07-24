import { Router } from  'express';
import { create, getAll, remove}  from '../controller/LikesCommentController'
import { checkJwt } from "../middlewares/checkJwt";
import { checkLikesComment } from "../middlewares/checkLikesComment";

const routerlikesComment = Router();

routerlikesComment.get('/likesComment', [checkJwt], getAll);
routerlikesComment.post('/likesComment', [checkJwt], create);
routerlikesComment.delete('/likesComment/:id', [checkJwt, checkLikesComment], remove);

export default routerlikesComment;