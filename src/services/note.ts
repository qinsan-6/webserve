import { readFileSync ,writeFileSync,mkdirSync,rmdir}from "fs";
import {readFilelog,croppingbywords}from '../until'
import {resolve} from 'node:path'


// 数据访问服务器
export class Note {
    // 获取note目录下目标txt文件内容
    getOneNote(path:string){
        let paths =resolve(__dirname,'../note/'+path+'.txt')
        let result : string=''
        try {
            result = readFileSync(paths,'utf-8')
        } catch (error) {
            readFilelog(error as Error)
        }
        // 数据裁剪
        let res = croppingbywords(result)
        return res
    }
    // 修改数据
    modifynote(path:string,data:any):boolean{
        let result : boolean = true
        const paths =resolve(__dirname,'../note/'+path+'.txt')
        try {
            // 重写文件之前需要检测目标文件是否存在
            readFileSync(paths)

            // 重写文件，如果文件不存在则会重新创建，但不能重新创建文件夹
            writeFileSync(paths,data,'utf-8')
        } catch (error) {
            console.log(error)
            result = false
        }
        return result
    }
    // 创建文件夹
    createfolder(name: string){
        let path = resolve(__dirname,'../note',name)
        try {
            mkdirSync(path)
        } catch (error) {
            throw error
        }
    }
    //删除文件夹
    refolder(name: string){
        let path = resolve(__dirname,'../note',name)
        rmdir(path,()=>{
            
        })
    }
}

