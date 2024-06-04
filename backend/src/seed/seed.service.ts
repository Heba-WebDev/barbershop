import { Injectable } from '@nestjs/common'

import * as bcrypt from 'bcrypt'

import { AuthService } from 'src/auth/auth.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { type User, seedData, type Company, type Schedule, type Service } from './data/seed-data'

@Injectable()
export class SeedService {
  constructor (
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService
  ) {}

  async runSeed () {
    await this.deleteTables()

    const users = await this.insertUsers()
    const companies = await this.insertCompanies(users)
    await this.insertSchedules(companies)
    await this.insertServices(companies)

    return users
  }

  private async insertUsers () {
    const seedUsers = seedData.users

    const users: User[] = []

    seedUsers.forEach((user) => {
      users.push({
        ...user,
        password: bcrypt.hashSync(user.password, 10)
      })
    })

    // await this.prismaService.user.createMany({ data: users })

    return await this.prismaService.$transaction(
      // eslint-disable-next-line
      users.map((user) => this.prismaService.user.create({ data: user }))
    )
  }

  private async insertCompanies (users: any) {
    const seedCompanies = seedData.companies

    type newCompany = Company & { user_id: string }

    const companies: newCompany[] = []

    seedCompanies.forEach((company, index) => {
      companies.push({
        ...company,
        user_id: users[index].id
      })
    })

    // await this.prismaService.company.createMany({ data: (companies as any) })

    return await this.prismaService.$transaction(
      // eslint-disable-next-line
      companies.map((company) => this.prismaService.company.create({ data: company }))
    )

    // return companies
  }

  private async insertSchedules (companies: any[]) {
    const seedSchedules = seedData.schedules

    type SchedulesInDb = Schedule & { company_id: string }

    const schedulesWithCompany: SchedulesInDb[] = []

    companies.forEach(company => {
      Array(2).fill(null).forEach(() => {
        seedSchedules.forEach(schedule => {
          schedulesWithCompany.push({ ...schedule, company_id: company.id })
        })
      })
    })

    await this.prismaService.schedule.createMany({ data: schedulesWithCompany })
  }

  private async insertServices (companies: any[]) {
    const seedServices = seedData.services

    type ServicesWithCompany = Service & { company_id: string }

    const servicesWithCompany: ServicesWithCompany[] = []

    companies.forEach(company => {
      const randomLimit = this.getRandomNumber(1, seedServices.length)
      const limitServices = seedServices.slice(0, randomLimit)

      limitServices.forEach(service => {
        servicesWithCompany.push({ ...service, company_id: company.id })
      })
    })

    await this.prismaService.service.createMany({ data: servicesWithCompany })
  }

  private async deleteTables () {
    await this.prismaService.service.deleteMany()
    await this.prismaService.schedule.deleteMany()
    await this.prismaService.company.deleteMany()
    await this.prismaService.user.deleteMany()

    await this.prismaService.service.deleteMany()
    await this.prismaService.appointment.deleteMany()
    await this.prismaService.employeeCompany.deleteMany()
    await this.prismaService.employeeService.deleteMany()
    await this.prismaService.serviceAppointment.deleteMany()
  }

  private getRandomNumber (min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min)
  }
}
