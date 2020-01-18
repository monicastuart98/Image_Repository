import { Controller, Post, Body, Get } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Image } from "./products.dto";

@Controller()
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {
		this.productsService.getData();
	}
}
