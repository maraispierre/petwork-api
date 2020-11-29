export interface IFilesUploaderInterface {
  upload(dataBuffer: Buffer, filename: string);
}
