import { Context } from "koa";
import {noteService}from '../services'
import {noteValidation}from '../until/legitimacy'
import {getfromreq,Arraydata} from '../until'
class dataController {
    // 获取用户笔记
    async getnote(ctx: Context){
        // 文件路径组合
        
        let reqdata = getfromreq(ctx)
        const username=reqdata.body.tokendata.username;;
        const notename=reqdata.query.notename;
        if(username ===undefined||notename ===undefined){
            return ctx.body={
                msg:'error'
            }
        }
        let path =username+'/'+notename
        // 访问serve层获取相关数据
        let res = noteService.getOneNote(path)
        ctx.body={
            res
        }
    }

    //暂时抛弃的接口
    async  writenote(ctx: Context){

        const {note} =ctx.request.body
        // 检测数据是否合法
        if(noteValidation(note)){
            // 合法
            // 数组数据处理
            let notedata = Arraydata(note)
            const result = noteService.modifynote('onepiese/note',notedata)
            if(result){
                // 写入文件成功
                ctx.body={
                    status : 200,
                    msg:'ok'
                }
            }else{
                ctx.body={
                    status : 202,
                    msg:'服务器错误'
                }
            }
        } else{
            ctx.body={
                status : 202,
                msg:'数据输入有误'
            }
        }
    }


    //保存日记数据的接口
    async save(ctx: Context){
        const {note} =ctx.request.body
       
            // 合法
            // 数组数据处理
            const result = noteService.modifynote('onepiese/note',note)
            if(result){
                // 写入文件成功
                ctx.body={
                    status : 200,
                    msg:'ok'
                }
            }else{
                ctx.body={
                    status : 202,
                    msg:'服务器错误'
                }
            }
    }


    async addnote(){
        noteService.createfolder('mugua')
    }
    // 删除某一笔记本
    async delnote(ctx: Context){
        const name = ctx.request.body.name;
        
    }
}


export default new dataController