import * as mongoose from "mongoose";
export const ProductSchema = new mongoose.Schema({
	id: { type: Number, required: true },
	title: { type: String, required: true },
	product_type: { type: String, required: true },
	price: { type: String, required: true },
	inventory_quantity: { type: Number, required: true },
	imagePayload: {
		image_id: Number,
		product_id: Number,
		width: Number,
		height: Number,
		src: String,
	},
});
