
import koaRouter from 'koa-router';
import indexController from '../controller/indexController';
const router = new koaRouter();

router.get('/commoditData',indexController.index)

export default router