import { Model, DataTypes } from "sequelize";
import sequelize from "../sequelize";
sequelize.sync();

class Layout extends Model {
  declare name: string;
  declare card:string;
  declare play:number;
  declare updatedAt:string;
  declare createdAt: string;
  declare id:string;
}

Layout.init(
  {
    name: {
      type: DataTypes.STRING,
      primaryKey: false,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      autoIncrement: false,
      primaryKey: true,
      allowNull: false,
    },
    card: {
      type: DataTypes.STRING,
      autoIncrement: false,
      primaryKey: false,
      allowNull: true,
    },
    play: {
      type: DataTypes.INTEGER,
      primaryKey: false,
      allowNull: true,
    }
  },
  {
    // 这是其他模型参数
    sequelize, // 我们需要传递连接实例
    modelName: "tlp-layouts", // 我们需要选择表名称
  }
);

export default Layout;