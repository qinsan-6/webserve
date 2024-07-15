//玩法表模型

import { Model , DataTypes} from "sequelize";
import sequelize from "../sequelize";
sequelize.sync();
class Plays extends Model {
    declare id:number;
    declare name:string;
    declare template:string;
    declare ai:string;
    declare status:number;
}

Plays.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    name:{
        type:DataTypes.STRING,
        autoIncrement: false,
        primaryKey: false,
        allowNull: false,
    },
    template:{
        type:DataTypes.JSON,
        autoIncrement: false,
        primaryKey: false,
        allowNull: false,
    },
    ai:{
        type:DataTypes.STRING,
        autoIncrement: false,
        primaryKey: false,
        allowNull: false,
    },
    status:{
        type:DataTypes.INTEGER,
        autoIncrement: false,
        allowNull:false
    }
},{
    // 这是其他模型参数
    sequelize, // 我们需要传递连接实例
    modelName: 'tlp-plays' // 我们需要选择模型名称
  })

export default  Plays;