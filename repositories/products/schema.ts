import { Collection, Database, ObjectId } from "@db/mongo";

export interface ProductSchema {
  _id: ObjectId;
  userId: string;
  productId: string;
  title: string;
  image: string;
  price: number;
  review?: number;
}

export function products(db: Database): Collection<ProductSchema> {
  return db.collection<ProductSchema>("products");
}
