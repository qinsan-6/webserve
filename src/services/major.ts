// import AppModel from "../model/app";
import { randomUUID } from "crypto";
import MajorsModule from "../model/major";
import CardArrayModule from "../model/cardArray";
import { ModifyMajor } from "../types";
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
          question:JSON.stringify([]),
        });
        return true;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
    return null;
  }

  async getMajor() {
    let data: any = [];
    const majors = await MajorsModule.findAll();
    //for循环遍历majors
    for (let i = 0; i < majors.length; i++) {
      let array = await CardArrayModule.findAll({
        where: {
          module: majors[i].id,
        },
      });
      data.push({
        id: majors[i].id,
        name: majors[i].name,
        content: majors[i].content,
        question: JSON.parse(majors[i].question),
        num: array.length,
        updatedAt:majors[i].updatedAt,
        createdAt:majors[i].createdAt,
      });
    }
    return data;
  }

  async modifyMajor(body: ModifyMajor) {
    try {
      let major = await MajorsModule.findOne({
        where: {
          id: body.id,
        },
      });
      if (major) {
        const changeQuestion = {
          add(value: string) {
            if (major) {
              let question = JSON.parse(major.question);
              question.push(value);
              major.question = JSON.stringify(question);
            }
          },
          delete(value: string) {
            let indexValue = Number(value);
            if (major) {
              let question = JSON.parse(major.question);
              if (indexValue < 0 || indexValue >= question.length) return;
              question.splice(indexValue, 1);
              major.question = JSON.stringify(question);
            }
          },
        };
        if (body.name) {
          major.name = body.name;
        }
        if (body.content) {
          major.content = body.content;
        }
        if (body.question) {
          changeQuestion[body.question.type].call(null, body.question.value);
        }
        await major.save();

        return true;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
    return null;
  }

  async deleteMajor(id: string) {
    try {
      let major = await MajorsModule.findOne({
        where: {
          id,
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
