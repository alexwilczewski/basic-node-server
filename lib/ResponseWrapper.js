"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseWrapper {
    constructor(response) {
        this.response = response;
    }
    setContent(content) {
        this.content = content;
    }
    setContentType(contentType) {
        this.contentType = contentType;
    }
    doOutput() {
        this.response.writeHeader(200, { "Content-Type": this.contentType });
        this.response.write(this.content);
        this.response.end();
    }
}
exports.ResponseWrapper = ResponseWrapper;
