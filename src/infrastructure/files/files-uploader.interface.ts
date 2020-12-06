import { FileUpload } from 'graphql-upload';
import { File } from '../../domain/files/file.model';

export interface IFilesUploaderInterface {
  upload(file: FileUpload): Promise<File>;
}
