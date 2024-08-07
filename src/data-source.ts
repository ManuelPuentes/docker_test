
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();


export const AppDataSource: TypeOrmModuleOptions = {
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: true,
    entities: [],
    subscribers: [],
    migrations: [],
}

export default new DataSource(AppDataSource as DataSourceOptions)