import React from "react";
import { SocketConnection } from "./SocketConnection";

export const Context: React.Context<SocketConnection> = React.createContext(
	new SocketConnection()
);
