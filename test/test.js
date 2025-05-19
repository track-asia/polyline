const assert = require('assert');
const polyline = require('../index.js');

describe('Polyline', function () {
  it('should encode coordinates', function () {
    const coordinates = [
      [38.5, -120.2],
      [40.7, -120.95],
      [43.252, -126.453],
    ];
    const encodedPolyline = polyline.encode(coordinates);
    assert.strictEqual(encodedPolyline, '_p~iF~ps|U_ulLnnqC_mqNvxq`@');
  });

  it('should decode polyline', function () {
    const polylineString = '_p~iF~ps|U_ulLnnqC_mqNvxq`@';
    const decodedCoordinates = polyline.decode(polylineString);
    assert.deepStrictEqual(decodedCoordinates, [
      [38.5, -120.2],
      [40.7, -120.95],
      [43.252, -126.453],
    ]);
  });

  it('should encode coordinates 2 (precision 5)', function () {
    const coordinates = [
      [-25.42, -49.27],
      [-25.41, -49.28],
      [-25.4, -49.29],
    ];
    const encodedPolyline = polyline.encode(coordinates);
    assert.strictEqual(encodedPolyline, '~yczCn`vkHo}@n}@o}@n}@');
  });

  it('should decode polyline 2 (precision 5)', function () {
    const polylineString = '~yczCn`vkHo}@n}@o}@n}@';
    const decodedCoordinates = polyline.decode(polylineString);
    assert.deepStrictEqual(decodedCoordinates, [
      [-25.42, -49.27],
      [-25.41, -49.28],
      [-25.4, -49.29],
    ]);
  });

  it('should encode coordinates 2 (precision 6)', function () {
    const coordinates = [
      [-25.42, -49.27],
      [-25.41, -49.28],
      [-25.4, -49.29],
    ];
    const encodedPolyline = polyline.encode(coordinates, 6);
    assert.strictEqual(encodedPolyline, '~lono@~me~|A_pR~oR_pR~oR');
  });

  it('should decode polyline 2 (precision 6)', function () {
    const polylineString = '~lono@~me~|A_pR~oR_pR~oR';
    const decodedCoordinates = polyline.decode(polylineString, 6);
    assert.deepStrictEqual(decodedCoordinates, [
      [-25.42, -49.27],
      [-25.41, -49.28],
      [-25.4, -49.29],
    ]);
  });

  it('should encode coordinates 3', function () {
    const coordinates = [
      [0, 0],
      [10, 10],
      [20, 20],
    ];
    const encodedPolyline = polyline.encode(coordinates);
    assert.strictEqual(encodedPolyline, '??_c`|@_c`|@_c`|@_c`|@');
  });

  it('should decode polyline 3', function () {
    const polylineString = '??_c`|@_c`|@_c`|@_c`|@';
    const decodedCoordinates = polyline.decode(polylineString);
    assert.deepStrictEqual(decodedCoordinates, [
      [0, 0],
      [10, 10],
      [20, 20],
    ]);
  });
});
