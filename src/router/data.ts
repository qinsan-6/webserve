import koaRouter from 'koa-router';
import dataController from '../controller/dataController';
import {TokenCheckMiddleware}from'../middleware/TokenCheckMiddleware'
export const DataRouter = new koaRouter();

DataRouter.get('/data/note',TokenCheckMiddleware,dataController.getnote)
DataRouter.get('/data/delnote',TokenCheckMiddleware,dataController.delnote)
DataRouter.get('/data/addnote',TokenCheckMiddleware,dataController.addnote)
DataRouter.post('/data/write',TokenCheckMiddleware,dataController.writenote)
DataRouter.post('/data/save',TokenCheckMiddleware,dataController.save)