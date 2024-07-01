import koaRouter from 'koa-router';
import CardsController from '../controller/cardsController';
//检查请求token
// import {TokenCheckMiddleware}from'../middleware/TokenCheckMiddleware'
export const CardsRouter = new koaRouter();
      
CardsRouter.post('/cards/upload',CardsController.upload)//上传图片
CardsRouter.get('/cards/findAll',CardsController.getAll)//查询全部图片
CardsRouter.get('/cards/delete',CardsController.delete)//删除图片
CardsRouter.post('/cards/upload/unscramble',CardsController.uploadUnscramble)//上传解读