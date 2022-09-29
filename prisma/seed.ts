import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function seed() {
  await Promise.all(
    seedProducts().map((product) => {
      return db.product.create({ data: product });
    })
  );
}

seed();

function seedProducts() {
  return [
    {
      name: 'Monstera 1',
      description: 'This is a beautiful plant',
      image:
        'https://images.pexels.com/photos/8903678/pexels-photo-8903678.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      price: 4000,
    },
    {
      name: 'Monstera 2',
      description: 'This is magnificent dark green',
      image:
        'https://images.pexels.com/photos/12210125/pexels-photo-12210125.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      price: 3000,
    },
  ];
}
