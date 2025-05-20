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

  /**
   * Encodes a GeoJSON LineString or Polygon into a polyline string.
   *
   * @param {Object} geojson - The GeoJSON object to encode. Must be of type 'LineString' or 'Polygon'.
   * @param {number} [precision=5] - The precision to use for encoding coordinates.
   * @returns {string} The encoded polyline string.
   * @throws {Error} If the GeoJSON is invalid or not a supported type.
   */
  function encodeGeoJSON(geojson, precision = 5) {
    if (!geojson || !geojson.type) throw new Error('Invalid GeoJSON');
    let coords;
    if (geojson.type === 'LineString') {
      coords = geojson.coordinates;
    } else if (geojson.type === 'Polygon') {
      coords = geojson.coordinates[0];
    } else {
      throw new Error('Only LineString and Polygon GeoJSON types are supported');
    }
    // Swap [lng,lat] -> [lat,lng] for polyline
    const swapped = coords.map(pt => [pt[1], pt[0]]);
    return encode(swapped, precision);
  }

  /**
   * Decodes a polyline string into a GeoJSON geometry object (LineString or Polygon).
   *
   * @param {string} polyline - The encoded polyline string.
   * @param {number} [precision=5] - The precision factor used during encoding (default is 5).
   * @param {'LineString'|'Polygon'} [type='LineString'] - The type of GeoJSON geometry to return.
   * @returns {Object} A GeoJSON geometry object of the specified type with coordinates in [lng, lat] order.
   * @throws {Error} Throws if the type is not 'LineString' or 'Polygon'.
   */
  function decodeToGeoJSON(polyline, precision = 5, type = 'LineString') {
    // decode return [lat, lng], swap [lng, lat] for GeoJSON
    let coords = decode(polyline, precision).map(pt => [pt[1], pt[0]]);
    if (type === 'LineString') {
      return {
        type: 'LineString',
        coordinates: coords
      };
    } else if (type === 'Polygon') {
      // Ensure first and last point are the same (closed ring)
      const closed = coords.length > 0 && (coords[0][0] !== coords[coords.length-1][0] || coords[0][1] !== coords[coords.length-1][1])
        ? [...coords, coords[0]]
        : coords;
      return {
        type: 'Polygon',
        coordinates: [closed]
      };
    } else {
      throw new Error('Only LineString and Polygon GeoJSON types are supported');
    }
  }

  exports.encode = encode;
  exports.decode = decode;
  exports.encodeNumber = encodeNumber;
  exports.encodeGeoJSON = encodeGeoJSON;
  exports.decodeToGeoJSON = decodeToGeoJSON;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = exports;
    global.polyline = exports;
  }
});
