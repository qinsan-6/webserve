import { Model, DataTypes } from "sequelize";
import sequelize from "../sequelize";
sequelize.sync();

class Layout extends Model {
  declare name: string;
  declare serial: number;
  declare updatedAt:string;
  declare createdAt: string;
}

Layout.init(
  {
    name: {
      type: DataTypes.STRING,
      primaryKey: false,
      allowNull: false,
    },
    serial: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    // 这是其他模型参数
    sequelize, // 我们需要传递连接实例
    modelName: "tlp-layouts", // 我们需要选择表名称
  }
);

export default Layout;