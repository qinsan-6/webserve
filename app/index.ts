import dotenv from "dotenv"
dotenv.config()
import Koa from 'koa';
import router from './router'
import {Server} from'http'
import accessLogMiddleware from'./middleware/AccessLogMiddleware'
const app =new Koa;

app
    .use(accessLogMiddleware)
    .use(router.routes())

export const run=(port:any):Server=>{
    return app.listen(port);
}