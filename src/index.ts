import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import routerLogin from './routes/login';
import routerUser from './routes/user';
import routerRole from './routes/role';
import routerPost from './routes/post';
import routerComment from './routes/comment';
import routerLikesPost from './routes/likesPost';
import routerLikesComment from './routes/likesComment';

const app = express();

createConnection();

app.use(express.json());

app.use(routerLogin);
app.use(routerUser);
app.use(routerRole);
app.use(routerPost);
app.use(routerComment);
app.use(routerLikesPost);
app.use(routerLikesComment);

app.listen(3333);
