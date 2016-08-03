$(document).ready(function () {

  //Injecting moment and speakeasy to match previous implementation
  var moment = require('moment')
  var speakeasy = require('speakeasy');

  var $serialNum = $('#serialNum');
  var $secret = $('#secret');
  var $drift = $('#drift');
  var $pin = $('#pin');
  var pins = [];
  var serials = [];
  var lastPayload = '';
  var windowSize = 30; // seconds
  var $fillPinSignInButton = $('#fillPinSignInButton');

  initialDropdownPopulate();

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
    if(pins != null) {
      var script = 'document.getElementById("pin).value = "' + pins[pins.length - 1].pin  + '";';
    }
    chrome.tabs.executeScript({code : script});
  });

  document.getElementById('persistSerialAndSecret').addEventListener("click", function(){
    var serial = $serialNum.val();
    var secret = $secret.val();

    var serials = JSON.parse(localStorage.getItem("serials"));
    var serialSecretObj = '{ "serial": "' + serial + '", "secret":"'+ secret + '"}';
    if(!!serials) {
      serials += "," + serialSecretObj;
    } else {
      serials = serialSecretObj;
    }
    localStorage.removeItem("serials");
    localStorage.setItem("serials", serials);
    createSecretOptions(serials);
    //check if serial already exists in local storage
    //Show dropdown menu when more at least one item is in the local storage.
  });

  function initialDropdownPopulate(){
    var serials = localStorage.getItem("serials");
    if(serials !== null){
      createSecretOptions(serials);
    }
  };

  function createSecretOptions(serialSecretJSONData){
    console.log(serialSecretJSONData);
    for (var field in serialSecretJSONData) {
      console.log(field);
         //$('<option value="'+ jsonDataForBrands[field].name +'">' + jsonDataForBrands[field].title + '</option>').appendTo('#serialSecretSelect');
    }
    $('#serialSecretSelect').show();
  };

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