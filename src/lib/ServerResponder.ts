import * as q from "q";
import * as fs from "fs";
import { RequestWrapper } from "./RequestWrapper";
import { ResponseWrapper } from "./ResponseWrapper";
import { PageFactory } from "./PageFactory";

export class ServerResponder {
  pathToPageName: any = {};
  enableStaticRequests: boolean;
  staticFolder: string;

  constructor() {
    this.pathToPageName = {};
    this.enableStaticRequests = false;
  }
  addPathToPageName(path: string, pageName: string) {
    this.pathToPageName[path] = pageName;
  }
  setStaticFolder(staticFolder: string) {
    this.staticFolder = staticFolder;
    this.enableStaticRequests = true;
  }
  calledOnServerRequest(request: any, response: any) {
    var requestWrapper = new RequestWrapper(request);
    var responseWrapper = new ResponseWrapper(response);
    this.handleRequest(requestWrapper, responseWrapper);
  }
  handleRequest(requestWrapper: RequestWrapper, responseWrapper: ResponseWrapper) {
    this.isStaticRequest(requestWrapper)
      .then((isStaticRequest) => {
        if (isStaticRequest) {
          return this.handleStaticRequest(requestWrapper, responseWrapper);
        } else {
          return this.handleDynamicRequest(requestWrapper, responseWrapper);
        }
      })
      .then(function () {
        responseWrapper.doOutput();
      });
  }
  isStaticRequest(requestWrapper: RequestWrapper) {
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
  handleStaticRequest(requestWrapper: RequestWrapper, responseWrapper: ResponseWrapper) {
    var path = requestWrapper.getPath();
    var realPath = "./" + this.staticFolder + path;
    return q.nfcall(fs.readFile, realPath, "utf-8")
      .then((out: string) => {
        responseWrapper.setContent(out);

        let contentType = this.getContentTypeFromPath(realPath);
        responseWrapper.setContentType(contentType);
      });
  }
  getContentTypeFromPath(path: string) {
    let extensionToContentType = new Map<string, string>();
    extensionToContentType.set("html", "text/html");
    extensionToContentType.set("js", "application/javascript");

    let extension = path.split(".").reverse()[0];
    return extensionToContentType.get(extension);
  }
  handleDynamicRequest(requestWrapper: RequestWrapper, responseWrapper: ResponseWrapper) {
    var page = this.getPageFromRequestWrapper(requestWrapper);
    page.setRequestWrapper(requestWrapper);
    page.setResponseWrapper(responseWrapper);

    return page.doLogic(requestWrapper, responseWrapper);
  }
  getPageFromRequestWrapper(requestWrapper: RequestWrapper) {
    var page = PageFactory.createFromName("fallback");

    for (var path in this.pathToPageName) {
      if (requestWrapper.isPath(path)) {
        page = this.createPageFromPath(path);
      }
    }

    return page;
  }
  createPageFromPath(path: string) {
    var name = this.pathToPageName[path];
    return PageFactory.createFromName(name);
  }
}
