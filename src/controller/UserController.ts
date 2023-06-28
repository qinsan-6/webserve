import { Context } from "koa";
import {isempty} from "../until";
import {dbLogger} from '../logger'
import config from "../config/"
import jwt from 'jsonwebtoken'
import {settokenmsg}from '../until'
// 导入User服务器
import {userService} from "../services"
class UserController {

    // 使用账号密码登录
    async login(ctx: Context){
        
        // console.log(ctx.request.body);
        const {username,password,freelogin} = ctx.request.body
        let nologinflag = false; //三十天免登录标志
        // 判断数据是否为空
        console.log(username, password)
        if (isempty(username) || isempty(password)) {
            return ctx.body={
                msg:"请输入账号或密码"
            }
        }
        // 判断是否勾选三十天免登录
        if(!isempty(freelogin)&&freelogin==='true'){
            nologinflag = true
        }
        const msg =await userService.login(
            username,
            password,
            nologinflag
        )
        dbLogger.info(`账户${username}申请登录,申请结果为:${msg.msg}`)
        ctx.body = msg
    }
    // 使用token登录
    async tokenlogin(ctx: Context){
        const token = ctx.request.header.authorization
        if(token !== undefined){
            let tokenmsg={username:''}
            jwt.verify(token,config.keys.tokenkey,(err:any, decoded:any)=> {
                // err
                // decoded undefined
                if(err){
                    let msg={
                        username:'',
                        iat:-1,
                        exp:-1,
                        msg:''
                    }
                    console.log(err.name)
                    if(err.name === 'TokenExpiredError'){
                        // 过期
                        settokenmsg(msg,'token已过期')
                    }else if(err.name === 'JsonWebTokenError'){
                        settokenmsg(msg,'无效token')
                    }else{
                        settokenmsg(msg,err.name)
                    }
                    return tokenmsg = msg
                }
                return tokenmsg = decoded
            })
            if(tokenmsg.username!==''){
                return ctx.body={
                    status: 200,
                    msg:'登录成功'
                }
            }
            ctx.body={
                status: 202,
                ...tokenmsg
            }
        }
    }
    
    async register(ctx: Context) {
        const {username, password,surname,appellation} = ctx.request.body;
        ctx.body = await userService.register(username, password,surname,appellation)
    }
}


export default new UserController