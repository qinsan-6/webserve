// app的接口
import koaRouter from 'koa-router';
import AppController from '../controller/appController';
//检查请求token
// import {TokenCheckMiddleware}from'../middleware/TokenCheckMiddleware'
export const AppRouter = new koaRouter();

AppRouter.get('/app/randomone',AppController.randomOne)//随机获取一张塔罗牌
AppRouter.post('/app/upload',AppController.upload)//上传小程序资源
AppRouter.post('/app/createOne',AppController.createOne)//创建小程序资源
AppRouter.get('/app/findAll',AppController.getAll)//查询全部资源
AppRouter.get('/app/getlayoutinfo',AppController.getlayout)//获取牌阵布局组件信息