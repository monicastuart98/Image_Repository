import { Injectable, BadRequestException } from "@nestjs/common";
import { Product } from "./products.dto";
import axios from "axios";

import { MongoDBService } from "./database/mongoDB.service";

@Injectable()
export class ProductsService {
	constructor(public mongoService: MongoDBService) {}

	async fetchData() {
		try {
			return await axios.get(
				"https://shopicruit.myshopify.com/admin/products.json?page=1&access_token=c32313df0d0ef512ca64d5b336a0d7c6"
			);
		} catch (error) {
			throw new BadRequestException(error.detail);
		}
	}
	async getData() {
		const productInventory: Product[] = [];
		const response = await this.fetchData();

		if (response.data) {
			const { products } = response.data;
			products.forEach((item) => {
				const { id, title, product_type, variants, image } = item;
				const [first] = variants;
				const { price, inventory_quantity } = first;
				const { product_id, width, height, src } = image;
				const image_id = image.id;
				const imagePayload = { image_id, product_id, width, height, src };
				const product = {
					id,
					title,
					product_type,
					price,
					inventory_quantity,
					imagePayload,
				};
				productInventory.push(product);
			});
			/* TODO: Tempory fix until script created for one time seeding of the database */
			this.mongoService.wipeDatabase();
			this.mongoService.seedDatabase(productInventory);
		} else {
			throw new Error("Response data is undefined");
		}
	}
}
