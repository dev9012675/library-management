import { IsInt, IsOptional, IsString, Min } from 'class-validator';


export class PaginationDTO {
  @IsOptional()
  @IsInt()
  @Min(1)
  page: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit: number;

  @IsOptional()
  @IsString()
  filter:string
}
