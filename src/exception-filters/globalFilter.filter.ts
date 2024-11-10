
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { HttpAdapterHost } from '@nestjs/core';
import { response } from 'express';
  
  @Catch()
  export class GlobalFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  
    catch(exception: unknown, host: ArgumentsHost): void {
      const { httpAdapter } = this.httpAdapterHost;
  
      const ctx = host.switchToHttp();
      
  
      const httpStatus =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
  
      const responseBody = {
        statusCode: httpStatus,
        timestamp: new Date().toISOString(),
        method:httpAdapter.getRequestMethod(ctx.getRequest()) ,
        path: httpAdapter.getRequestUrl(ctx.getRequest()),
        ...(exception instanceof HttpException && { httpResponse: exception.getResponse() })
      };

      
  
      httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
  }
  