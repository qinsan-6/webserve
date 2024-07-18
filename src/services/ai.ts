import PlayModule from "../model/play";
import { askai } from "../axios/api";
import { FreeModelName } from "../config/config"
export class Ai {
  async addPlay(name: string, template: Array<string>,status:number) {
    let templateJson = JSON.stringify(template);
    try {
      await PlayModule.create({
        name: name,
        template: templateJson,
        ai: FreeModelName[0],
        status: status,
      });
      return "success";
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async inquire(
    name: string,
    cards: Array<string>,
    question: string
  ) {
    let result: string | null = "";
    try {
      let play = await PlayModule.findOne({
        where: {
          name: name,
        },
      });

      if (play != null) {
        let template = await JSON.parse(play.template);
        //遍历模板
        let aimodel = play.ai;
        // 循环遍历template
        for (let i = 0; i < template.length; i++) {
          let item = template[i];
          //遍历卡片名
          cards.forEach((card) => {
            //将模板中的”塔罗牌“替换成卡牌名
            item = item.replace("$&", card);
          });

          //将模板中的问题替换成用户问题
          item = item.replace("$?", question);
          console.log("template", item);

          // 向ai发送请求
          let res = await askai(item, aimodel)

          if(res == null){
            console.log(res)
            //ai回答异常
            result = null;
            break 
          }else {
            result += res;
          }
          
        }
      } else {
        result = null;
      }
    } catch (error) {
      console.log(error);
      result = null;
    } finally {
      return result;
    }
  }
}
