import dotenv from "dotenv"
dotenv.config()
import Koa from 'koa';
import KoaBody from 'koa-body';
import serve from"koa-static";
import path from "path";
import cors from 'koa2-cors'
// 路由导入
import {CardsRouter,AppRouter,aiRouter} from '../router'
import {Server} from'http'
import accessLogMiddleware from'../middleware/AccessLogMiddleware'

const app =new Koa;
app
    .use(cors())
    .use(serve(path.join(__dirname,'../public')))
    .use(serve(path.join(__dirname,'../../upload')))
    .use(KoaBody({
        multipart:true,
        formidable:{
            uploadDir:'./upload',
            keepExtensions:true
        }
    }))
    .use(accessLogMiddleware)
    .use(CardsRouter.routes())
    .use(AppRouter.routes())
    .use(aiRouter.routes())
export const run=(port:any):Server=>{
    return app.listen(port);
}


