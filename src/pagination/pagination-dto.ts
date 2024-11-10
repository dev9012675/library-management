import { IsInt, IsOptional, IsString, Min } from "class-validator";
import { Type } from "class-transformer";



export class PaginationDTO {
    @IsOptional()
    @IsInt()
    @Min(1)
    page: number;
  
    @IsOptional()
    @IsInt()
    @Min(1)
    limit: number;

   
}