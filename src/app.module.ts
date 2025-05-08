import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('REDIS_HOST') || 'localhost',
          port: parseInt(configService.get<string>('REDIS_PORT') || '6379', 10),
          username: configService.get<string>('REDIS_USERNAME'),
          password: configService.get<string>('REDIS_PASSWORD'),
          enableReadyCheck: false,
          tls: configService.get<string>('REDIS_TLS_ENABLED') === 'true' ? {} : undefined,
        },
      }),
    }),
    
    EmailModule,
  ],
})
export class AppModule {}
