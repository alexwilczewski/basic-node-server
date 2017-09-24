"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const q = require("q");
class Page {
    constructor(name) {
        this.name = name;
    }
    setRequestWrapper(requestWrapper) {
        this.requestWrapper = requestWrapper;
    }
    setResponseWrapper(responseWrapper) {
        this.responseWrapper = responseWrapper;
    }
    renderHtml() {
        var path = this.getHtmlPath(this.name);
        return q.nfcall(fs.readFile, path, "utf-8");
    }
    getHtmlPath(pageName) {
        return "./pages/" + pageName + ".html";
    }
}
exports.Page = Page;
