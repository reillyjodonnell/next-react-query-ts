// This file contains the root router of your tRPC-backend

import { t } from '../trpc';
import { healthRouter } from './health';
import { postsRouter } from './posts';

export const appRouter = t.router({
  posts: postsRouter,
  health: healthRouter,
});

export type AppRouter = typeof appRouter;
