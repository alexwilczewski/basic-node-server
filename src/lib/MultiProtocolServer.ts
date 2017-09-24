import { ProtocolListener } from "./ProtocolListener";
import { ServerResponder } from "./ServerResponder";

export class MultiProtocolServer {
  protocolListeners: ProtocolListener[];
  serverResponder: ServerResponder;

  constructor() {
    this.protocolListeners = [];
  }
  setServerResponder(serverResponder: ServerResponder) {
    this.serverResponder = serverResponder;
  }
  addProtocolListener(protocolListener: ProtocolListener) {
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
  activateProtocolListener(protocolListener: ProtocolListener) {
    protocolListener.setServerResponder(this.serverResponder);
    protocolListener.createServerAndListen();
  }
}
