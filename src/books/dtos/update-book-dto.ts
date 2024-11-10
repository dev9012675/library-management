import { IsArray,  IsDateString, IsNumber, IsString, Min , IsIn , IsISBN, IsOptional} from "class-validator";
import { Transform } from "class-transformer";
import { genres } from "../books.schema";
export type Genres = typeof genres[number];

export class UpdateBookDTO {

    @IsOptional()
    @IsString()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value, { toClassOnly: true })
     title:string

     @IsOptional()
     @IsArray()
     @IsString({each:true})
     @Transform(({ value }) => {
        if(Array.isArray(value)) {
            return value.map((val)=>typeof val === `string` ? val.trim() : val)
        }
        return value
    }, { toClassOnly: true })
     authors:string[]

    @IsOptional()
    @IsNumber()
    @Min(1)
     pages:number

    @IsOptional()
    @IsArray()
    @IsString({each:true})
    @IsIn(genres , {each:true})
     genres:Genres[] 


     @IsOptional()
     @IsDateString()
     @Transform(({ value }) => typeof value === 'string' ? value.trim() : value, { toClassOnly: true })
     publicationDate:Date

     @IsOptional()
     @IsString()
     @IsISBN()
     @Transform(({ value }) => typeof value === 'string' ? value.trim() : value, { toClassOnly: true })
     isbn:string




}