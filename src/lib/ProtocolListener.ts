import { ServerResponder } from "./ServerResponder";
import { Protocol } from "./Protocol";

export class ProtocolListener {
  serverResponder: ServerResponder;
  protocolApi: Protocol;
  port: number;
  static createWithProtocolAndPort(protocolApi: Protocol, port: number) {
    return new ProtocolListener()
      .setProtocol(protocolApi)
      .setPort(port);
  }
  setProtocol(protocolApi: Protocol) {
    this.protocolApi = protocolApi;
    return this;
  }
  setPort(port: number) {
    this.port = port;
    return this;
  }
  setServerResponder(serverResponder: ServerResponder) {
    this.serverResponder = serverResponder;
  }
  createServerAndListen() {
    this.protocolApi.createServer((request: any, response: any) => this.serverResponder.calledOnServerRequest(request, response))
      .listen(this.port);
  }
}
