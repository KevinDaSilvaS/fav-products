import { Collection, Database } from "@db/mongo";
import { products, ProductSchema } from "../repositories/products/schema.ts";
import { IntegrationProductsApi } from "../integrations/services/products-api.ts";
import { ApplicationErrors } from "../dtos/errors-enum.ts";
import { Codes } from "../dtos/http-enum.ts";

export class ProductService {
  private collection: Collection<ProductSchema>;
  private productApi: IntegrationProductsApi;

  constructor(db: Database) {
    this.collection = products(db);
    this.productApi = new IntegrationProductsApi();
  }

  public async getProducts(userId: string, page = 1, limit = 10) {
    const products = await this.collection.find({
      userId,
    })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return { code: Codes.OK, data: products };
  }

  public async getProduct(userId: string, productId: string) {
    const product = await this.collection.findOne({ userId, productId });

    if (!product) {
      return {
        code: Codes.NOT_FOUND,
        data: { error: ApplicationErrors.RESOURCE_NOT_FOUND },
      };
    }

    return { code: Codes.OK, data: product };
  }

  public async addProduct(userId: string, productId: string) {
    const { code } = await this.getProduct(userId, productId);
    if (code == Codes.OK) {
      return {
        code: Codes.CONFLICT,
        data: { error: ApplicationErrors.RESOURCE_ALREADY_EXISTS },
      };
    }

    const product = await this.productApi.getOneProduct(productId);
    if (!product) {
      return {
        code: Codes.NOT_FOUND,
        data: { error: ApplicationErrors.RESOURCE_NOT_FOUND },
      };
    }

    this.collection.insertOne({
      userId,
      productId,
      image: product.image,
      price: product.price,
      title: product.title,
      review: product.reviewScore,
    } as ProductSchema);
    return { code: Codes.NO_CONTENT, data: undefined };
  }

  public async deleteProduct(productId: string) {
    await this.collection.deleteOne(
      { productId },
    );
    return { code: Codes.NO_CONTENT, data: undefined };
  }
}
