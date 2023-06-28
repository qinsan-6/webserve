import { randomUUID } from 'crypto';
import Video from '../model/video'
import * as fs from 'fs';  
import * as path from 'path'; 

//储存video数据资料
export function storagevideo() {

    //文件夹读取
    let dirpath = path.resolve(__dirname,'../public/img')
    console.log(dirpath)
    fs.readdir(dirpath,(err, files) => {
        if (err) {
            console.warn(err);
            return;
        }
        console.log(files)
        //   遍历读取到的文件名列表
          files.forEach(filename => {
            // path.join得到当前文件的绝对路径
            let videodata = {
                name: '',
                id: '',
                video: '',
                title: '',
                headimg: '',
                duration: 0,
                releasetime: 0,
                authorid: '',
            }
            videodata.name=filename
            videodata.id=randomUUID()
            videodata.title='测试官方上传文件'
            videodata.video=path.join('img/',filename)
            videodata.headimg=path.join('img/',filename)
            videodata.authorid='e9438204-2b06-47fb-bbe4-fc070ce21168'
            videodata.duration=Date.now() 
            videodata.releasetime=Date.now()
            Video.findOne({
                where: { name: videodata.name },
            }).then(async (user) => {
                if (!user) {
                    await Video.create(videodata)
                }
            })
            //  Video.create(videodata)
          });
    })

   

}