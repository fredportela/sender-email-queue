import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Processor('email-queue')
export class EmailProcessor {

  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {

    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: parseInt(this.configService.get<string>('SMTP_PORT') || '587', 10),
      secure: this.configService.get<string>('SMTP_SECURE') === 'true', // se true, usa TLS direto
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
    });
  }

  @Process('send-email')
  async handleSendEmail(job: Job<{ to: string; subject: string; body: string }>) {
    
    const { to, subject, body } = job.data;
    
    try {
      await this.transporter.sendMail({
        from: this.configService.get<string>('SMTP_FROM') || 'PUSH <no-reply@datalegis.net>',
        to,
        subject,
        text: body,
      });
      console.log(`Email enviado para ${to}`);
    } catch (error) {
      console.error(`Erro ao enviar e-mail para ${to}:`, error.message);
      throw error;
    }
  }

}
