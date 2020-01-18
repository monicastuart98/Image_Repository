export interface Image {
	image_id: number;
	product_id: number;
	width: number;
	height: number;
	src: string;
}

export interface Product {
	id: number;
	title: string;
	product_type: string;
	price: string;
	inventory_quantity: number;
	imagePayload: Image;
}
