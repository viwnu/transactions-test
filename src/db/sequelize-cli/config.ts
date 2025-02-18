import { Dialect } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config({
  path: `.env.${process.env.NODE_ENV.trim()}`,
});

interface ISequelizeConfig {
  dialect: Dialect;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  logging?: boolean;
}

const config: ISequelizeConfig = {
  dialect: 'postgres',
  host: process.env.PS_HOST || 'localhost',
  port: Number(process.env.PS_PORT) || 5432,
  username: process.env.PS_USER || 'postgres',
  password: process.env.PS_PASSWORD || '',
  database: process.env.PS_DB_NAME || '',
};

export = config;
