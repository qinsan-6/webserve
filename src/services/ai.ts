import PlayModule from "../model/play";
import { askai } from "../axios/api";
import { AILogger } from "../logger";
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
          AILogger.info('用户提问为'+ item);

          // 向ai发送请求
          let res = await askai(item, aimodel)

          if(res == null){
            AILogger.error('ai回复异常'+ res);
            //ai回答异常
            result = null;
            break 
          }else {
            AILogger.info('ai回复为'+ res);
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

  async getPlay(){
    let plays = await PlayModule.findAll();
    plays.forEach(play =>{
      play.template = JSON.parse(play.template);
    })
    return plays;
  }

  async modifyPlay(id:number,data:{
    template?:string;
    status?:number;
  }){
    let play = await PlayModule.findOne({
      where:{
        id
      }
    })
    if(play){
      if(data.template){
        let template = JSON.parse(play.template);
        template[0] = data.template;
        play.template = JSON.stringify(template);
      }
      if(data.status){
        play.status = data.status;
      }
      play.save()
      return play
    }
    return null;
  }

  deletePlay(id:number){
    return PlayModule.destroy({
      where:{
        id
      }
    })
  }
}
