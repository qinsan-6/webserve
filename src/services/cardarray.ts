import {
  ArrayInterface,
  ArrayOption,
  GetOption,
  ModifyOption,
  Option,
} from "../types";
import CardArrayModel from "../model/cardArray";
import { baseUrl } from "../config/config";
import path from "path";
import fs from "fs";

export class CardArray {
  async getarray(option: Option & GetOption) {
    let data: Array<CardArrayModel> = [];
    //查询数据库
    try {
      if(option.status == 1){
        data = await CardArrayModel.findAll({
          where: {
            module: option.module,
            inuse: true,
          },
        });
      }else if(option.status == 0){
        data = await CardArrayModel.findAll({
          where: {
            module: option.module,
            inuse: false,
          },
        });
      }else{
        data = await CardArrayModel.findAll({
          where: {
            module: option.module,
          },
        });
      }
      let sort: Array<CardArrayModel> = new Array<CardArrayModel>();
      for (let i = 0; i < data.length; i++) {
        data[i].src = baseUrl + `/cardArray/${data[i].src}`;
        if (i == 0) {
          sort.push(data[i]);
        } else {
          let len = sort.length;
          for (let j = 0; j < len; j++) {
            if (sort[j].pos > data[i].pos) {
              sort.splice(j, 0, data[i]);
              break;
            } else if (j == len - 1) {
              sort.push(data[i]);
            }
          }
        }
      }
      data = sort;
    } catch (error) {
      console.error(data);
    } finally {
      console.log()
      return data;
    }
  }

  async getLength() {
    return (await CardArrayModel.findAll()).length;
  }

  async sortAgain(index: number, module: string) {
    let arrays = await CardArrayModel.findAll({
      where: {
        module,
      },
    });
    arrays.forEach(async (item: CardArrayModel) => {
      //检查是否有同名
      if (item.pos < index) {
        return;
      } else {
        item.pos++;
        await item.save();
      }
    });
    return true;
  }

  async add(option: ArrayOption & ArrayInterface) {
    try {
      this.sortAgain(option.pos, option.module);
      await CardArrayModel.create({
        ...option,
      });
    } catch (error) {
      console.log(error);
      return null;
    }
    let array = await CardArrayModel.findOne({
      where: {
        id: option.id,
      },
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
        if (array.src != "") {
          let filepath = path.join(
            __dirname,
            "../public/cardArray/",
            array.src
          );
          fs.unlink(filepath, () => {});
        }
        await array.destroy();
      }
    } catch (error) {
      console.error(error);
      return null;
    }
    return "success";
  }

  async delImage(id: string) {
    try {
      let array = await CardArrayModel.findOne({
        where: {
          id: id,
        },
      });
      if (array && array.src != "") {
        let filepath = path.join(__dirname, "../public/cardArray/", array.src);
        fs.unlink(filepath, () => {});
        array.src = "";
        await array.save();
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
    return "success";
  }
}
