import io from "socket.io-client";
import { fromEvent, Observable } from "rxjs";
import { ProductView } from "./common/productView.enum";
import { Product } from "./common/productInterfaces";

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
