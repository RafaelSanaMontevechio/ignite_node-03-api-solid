import { randomUUID } from 'node:crypto';
import { Gym, Prisma } from '@prisma/client';

import { GymsRepository } from '@/repositories/gyms-repository';

export class InMemoryGymsRepository implements GymsRepository {
  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitute.toString()),
      longitude: new Prisma.Decimal(data.longitute.toString()),
      created_at: new Date(),
    };

    //@ts-ignore
    this.items.push(gym);
    //@ts-ignore
    return gym;
  }
  public items: Gym[] = [];

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }
}
