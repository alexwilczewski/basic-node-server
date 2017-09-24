import { Page } from "../lib/Page";
import * as q from "q";

class index extends Page {
  doLogic() {
    return this.renderHtml()
      .then((out: string) => {
        this.responseWrapper.setContent(out);
        this.responseWrapper.setContentType("text/html");
      });
  }
}

export = index;
