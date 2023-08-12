//"use strict";

$(document).ready(function () {
  $("#btnSetupBotFB").on("click", function (e) {
    e.preventDefault();
    $.ajax({
      url: "".concat(window.location.origin, "/set-up-bot-facebook"),
      method: "POST",
      data: {},
      success: function success(data) {
        console.log(data);
      },
      error: function error(err) {
        console.log(err);
      }
    });
  });
});