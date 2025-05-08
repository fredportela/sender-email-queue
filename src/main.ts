// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupBullBoard } from './bull-board';
import { EmailService } from './email/email.service'; // ajuste para o seu caminho
import * as basicAuth from 'express-basic-auth';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = dotenv.config().parsed;
  
  const userAdmin = config?.ADMIN_USER || 'admin';
  const passAdmin = config?.ADMIN_PASS || '12345678';
  
  app.use(
    basicAuth({
      // @ts-ignore
      users: { [userAdmin as string]: `${passAdmin}` },
      challenge: true,
    }),
  );

  const emailService = app.get(EmailService);
  const serverAdapter = setupBullBoard(emailService['emailQueue']); // atenção: acesso direto ao Queue
  app.use('/admin/queues', serverAdapter.getRouter());

  await app.listen(3000);
}
bootstrap();
