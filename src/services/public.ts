import { Context } from "koa";
import Video from "../model/video";
import User from "../model/user";
import config from "../config";
// 数据访问服务器
export class Public {
    getSwitch(ctx: Context){
        return ctx.body={
            data:[{
                src: 'http://127.0.0.1:5001/svg/next.svg',
                text:'关注'
            },
            {
                src: 'http://127.0.0.1:5001/svg/previous.svg',
                text:'收起'
            },
        ]
        }
    }
    getMiddle(ctx: Context){
        return ctx.body={
            data:[
                {
                    src: 'http://127.0.0.1:5001/svg/popular.svg',
                    titile: '热门',
                    color: 'red',
                },
                {
                    src: 'http://127.0.0.1:5001/svg/trends.svg',
                    titile: '动态',
                    color: 'yellow',
                }
            ]
        }
    }
    getChannel(ctx: Context){
        return ctx.body={
            data:[
                {
                    src:'http://127.0.0.1:5001/svg/activity.svg',
                    text:'活动'
                },
                {
                    src:'http://127.0.0.1:5001/svg/channel.svg',
                    text:'频道'
                },
                {
                    src:'http://127.0.0.1:5001/svg/classroom.svg',
                    text:'课堂'
                },
                {
                    src:'http://127.0.0.1:5001/svg/community.svg',
                    text:'社区'
                },
                {
                    src:'http://127.0.0.1:5001/svg/hotsong.svg',
                    text:'新歌热榜'
                },{
                    src:'http://127.0.0.1:5001/svg/live.svg',
                    text:'直播'
                }
            ]
        }
    }
    async getIndexVideo(ctx: Context){
        //读取video全部内容
        await Video.findAll().then(async (data)=>{
            //循环遍历data
            ctx.body = {
                data:await data.forEach(async (video)=>{
                
                    //修正文件路径
                    let filepath = video.video.replace('\\', '/')
                    video.video=config.server.server +filepath
                    video.headimg=config.server.server +filepath
                    await User.findOne({where:{id:video.authorid}}).then((user) =>{
                        video.author=user
                    })
                })
            } 
            
        })
    }
}

