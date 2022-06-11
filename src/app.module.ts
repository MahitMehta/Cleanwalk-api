import { Module } from '@nestjs/common';
import { AppResolver } from './app.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import config from "./config";
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
const { join } = require('path');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => ({
        debug: isDevelopment,
        playground: isDevelopment,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        sortSchema: true,
      })
    }),
    JwtModule.register({
      secret: config.jwt.jwtSecret,
      signOptions: {
        expiresIn: config.jwt.jwtExpire,
      },
    }),
    MongooseModule.forRoot(config.mongodb.uri, config.mongodb.options),
  ],
  providers: [ AppResolver ],
})
export class AppModule {}
