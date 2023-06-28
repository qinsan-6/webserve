import { Context } from "koa";
// 导入User服务器
import {publicService} from "../services"
class PublicController {
    getIcons(ctx:Context){
        //获取query参数
        let query = ctx.query
        if (query.type === undefined){
            return ctx.body={
                msg:"error"
            }
        }
        
        switch(query.type){
            case "switch" :publicService.getSwitch(ctx);return;
            case "middle" :publicService.getMiddle(ctx);return;
            case "channel":publicService.getChannel(ctx);return;
        }
    }
    async getvideos(ctx:Context){
        let query = ctx.query
        if (query.type === undefined){
            return ctx.body={
                msg:"error"
            }
        }
        
        switch(query.type){
            case "index" :await publicService.getIndexVideo(ctx);return;
        }
    }
}


export default new PublicController