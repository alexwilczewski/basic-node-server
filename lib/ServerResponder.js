"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const q = require("q");
const fs = require("fs");
const RequestWrapper_1 = require("./RequestWrapper");
const ResponseWrapper_1 = require("./ResponseWrapper");
const PageFactory_1 = require("./PageFactory");
class ServerResponder {
    constructor() {
        this.pathToPageName = {};
        this.pathToPageName = {};
        this.enableStaticRequests = false;
    }
    addPathToPageName(path, pageName) {
        this.pathToPageName[path] = pageName;
    }
    setStaticFolder(staticFolder) {
        this.staticFolder = staticFolder;
        this.enableStaticRequests = true;
    }
    calledOnServerRequest(request, response) {
        var requestWrapper = new RequestWrapper_1.RequestWrapper(request);
        var responseWrapper = new ResponseWrapper_1.ResponseWrapper(response);
        this.handleRequest(requestWrapper, responseWrapper);
    }
    handleRequest(requestWrapper, responseWrapper) {
        this.isStaticRequest(requestWrapper)
            .then((isStaticRequest) => {
            if (isStaticRequest) {
                return this.handleStaticRequest(requestWrapper, responseWrapper);
            }
            else {
                return this.handleDynamicRequest(requestWrapper, responseWrapper);
            }
        })
            .then(function () {
            responseWrapper.doOutput();
        });
    }
    isStaticRequest(requestWrapper) {
        if (this.enableStaticRequests === false) {
            return q.when(false);
        }
        if (requestWrapper.isPath("/")) {
            return q.when(false);
        }
        var path = requestWrapper.getPath();
        var realPath = "./" + this.staticFolder + path;
        return q.nfcall(fs.access, realPath, fs.constants.F_OK)
            .then(function () {
            return true;
        })
            .catch(function () {
            return false;
        });
    }
    handleStaticRequest(requestWrapper, responseWrapper) {
        var path = requestWrapper.getPath();
        var realPath = "./" + this.staticFolder + path;
        return q.nfcall(fs.readFile, realPath, "utf-8")
            .then((out) => {
            responseWrapper.setContent(out);
            let contentType = this.getContentTypeFromPath(realPath);
            responseWrapper.setContentType(contentType);
        });
    }
    getContentTypeFromPath(path) {
        let extensionToContentType = new Map();
        extensionToContentType.set("html", "text/html");
        extensionToContentType.set("js", "application/javascript");
        let extension = path.split(".").reverse()[0];
        return extensionToContentType.get(extension);
    }
    handleDynamicRequest(requestWrapper, responseWrapper) {
        var page = this.getPageFromRequestWrapper(requestWrapper);
        page.setRequestWrapper(requestWrapper);
        page.setResponseWrapper(responseWrapper);
        return page.doLogic(requestWrapper, responseWrapper);
    }
    getPageFromRequestWrapper(requestWrapper) {
        var page = PageFactory_1.PageFactory.createFromName("fallback");
        for (var path in this.pathToPageName) {
            if (requestWrapper.isPath(path)) {
                page = this.createPageFromPath(path);
            }
        }
        return page;
    }
    createPageFromPath(path) {
        var name = this.pathToPageName[path];
        return PageFactory_1.PageFactory.createFromName(name);
    }
}
exports.ServerResponder = ServerResponder;
