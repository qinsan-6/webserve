
declare type CommoditData ={
    data: string[]
    total:number
}

declare interface RequestData {
    name: string;
    price: string
}


declare interface UserData {
    username: string;
    password: string;
}

declare type Message={
    msg:string;
}

declare type Querydata={
    notename?: string
}

declare type Bodydata={
    tokendata?: any
    note?: string
}