import {
  Controller,
  Request,
  Body,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
