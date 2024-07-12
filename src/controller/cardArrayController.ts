//牌阵路由控制
import { Context } from "koa";
import { Msg } from "../class";
import { CardArrayService } from "../services";
import { ArrayOption, GetOption, Option } from "../types";
import { randomUUID } from "crypto";
import path from "path";
import { FileUntil } from "../until/file";
import { baseUrl } from "../config/config";
class CardArray {
  async getarray(ctx: Context) {
    let msg = new Msg();
    //获取query参数
    let query: GetOption = ctx.request.query;

    //默认配置
    const basicOption: Option = {
      start: 0,
      num: 10,
      status: 2,
    };

    //合并配置
    let option: Option = {
      ...basicOption,
      ...query,
    };

    //访问服务层获取牌阵
    let data = await CardArrayService.getarray(option);
    if (data) {
      msg.code = 200;
      msg.data = data;
      msg.msg = "success";
    }
    ctx.body = msg;
  }

  async addarray(ctx: Context) {
    let msg = new Msg();
    //获取传入牌阵信息
    let body: ArrayOption = ctx.request.body;
    let BasicArray: ArrayOption = {
      id: randomUUID(),
      name: "暂无",
      src: "",
      describe: "暂无描述",
      count: 0,
      inuse: 0,
      pos: (await CardArrayService.getLength()) + 1,
    };
    //将BasicArray中的数据替换为body中的相应数据
    let option = { ...BasicArray, ...body };
    let data =await CardArrayService.add(option);
    if (data) {
      msg.code = 200;
      msg.data = data;
      msg.msg = "success";
    }
    ctx.body = msg;
  }

  async modifyarray(ctx: Context) {
    //获取需要修改的参数
    let id: string = ctx.request.query.id as string;
    let msg = new Msg();
    let body = ctx.request.body;
    let data = await CardArrayService.modify(id, body);
    if (data) {
      msg.code = 200;
      msg.data = data;
      msg.msg = "success";
    }
    ctx.body = msg;
  }

  async upload(ctx: Context) {
    let id = ctx.request.body.id as string;
    let msg = new Msg();
    let fileUntil = new FileUntil();
    //获取文件名
    let filename = (ctx.request.files as any).file.newFilename;
    //获取图片路径
    let imagePath = fileUntil.getPath(filename);
    const newPath = path.join(__dirname, "../public/cardArray/", filename);
    //将图片复制到/src/public/cardArrry文件夹下
    if (imagePath) {
      fileUntil.changeName(imagePath, newPath);
      //删除原文件
      fileUntil.delFile(imagePath);
    }
    //更新数据库中的图片路径
    await CardArrayService.modify(id, { src: filename });
    msg.code = 200;
    msg.data = baseUrl + `/cardArray/${filename}`;
    msg.msg = "success";
    ctx.body = msg;
  }

  async del(ctx: Context){
    let id = ctx.request.query.id as string;
    let msg = new Msg();
    let data = await CardArrayService.delete(id);
    if(data){
      msg.code = 200;
      msg.data = data;
      msg.msg = "success";
    }
    ctx.body = msg;
  }

  async delImage(ctx: Context){
    let id = ctx.request.query.id as string;
    let msg = new Msg();
    let data = await CardArrayService.delImage(id);
    if(data){
      msg.code = 200;
      msg.data = data;
      msg.msg = "success";
    }
    ctx.body = msg;
  }
}

export default new CardArray();
