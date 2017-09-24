import * as fs from "fs"
import * as q from "q";
import { RequestWrapper } from "./RequestWrapper";
import { ResponseWrapper } from "./ResponseWrapper";

export abstract class Page {
  name: string;
  requestWrapper: RequestWrapper;
  responseWrapper: ResponseWrapper;
  constructor(name: string) {
    this.name = name;
  }
  setRequestWrapper(requestWrapper: RequestWrapper) {
    this.requestWrapper = requestWrapper;
  }
  setResponseWrapper(responseWrapper: ResponseWrapper) {
    this.responseWrapper = responseWrapper;
  }
  abstract doLogic(): q.Promise<void>;
  renderHtml() {
    var path = this.getHtmlPath(this.name);
    return q.nfcall(fs.readFile, path, "utf-8");
  }
  getHtmlPath(pageName: string) {
    return "./pages/" + pageName + ".html";
  }
}
