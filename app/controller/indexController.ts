import { Context } from "koa";

class IndexController{
    async index(ctx:Context){
        let commoditData={num:10}
        ctx.body = commoditData
    }
}

export default new IndexController