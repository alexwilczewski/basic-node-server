export class PageFactory {
  static createFromName(pageName: string) {
    let page = require("../pages/" + pageName);
    return new page(pageName);
  }
}
