//玩法表模型

import { Model , DataTypes} from "sequelize";
import sequelize from "../sequelize";
sequelize.sync();
class User extends Model {
    declare id:string;
    declare name:string;
    declare password:string;
    declare phone:string;
    declare avatar:string;
    declare vip:boolean;
}

User.init({
    id:{
        type:DataTypes.STRING(20),
        primaryKey: true,
        unique: true,
        allowNull: false,
    },
    name:{
        type:DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    password:{
        type:DataTypes.STRING(100),
        allowNull: false,
    },
    phone:{
        type:DataTypes.STRING(11),
        allowNull: true,
        unique: true,
    },
    avatar:{
        type:DataTypes.STRING(200),
        allowNull: true,
    },
    vip:{
        type:DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
},{
    // 这是其他模型参数
    sequelize, // 我们需要传递连接实例
    modelName: 'tlp-users' // 我们需要选择模型名称
  })

export default  User;