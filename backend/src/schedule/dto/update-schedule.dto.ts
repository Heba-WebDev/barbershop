import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsISO8601, IsIn, IsOptional } from 'class-validator'

const INTERVALS = [30, 45, 60]

export class UpdateScheduleDto {
  @ApiProperty({
    description: 'Schedule - Initial start date',
    example: '1970-01-01T01:00:00Z',
    nullable: true,
    type: Date
  })
  @IsISO8601()
  @IsOptional()
  readonly initial_start_date?: Date

  @ApiProperty({
    description: 'Schedule - Initial end date',
    example: '1970-01-01T01:00:00Z',
    nullable: true,
    type: Date
  })
  @IsISO8601()
  @IsOptional()
  readonly initial_end_date?: Date

  @ApiProperty({
    description: 'Schedule - Final start date',
    example: '1970-01-01T01:00:00Z',
    nullable: true,
    type: Date
  })
  @IsISO8601()
  @IsOptional()
  readonly final_start_date?: Date

  @ApiProperty({
    description: 'Schedule - Final end date',
    example: '1970-01-01T01:00:00Z',
    nullable: true,
    type: Date
  })
  @IsISO8601()
  @IsOptional()
  readonly final_end_date?: Date

  @ApiProperty({
    description: 'Schedule - Initial start date',
    example: true,
    nullable: true,
    type: Boolean
  })
  @IsBoolean()
  @IsOptional()
  readonly state?: boolean

  @ApiProperty({
    description: 'Schedule - Interval',
    example: 30,
    nullable: true,
    type: Number
  })
  @IsIn(INTERVALS, { message: 'The interval must be one of: $constraint1' })
  @IsOptional()
  readonly interval?: number
}
