"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProtocolListener {
    static createWithProtocolAndPort(protocolApi, port) {
        return new ProtocolListener()
            .setProtocol(protocolApi)
            .setPort(port);
    }
    setProtocol(protocolApi) {
        this.protocolApi = protocolApi;
        return this;
    }
    setPort(port) {
        this.port = port;
        return this;
    }
    setServerResponder(serverResponder) {
        this.serverResponder = serverResponder;
    }
    createServerAndListen() {
        this.protocolApi.createServer((request, response) => this.serverResponder.calledOnServerRequest(request, response))
            .listen(this.port);
    }
}
exports.ProtocolListener = ProtocolListener;
