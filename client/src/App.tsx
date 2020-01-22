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
	handleFilter(filter: ProductView) {
		switch (filter) {
			case ProductView.priceLowToHigh:
				const productsLow = this.state.products;
				productsLow.sort((a, b): number => {
					return Number(a.price) - Number(b.price);
				});
				this.setState({ products: productsLow });
				break;
			case ProductView.priceHighToLow:
				const productsHigh = this.state.products;
				productsHigh.sort((a, b): number => {
					return Number(b.price) - Number(a.price);
				});
				this.setState({ products: productsHigh });
				break;
			case ProductView.availability:
				const productAvail = this.state.products;
				productAvail.sort((a, b): number => {
					return b.inventory_quantity - a.inventory_quantity;
				});
				this.setState({ products: productAvail });
				break;
			case ProductView.alphabetical:
				const productAlpha = this.state.products;
				productAlpha.sort((a, b) => {
					if (a.product_type < b.product_type) {
						return -1;
					}
					if (a.product_type > b.product_type) {
						return 1;
					}
					return 0;
				});
				this.setState({ products: productAlpha });
				break;
			default:
				this.setState({ products: this.state.products });
				break;
		}
	}
	render() {
		const displayProducts = this.state.products.map((item, index) => {
			const { image_id, width, height, src } = item.imagePayload;
			const { id, title, product_type, price, inventory_quantity } = item;
			const img_id = image_id.toString();
			return (
				<div className={`Product ${id}`}>
					<img
						className={img_id}
						height={height}
						width={width}
						alt={product_type}
						src={src}
					></img>

					<label>{title}</label>
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
					<button onClick={() => this.handleFilter(ProductView.priceLowToHigh)}>
						Price: Low to High
					</button>
					<button onClick={() => this.handleFilter(ProductView.priceHighToLow)}>
						Price: High to Low
					</button>
					<button onClick={() => this.handleFilter(ProductView.availability)}>
						Availability
					</button>
					<button onClick={() => this.handleFilter(ProductView.alphabetical)}>
						Alphabetical
					</button>
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
