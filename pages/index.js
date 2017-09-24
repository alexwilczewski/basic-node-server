"use strict";
const Page_1 = require("../lib/Page");
class index extends Page_1.Page {
    doLogic() {
        return this.renderHtml()
            .then((out) => {
            this.responseWrapper.setContent(out);
            this.responseWrapper.setContentType("text/html");
        });
    }
}
module.exports = index;
