import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch(InvalidRelationExceptionFilter)
export class InvalidRelationExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    return response.status(422).json({
      statusCode: 422,
      message: exception.message,
    });
  }
}
