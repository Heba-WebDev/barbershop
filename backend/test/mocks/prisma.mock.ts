import { randomUUID } from 'crypto'

export const mockPrisma = {
  user: {
    create: jest.fn().mockImplementation((dto) => ({
      ...dto,
      id: randomUUID(),
      role: ['CLIENT']
    })),
    findUnique: jest.fn(),
    update: jest.fn().mockResolvedValue({}) // Mock the update method
  },
  appointment: {
    create: jest.fn(),
    findMany: jest.fn()
  },
  employeeCompany: {
    findUnique: jest.fn(),
    create: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn()
  },
  serviceAppointment: {
    createMany: jest.fn()
  },
  service: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  },
  company: {
    findFirst: jest.fn(),
    create: jest.fn(),
    findMany: jest.fn()
  },
  schedule: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    findFirst: jest.fn(),
    create: jest.fn()
  }
} as const
