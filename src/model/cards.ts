import { Model , DataTypes} from "sequelize";
import sequelize from "../sequelize";
sequelize.sync();
class Cards extends Model {
    declare id:string;
    declare notes:string;
    declare content:string;
}

Cards.init({
    id:{
        type:DataTypes.UUID,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    src:{
        type:DataTypes.STRING,
        autoIncrement: false,
        primaryKey: false,
        allowNull: false,
    },
    content:{
        type:DataTypes.TEXT,
        autoIncrement: false,
        primaryKey: false,
        allowNull: false,
    },
    name:{
        type:DataTypes.STRING,
        autoIncrement: false,
        primaryKey: false,
        allowNull: true,
    }
},{
    // 这是其他模型参数
    sequelize, // 我们需要传递连接实例
    modelName: 'tlp-cards' // 我们需要选择模型名称
  })

export default  Cards;