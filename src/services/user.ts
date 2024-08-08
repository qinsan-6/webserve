import UserModule from "../model/user";
import { Msg } from "../class";
import { createdToken, encryptPassword, validatePassword } from '../until/legitimacy'

export class User {
  async login(username:string, password:string){
    //查询用户是否存在
    let user = await UserModule.findOne({
      where:{
        name:username,
      }
    });
    if(user){
      //对比密码是否正确
      if(await validatePassword(password,user.password)){
        return new Msg().setCode(200).setMsg('登录成功').setData({
          ...user.dataValues,
          password:'',
          token: createdToken({username:username, id:user.id}),
        })
      }
        return new Msg().setCode(300).setMsg('密码错误').setData({})
    }
    return new Msg().setCode(404).setMsg('用户不存在').setData({})
  }

  async register(username:string, password:string){
    //查询用户是否存在
    let user = await UserModule.findOne({
      where:{
        name:username
      }
    });
    if(user){
      return new Msg().setCode(400).setMsg('用户已存在').setData({})
    }
    function generateId(): string {
      const now = Date.now().toString(); // 获取当前时间戳的字符串形式
      const randomPart = Math.floor(Math.random() * 900000000).toString(); // 生成一个0到900000000之间的随机数
      return (now + randomPart).substring(0, 9); // 拼接并截取前9位
  }
    password = await encryptPassword(password)
    //创建新用户
    let newUser = await UserModule.create({
      id:generateId(),
      name:username,
      password: password,
      vip:false
    });
    return new Msg().setCode(200).setMsg('注册成功').setData({
       ...newUser.dataValues,
      password:'',
      token: createdToken({
        username: username,
        id: newUser.id,
      }),
    })
  }

  async getUser(id:string){
    let user = await UserModule.findOne({
      where:{
        id:id
      }
    });
    if(user){
      return user.dataValues
    }
    return null
  }
}
