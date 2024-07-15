//牌阵模型

import { Model , DataTypes } from "sequelize";
import sequelize from "../sequelize";
sequelize.sync();

class CardArray extends Model {
    declare id: string;
    declare name: string;
    declare src: string;
    declare descript: string;
    declare count: number;
    declare inuse: boolean;
    declare pos:number;
    declare module: string;
}

CardArray.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: false
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    src: {
        type: DataTypes.STRING(200),
        allowNull: true
    },
    descript: {
        type: DataTypes.STRING(200),
        allowNull: true
    },
    count: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    inuse: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    pos: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    module: {
        type: DataTypes.UUID,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'tlp-cardarrays' // 表名
});

export default CardArray;