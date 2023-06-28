import { Model , DataTypes } from "sequelize";
import sequelize from "../sequelize";
// sequelize.sync({ force: true });
class User extends Model {
    declare username:string;
    declare password:string;
    declare id:string;
    declare surname: string;
    declare appellation:string;
    declare note:number;
}

User.init({
    id:{
        type:DataTypes.UUID,
        autoIncrement: false,
        primaryKey: true,
        allowNull: false,
    },
    username:{
        type:DataTypes.STRING,
        autoIncrement: false,
        primaryKey: false,
        allowNull: false
    },
    password:{
        type:DataTypes.STRING,
        autoIncrement: false,
        primaryKey: false,
        allowNull: false
    },
    surname:{
        type:DataTypes.STRING,
        autoIncrement: false,
        primaryKey: false,
        allowNull: false
    },
    appellation:{
        type:DataTypes.STRING,
        autoIncrement: false,
        primaryKey: false,
        allowNull: false
    },
    note:{
        type:DataTypes.CHAR,
        autoIncrement: false,
        primaryKey: false,
        allowNull: false
    }
},{
    // 这是其他模型参数
    sequelize, // 我们需要传递连接实例
    modelName: 'user' // 我们需要选择模型名称
})

export default  User;