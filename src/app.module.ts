import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config'
import { ClientsModule } from './clients/clients.module';
import { SeedModule } from './seed/seed.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema
    }),
    ClientsModule,
    MongooseModule.forRoot(process.env.MONGODB),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGODB,
      database: process.env.MONGODB_DATABASE,
      useUnifiedTopology: true,
      autoLoadEntities: true,
      synchronize: true,
    }),
    SeedModule,
    CommonModule,
    AuthModule
  ],

})
export class AppModule { }
