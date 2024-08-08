import koaRouter from 'koa-router';
import UserController from '../controller/UserController';
import { TokenCheckMiddleware } from '../middleware/TokenCheckMiddleware';

//检查请求token
// import {TokenCheckMiddleware}from'../middleware/TokenCheckMiddleware'
export const UserRouter = new koaRouter();

UserRouter.post('/user/login',UserController.login)//登陆
UserRouter.get('/user/silentlogin',TokenCheckMiddleware,UserController.silentlogin)//静默登陆
UserRouter.post('/user/register',UserController.register)//注册
