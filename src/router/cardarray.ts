// app的接口
import koaRouter from 'koa-router';
import CardArrayController from '../controller/cardArrayController';
//检查请求token
// import {TokenCheckMiddleware}from'../middleware/TokenCheckMiddleware'
export const CardArrayRouter = new koaRouter();

CardArrayRouter.get('/cardarray/get',CardArrayController.getarray)//获取牌阵
CardArrayRouter.post('/cardarray/add',CardArrayController.addarray)//添加牌阵
CardArrayRouter.post('/cardarray/modify',CardArrayController.modifyarray)//修改牌阵
CardArrayRouter.post('/cardarray/upload',CardArrayController.upload)//上传牌阵图片
CardArrayRouter.get('/cardarray/del',CardArrayController.del)//删除牌阵
CardArrayRouter.get('/cardarray/delImage',CardArrayController.delImage)//删除牌阵资源