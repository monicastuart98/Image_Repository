import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from ".././products.dto";

@Injectable()
export class MongoDBService {
	constructor(
		@InjectModel("Product") private readonly productModel: Model<Product>
	) {}

	populateDatabase(products: Product[]) {
		if (products != undefined) {
			products.forEach(async (product) => {
				const newProduct = new this.productModel({
					...product,
				});
				try {
					//const result = await newProduct.save();
				} catch (error) {
					throw new BadRequestException(
						"Error populating database: ",
						error.detail
					);
				}
			});
		} else {
			throw new Error("Products to pupulate database are undefined");
		}
	}
}
