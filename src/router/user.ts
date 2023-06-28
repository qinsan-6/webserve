import koaRouter from 'koa-router';
import UserController from '../controller/UserController';

export const UserRouter = new koaRouter();

UserRouter.post('/login',UserController.login)
UserRouter.post('/tokenlogin',UserController.tokenlogin)
UserRouter.post('/register',UserController.register)


 