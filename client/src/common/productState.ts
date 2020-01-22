import { ProductView } from "./productView.enum";
import { Product } from "./productInterfaces";

export interface ProductState {
	currentState: ProductView;
	products: Product[];
}
