
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';


@Injectable()
export class ParsePaginationPipe implements PipeTransform<{page?:string , limit?:string}, {page?:number , limit?:number}> {
  transform(pagination: {page?:string , limit?:string}, metadata: ArgumentMetadata): {page?:number , limit?:number} {
   if(typeof pagination.page === `undefined` && typeof pagination.limit === `undefined`){
     return {}
   }
   else {
       const object = {}
       if(typeof pagination.page !== `undefined`) {
           object[`page`] = parseInt(pagination[`page`])
       }

       if(typeof pagination.limit !== `undefined`) {
        object[`limit`] = parseInt(pagination[`limit`])
        }
        return object
   }
 }
}
