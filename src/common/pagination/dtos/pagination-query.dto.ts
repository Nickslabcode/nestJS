import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  // @Type(() => Number) -> ImplicitConversion enabled in main.ts
  limit?: number = 10;

  @IsOptional()
  @IsPositive()
  // @Type(() => Number) -> ImplicitConversion enabled in main.ts
  page?: number = 1;
}
