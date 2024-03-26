import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from 'libs/error/filters/httpExceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Allow any origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  const docConfig = new DocumentBuilder()
    .setTitle('FYP APIS')
    .setDescription('Here are all the APIS that are used in my FYP project')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, docConfig);
  app.useGlobalFilters(new AllExceptionsFilter());
  // app.useGlobalFilters(new BadRequestExceptionFilter());
  SwaggerModule.setup('api', app, document);
  const ip = process.env.IP;
  await app.listen(3000, ip);
}
bootstrap();
