import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationQueryDto {
  @ApiProperty({
    description: 'Number of results to skip',
    minimum: 1,
    default: 1,
    type: 'integer',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  skip: number;

  @ApiProperty({
    description: 'Number of results to limit',
    minimum: 1,
    maximum: 10,
    default: 10,
    type: 'integer',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  limit: number;
}
