import { FileUpload } from 'graphql-upload';

export interface IFilesUploaderInterface {
  upload(file: FileUpload);
}
