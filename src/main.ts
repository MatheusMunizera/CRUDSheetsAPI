import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.enableCors({
    origin: '*',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Accept",
    preflightContinue: false,
  });

  

  const config = new DocumentBuilder()
    .setTitle('SheetsAPI Swagger Documentation')
    .setDescription(
      `A Rest API to manage all data from your sheets`
    )
    .setContact('Matheus Muniz Dantas','https://matheusmuniz.dev','matheus.munizera@gmail.com')
    .setExternalDoc('See the SheetsAPI on Google', 'https://docs.google.com/spreadsheets/d/1PFCI_GqZ9p3aLPLwOA4oS55ylx-0g0wPDMEeDcrvtIk/edit?usp=sharing')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);
  
  await app.listen(3000);
}

bootstrap();