import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from ".././products.dto";
import { Observable } from "rxjs";

@Injectable()
export class MongoDBService {
	constructor(
		@InjectModel("Product") private readonly productModel: Model<Product>
	) {}

	seedDatabase(products: Product[]) {
		if (products !== undefined) {
			products.forEach(async (product) => {
				const newProduct = new this.productModel({
					...product,
				});
				try {
					const result = await newProduct.save();
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
	async wipeDatabase() {
		await this.productModel
			.deleteMany()
			.then((res) => console.log("num of documents deleted", res.n));
	}
	async getAllProducts(): Promise<Product[]> {
		const products = await this.productModel.find().exec();
		//console.log("PRODUCTS FROM MONGO SERVOCE", products);
		return products as Product[];
	}
}
