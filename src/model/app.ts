import { Model , DataTypes} from "sequelize";
import sequelize from "../sequelize";
sequelize.sync();
class App extends Model {
    declare name:string;
    declare describe:string;
    declare page:number;
}

App.init({
    name:{
        type:DataTypes.STRING,
        autoIncrement: false,
        primaryKey: false,
        allowNull: false,
    },
    describe:{
        type:DataTypes.STRING,
        autoIncrement: false,
        primaryKey: false,
        allowNull: true,
    },
    page:{
        type:DataTypes.STRING,
        autoIncrement: false,
        primaryKey: false,
        allowNull: false,
    }
},{
    // 这是其他模型参数
    sequelize, // 我们需要传递连接实例
    modelName: 'tlp-apps' // 我们需要选择表名称
  })

export default  App;