import * as http from "http";
import * as q from "q";
import { MultiProtocolServer } from "./lib/MultiProtocolServer";
import { ServerResponder } from "./lib/ServerResponder";
import { ProtocolListener } from "./lib/ProtocolListener";
import { PageFactory } from "./lib/PageFactory";
const HTTP_PORT = 8080;

let server: MultiProtocolServer = null;
let serverResponder: ServerResponder = null;

setupServer();
setupServerResponder();
connectServerAndServerResponder();
addPagesToResponder(serverResponder);
addStaticToResponder(serverResponder);
addProtocolListeners();

server.run();

function setupServer() {
  server = new MultiProtocolServer();
}

function setupServerResponder() {
  serverResponder = new ServerResponder();
}

function connectServerAndServerResponder() {
  server.setServerResponder(serverResponder);
}

function addPagesToResponder(serverResponder: ServerResponder) {
  serverResponder.addPathToPageName("/", "index");
  serverResponder.addPathToPageName("/generate", "generate");
}

function addStaticToResponder(serverResponder: ServerResponder) {
  serverResponder.setStaticFolder("static");
}

function addProtocolListeners() {
  server.addProtocolListener(
    ProtocolListener.createWithProtocolAndPort(http, HTTP_PORT)
  );
}
