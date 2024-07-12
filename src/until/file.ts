// 文件操作类

import * as fs from 'fs'
import * as path from 'path'

export class FileUntil {
    /**
     * 
     * @param path 文件路径
     * @param newpath  新路径
     * @returns 
     */
    changeName(path:string,newpath: string):boolean{
        try {
           fs.renameSync(path,newpath)
        } catch (error) {
            console.error(error)
            return false
        }
        return true
    }
    /**
     * 获取upload下指定文件的路径
     * @param name 文件名
     * @returns 
     */
    getPath(name:string):string | false{
        try {
            return path.resolve(__dirname,'../../upload/'+name)
        } catch (error) {
            return false
        }
    }
    /**
     * 判断指定文件或者指定路径下是否存在
     * @param name 文件名或路径
     * @returns 
     */
    existFile(name:string):boolean{
        let filepath = name
        //判断传入是否为路径
        if(!name.includes('\\')){
            filepath = path.resolve(__dirname,'../../upload/'+name)
        }
        let ok = fs.existsSync(filepath)
        return ok
    }
    /**
     * 删除指定文件
     * @param path 文件路径
     * @returns 
     */
    delFile(path:string):boolean{
        if(this.existFile(path)){
            fs.unlinkSync(path)
            return true
        }else{
            return false
        }
    }
}

