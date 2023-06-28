import koaRouter from 'koa-router';
import publicController from '../controller/publicController';
export const PublicRouter = new koaRouter();

PublicRouter.get('/public/icons',publicController.getIcons)
PublicRouter.get('/public/videos',publicController.getvideos)