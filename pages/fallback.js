"use strict";
const Page_1 = require("../lib/Page");
const q = require("q");
class fallback extends Page_1.Page {
    doLogic() {
        return q.when();
    }
}
module.exports = fallback;
