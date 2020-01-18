import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { MongoDBModule } from "./database/mongoDB.module";

@Module({
	imports: [MongoDBModule],
	controllers: [ProductsController],
	providers: [ProductsService],
})
export class ProductsModule {}
