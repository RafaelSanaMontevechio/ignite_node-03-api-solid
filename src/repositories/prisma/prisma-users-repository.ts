//Repository pattern
import { Prisma } from '@prisma/client';

import { prisma } from '@/lib/prisma';
import { UsersRepository } from '../users-repository';
import { GetResult } from '@prisma/client/runtime/library';

export class PrismaUsersRepository implements UsersRepository {
  async findById(userId: string) {
    throw new Error('Method not implemented.');
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
}
