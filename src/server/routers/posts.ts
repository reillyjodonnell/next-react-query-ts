import { t } from '../trpc';
import { z } from 'zod';
import { prisma } from '~/server/prisma';

export const postsRouter = t.router({
  hello: t.procedure.query(() => 'aye!'),

  items: t.procedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(async ({ input }) => {
      console.log(input.text);
      const data = await prisma.product.findMany();
      return data;
    }),

  addItem: t.procedure.input(z.object({text: z.string().max(20)})).mutation(async ({input}) => {
    console.log(input)
  })
});
