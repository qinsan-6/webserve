import { Context } from "Koa";
import { AiService } from "../services/index";

class Msg {
  constructor() {
    this.code = 202;
    this.msg = "something err";
    this.data = null;
  }
  code: 200 | 202 | 404;
  msg: string;
  data: any;
}
class AiController {
  changemodel(){}
  inquire(ctx:Context){
    let msg = new Msg();
    // 调用AI模型查询

    msg.code = 200;
    msg.data = "查询结果";
    msg.msg = "ok";
    ctx.body = msg;
  }
  async addplay(ctx:Context){
    let msg = new Msg();
    // 获取玩法信息
    let {name,template} = ctx.request.body;
    //检测数据是否为空
    if(!name||!template){
        msg.code = 404;
        msg.msg = "参数不能为空";
        ctx.body = msg;
        return;
    }
    // 调用AI模型检查玩法是否有��反常识
    // 调用Serve层方法添加玩法
    let data = await AiService.addPlay(name,template);
    if(data){
        msg.code = 200;
        msg.data = data;
        msg.msg = "添加成功";
    }
    ctx.body = msg;
  }
}

export default new AiController();