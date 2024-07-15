import { Context } from "Koa";
import { AiService } from "../services/index";

class Msg {
  constructor() {
    this.code = 202;
    this.msg = "something err";
    this.data = null;
  }
  code: 200 | 202 | 404 | 204;
  msg: string;
  data: any;
}
class AiController {
  changemodel(){}
  async inquire(ctx:Context){
    let msg = new Msg();

    //获取用户参数
    let {name,cardNames,question} = ctx.request.body;

    // 检查数据是否为空
    if(!name||!question||!cardNames){
        msg.code = 204;
        msg.msg = "参数不能为空";
        ctx.body = msg;
        return;
    }
    // 调用Serve层方法查询结果
    let data = await AiService.inquire((name as string),(cardNames as any),(question as any));
    if(!data){
        msg.code = 404;
        msg.msg = "error";
        ctx.body = msg;
        return;
    }

    msg.code = 200;
    msg.data = data;
    msg.msg = "success";
    ctx.body = msg;
  }
  async addplay(ctx:Context){
    let msg = new Msg();
    // 获取玩法信息
    let {name,template,status} = ctx.request.body;
    //检测数据是否为空
    if(!name||!template){
        msg.code = 204;
        msg.msg = "参数不能为空";
        ctx.body = msg;
        return;
    }
    // 调用AI模型检查玩法是否有��反常识
    // 调用Serve层方法添加玩法
    let data = await AiService.addPlay(name,template,status);
    if(data){
        msg.code = 200;
        msg.data = data;
        msg.msg = "添加成功";
    }
    ctx.body = msg;
  }
}

export default new AiController();