import { Context } from "Koa";
import { AiService } from "../services/index";
import { Msg } from "../class";

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
    if(!status){
      status = 1;
    }
    // 调用Serve层方法添加玩法
    let data = await AiService.addPlay(name,template,status);
    if(data){
        msg.code = 200;
        msg.data = data;
        msg.msg = "添加成功";
    }
    ctx.body = msg;
  }
  
  async get(ctx: Context){
    let msg = new Msg();
    let data = await AiService.getPlay();
    msg.setByRestult(data, {
      code: 200,
      msg: "查询成功",
    });
    ctx.body = msg;
  }

  async modify(ctx: Context){
    let msg = new Msg();
    let id = ctx.request.query.id as any as number;
    let body = ctx.request.body
    if(!id){
      msg.setCode(204).setMsg("参数不能为空");
      ctx.body = msg;
      return;
    }

    let data = await AiService.modifyPlay(id,body);
    msg.setByRestult(data,{
      code: 200,
      msg: "修改成功"
    })
    ctx.body = msg;
  }

  async delete(ctx: Context){
    let id = ctx.request.query.id as any as number
    let msg = new Msg();
    if(!id){
      msg.setCode(204).setMsg("参数不能为空");
      ctx.body = msg;
      return;
    }
    let data =await AiService.deletePlay(id);
    if(data > 0){
      msg.setCode(200).setMsg('删除成功').setData(data);
    }
    ctx.body = msg;
  }
}

export default new AiController();