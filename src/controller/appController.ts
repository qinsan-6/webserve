import { Context } from "Koa";
import { AppService } from "../services/index";
import { FileUntil } from "../until/file";
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
class AppController {
  //随机获取一张塔罗牌
  async randomOne(ctx: Context) {
    let msg = new Msg();
    const data = await AppService.random(1);
    if (data) {
      msg.code = 200;
      msg.data = data[0];
      msg.msg = "ok";
    }
    ctx.body = msg;
  }
  async upload(ctx: Context) {
    let msg = new Msg();
    const fileUntil = new FileUntil();
    try {
      if ("files" in ctx.request) {
        //获取传入的文件名
        let fileName = ctx.request.body.name;
        //获取保存的文件名
        let savename = (ctx.request.files as any).file.newFilename;
        //获取原文件路径
        let filepath = fileUntil.getPath(fileName);
        //获取保存文件路径
        let savepath = fileUntil.getPath(savename);
        if (filepath && savepath) {
          //删除原文件
          fileUntil.delFile(filepath)
          //修改文件名
          fileUntil.changeName(savepath, filepath);
          const data = await AppService.upload(fileName);
          if(data){
            msg.code = 200
            msg.data = data
            msg.msg = 'uploaded'
          }
        } else {
          console.log("File不存在", filepath, savepath);
        }
      }
    } catch (error) {
      //打印错误日志
    }
    
    ctx.body = msg;
  }
  async createOne(ctx: Context){
    let msg = new Msg()
    // 获取带后缀的资源名，以及描述
    const { name,describe,page } = ctx.request.body
    //判断是否为空
    if(name&&describe){
      //调用服务层
      const data = await AppService.createOne(name,describe,page)
      if(data){
        msg.code = 200
        msg.data = data
        msg.msg = 'success'
      }
    }
    return ctx.body = msg
  }

  async getAll(ctx: Context){
    let msg = new Msg()
    const data = await AppService.getAll()
    if(data){
      msg.code = 200
      msg.data = data
      msg.msg = 'ok'
    }
    return ctx.body = msg
  }
}

export default new AppController();
