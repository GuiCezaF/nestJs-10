import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './exeption-filters/prisma.exception-filter';
import { ValidationPipe } from '@nestjs/common';
import { InvalidRelationExceptionFilter } from './exeption-filters/invalid-relation.exception-filter copy';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(
    new PrismaExceptionFilter(),
    new InvalidRelationExceptionFilter(),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('nestJs 10')
    .setDescription('api de estudos')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document);

  await app.listen(3000);
}
bootstrap();
