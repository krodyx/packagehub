function parse(url, config, callback) {
  getPackageData(url, getDependencies);

  function getDependencies(text) {
    var parseFormat = getParser(config.format);
    var packageData = parseFormat(text);

    // dependencies and dev-dependencies
    callback(packageData[config.keys[0]], packageData[config.keys[1]]);
  }
}

function getPackageData(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", reqListener);
  xhr.open("GET", url);
  xhr.send();

  function reqListener() {
    var parser = new DOMParser();
    var doc = parser.parseFromString(this.responseText, 'text/html');
    var blob = doc.querySelector('.blob-wrapper');

    callback(blob.textContent);
  }
}

function getParser(format) {
  switch (format) {
    case 'json':
    default:
      return parseJSON;
  }
}

function parseJSON(text) {
  return JSON.parse(text);
}

window.parse = parse;