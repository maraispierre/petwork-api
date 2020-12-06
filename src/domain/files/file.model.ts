export class File {
  _id: string;

  name: string;

  uri: string;

  size: number;

  // noinspection DuplicatedCode
  public constructor(_id: string, name: string, uri: string, size: number) {
    this._id = _id;
    this.name = name;
    this.uri = uri;
    this.size = size;
  }
}
