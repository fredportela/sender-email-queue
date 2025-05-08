// email.service.ts
import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue, Job } from 'bull';

@Injectable()
export class EmailService {
  constructor(@InjectQueue('email-queue') private emailQueue: Queue) {}

  async sendEmail(to: string, subject: string, body: string) {
    try {
      await this.emailQueue.add(
        'send-email',
        { to, subject, body },
        { attempts: 2, backoff: 5000 }
      );
    } catch (erro) {
      console.error('Erro ao adicionar trabalho:', erro);
      throw erro;
    }
  }

  async getFailedEmails(): Promise<Job[]> {
    return await this.emailQueue.getFailed();
  }

  async retryFailedEmail(jobId: string) {
    const job = await this.emailQueue.getJob(jobId);
    if (!job) {
      throw new Error('Job não encontrado');
    }
    await job.retry();
  }

  async removeJob(jobId: string) {
    const job = await this.emailQueue.getJob(jobId);
    if (!job) {
      throw new Error('Job não encontrado');
    }
    await job.remove();
  }
}
