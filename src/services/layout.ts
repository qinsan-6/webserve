import LayoutModel from '../model/layout'

export class Layout{
    async getlayouts(){
        return await LayoutModel.findAll()
    }
    async addlayout(name:string){
        try {
            await LayoutModel.create({
                name
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