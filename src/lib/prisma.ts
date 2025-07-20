// Prisma Client singleton
import { PrismaClient } from '@prisma/client';

// PrismaClient global instance
declare global {
  var prisma: PrismaClient | undefined;
}

// PrismaClient singleton
export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma;
