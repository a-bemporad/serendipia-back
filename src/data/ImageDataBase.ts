import { Image } from "../model/image";
import BaseDataBase from "./BaseDataBase";

export class ImageDataBase extends BaseDataBase {
  protected tableName: string = "serendipia_image";

  private toModel(dbModel?: any): Image | undefined {
    return (
      dbModel &&
      new Image(
        dbModel.id,
        dbModel.subtitle,
        dbModel.author_id,
        dbModel.date,
        dbModel.file,
        dbModel.tags,
        dbModel.collection
      )
    );
  }
  public async createImage(image: Image): Promise<void> {
    try {
      await BaseDataBase.connection
        .insert({
          id: image.getId(),
          subtitle: image.getSubtitle(),
          author_id: image.getAuthorId(),
          date: image.getDate(),
          file: image.getFile(),
          tags: image.getTags(),
          collection: image.getCollection(),
        })
        .into(this.tableName);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
  public async getImageById(reqImageId: string): Promise<Image | undefined> {
    try {
      const result = await BaseDataBase.connection
        .select("*")
        .from(this.tableName)
        .where({ id: reqImageId });

      const image = this.toModel(result);
      return image;
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
  public async getAllImages(): Promise<Image[] | undefined> {
    try {
      const result: Image[] = await BaseDataBase.connection
        .select("*")
        .from(this.tableName);

      return result;
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}

export default new ImageDataBase();
