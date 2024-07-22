// app的接口
import koaRouter from "koa-router";
import aiController from "../controller/aiController";
export const aiRouter = new koaRouter();

aiRouter.get("/ai/changemodel",aiController.changemodel); //切换ai模型
aiRouter.post("/ai",aiController.inquire)//ai对话
aiRouter.post("/ai/addplay",aiController.addplay);//添加玩法
aiRouter.get("/ai/get",aiController.get); //获取玩法信息
aiRouter.post("/ai/modify",aiController.modify); //修改玩法信息
aiRouter.get("/ai/delete",aiController.delete); //删除指定玩法