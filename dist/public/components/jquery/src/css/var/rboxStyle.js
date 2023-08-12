//"use strict";

define(["./cssExpand"], function (cssExpand) {
  //"use strict";

  return new RegExp(cssExpand.join("|"), "i");
});