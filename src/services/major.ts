// import AppModel from "../model/app";
import { randomUUID } from "crypto";
import MajorsModule from "../model/major";
export class Major {
  async addMajor(name: string) {
    try {
      //查询id是否存在
      const major = await MajorsModule.findOne({
        where: {
          name: name,
        },
      });
      if (!major) {
        await MajorsModule.create({
          id: randomUUID(),
          name: name,
        });
        return true;
      }
    } catch (error) {
        console.error(error);
        return null;
    }
    return null;
  }

  async getMajor(){
    return await MajorsModule.findAll();
  }

  async modifyMajor(name: string,id: string){
    try {
      let major = await MajorsModule.findOne({
        where: {
          id
        },
      });
      if (major) {
        major.update({
          name
        });
        return true;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
    return null;
  }

  async deleteMajor(id:string){
    try {
      let major = await MajorsModule.findOne({
        where: {
          id
        },
      });
      if (major) {
        major.destroy();
        return true;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
    return null;
  }
}
