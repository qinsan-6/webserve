import { Context } from "koa";
import { UserService } from "../services/index";
import { Msg } from "../class";
import { nameValidation, passwordValid } from "../until/legitimacy";
class UserController {
  /**
   * 用户登录接口
   * @returns token 用户的主token 时限30天
   */
  async login(ctx: Context) {
    // 获取用户参数
    let { username, password } = ctx.request.body;
    // 验证数据是否为空
    if (!username || !password) {
      ctx.body = new Msg().setCode(204).setMsg("参数不能为空");
      return;
    }
    //检验用户名称是否合法
    if (nameValidation(username)) {
      ctx.body = new Msg().setCode(204).setMsg("用户名格式不正确");
      return;
    }
    // 验证用户密码是否合法
    if (passwordValid(password)) {
      ctx.body = new Msg().setCode(204).setMsg("密码格式不正确");
      return;
    }

    // 调用service层
    let result = await UserService.login(username, password);

    // 登录成功，返回token
    ctx.body = result;
  }

  async register(ctx: Context) {
    // 获取用户参数
    let { username, password } = ctx.request.body;
    // 验证数据是否为空
    if (!username || !password) {
      ctx.body = new Msg().setCode(204).setMsg("参数不能为空");
      return;
    }
    //检验用户名称是否合法
    if (nameValidation(username)) {
      ctx.body = new Msg().setCode(204).setMsg("用户名格式不正确");
      return;
    }
    // 验证用户密码是否合法
    if (passwordValid(password)) {
      ctx.body = new Msg().setCode(204).setMsg("密码格式不正确");
      return;
    }
    // 调用service层
    let result = await UserService.register(username, password);
    // 注册成功，返回token
    ctx.body = result;
  }

  async silentlogin(ctx: Context) {
    //获取解析的用户数据
    let { id } = ctx.request.body.tokendata;

    // 调用service层
    let result = await UserService.getUser(id);
    
     ctx.body = {
        code: 200,
        msg: "success",
        data: result,
     };
     console.log(ctx.body)
  }
}

export default new UserController();
