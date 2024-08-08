import config from "../config/";
import jwt from "jsonwebtoken";
import { Next, Context } from "koa";
// 检查token是否在有效期的中间件
export async function TokenCheckMiddleware(ctx: Context, next: Next) {
  const token = ctx.headers.authorization;
  if (token === undefined || token === "") {
    return (ctx.body = {
      msg: "请先登录",
    });
  }
  if (typeof token === "string") {
    jwt.verify(token, config.keys.tokenkey, (err: any, decoded: any) => {
      // err
      // decoded undefined
      if (err) {
        if (err.name === "TokenExpiredError") {
          return (ctx.body = {
            msg: "登陆失效",
            status: 202,
          });
          // 过期
        } else {
          return (ctx.body = {
            msg: "未知错误",
            status: 202,
          });
        }
      } else {
        // tonken解析成功，将解析数据放在ctx中
        ctx.request.body.tokendata = decoded;
        next();
      }
    });
  }
}
