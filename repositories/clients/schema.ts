import { Collection, Database, ObjectId } from "@db/mongo";

export interface Product {
    productId: string
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