import { Controller, Get } from '@nestjs/common'

import { SeedService } from './seed.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor (private readonly seedService: SeedService) {}

  @ApiOperation({
    description: 'Use to fill faker date in database'
  })
  @Get()
  async executeSeed () {
    return await this.seedService.runSeed()
  }
}
