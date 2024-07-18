import koaRouter from 'koa-router';
import layoutsController from '../controller/layoutController';
//检查请求token
// import {TokenCheckMiddleware}from'../middleware/TokenCheckMiddleware'
export const LayoutsRouter = new koaRouter();

LayoutsRouter.get('/layout/get',layoutsController.get) //获取布局组件信息
LayoutsRouter.get('/layout/delete',layoutsController.delete) //删除布局组件
LayoutsRouter.post('/layout/add',layoutsController.add) //添加布局组件
LayoutsRouter.post('/layout/modify',layoutsController.modify) //修改布局组件