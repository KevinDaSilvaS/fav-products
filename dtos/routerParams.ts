import { Database } from "@db/mongo";

export interface RouterParams {
    cache: Cache,
    db: Database
}