$(document).ready(function () {

  //Injecting moment and speakeasy to match previous implementation
  var moment = require('moment')
  var speakeasy = require('speakeasy');

  var $secret = $('#secret');
  var $drift = $('#drift');
  var $pin = $('#pin');
  var pins = [];
  var lastPayload = '';
  var windowSize = 30; // seconds
  var $fillPinSignInButton = $('#fillPinSignInButton');

  function update_pin() {
    var secret = $secret.val();
    var drift = $drift.val();
    if (secret == null || secret.length == 0) {
      return;
    }

    genPin(secret, drift);
    currentPayload = JSON.stringify(pins);
    if (currentPayload == lastPayload) {
      return;
    }
    lastPayload = currentPayload;
    $pin.val(pins[pins.length - 1].pin);

    fillPinSignInButton.click();
  }

  setInterval(function () {
    update_pin();
  }, 1000);
  $secret.keyup(function () {
    update_pin();
  });

  document.getElementById('fillPinSignInButton').addEventListener("click", function(){
    //if the active tab is the motdev site.
    //Add in check to parent tab to ensure it is motdev site.
    if(pins != null) {
      var script = "document.getElementById('pin').value = '" + pins[pins.length - 1].pin  + "';";
      //var script = "console.log(document.getElementById('pin'));";
    }
    //Fill in script to inject pin to motdev site
    chrome.tabs.executeScript({code : script});
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
});