import { Page } from "../lib/Page";
import * as q from "q";

class fallback extends Page {
  doLogic() {
    return q.when();
  }
}

export = fallback;
