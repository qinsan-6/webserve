// import AppModel from "../model/app";
import CardsModel from "../model/cards";
import { getRandomInt } from "../until/Math";
import AppModule from "../model/app"
export class App {
  async random(num: number) {
    let data: Array<CardsModel> = [];
    let cards: Array<CardsModel> = [];
    try {
      cards = await CardsModel.findAll();
    } catch (error) {
      return null;
    }

    for (let i = 0; i < num; i++) {
      data.push(cards[getRandomInt(0, cards.length - 1)]);
    }
    return data;
  }

  async upload(name:string){
     //查询id是否存在
     const app = await AppModule.findOne({
      where:{
        name:name
      }
    })
    if(app){
      app.update({})
      return 'ok'
    }
    return null
  }
  
  async createOne(name:string,describe:string,page:number){
    let app =await AppModule.findOne({
      where:{
        name:name,
        page:page
      }
    })
    if(!app){
      AppModule.create({
        name:name,
        describe:describe,
        page:page
      })
      return 'success'
    }
    return null
  }

  async getAll(){
    let app = await AppModule.findAll()
    return app
  }
}
