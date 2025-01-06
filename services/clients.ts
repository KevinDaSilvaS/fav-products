import { Collection, Database, ObjectId } from "@db/mongo";
import { clients, ClientSchema } from "../repositories/clients/schema.ts";
import { ClientBody } from "../dtos/requests/client.ts";

export class ClientService {
  private collection: Collection<ClientSchema>;

  constructor(db: Database) {
    this.collection = clients(db);
  }

  public async getUser(userId: string) {
    try {
      const id = new ObjectId(userId);
      console.log(id)
      const user = await this.collection.findOne({ _id: id });
      if (!user) {
        return { code: 404, data: { error: "User not found" } };
      }

      return { code: 200, data: user };
    } catch (_error) {
      return { code: 500, data: { error: "Unable to get user" } };
    }
  }

  public async createUser(user: ClientBody) {
    const userInDb = await this.collection.findOne({ email: user.email }, {
      projection: {},
    });

    if (userInDb) {
      return { code: 400, data: { error: "User already in db" } };
    }

    const insertedUser = await this.collection.insertOne({
      email: user.email,
      name: user.name,
      products: []
    } as unknown as ClientSchema);

    if (insertedUser) {
      return { code: 201, data: { userId: insertedUser } };
    }

    return { code: 500, data: { error: "Unable to insert user" } };
  }

  public async updateUser(userId: string, name: string) {
    const id = new ObjectId(userId);
    await this.collection.updateOne(
      { _id: id },
      { $set: { name } },
    );
    return { code: 204, data: undefined };
  }

  public async deleteUser(userId: string) {
    const id = new ObjectId(userId);
    await this.collection.deleteOne(
      { _id: id },
    );
    return { code: 204, data: undefined };
  }
}
