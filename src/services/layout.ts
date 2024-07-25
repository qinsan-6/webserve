import { baseUrl } from '../config/config'
import LayoutModel from '../model/layout'
import { LayoutCard, LayoutInfo } from '../types'

export class Layout{
    async getlayouts(){
        let layouts =  await LayoutModel.findAll()
        layouts.forEach(lay =>{
            lay.dataValues.card  = JSON.parse(lay.dataValues.card) 
            console.log(lay.dataValues.card)
            for (let i = 0; i < lay.dataValues.card.length; i++){
                lay.dataValues.card[i].presrc = baseUrl +  lay.dataValues.card[i].presrc
            }
            
        })
        return layouts
    }
    async addlayout(name:string){
        try {
            let layouts = await LayoutModel.findAll()
            await LayoutModel.create({
                name,
                serial: layouts.length 
            })
        } catch (error) {
            console.error(error)
            return null
        }
       
        return 'success'
    }

    async deletelayout(serial:number){
        try {
            let layout = await LayoutModel.findOne({
                where:{
                    serial
                }
            })
            if(layout){
                await layout.destroy()
                return 'success'
            }
            return null
        } catch (error) {
            console.error(error)
            return null            
        }
    }

    async modifylayout(serial:number,name:string){
        try {
            let layout = await LayoutModel.findOne({
                where:{
                    serial
                }
            })
            if(layout){
                layout.name = name
                layout.save()
                return'success'
            }
            return null
        } catch (error) {
            console.error(error)
            return null
        }
    }
}