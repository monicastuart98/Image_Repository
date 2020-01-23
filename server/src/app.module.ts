import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProductsModule } from "./products.module";
import { MongooseModule } from "@nestjs/mongoose";
import { MongoDBModule } from "./database/mongoDB.module";
import { ProductsGateway } from "./products.gateway";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
	imports: [
		ProductsModule,
		MongoDBModule,
		ConfigModule.forRoot({ isGlobal: true }),
		MongooseModule.forRootAsync({
			useFactory: async (configService: ConfigService) => ({
				uri: configService.get<string>("MONGODB_URI"),
			}),
			inject: [ConfigService],
		}),
	],
	controllers: [AppController],
	providers: [AppService, ProductsGateway],
})
export class AppModule {}
