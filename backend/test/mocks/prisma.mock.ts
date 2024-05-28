import { randomUUID } from 'crypto'

export const mockPrisma = {
  user: {
    create: jest.fn().mockImplementation((dto) => ({
      ...dto,
      id: randomUUID(),
      role: 'CLIENT'
    })),
    findUnique: jest.fn()
  }
} as const
