// import AppModel from "../model/app";
import CardsModel from "../model/cards";
import { getRandomInt } from "../until/Math";
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
}
