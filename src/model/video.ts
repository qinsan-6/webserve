import { Model , DataTypes } from "sequelize";
import sequelize from "../sequelize";
// sequelize.sync({ force: true });
class Video extends Model {
    declare name:string;
    declare id:string;
    declare video:string;
    declare title:string;
    declare headimg: string;
    declare duration:string;
    declare releasetime:number;
    declare authorid:number;
    author: any;
}

Video.init({
    name:{
        type:DataTypes.STRING,
        autoIncrement: false,
        primaryKey: false,
        allowNull: false
    },
    id:{
        type:DataTypes.UUID,
        autoIncrement: false,
        primaryKey: true,
        allowNull: false,
    },
    video:{
        type:DataTypes.STRING,
        autoIncrement: false,
        primaryKey: false,
        allowNull: false
    },
    title:{
        type:DataTypes.STRING,
        autoIncrement: false,
        primaryKey: false,
        allowNull: false
    },
    headimg:{
        type:DataTypes.STRING,
        autoIncrement: false,
        primaryKey: false,
        allowNull: false
    },
    duration:{
        type:DataTypes.STRING,
        autoIncrement: false,
        primaryKey: false,
        allowNull: false
    },
    releasetime:{
        type:DataTypes.CHAR,
        autoIncrement: false,
        primaryKey: false,
        allowNull: false
    },
    authorid:{
        type:DataTypes.UUID,
        autoIncrement: false,
        primaryKey: false,
        allowNull: false
    }
},{
    // 这是其他模型参数
    sequelize, // 我们需要传递连接实例
    modelName: 'video' // 我们需要选择模型名称
})
export default  Video;