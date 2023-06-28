// 数据合法性验证工具集

// 传入note数据合法性验证
export function noteValidation(note:any):boolean{
    if(typeof note !== "object"){
        return false;
    }
    return true
}