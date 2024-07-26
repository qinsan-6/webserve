import { Context } from "koa";
import { Msg } from "../class";
import { LayoutService } from "../services";
import { LayoutCard } from "../types";

class layoutController {
  async delete(ctx: Context) {
    let msg = new Msg();
    let id = ctx.request.query.id;
    if (!id) {
      msg.setCode(204).setMsg("参数不能为空");
      ctx.body = msg;
      return;
    }
    let result = await LayoutService.deletelayout(id as string);
    msg.setByRestult(result, {
      code: 200,
      msg: "删除成功",
    });
    ctx.body = msg;
  }
  async add(ctx: Context) {
    let msg = new Msg();
    let { name } = ctx.request.body;
    if (!name) {
      msg.setCode(204).setMsg("参数不能为空");
      ctx.body = msg;
      return;
    }
    let result = await LayoutService.addlayout(name);
    msg.setByRestult(result, {
      code: 200,
      msg: "添加成功",
    });
    ctx.body = msg;
  }
  async modify(ctx: Context) {
    let msg = new Msg();
    let { name, id } = ctx.request.body;
    if (!id || !name) {
      msg.setCode(204).setMsg("参数不能为空");
      ctx.body = msg;
      return;
    }
    let result = await LayoutService.modifylayout(id, name);
    msg.setByRestult(result, {
      code: 200,
      msg: "修改成功",
    });
    ctx.body = msg;
  }
  async get(ctx: Context) {
    let msg = new Msg();
    let result = await LayoutService.getlayouts();
    msg.setByRestult(result, {
      code: 200,
      msg: "查询成功",
    });
    ctx.body = msg;
  }

  async addcard(ctx: Context) {
    let msg = new Msg();
    let { id, name } = ctx.request.body;
    if (!id || !name) {
      msg.setCode(204).setMsg("参数不能为空");
      ctx.body = msg;
      return;
    }
    let result = await LayoutService.addcard(id, name);
    msg.setByRestult(result, {
      code: 200,
      msg: "添加成功",
    });
    ctx.body = msg;
  }

  async updatecard(ctx: Context) {
    let msg = new Msg();
    let { id, cards } = ctx.request.body;
    if (!id || !cards) {
      msg.setCode(204).setMsg("参数不能为空");
      ctx.body = msg;
      return;
    }
    //验证cards是否为 Array<LayoutCard>类型
    if (!Array.isArray(cards)) {
      msg.setCode(204).setMsg("cards参数格式不正确");
      ctx.body = msg;
      return;
    }
    let layoutCards: LayoutCard[] = [];
    try {
      cards.forEach((card) => {
        let result = {
          presrc: card.presrc?card.presrc:'/scrollCardBack.png',
          text: card.text?card.text:'',
          dirction: card.dirction?card.dirction:'bottom',
          aniName: card.aniName?card.aniName:'',
          style: {
            width: card.style.width?card.style.width:0,
            height: card.style.height?card.style.height:0,
            left: card.style.left?card.style.left:0,
            top: card.style.top?card.style.top:0,
            rotateZ: card.style.rotateZ?card.style.rotateZ:0,
          },
        };
        layoutCards.push(result);
      });

      let result = await LayoutService.updatecard(id, layoutCards);
        msg.setByRestult(result, {
          code: 200,
          msg: "修改成功",
        });
        ctx.body = msg;
    } catch (error) {
      msg.setCode(204).setMsg("cards参数格式不正确");
      ctx.body = msg;
      return;
    }

    
  }
}

export default new layoutController();
