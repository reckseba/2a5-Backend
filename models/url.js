const mongoose = require('mongoose');
const qrcode = require('qrcode');
const Schema = mongoose.Schema;

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function makeUrlShort(lengthMin, lengthMax, callbackFunction) {
  const length = randomIntFromInterval(lengthMin, lengthMax);
  let urlShort = '';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const countChars = chars.length;

  for ( var i = 0; i < length; i++ ) {
    urlShort += chars.charAt(Math.floor(Math.random() * countChars));
  }

  callbackFunction(urlShort);
}

function makeQrCode(urlShort, callbackFunction) {

  qrcode.toDataURL('https://2a5.de/' + urlShort, function (err, urlQrCode) {
    callbackFunction(urlQrCode);
  });
  
}

//create schema for url
const UrlSchema = new Schema({
  urlLong: {
    type: String,
    required: [true, 'The long url is required'],
    unique: true
  },
  urlShort: {
    type: String,
    required: false,
    unique: true
  },
  urlQrCode: {
    type: String,
    required: false
  },
  updated: { 
    type: Date,
    default: Date.now() 
  }
});


// Define a pre-save method for UrlSchema
UrlSchema.pre('save', function(next) {
  var self = this;

  // Example of your function where you get the last ID
  makeUrlShort(3, 5, function(urlShort) {
    // Assigning the id property and calling next() to continue
    self.urlShort = urlShort;

    makeQrCode(self.urlShort, function (urlQrCode) {
      self.urlQrCode = urlQrCode;

      next();
    });

  });

});

//create model for todo
const Url = mongoose.model('url', UrlSchema);

module.exports = Url;