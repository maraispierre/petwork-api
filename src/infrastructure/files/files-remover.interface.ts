import { File } from '../../domain/files/file.model';

export interface IFilesRemoverInterface {
  remove(file: File): Promise<File>;
}
