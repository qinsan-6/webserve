// app的接口
import koaRouter from "koa-router";
import aiController from "../controller/aiController";
export const aiRouter = new koaRouter();

aiRouter.get("/ai/changemodel",aiController.changemodel); //切换ai模型
aiRouter.post("/ai",aiController.inquire)//ai对话
aiRouter.post("/ai/addplay",aiController.addplay);//添加玩法