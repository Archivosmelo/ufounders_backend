import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { PaginationDto } from '../common/dto/pagination.dto';
import { CreateClientDto } from './dto/create-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {

  private defaultLimit: number

  constructor(

    @InjectModel(Client.name)
    private readonly clientModel: Model<Client>,

    private readonly configService: ConfigService

  ) {

    this.defaultLimit = this.configService.get<number>('defaultLimit')

  }

  async create(createClientDto: CreateClientDto) {

    try {

      return await this.clientModel.create(createClientDto)

    } catch (error) {

      if (error.code === 11000)
        throw new BadRequestException(
          `Client ticket identifier exists in db: ${createClientDto.ticket}`
        )

      throw new InternalServerErrorException();

    }
  }

  async findAll(paginationDto: PaginationDto) {

    const {
      limit = this.defaultLimit,
      offset = 0
    } = paginationDto

    const clients = await this.clientModel
      .find()
      .limit(limit)
      .skip(offset)
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

  async findOne(id: string) {

    let client: Client;

    if (isValidObjectId(id)) {
      client = await this.clientModel.findById(id)
    }

    if (!client) {
      throw new NotFoundException(
        `Client with id: ${id} not found`
      )
    }

    return client
  }

}
