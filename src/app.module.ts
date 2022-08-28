import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config'
import { ClientsModule } from './clients/clients.module';
import { SeedModule } from './seed/seed.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
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
    SeedModule,
    CommonModule,
    AuthModule
  ],

})
export class AppModule { }
