import {readFile}from 'node:fs'
import { Context } from 'node:vm';
import {readfileLogger}from '../logger'
import config from '../config'
// 判断参数是否为空，为空则返回flase
export function isempty<T extends string>(value: T): boolean {
    if(value === undefined || value === null || value === '') return true;
    return false
}

// 设置tokenmsg
type TokenMsg ={
    username:string,
    iat:number,
    exp:number,
    msg:string
}
export function settokenmsg(tokenmsg:TokenMsg,
msg:string,
username:string='',
iat:number=-1,
exp:number=-1,
):void{
tokenmsg.exp = exp;
tokenmsg.msg = msg;
tokenmsg.username = username;
tokenmsg.iat = iat;
}



// 读取文件
export function getnote(path:string){
    let readfile =  function(){
        return new Promise((resolve,reject)=>{
            readFile(path,'utf8',(err,data)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(data)
                    
                }
            })
        })
    }
    
    let read = async function*(){
        let data=  readfile();
        yield  
        let date = await data.then()
        yield date
        
    }
    return read

}

// 错误日志
export function readFilelog(err:Error):void{
    readfileLogger.info(err)
}


// 读取的全篇日记进行按字数裁剪
export function croppingbywords(note:string):Array<string>{
    let result = ['error'];
    let j =0 

    // 不根据字数裁剪，应该根据页数（页面结束标志 ‘pageendflag’ ）进行裁剪 
    let flag = config.keys.pageendflag
    if(flag){
        result =note.split(flag)
    }else{
        return ['标志获取失败']
    }
    
    return result
}
type reqdata={
    body:Bodydata;
    query:Querydata
    [key:string]:any
}


 type Querydata={
    notename?: string
    [key:string]:any
}

 type Bodydata={
    tokendata?: any
    note?: string
    [key:string]:any
}

// 从请求中取值，提取请求中的body数据
export function getfromreq(ctx:Context){
    let rule=['username', 'password']
    let data:reqdata = {
        body:{},
        query:{},
    }
    data.body = ctx.request.body
    data.query = ctx.query
   
    // 循环遍历body
    for(let key in data.body){
        
        //如果时对象就继续遍历
        if(typeof(data.body)[key] === 'object'){
            // 遍历对象
            let item  =(data.body)[key]
            // for(let keys in item ){
            //     console.log(item[keys])
            // }
        }
    }

    return data
}

// 输入的数组数据处理
export function Arraydata(arr: Array<string>):string{
    // 获取页面转换标志
    let pageflag = config.keys.pageendflag
    // 获取回车转换标志
    let enterflag=config.keys.enterflag
    let returndata=''
    if (pageflag&&enterflag){
        for (let i = 0; i < arr.length; i++) {
            // 替换字符串中的回车键
            arr[i].replace(/(\n|\r|\r\n|)/g,enterflag)
            // 在每页后面添加页面结束标志
            returndata+=arr[i]+pageflag
        }
            
    }else{
        return '标志获取失败'
    }
    
    return returndata
}

