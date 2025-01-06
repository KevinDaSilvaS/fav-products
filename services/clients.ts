import { Collection, Database, ObjectId } from "@db/mongo";
import { clients, ClientSchema } from "../repositories/clients/schema.ts";
import { ClientBody } from "../dtos/requests/client.ts";
import { ApplicationErrors } from "../dtos/errors-enum.ts";
import { Codes } from "../dtos/http-enum.ts";

export class ClientService {
  private collection: Collection<ClientSchema>;

  constructor(db: Database) {
    this.collection = clients(db);
  }

  public async getUser(userId: string) {
    try {
      const id = new ObjectId(userId);
      const user = await this.collection.findOne({ _id: id });
      if (!user) {
        return {
          code: Codes.NOT_FOUND,
          data: { error: ApplicationErrors.RESOURCE_NOT_FOUND },
        };
      }

      return { code: Codes.OK, data: user };
    } catch (_error) {
      return {
        code: Codes.INTERNAL_SERVER_ERROR,
        data: { error: ApplicationErrors.UNABLE_TO_EXECUTE_ACTION },
      };
    }
  }

  public async createUser(user: ClientBody) {
    const userInDb = await this.collection.findOne({ email: user.email }, {
      projection: {},
    });

    if (userInDb) {
      return {
        code: Codes.CONFLICT,
        data: { error: ApplicationErrors.RESOURCE_ALREADY_EXISTS },
      };
    }

    const insertedUser = await this.collection.insertOne({
      email: user.email,
      name: user.name,
    } as ClientSchema);

    if (insertedUser) {
      return { code: Codes.CREATED, data: { userId: insertedUser } };
    }

    return {
      code: Codes.INTERNAL_SERVER_ERROR,
      data: { error: ApplicationErrors.UNABLE_TO_EXECUTE_ACTION },
    };
  }

  public async updateUser(userId: string, name: string) {
    const id = new ObjectId(userId);
    await this.collection.updateOne(
      { _id: id },
      { $set: { name } },
    );
    return { code: Codes.NO_CONTENT, data: undefined };
  }

  public async deleteUser(userId: string) {
    const id = new ObjectId(userId);
    await this.collection.deleteOne(
      { _id: id },
    );
    return { code: Codes.NO_CONTENT, data: undefined };
  }
}
