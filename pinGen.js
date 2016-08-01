var $secret = $('#secret');
var $drift = $('#drift');
var $pin = $('#pin');
var lastPayload = '';

function update_pin() {
  chrome.extension.getBackgroundPage().console.log("I got here!");
  var secret = $secret.val();
  if (secret == null || secret.length == 0) {
    return;
  }
  $.post({
    url: "/gen",
    data: {'secret': secret, 'drift': $drift.val()}
  }).success(function (data) {
    chrome.extension.getBackgroundPage().console.log("I got here! success!");
    currentPayload = JSON.stringify(data);
    if (currentPayload == lastPayload) {
      return;
    }
    lastPayload = currentPayload;
    var source = $("#pin-template").html();
    console.log(source);
    var template = Handlebars.compile(source);
    $('#pin-stack').html("");
    data.forEach(function (el) {
      $('#pin-stack').append(template(el))
      new Clipboard('#copyToClipboard_' + el.driftIndex);
    });
  }).fail(function () {
    chrome.extension.getBackgroundPage().console.log("I got here! Dammit.....");
    $('#pin-stack').html('Invalid secret or server failure');
  });
}
setInterval(function () {
  update_pin();
}, 1000);
$secret.keyup(function () {
  update_pin();
});
document.addEventListener('DOMContentLoaded', update_pin);