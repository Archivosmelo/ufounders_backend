import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client } from 'src/clients/entities/client.entity';
import { Client as ClientInterface } from './interfaces/client-response.interface';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Client.name)
    private readonly clientModel: Model<Client>,
    private readonly http: AxiosAdapter,
  ) { }

  async seedDatabase() {

    // Fetch data
    const data = await this.http.get<ClientInterface[]>(
      'https://6f7smj4fdc.execute-api.us-east-1.amazonaws.com/default/techJobMission'
    )
    if (!data)
      throw new InternalServerErrorException(
        `Could not recover data to fill the database. Please contact support`
      )

    // Clean table after i get the data
    await this.clientModel.deleteMany()

    // Insert multiple clients
    await this.clientModel.insertMany(data)

    // Search for the first 12
    const clients = await this.clientModel
      .find()
      .limit(30)
      .skip(0)
      .sort({
        firstName: 1
      })

    const count = await this.clientModel.countDocuments();

    const parsedClients = (await clients).map((client: Client) => {
      return {
        _id: client._id,
        ticket: client.ticket,
        present: client.present,
        firstName: client.firstName,
        lastName: client.lastName
      }
    })
    return { total: count, list: parsedClients }

  }

  async truncateDatabase() {

    // Clean table after i get the data
    await this.clientModel.deleteMany()

    return { total: 0, list: [] }
  }

}
