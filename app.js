"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const MultiProtocolServer_1 = require("./lib/MultiProtocolServer");
const ServerResponder_1 = require("./lib/ServerResponder");
const ProtocolListener_1 = require("./lib/ProtocolListener");
const HTTP_PORT = 8080;
let server = null;
let serverResponder = null;
setupServer();
setupServerResponder();
connectServerAndServerResponder();
addPagesToResponder(serverResponder);
addStaticToResponder(serverResponder);
addProtocolListeners();
server.run();
function setupServer() {
    server = new MultiProtocolServer_1.MultiProtocolServer();
}
function setupServerResponder() {
    serverResponder = new ServerResponder_1.ServerResponder();
}
function connectServerAndServerResponder() {
    server.setServerResponder(serverResponder);
}
function addPagesToResponder(serverResponder) {
    serverResponder.addPathToPageName("/", "index");
    serverResponder.addPathToPageName("/generate", "generate");
}
function addStaticToResponder(serverResponder) {
    serverResponder.setStaticFolder("static");
}
function addProtocolListeners() {
    server.addProtocolListener(ProtocolListener_1.ProtocolListener.createWithProtocolAndPort(http, HTTP_PORT));
}
