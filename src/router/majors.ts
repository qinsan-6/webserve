import koaRouter from 'koa-router';
import MajorsController from '../controller/MajorsController';
//检查请求token
// import {TokenCheckMiddleware}from'../middleware/TokenCheckMiddleware'
export const MajorsRouter = new koaRouter();

MajorsRouter.post('/majors/add',MajorsController.add)//添加大类
MajorsRouter.get('/majors/get',MajorsController.get)//添加大类
MajorsRouter.post('/majors/modify',MajorsController.modify)//修改大类
MajorsRouter.get('/majors/delete',MajorsController.delete)//删除大类