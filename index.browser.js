(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
    ? define(['exports'], factory)
    : ((global = typeof globalThis !== 'undefined' ? globalThis : global || self), factory((global.polyline = {})));
})(this, function (exports) {
  'use strict';

  /**
   * Encodes a list of coordinates into a Polyline string.
   * @param {Array<[number, number]>} coordinates Array of coordinate pairs (lat, lng).
   * @param {number} precision The precision of the encoding (default: 5).
   * @returns {string} The Polyline string.
   */
  function encode(coordinates, precision = 5) {
    let encoded = '';
    let plat = 0;
    let plng = 0;
    const factor = Math.pow(10, precision);

    for (let i = 0; i < coordinates.length; i++) {
      let point = coordinates[i];
      let lat = point[0];
      let lng = point[1];

      let late5 = Math.round(lat * factor);
      let lnge5 = Math.round(lng * factor);

      let dlat = late5 - plat;
      let dlng = lnge5 - plng;

      plat = late5;
      plng = lnge5;

      encoded += encodeNumber(dlat);
      encoded += encodeNumber(dlng);
    }

    return encoded;
  }

  /**
   * Decodes a Polyline string into a list of coordinates.
   * @param {string} polyline The Polyline string.
   * @param {number} precision The precision of the decoding (default: 5).
   * @returns {Array<[number, number]>} Array of coordinate pairs (lat, lng).
   */
  function encodeNumber(num) {
    let encoded = '';
    let shifted = num < 0 ? ~(num << 1) : num << 1;

    while (shifted >= 0x20) {
      encoded += String.fromCharCode((0x20 | (shifted & 0x1f)) + 63);
      shifted >>= 5;
    }

    encoded += String.fromCharCode(shifted + 63);
    return encoded;
  }

  /**
   * Decodes a Polyline string into a list of coordinates.
   * @param {string} polyline The Polyline string.
   * @param {number} precision The precision of the decoding (default: 5).
   * @returns {Array<[number, number]>} Array of coordinate pairs (lat, lng).
   */
  function decode(polyline, precision = 5) {
    let coordinates = [];
    let index = 0;
    let lat = 0;
    let lng = 0;
    const factor = Math.pow(10, precision);

    while (index < polyline.length) {
      let shift = 0;
      let result = 0;

      do {
        var byte = polyline.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);

      let dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;

      do {
        var byte = polyline.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);

      let dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      coordinates.push([lat / factor, lng / factor]);
    }

    return coordinates;
  }

  exports.encode = encode;
  exports.decode = decode;
  exports.encodeNumber = encodeNumber;
});
