export class Image {
  constructor(
    private id: string,
    private subtitle: string,
    private authorId: string,
    //de olho aqui que no SQL tá author_id
    private date: Date,
    private file: string,
    private tags: string[],
    private collection: string
  ) {}
  public getId(): string {
    return this.id;
  }
  public getSubtitle(): string {
    return this.subtitle;
  }
  public getAuthorId(): string {
    return this.authorId;
  }
  public getDate(): Date {
    return this.date;
  }
  public getFile(): string {
    return this.file;
  }
  public getTags(): string[] {
    return this.tags;
  }
  public getCollection(): string {
    return this.collection;
  }
}
