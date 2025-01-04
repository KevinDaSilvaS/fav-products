import { Collection, Database, ObjectId } from "@db/mongo";

export interface ClientSchema {
    _id: ObjectId;
    name: string;
    email: string;
    products: ObjectId[];
}

export function clients(db: Database): Collection<ClientSchema> {
    return db.collection<ClientSchema>("clients");
}