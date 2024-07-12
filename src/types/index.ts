export interface GetOption {
    start?:number;
    num?:number;
    status?: 0 | 1 | 2; //0 未使用 1正在使用 2全部
}
export type Option = {
    start:number;
    num:number;
    status: 0 | 1 | 2; //0 未使用 1正在使用 2全部
}

export type ArrayOption = {
    id:string;
    name:string,
    src:string,
    describe:string,
    count:number,
    inuse:number,
    pos?:number,
}

export type ModifyOption ={
    name?:string,
    src?:string,
    describe?:string,
    inuse?:number,
    pos?:number,
}