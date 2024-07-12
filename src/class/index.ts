export class Msg {
  constructor() {
    this.code = 202;
    this.msg = "something err";
    this.data = null;
  }
  code: 200 | 202 | 404 | 204;
  msg: string;
  data: any;
}
