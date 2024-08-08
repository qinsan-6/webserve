// 数据合法性验证工具集
import jwt from "jsonwebtoken";
import config from "../config";
import bcrypt from 'bcrypt'

// 传入note数据合法性验证
export function noteValidation(note: any): boolean {
  if (typeof note !== "object") {
    return false;
  }
  return true;
}

/**
 * 创建token
 * @param data token携带的数据
 * @param time 有效时间 单位小时 默认 720h
 * @returns token 生成的token
 */
export function createdToken(data: object, time = 720): string {
  const token = jwt.sign(data, config.keys.tokenkey, { expiresIn: time + "h" });
  return token;
}

/**
 * 验证用户名合法性
 *@param username 用户名
 @returns boolean 是否合法
 */
export function nameValidation(username: string) {
  //   let reg = /^([\u4e00-\u9fa5]{1,20}|[a-zA-Z\.\s]{1,20})$/;
  // 1、不能有特殊字符和数字；
  // 2、可以输入英文，可以有空格，可以输入英文名字中的点；
  // 3、可以输入汉字；
  // 4、中文英文不能同时出现；
  // 5、长度在1-20；
  const regex = /[!@#$%^&*(),.?|<>{}]/; //是否存在特殊字符
  if (regex.test(username)) {
    return false;
  }
  let reg = /[^0-9a-zA-Z\u4e00-\u9fa5\_]/; //验证中文、数字、字母、下划线正则
  return reg.test(username);
}

/**
 *验证密码合法性
 * @param password 密码
 */
export function passwordValid(password: string): boolean {
  let regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
  return regex.test(password);
}

/**
 * 用户密码加密
 */
export async function encryptPassword(password: string){
    const salt = await bcrypt.genSalt(config.keys.hashSalt)
    return bcrypt.hashSync(password, salt);
}
/**
 * 验证密码是否正确
*/
export async function validatePassword(password: string, hashedPassword: string){
    return bcrypt.compareSync(password, hashedPassword);
}