import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost', 
  port: 5432, 
  username: 'postgres', 
  password: 'password', 
  database: 'logistics', 
});

export default sequelize;
