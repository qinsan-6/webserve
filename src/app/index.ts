import dotenv from "dotenv"
dotenv.config()
import Koa from 'koa';
import KoaBody from 'koa-body';
import serve from"koa-static";
import path from "path";

// 路由导入
import {UserRouter} from '../router'
import {DataRouter} from '../router'
import {PublicRouter} from '../router'
import {Server} from'http'
import accessLogMiddleware from'../middleware/AccessLogMiddleware'

// import Video from "../model/video";
// Video.sync({ force: true })
// import {storagevideo} from'../until/video'
// storagevideo()


const app =new Koa;
app
    .use(serve(path.join(__dirname,'../public')))
    .use(KoaBody())
    .use(accessLogMiddleware)
    .use(UserRouter.routes())
    .use(DataRouter.routes())
    .use(PublicRouter.routes())
export const run=(port:any):Server=>{
    return app.listen(port);
}


