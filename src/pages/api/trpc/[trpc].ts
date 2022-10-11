import { initTRPC } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';
import { prisma } from '../../../server/prisma';
import { appRouter } from '~/server/routers/_app';
import { createContext } from '~/server/context';
export const t = initTRPC.create();

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});
