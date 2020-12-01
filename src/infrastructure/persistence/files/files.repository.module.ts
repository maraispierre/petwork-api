import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './files.entity';
import { FilesRepository } from './files.repository';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  providers: [FilesRepository],
  exports: [FilesRepository],
})
export class FilesRepositoryModule {}
