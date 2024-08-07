import { Context } from "koa";
import { CardsService } from "../services/index";
import { Msg } from "../class";
import { baseUrl } from "../config/config";
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
        let filename = (ctx.request.files as any).file.newFilename;
        const src = `/${filename}`;
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

    //替换图片路径
    data?.forEach(item=>{
      item.src =baseUrl + item.src.replace("http://192.168.0.237:5001",'')
    })
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
        msg.msg = '添加成功'
      }
    }
    ctx.body = msg
  }
}

export default new CardsController();
