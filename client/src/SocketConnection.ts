import io from "socket.io-client";
import { fromEvent, Observable } from "rxjs";
import { ProductView } from "./common/productView.enum";

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
export class SocketConnection {
	private socket: SocketIOClient.Socket = {} as SocketIOClient.Socket;
	public init(): SocketConnection {
		this.socket = io("localhost:3001");
		return this;
	}
	public getProducts(reqState: ProductView) {
		return this.socket.emit("getProducts", reqState);
	}

	public updateProducts(): Observable<Product[]> {
		return fromEvent(this.socket, "productsFromServer");
	}

	public disconnect(): void {
		this.socket.disconnect();
	}
}
