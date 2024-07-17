import { Context } from "koa";
import { MajorService } from "../services/index";
import { Msg } from "../class";
import { ModifyMajor } from "../types";
class MajorsController {
  async add(ctx: Context) {
    //获取大类名
    let { name } = ctx.request.body;
    const msg = new Msg();
    //检测数据是否为空
    if (!name) {
        return ctx.body = msg.setCode(204).setMsg("参数不能为空");
    }
    //调用service层
    let result = await MajorService.addMajor(name);
    //返回结果
    msg.setByRestult(
      result,
      {
        code: 200,
        msg: "添加成功",
      },
      {
        code: 201,
        msg: "添加失败",
      }
    );
    ctx.body = msg;
  }

  async get(ctx: Context) {
    let msg = new Msg();
    let data = await MajorService.getMajor();
    msg.setByRestult(data, {
      code: 200,
      msg: "查询成功",
    });
    ctx.body = msg;
  }

  async modify(ctx: Context) {
    let reqBody:ModifyMajor = ctx.request.body;
    const msg = new Msg();
    if (!reqBody.id) {
      return ctx.body = msg.setCode(204).setMsg("参数不能为空");
    }
    let result = await MajorService.modifyMajor(reqBody);
    msg.setByRestult(
      result,
      {
        code: 200,
        msg: "修改成功",
      },
      {
        code: 202,
        msg: "修改失败",
      }
    );
    ctx.body = msg;
  }

  async delete(ctx: Context) {
    let id = ctx.request.query.id as string | undefined;
    const msg = new Msg();
    if (!id) {
      return ctx.body = msg.setCode(204).setMsg("参数不能为空");
    }
    let result = await MajorService.deleteMajor(id);
    msg.setByRestult(
      result,
      {
        code: 200,
        msg: "删除成功",
      },
      {
        code: 202,
        msg: "删除失败",
      }
    );
    ctx.body = msg;
  }
}

export default new MajorsController();
