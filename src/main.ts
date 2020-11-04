import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

const httpsKeyPath: string = process.env.HTTPS_KEY_PATH ?? '';
const httpsCertPath: string = process.env.HTTPS_CERT_PATH ?? '';

const httpsOptions = {
  key: fs.readFileSync(httpsKeyPath),
  cert: fs.readFileSync(httpsCertPath),
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  await app.listen(3000);
}
bootstrap();
