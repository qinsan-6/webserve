import { Model , DataTypes } from "sequelize";
import sequelize from "../sequelize";
sequelize.sync();
class Note extends Model {
    declare id:string;
    declare notes:string
}

Note.init({
    id:{
        type:DataTypes.UUID,
        autoIncrement: false,
        primaryKey: true,
        allowNull: false,
    },
    notes:{
        type:DataTypes.STRING,
        autoIncrement: false,
        primaryKey: false,
        allowNull: true,
    },
    
},{
    // 这是其他模型参数
    sequelize, // 我们需要传递连接实例
    modelName: 'note' // 我们需要选择模型名称
  })

export default  Note;