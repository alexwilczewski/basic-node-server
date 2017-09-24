"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MultiProtocolServer {
    constructor() {
        this.protocolListeners = [];
    }
    setServerResponder(serverResponder) {
        this.serverResponder = serverResponder;
    }
    addProtocolListener(protocolListener) {
        this.protocolListeners.push(protocolListener);
    }
    run() {
        this.activateProtocolListeners();
    }
    activateProtocolListeners() {
        for (let protocolListener of this.protocolListeners) {
            this.activateProtocolListener(protocolListener);
        }
    }
    activateProtocolListener(protocolListener) {
        protocolListener.setServerResponder(this.serverResponder);
        protocolListener.createServerAndListen();
    }
}
exports.MultiProtocolServer = MultiProtocolServer;
