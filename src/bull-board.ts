// bull-board.ts
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { Queue } from 'bull';

export function setupBullBoard(queue: Queue) {
  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath('/admin/queues');

  createBullBoard({
    queues: [new BullAdapter(queue)],
    serverAdapter,
  });

  return serverAdapter;
}
