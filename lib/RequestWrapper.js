"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RequestWrapper {
    constructor(request) {
        this.request = request;
    }
    isPath(pathName) {
        return ((this.getPath() === pathName) ? true : false);
    }
    getPath() {
        return this.request.url;
    }
}
exports.RequestWrapper = RequestWrapper;
