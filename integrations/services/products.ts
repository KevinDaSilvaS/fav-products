export interface ProductResult {
  id: string;
  title: string;
  image: string;
  price: number;
  reviewScore?: number;
  brand: string;
}

export class IntegrationProductsApi {
  private apiUrl = "http://challenge-api.luizalabs.com/api/product";

  public async getOneProduct(
    productId: string,
  ): Promise<ProductResult | undefined> {
    if (productId == "ProductNotFound") {
      return;
    }
    return {
      id: productId,
      title: `${productId} Product Title`,
      image: `${this.apiUrl}/myimagefor${productId}.jpg`,
      price: 30,
      reviewScore: 3,
      brand: `My${productId}Brand`,
    };
  }
}
