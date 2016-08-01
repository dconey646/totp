var speakeasy = require('speakeasy');
var $secret = $('#secret');
var $drift = $('#drift');
var $pin = $('#pin');
var pins = [];
var lastPayload = '';

function update_pin() {
  console.log("I got here!");
  var secret = $secret.val();
  if (secret == null || secret.length == 0) {
    return;
  }

  genPin(secret, drift);
  currentPayload = JSON.stringify(data);
  if (currentPayload == lastPayload) {
    return;
  }
  lastPayload = currentPayload;
  var source = $("#pin-template").html();
  console.log(source);
  $('#pin-stack').html("");
  data.forEach(function (el) {
    $('#pin-stack').append(template(el))
    new Clipboard('#copyToClipboard_' + el.driftIndex);
  });
  $pin.val =
  setInterval(function () {
    update_pin();
  }, 1000);
  $secret.keyup(function () {
    update_pin();
  });
}
function genPin(secret, drift){
  var offset = i * windowSize;

  console.log("I got here!");
  var pin = speakeasy.totp({
    secret: secret,
    encoding: 'hex',
    algorithm: 'sha1',
    time : moment().add(offset, 'seconds').unix()
  });
  pins.push({ driftIndex : i, pin : pin, current : offset == 0});
  console.log(pins);
}


document.addEventListener('DOMContentLoaded', update_pin);