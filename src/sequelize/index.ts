import { Sequelize } from 'sequelize';
import config  from '../config';

// 创建sequelize实例 用于连接数据库
const sequelize = new Sequelize(config.db.database as string,config.db.username as string,'lanmugua',{
    host: 'localhost',
    port:3306,
    dialect: 'mysql',/* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
});


export default sequelize



