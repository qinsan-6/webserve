import { ArrayOption, ModifyOption, Option } from "../types";
import CardArrayModel from "../model/cardArray";
import { baseUrl } from "../config/config";
import path from "path";
import fs from "fs";

export class CardArray {
  async getarray(option: Option) {
    let data: any = [];
    //查询数据库
    try {
      data = await CardArrayModel.findAll();
      data.forEach((item: CardArrayModel) => {
        //添加服务器访问地址
        item.src = baseUrl + `/cardArray/${item.src}`;
      });
    } catch (error) {
      console.log(data);
    } finally {
      return data;
    }
  }

  async getLength() {
    return (await CardArrayModel.findAll()).length;
  }

  async add(option: ArrayOption) {
    //查询数据库
    try {
      await CardArrayModel.create({
        ...option,
      });
    } catch (error) {
      console.log(error);
      return null;
    }
    let array = await CardArrayModel.findOne({
        where:{
            id:option.id
        }
    });
   let data = array?.dataValues;
    return data;
  }

  async modify(id: string, option: ModifyOption) {
    try {
      let array = await CardArrayModel.findOne({
        where: {
          id: id,
        },
      });
      if (array) {
        array.update(option);
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
    return "success";
  }

  async delete(id: string) {
    try {
      let array = await CardArrayModel.findOne({
        where: {
          id: id,
        },
      });
      if (array) {
        if(array.src!= ''){
            let filepath = path.join(__dirname, "../public/cardArray/", array.src);
            fs.unlink(filepath,()=>{});
        }
        await array.destroy();
      }
    } catch (error) {
        console.error(error);
      return null;
    }
    return "success";
  }

  async delImage(id: string){
    try {
      let array = await CardArrayModel.findOne({
        where: {
          id: id,
        },
      });
      if (array && array.src != '') {
        let filepath = path.join(__dirname, "../public/cardArray/", array.src);
        fs.unlink(filepath,()=>{});
        array.src = "";
        await array.save();
      }else{
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
    return "success";
  }
}
