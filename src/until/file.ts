// 文件操作类

import * as fs from 'fs'
import * as path from 'path'

export class FileUntil {
    changeName(path:string,newpath: string):boolean{
        //验证该路径下是否存在文件
        if(this.existFile(path)){
           fs.renameSync(path,newpath)
           return true
        }else{
            return false
        }
    }
    getPath(name:string):string | false{
        if(this.existFile(name)){
            return path.resolve(__dirname,'../../upload/'+name)
        }
        else {
            return false
        }
    }
    existFile(name:string):boolean{
        let filepath = name
        //判断传入是否为路径
        if(!name.includes('\\')){
            filepath = path.resolve(__dirname,'../../upload/'+name)
        }
        let ok = fs.existsSync(filepath)
        console.log('文件是否存在',ok,filepath)
        return ok
    }
    delFile(path:string):boolean{
        if(this.existFile(path)){
            fs.unlinkSync(path)
            return true
        }else{
            return false
        }
    }
}

