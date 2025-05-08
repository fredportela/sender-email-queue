// email.module.ts
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { EmailService } from './email.service';
import { EmailProcessor } from './email.processor';
import { EmailController } from './email.controller'; // adicionar

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'email-queue',
      defaultJobOptions: {
        removeOnComplete: 10,
        removeOnFail: 100,
        attempts: 2,
      }
    }),
  ],
  providers: [EmailService, EmailProcessor],
  controllers: [EmailController],
  exports: [EmailService],
})
export class EmailModule {}
