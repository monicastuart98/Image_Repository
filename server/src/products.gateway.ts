import {
	SubscribeMessage,
	WebSocketGateway,
	OnGatewayInit,
	WsResponse,
	OnGatewayConnection,
	OnGatewayDisconnect,
	ConnectedSocket,
	MessageBody,
} from "@nestjs/websockets";
import {
	Logger,
	BadGatewayException,
	BadRequestException,
} from "@nestjs/common";
import { Socket } from "socket.io";
import { ProductView } from "./common/productView.enum";
import { MongoDBService } from "./database/mongoDB.service";

@WebSocketGateway()
export class ProductsGateway
	implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	private logger: Logger = new Logger("AppGateway logger");
	constructor(private readonly mongoService: MongoDBService) {}
	afterInit(server: any) {
		this.logger.log("Intialized");
	}

	handleConnection(@ConnectedSocket() client: Socket) {
		this.logger.log(`Client Connected: ${client.id}`);
	}

	handleDisconnect(client: Socket) {
		this.logger.log(`Client Dis-connected: ${client.id}`);
	}
	async getDbData(event: string): Promise<WsResponse> {
		const data = await this.mongoService
			.getAllProducts()
			.then((res) => {
				return res;
			})
			.catch((error) => {
				throw new BadRequestException(
					"ERROR Gateway could not get data from database: ",
					error.details
				);
			});
		return { event, data };
	}
	@SubscribeMessage("getProducts")
	async handleMessage(
		@ConnectedSocket() client: Socket,
		@MessageBody() state: ProductView
	): Promise<WsResponse> {
		try {
			this.logger.log("subscried");
			switch (state) {
				case ProductView.initial:
					return await this.getDbData(ProductView.initial);
				default:
					return await this.getDbData(ProductView.initial);
			}
		} catch (error) {
			throw new BadGatewayException("ERROR sending data back to client");
		}
	}
}
