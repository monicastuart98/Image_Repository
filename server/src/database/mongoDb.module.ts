import { Module } from "@nestjs/common";
import { MongoDBService } from "./mongoDb.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductSchema } from ".././database/schemas.model";

@Module({
	imports: [
		MongooseModule.forFeature([{ name: "Product", schema: ProductSchema }]),
	],
	providers: [MongoDBService],
	exports: [MongoDBService],
})
export class MongoDBModule {}
