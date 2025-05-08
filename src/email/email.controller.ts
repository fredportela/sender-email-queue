// email.controller.ts
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  /*
  @Get('failed')
  async getFailedEmails() {
    const failedJobs = await this.emailService.getFailedEmails();
    return failedJobs.map((job) => ({
      id: job.id,
      data: job.data,
      failedReason: job.failedReason,
      attemptsMade: job.attemptsMade,
    }));
  }

  @Post('retry/:id')
  async retryFailedEmail(@Param('id') id: string) {
    await this.emailService.retryFailedEmail(id);
    return { message: `Retry solicitado para o job ${id}` };
  }

  @Delete('remove/:id')
  async removeJob(@Param('id') id: string) {
    await this.emailService.removeJob(id);
    return { message: `Job ${id} removido da fila.` };
  }
  */
  @Post('send')
  async send(@Body() body: { to: string; subject: string; message: string }) {
    await this.emailService.sendEmail( body.to, body.subject, body.message);
    return { message: 'Email enviado para a fila!' };
  }
  
}
