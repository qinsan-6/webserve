export interface GetOption {
    module:string;
    start?:number;
    num?:number;
    status?: 0 | 1 | 2; //0 未使用 1正在使用 2全部
}
export type Option = {
    start:number;
    num:number;
    status: 0 | 1 | 2; //0 未使用 1正在使用 2全部
}

export interface ArrayInterface{
    name?:string,
    describe?:string,
    inuse?:boolean,
    module:string,
    pos:number
}

export type ArrayOption = {
    id:string;
    src:string,
    describe:string,
    count:number,
    inuse:boolean,
    name:string
}

export type ModifyOption ={
    name?:string,
    src?:string,
    describe?:string,
    inuse?:number,
    pos?:number,
}

export interface ModifyMajor{
    id:string;
    name?:string;
    content?:string;
    question?:{
        type:'add' | 'delete',
        value:string,
    }
}