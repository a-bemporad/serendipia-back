import { ImageDataBase } from "../data/ImageDataBase";
import { Image } from "../model/image";
import { IdGenerator } from "../services/idGenerator";

export class ImageBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private imageDataBase: ImageDataBase
  ) {}
  public async uploadImage(
    subtitle: string,
    file: string,
    tags: string[],
    collection: string
  ) {
    try {
      if (!subtitle || !tags) {
        throw new Error("Missing fields");
      }
      if (!file) {
        throw new Error("No file was provided");
      }
      const id = this.idGenerator.generate();

      // nesse fluxo acho que id do autor vem do token, pois no momento de fazer o upload o usuário precisa estar logado, então temos o token dele por aí
      const authorId: string = "idChumbadoPorEnquanto";
      const date = new Date(Date.now());

      await this.imageDataBase.createImage(
        new Image(id, subtitle, authorId, date, file, tags, collection)
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }
  //getImageDetails, getImageByUser, getAllImages, sortEmailsByTags
}
