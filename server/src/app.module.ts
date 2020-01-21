import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProductsModule } from "./products.module";
import { MongooseModule } from "@nestjs/mongoose";
import { MongoDBModule } from "./database/mongoDB.module";
import { ProductsGateway } from './products.gateway';

@Module({
	imports: [
		ProductsModule,
		MongoDBModule,
		MongooseModule.forRoot(
			"mongodb+srv://Monica:Romeo174@shopify-challenge-images-ikdlw.mongodb.net/shopify?retryWrites=true&w=majority"
		),
	],
	controllers: [AppController],
	providers: [AppService, ProductsGateway],
})
export class AppModule {}
