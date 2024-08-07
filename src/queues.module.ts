import {
    DynamicModule,
    Module,
    NestModule,
} from '@nestjs/common';
import { Queue } from 'bullmq';
import { BullModule } from '@nestjs/bullmq';
import appConfig from './app.config';
import { ConfigType } from '@nestjs/config';


@Module({})
export class QueuesModule implements NestModule {
    static register(): DynamicModule {
        const createCollectionQueue = BullModule.registerQueue({
            name: "CREATE_COLLECTION",
        });

        if (!createCollectionQueue.providers || !createCollectionQueue.exports) {
            throw new Error('Unable to build createCollectionQueue');
        }

        return {
            module: QueuesModule,
            imports: [
                BullModule.forRootAsync({
                    inject: [appConfig.KEY],
                    useFactory: (configService: ConfigType<typeof appConfig>) => ({
                        connection: {
                            host: configService.redisHost,
                            port: configService.redisPort,
                        },
                        defaultJobOptions: {
                            attempts: 3,
                            backoff: {
                                type: 'exponential',
                                delay: 1000,
                            },
                            removeOnComplete: true,
                        },
                    }),
                }),

            ],
            providers: [
                ...createCollectionQueue.providers,
            ],
            exports: [
                ...createCollectionQueue.exports,
            ],
        };
    }

    constructor(

    ) { }

    configure() {

    }
}