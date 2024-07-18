import { service } from "./index";
export function askai(question: string, model: string) {
    return new Promise<string>((resolve, reject) => {
        service.post("", {
            model: model,
            input: {
              prompt: "Human:" + question + "\n\nAssistant:",
            },
          }).then(res=>{
            resolve(res.data.output.text)
          },err=>{
            reject(err)
          })
    })
  
}
