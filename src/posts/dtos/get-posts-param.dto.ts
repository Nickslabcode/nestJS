import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class GetPostsParamDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id?: number;
}
