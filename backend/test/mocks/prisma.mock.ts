import { randomUUID } from 'crypto'

export const mockPrisma = {
  user: {
    create: jest.fn().mockImplementation((dto) => ({
      ...dto,
      id: randomUUID(),
      role: 'CLIENT'
    })),
    findUnique: jest.fn(),
    update: jest.fn().mockResolvedValue({}) // Mock the update method
  },
  appointment: {
    create: jest.fn()
  },
  employeeCompany: {
    findUnique: jest.fn()
  },
  serviceAppointment: {
    createMany: jest.fn()
  },
  service: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  },
  company: {
    findFirst: jest.fn()
  }
} as const
