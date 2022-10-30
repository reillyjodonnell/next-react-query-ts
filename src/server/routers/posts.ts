import { t } from '../trpc';
import { z } from 'zod';
import { prisma } from '~/server/prisma';

export const postsRouter = t.router({
  hello: t.procedure.query(() => 'aye!'),

  items: t.procedure
    .input(z.object({ text: z.string().nullish() }))
    .query(async ({ input }) => {
      const data = await prisma.product.findMany();
      return data;
    }),

  addItem: t.procedure
    .input(
      z.object({
        url: z.string().max(40).min(1),
        description: z.string().max(200).min(1),
        price: z.string().max(20),
      })
    )
    .mutation(async ({ input }) => {
      const data = await prisma?.product?.create({
        data: {
          description: input?.description,
          image:
            'https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          price: parseInt(input?.price),
          name: input?.description,
        },
      });
      return data;
    }),
});
