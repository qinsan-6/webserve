//将一些通用函数绑定到ctx当中

import { Next } from "koa";
import { Context } from "koa";

// TOD
function FunctionAddMiddleware(ctx:Context,next:Next){
    
    next()
}