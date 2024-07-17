import { Model, DataTypes } from "sequelize";
import sequelize from "../sequelize";
sequelize.sync();
class Majors extends Model {
  declare id: number;
  declare name: string;
  declare content:string;
  declare question:string;
  declare updatedAt:string;
  declare createdAt: string;
}

Majors.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      autoIncrement: false,
      primaryKey: false,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      autoIncrement: false,
      primaryKey: false,
      allowNull: true,
    },
    question: {
      type: DataTypes.TEXT,
      autoIncrement: false,
      primaryKey: false,
      allowNull: true,
    },
  },
  {
    // 这是其他模型参数
    sequelize, // 我们需要传递连接实例
    modelName: "tlp-majors", // 我们需要选择模型名称
  }
);

export default Majors;
