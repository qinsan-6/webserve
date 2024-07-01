import { Context } from "koa";
import { CardsService } from "../services/index";
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
interface Unscramble {
  id:string
  data:string
  name:string
}
class CardsController {
  // 上传塔罗牌  每次只处理单张文件
  async upload(ctx: Context) {
    let msg = new Msg();
    try {
      if ("files" in ctx.request) {
        console.log(ctx.request.files)
        let filename = (ctx.request.files as any).file.newFilename;
        const src = `http://192.168.0.237:5001/${filename}`;
        //将图片信息保存至数据库
        let data = await CardsService.add(src);
        if(data){
          msg.code = 200
          msg.data = data
          msg.msg = 'uploaded'
        }
      }
    } catch (error) {
      //打印错误日志
    }
     
    ctx.body = msg;
  }
  //删除塔罗牌
  async delete(ctx: Context) {
    let msg = new Msg()
    let id = ctx.request.query.id
    if(id){
        let data = await CardsService.delete((id as string))
        if(data){
            msg.code = 200
            msg.data = data
            msg.msg = 'fine'
        }
    }
    return ctx.body = msg
  }
  //查询全部塔罗牌数据
  async getAll(ctx: Context) {
    let msg = new Msg()
    let data = await CardsService.find('all')
    if(data){
        msg.code = 200
        msg.data = data
        msg.msg = 'fine'
    }
    return ctx.body = msg
  }
  //上传塔罗牌解读
  async uploadUnscramble(ctx: Context) {
    let msg = new Msg()
    //id，解读
    let {id,data,name} = (ctx.request.body as Unscramble)
    if(id&&data){ //暂时不对具体内容做检测
      if(name == '') name='暂无'
      let message = await CardsService.uploadUnscramble(id,data,name)
      if(message){
        msg.code = 200
        msg.data = 'ok'
        msg.msg = '添加解读成功'
      }
    }
    ctx.body = msg
  }
}

export default new CardsController();
