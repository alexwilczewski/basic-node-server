"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PageFactory {
    static createFromName(pageName) {
        let page = require("../pages/" + pageName);
        return new page(pageName);
    }
}
exports.PageFactory = PageFactory;
