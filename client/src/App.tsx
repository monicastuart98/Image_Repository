import React from "react";
import "./App.css";
import { Context } from "./Context";
import { ProductView } from "./common/productView.enum";
import { ProductState } from "./common/productState";
import { Product } from "./common/productInterfaces";
interface Props {}

class App extends React.Component<Props, ProductState> {
	static contextType = Context;

	constructor(props: Props) {
		super(props);
		this.state = {
			currentState: ProductView.initial,
			products: [],
		};
	}

	componentDidMount() {
		this.context.init();
		const productObserver = this.context.updateProducts();

		productObserver.subscribe((res: Product[]) => {
			if (res) {
				this.setState({ products: res });
				res.forEach((item, index) => console.log("index: ", index, item));
			} else {
				throw new Error("ERROR could not load products");
			}
		});

		this.context.getProducts(ProductView.initial);
	}
	componentWillUnmount() {
		this.context.disconnect();
	}

	render() {
		const displayProducts = this.state.products.map((item, index) => {
			const { image_id, width, height, src } = item.imagePayload;
			const { id, title, product_type, price, inventory_quantity } = item;
			const img_id = image_id.toString();
			return (
				<div className="Product">
					<img
						className={img_id}
						height={height}
						width={width}
						alt={product_type}
						src={src}
					></img>

					<label>{product_type}</label>
					<span>${price}</span>
					<span>Inventory: {inventory_quantity}</span>
				</div>
			);
		});

		return (
			<div className="App">
				<header className="App-header">Image Repository</header>

				<div className="Filters">
					APPLY FILTERS:
					<button>Price: Low to High</button>
					<button>Price: High to Low</button>
					<button>Availability</button>
				</div>
				<form className="Search-Bar">
					<span>
						<input type="text" placeholder="Search For Product..."></input>
					</span>
				</form>
				<div className="Products-Container">{displayProducts}</div>
			</div>
		);
	}
}

export default App;
