import e from "express";

export class Msg {
  constructor() {
    this.code = 202;
    this.msg = "something err";
    this.data = null;
  }
  code: number;
  msg: string;
  data: any;
  setCode(code: number): Msg {
    this.code = code;
    return this;
  }
  setMsg(msg: string): Msg {
    this.msg = msg;
    return this;
  }
  setData(data: any): Msg {
    this.data = data;
    return this;
  }
  setByRestult(
    result: any,
    res: {
      code?: number;
      msg?: string;
    },
    err?: {
      code?: number;
      msg?: string;
    }
  ) {
    if (result) {
      if (res.code) this.setCode(res.code);
      if (res.msg) this.setMsg(res.msg);
      this.data = result;
    } else {
      if (err) {
        if (err.code) this.setCode(err.code);
        if (err.msg) this.setMsg(err.msg);
      }
    }
    return this;
  }
}
