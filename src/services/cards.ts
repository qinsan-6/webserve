import { randomUUID } from "crypto";
import CardsModel from "../model/cards";
import fs from 'fs'
import path from "path";
// 数据访问服务器
export class Cards {
  async add(src: string) {
    const id = randomUUID();
    try {
      await CardsModel.create({
        id: id,
        src: src,
        content: "该卡牌暂未上传解读",
        name:'暂无'
      });
    } catch (error) {
      return null;
    }
    return {
      id: id,
      src: src,
    };
  }
  async delete(id: string) {
    try {
      let card = await CardsModel.findOne({
        where: {
          id: id,
        },
      });
      if (card) {
        //删除图片文件
        let filepath = path.join(__dirname,card.dataValues.src.replace('http://192.168.0.237:5001','../../upload'))
        if(fs.existsSync(filepath)){
          fs.unlinkSync(filepath)
          card.destroy();
        }else{
          return null
        }
      }
    } catch (error) {
      return null;
    }
    //删除图片文件
    return "ok";
  }
  async find(type: string) {
    let Data: Array<any> = new Array();
    try {
      switch (type) {
        case "all":
          Data = await CardsModel.findAll();
          break;
      }
    } catch (error) {
      return null;
    }
    return Data;
  }
  async uploadUnscramble(id:string,unscramble:string,name:string){
    //查询id是否存在
    const card = await CardsModel.findOne({
      where:{
        id:id
      }
    })
    if(card){
      card.update({content:unscramble,name:name})
      return 'ok'
    }
    return null
  }
}
