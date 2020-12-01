export class File {
  _id: string;

  location: string;

  // noinspection DuplicatedCode
  public constructor(_id: string, location: string) {
    this._id = _id;
    this.location = location;
  }
}
