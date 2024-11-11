import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ParsePaginationPipe
  implements
    PipeTransform<
      { page?: string; limit?: string , filter?:string },
      { page?: number; limit?: number , filter?:string }
    >
{
  transform(
    pagination: { page?: string; limit?: string , filter?:string },
    metadata: ArgumentMetadata,
  ): { page?: number; limit?: number } {
    if (
      typeof pagination.page === `undefined` &&
      typeof pagination.limit === `undefined` &&
      typeof pagination.filter === `undefined` 
    ) {
      return {};
    } else {
      const object = {};
      if (typeof pagination.page !== `undefined`) {
        object[`page`] = parseInt(pagination[`page`]);
      }

      if (typeof pagination.limit !== `undefined`) {
        object[`limit`] = parseInt(pagination[`limit`]);
      }

      if(typeof pagination.filter !== `undefined`) {
        object[`filter`] = pagination[`filter`]
      }
      return object;
    }
  }
}
