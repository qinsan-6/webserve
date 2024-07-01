import { Context } from "Koa";
import { AppService } from "../services/index";
class Msg {
    constructor(){
        this.code = 202
        this.msg =  "something err"
        this.data = null
    }
  code: 200 | 202 | 404;
  msg: string;
  data: any;
}
class AppController {
  //随机获取一张塔罗牌
  async randomOne(ctx:Context){
    let msg = new Msg()
    const data = await AppService.random(1);
    if(data){
        msg.code = 200
        msg.data = data[0]
        msg.msg = 'ok'
    }
    ctx.body = msg
  }
}

export default new AppController();
