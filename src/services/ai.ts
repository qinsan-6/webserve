import PlayModule from "../model/play"
export class Ai {
    async addPlay(name: string,template:Array<string>){
        try {
            await PlayModule.create({
                name:name,
                template:JSON.stringify(template),
                ai:"play"
            })
            return 'success'
        } catch (error) {
            console.error(error)
            return null;
        }
    }
}
