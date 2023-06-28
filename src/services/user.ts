import  UserModel  from '../model/user';
import jwt from 'jsonwebtoken'
import config from '../config'
import { randomUUID } from 'crypto';
interface Message{
   msg:string;
   status:number;
   token:string;
}
export class User {
   async login(username:string,password:string,nologinflag:boolean){
      let message:Message={
         status:202,
         msg:'',
         token:''
      } 
      await UserModel.findOne({
         where:{
            username,
         }
        }).then(user=>{
            if(user){
               
               if(user.password === password){
                  // 登录成功,根据是否选择30天免登录返回有效期是否为30天的tooken字段
                  let tokentime:string = '2h'
                  if(nologinflag){
                     tokentime = '30d'
                  }
                  const token =jwt.sign({
                     username,
                     nologinflag
                  },config.keys.tokenkey,{
                     expiresIn:tokentime
                  })
                  return message.msg='登录成功',message.status=200,message.token=token
               }
            }
            return  message.msg='密码错误或账号不存在'
        })
      return message
   }
   async register(username:string,password:string,surname:string,appellation:string){
      let message:Message={
         status:202,
         msg:'',
         token:''
      } 
      await UserModel.findOne({
         where: {username:username}
      }).then(async (user) => {
         if(!user){
            await UserModel.create({
               id:randomUUID(),
               username,
               password,
               surname,
               appellation,
               note:0
            }).then(()=>{
               // 注册成功，获取jwt
               const token =jwt.sign({
                  username,
                  surname,
               },config.keys.tokenkey,{
                  expiresIn:'2h'
               })
               message.status =200
               message.msg ='注册成功'
               message.token =token
            })
         }else{
               message.status =201
               message.token =''
               message.msg ='账户名已存在'
         }
      })
      return message
   }

   // 获取用户数据
   async getuser(username: string){
      
   }
}

