$(document).ready(function () {

  var moment = require('moment')
  var speakeasy = require('speakeasy');
  var $secret = $('#secret');
  var $drift = $('#drift');
  var $pin = $('#pin');
  var pins = [];
  var lastPayload = '';
  var windowSize = 30; // seconds

  function update_pin() {
    console.log("I got here!");
    var secret = $secret.val();
    var drift = $drift.val();
    if (secret == null || secret.length == 0) {
      return;
    }

    genPin(secret, drift);
    currentPayload = JSON.stringify(pins);
    //if (currentPayload == lastPayload) {
      //return;
    //}
    lastPayload = currentPayload;
    var lastPin = pins.length;
    $pin.val(pins[lastPin - 1].pin);
  }

  setInterval(function () {
    update_pin();
  }, 1000);
  $secret.keyup(function () {
    update_pin();
  });

  function genPin(secret, drift){
   for(var i = - drift ; i <= drift; ++i ) {

    var offset = i * windowSize;

    var pin = speakeasy.totp({
      secret: secret,
      encoding: 'hex',
      algorithm: 'sha1',
      time : moment().add(offset, 'seconds').unix()
    });
    pins.push({ driftIndex : i, pin : pin, current : offset == 0});
  }
}

document.addEventListener('DOMContentLoaded', update_pin);
});