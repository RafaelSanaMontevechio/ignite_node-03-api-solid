import { Gym } from '@prisma/client';
import { GymsRepository } from '@/repositories/gyms-repository';

interface CreateGymUseCaseParams {
  title: string;
  description: string | null;
  phone: string | null;
  latitute: number;
  longitute: number;
}

interface CreateGymUseCaseResponse {
  gym: Gym;
}

export class CreateGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async createGym({
    title,
    description,
    phone,
    latitute,
    longitute,
  }: CreateGymUseCaseParams): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitute,
      longitute,
    });

    return { gym };
  }
}
