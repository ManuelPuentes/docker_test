import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './data-source';
import { BullModule } from '@nestjs/bullmq';

import { ConfigModule, ConfigType } from '@nestjs/config';
import appConfig from './app.config';
import { QueuesModule } from './queues.module';

@Module({
  imports: [

    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
    }),

    // postgres connection
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...AppDataSource,
      }),
    }),

    // redis connection
    QueuesModule.register(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
