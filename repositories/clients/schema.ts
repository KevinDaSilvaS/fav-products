import { Collection, Database, ObjectId } from "@db/mongo";

export interface Product {
    productId: string,
    title: string,
    image: string,
    price: number,
    review?: number
}

export interface ClientSchema {
    _id: ObjectId;
    name: string;
    email: string;
    products: Product[];
}

export function clients(db: Database): Collection<ClientSchema> {
    return db.collection<ClientSchema>("clients");
}