import {MongooseModuleAsyncOptions} from "@nestjs/mongoose";
import {ConfigModule, ConfigService} from "@nestjs/config";

export const getMongoConfig = (): MongooseModuleAsyncOptions => {
  return {
    inject: [ConfigService],
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      uri: configService.get('MONGO_URI'),
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }),
  }
};
