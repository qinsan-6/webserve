// app的接口
import koaRouter from 'koa-router';
import AppController from '../controller/appController';
//检查请求token
// import {TokenCheckMiddleware}from'../middleware/TokenCheckMiddleware'
export const AppRouter = new koaRouter();

AppRouter.get('/app/randomone',AppController.randomOne)//上传图片
// AppRouter.get('/cards/findAll',CardsController.getAll)//查询全部图片