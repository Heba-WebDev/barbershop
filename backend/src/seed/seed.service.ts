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

    // await this.insertEmployeesCompany(users, companies)

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
    const usersToEmployee: any[] = []

    seedCompanies.forEach((company, index) => {
      companies.push({
        ...company,
        user_id: users[index].id
      })
    })

    // await this.prismaService.company.createMany({ data: (companies as any) })

    const companiesDb = await this.prismaService.$transaction(
      // eslint-disable-next-line
      companies.map((company) => this.prismaService.company.create({ data: company }))
    )

    if (!companiesDb) throw new Error()

    companiesDb.forEach(company => {
      usersToEmployee.push({ company_id: company.id, user_id: company.user_id })
    })

    await this.prismaService.employeeCompany.createMany({ data: usersToEmployee })

    return companiesDb
    // return companies
  }

  private async insertSchedules (companies: any[]) {
    const seedSchedules = seedData.schedules

    type SchedulesInDb = Schedule & { company_id: string }

    const schedulesWithCompany: SchedulesInDb[] = []

    companies.forEach(company => {
      seedSchedules.forEach(schedule => {
        schedulesWithCompany.push({ ...schedule, company_id: company.id })
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

  // private async insertEmployeesCompany (users: any[], companies: any[]) {
  //   const promisesUpdateUser: any[] = []
  //   const employeeQuantity = 8

  //   const employeesWithCompany = Array(employeeQuantity).fill(null).map((_, index) => {
  //     const randomLimit = this.getRandomNumber(0, companies.length)

  //     promisesUpdateUser.push({
  //       where: { id: users[index].id },
  //       data: { role: 'EMPLOYEE' }
  //     })

  //     return {
  //       user_id: users[index].id,
  //       company_id: companies[randomLimit].id
  //     }
  //   })

  //   await this.prismaService.employeeCompany.createMany({ data: employeesWithCompany })
  //   await this.prismaService.user.updateMany({
  //     data: {
  //       role: 'EMPLOYEE'
  //     },
  //     where: {
  //       id: {
  //         in: Array(employeeQuantity).fill(null).map((_, index) => users[users.length - (index + 1)].id)
  //       }
  //     }
  //   })
  // }

  private async deleteTables () {
    await this.prismaService.service.deleteMany()
    await this.prismaService.schedule.deleteMany()
    await this.prismaService.employeeCompany.deleteMany()
    await this.prismaService.company.deleteMany()
    await this.prismaService.user.deleteMany()

    await this.prismaService.service.deleteMany()
    await this.prismaService.appointment.deleteMany()
    await this.prismaService.employeeService.deleteMany()
    await this.prismaService.serviceAppointment.deleteMany()
  }

  private getRandomNumber (min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min)
  }
}
