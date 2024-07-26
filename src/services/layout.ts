import { randomUUID } from 'crypto'
import { baseUrl } from '../config/config'
import LayoutModel from '../model/layout'
import { LayoutCard, LayoutInfo } from '../types'

export class Layout{
    async getlayouts(){
        let layouts =  await LayoutModel.findAll()
        layouts.forEach(lay =>{
            if( lay.dataValues.card){
                lay.dataValues.card  = JSON.parse(lay.dataValues.card) 
                for (let i = 0; i < lay.dataValues.card.length; i++){
                    lay.dataValues.card[i].presrc = baseUrl +  lay.dataValues.card[i].presrc
                }
            }
        })
        return layouts
    }
    async addlayout(name:string){
        try {
            let layout = await LayoutModel.findOne({where:{
                name
            }})
            if(layout){
                return null
            }
            await LayoutModel.create({
                name,
                id:randomUUID(),
            })
        } catch (error) {
            console.error(error)
            return null
        }
       
        return 'success'
    }

    async deletelayout(id:string){
        try {
            let layout = await LayoutModel.findOne({
                where:{
                    id
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

    async modifylayout(id:string,name:string){
        try {
            let layout = await LayoutModel.findOne({
                where:{
                    id
                }
            })
            if(layout){
                layout.name = name
                await layout.save()
                return'success'
            }
            return null
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async addcard(id:string,name:string){
        try {
            let layout = await LayoutModel.findOne({
                where:{
                    id
                }
            })
            if(layout){
                let card:LayoutCard = {
                    presrc: '/scrollCardBack.png',
                    text: name,
                    dirction: 'bottom',
                    aniName: '',
                    style: {
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0,
                        rotateZ: 0,
                    },
                }
                let cards = JSON.parse(layout.card)
                if(!cards){
                    cards = []
                }
                cards.push(card)
                layout.card = JSON.stringify(cards)
                await layout.save()
                return'success'
            }
            return null
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async updatecard(id:string, cards:Array<LayoutCard>){
        try {
            let layout = await LayoutModel.findOne({
                where:{
                    id
                }
            })
            if(layout){
                layout.card = JSON.stringify(cards)
                await layout.save()
                return'success'
            }
            return null
        } catch (error) {
            console.error(error)
            return null
        }
    }
}