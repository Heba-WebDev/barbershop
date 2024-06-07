import { faker } from '@faker-js/faker'

export enum Role {
  CLIENT = 'CLIENT',
  EMPLOYEE = 'EMPLOYEE',
  OWNER = 'OWNER',
}

export enum AppointmentState {
  PENDING = 'PENDING',
  FINISHED = 'FINISHED',
  CANCELED = 'CANCELED',
}

export enum Day {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

export interface User {
  name: string
  email: string
  password: string
  phone_number?: string | null
  avatar?: string | null
  is_active: boolean
  is_verified: boolean
  role: Role[]
}

export interface Company {
  name: string
  phone_number?: string | null
  address: string
  avatar?: string | null
}

export interface Schedule {
  day: Day
  state: boolean
}

export interface Service {
  name: string
  price: number
  avatar?: string | null
}

export interface EmployeeService {
  id: string
  user_id: string
  service_id: string
  user: User
  service: Service
}

export interface EmployeeCompany {
  id: string
  is_active: boolean
  user_id: string
  company_id: string
  user: User
  company: Company
  appointment: Appointment[]
}

export interface Appointment {
  id: string
  start_date: Date
  start_time: Date
  state: AppointmentState
  total: number
  created_at?: Date | null
  updated_at?: Date | null
  employee_id: string
  user_id: string
  employee: EmployeeCompany
  user: User
  ServiceAppointment: ServiceAppointment[]
}

export interface ServiceAppointment {
  id: string
  appointment_id: string
  service_id: string
  appointment: Appointment
  service: Service
}

export interface SeedData {
  users: User[]
  companies: Company[]
  schedules: Schedule[]
  services: Service[]
  // employeesCompany: EmployeeCompany[]
  // employeeServices: EmployeeService[]
  // appointment: Appointment[]
  // serviceAppointment: ServiceAppointment[]
}

const ownersQuantity = 4

const users: User[] = Array(20).fill(null).map((_, index) => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: 'qqqqq',
  phone_number: faker.string.numeric({ length: 9 }),
  avatar: '',
  is_active: true,
  is_verified: true,
  role: index < ownersQuantity ? [Role.OWNER] : [Role.CLIENT]
}))

const companies: Company[] = Array(ownersQuantity).fill(null).map(() => ({
  name: faker.company.name(),
  phone_number: faker.string.numeric({ length: 9 }),
  address: faker.location.streetAddress(),
  avatar: null
}))

const schedules: Schedule[] = [
  {
    day: Day.MONDAY,
    state: faker.datatype.boolean()
  },
  {
    day: Day.TUESDAY,
    state: faker.datatype.boolean()
  },
  {
    day: Day.WEDNESDAY,
    state: faker.datatype.boolean()
  },
  {
    day: Day.THURSDAY,
    state: faker.datatype.boolean()
  },
  {
    day: Day.FRIDAY,
    state: faker.datatype.boolean()
  },
  {
    day: Day.SATURDAY,
    state: faker.datatype.boolean()
  },
  {
    day: Day.SUNDAY,
    state: faker.datatype.boolean()
  }
]

const services: Service[] = [
  {
    name: 'Corte de cabello clásico',
    price: 15.00
  },
  {
    name: 'Afeitado clásico',
    price: 10.00
  },
  {
    name: 'Recorte de barba',
    price: 8.00
  },
  {
    name: 'Diseño de barba',
    price: 12.00
  },
  {
    name: 'Tratamiento de cabello',
    price: 20.00
  },
  {
    name: 'Corte de cabello degradado',
    price: 18.00
  },
  {
    name: 'Rasurado completo',
    price: 15.00
  },
  {
    name: 'Afeitado de línea de cuello',
    price: 5.00
  },
  {
    name: 'Peinado clásico',
    price: 10.00
  },
  {
    name: 'Tratamiento de cuero cabelludo',
    price: 25.00
  },
  {
    name: 'Afeitado de cabeza',
    price: 12.00
  },
  {
    name: 'Afeitado de barba con toalla caliente',
    price: 15.00
  },
  {
    name: 'Tratamiento facial',
    price: 25.00
  },
  {
    name: 'Tinte de barba',
    price: 10.00
  },
  {
    name: 'Lavado y masaje capilar',
    price: 18.00
  },
  {
    name: 'Corte de cabello infantil',
    price: 12.00
  },
  {
    name: 'Diseño de cejas',
    price: 8.00
  },
  {
    name: 'Tratamiento de barba con aceites esenciales',
    price: 20.00
  },
  {
    name: 'Retoque de cuello y orejas',
    price: 5.00
  },
  {
    name: 'Corte de cabello de punta de diamante',
    price: 22.00
  }
]

export const seedData: SeedData = {
  users,
  companies,
  schedules,
  services

  // employeeServices: {
  //   id: '1',
  //   user_id: '1',
  //   service_id: '1',
  //   user: {}, // Aquí se llenaría con los detalles del usuario
  //   service: {} // Aquí se llenaría con los detalles del servicio
  // }
  // appointment: {
  //   id: '1',
  //   start_date: new Date(),
  //   start_time: new Date(),
  //   state: AppointmentState.PENDING,
  //   total: 20,
  //   created_at: new Date(),
  //   updated_at: new Date(),
  //   employee_id: '1',
  //   user_id: '1',
  //   employee: {}, // Aquí se llenaría con los detalles del empleado de la empresa
  //   user: {} // Aquí se llenaría con los detalles del usuario
  // },
  // serviceAppointment: {
  //   id: '1',
  //   appointment_id: '1',
  //   service_id: '1',
  //   appointment: {}, // Aquí se llenaría con los detalles de la cita
  //   service: {} // Aquí se llenaría con los detalles del servicio
  // }
}
