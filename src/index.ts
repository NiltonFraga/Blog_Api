import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import routerLogin from './routes/login';
import routerUser from './routes/user';
import routerRole from './routes/role';

const app = express();

createConnection();

app.use(express.json());
app.use(routerLogin);
app.use(routerUser);
app.use(routerRole);

app.listen(3333);
