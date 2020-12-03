export class File {
  _id: string;

  name: string;

  location: string;

  size: number;

  // noinspection DuplicatedCode
  public constructor(
    _id: string,
    name: string,
    location: string,
    size: number,
  ) {
    this._id = _id;
    this.name = name;
    this.location = location;
    this.size = size;
  }
}
