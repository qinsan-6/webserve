import { Context, Next } from "koa";
import { accessLogger } from "../logger";


 function accessLogMiddleware(ctx:Context,next:Next){
    let Str = `path:${ctx.path}`;
    accessLogger.info(Str)
    return next()
}

export default accessLogMiddleware