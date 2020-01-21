import React from "react";
import "./App.css";
import { Context } from "./Context";
import { ProductView } from "./common/productView.enum";
import { ProductState } from "./common/productState";

interface Props {}
interface Image {
	image_id: number;
	product_id: number;
	width: number;
	height: number;
	src: string;
}
interface Product {
	id: number;
	title: string;
	product_type: string;
	price: string;
	inventory_quantity: number;
	imagePayload: Image;
}
class App extends React.Component<Props, ProductState> {
	static contextType = Context;

	constructor(props: Props) {
		super(props);
		this.state = {
			currentState: ProductView.initial,
		};
	}

	componentDidMount() {
		this.context.init();
		const productObserver = this.context.updateProducts();
		productObserver.subscribe(
			(res: Product[]) => {
				res.forEach((item, index) => console.log("index: ", index, item));
			}
			//	this.setState({ currentState: newProductViewState });
		);

		this.context.getProducts(ProductView.initial);
	}
	componentWillUnmount() {
		this.context.disconnect();
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					Image Repository {this.state.currentState}
				</header>
			</div>
		);
	}
}

export default App;
