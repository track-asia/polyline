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

describe('GeoJSON encode/decode', function () {
  it('should encode GeoJSON LineString to polyline', function () {
    const geojson = {
      type: 'LineString',
      coordinates: [
        [-120.2, 38.5],
        [-120.95, 40.7],
        [-126.453, 43.252],
      ],
    };
    const encoded = polyline.encodeGeoJSON(geojson);
    assert.strictEqual(encoded, '_p~iF~ps|U_ulLnnqC_mqNvxq`@');
  });

  it('should decode polyline to GeoJSON LineString', function () {
    const polylineString = '_p~iF~ps|U_ulLnnqC_mqNvxq`@';
    const geojson = polyline.decodeToGeoJSON(polylineString, 5, 'LineString');
    assert.deepStrictEqual(geojson, {
      type: 'LineString',
      coordinates: [
        [-120.2, 38.5],
        [-120.95, 40.7],
        [-126.453, 43.252],
      ],
    });
  });

  it('should encode GeoJSON Polygon to polyline (first ring)', function () {
    const geojson = {
      type: 'Polygon',
      coordinates: [
        [
          [0, 0],
          [10, 10],
          [20, 20],
          [0, 0], // closed ring
        ],
      ],
    };
    // Polyline sẽ encode cả điểm đầu và cuối nếu khác nhau, nên kết quả sẽ dài hơn
    const encoded = polyline.encodeGeoJSON(geojson);
    // Tạo polyline từ các điểm, kể cả điểm đóng vòng
    const expected = polyline.encode([
      [0, 0],
      [10, 10],
      [20, 20],
      [0, 0],
    ]);
    assert.strictEqual(encoded, expected);
  });

  it('should decode polyline to GeoJSON Polygon (first ring)', function () {
    // Polyline không cần điểm đóng vòng, hàm decodeToGeoJSON sẽ tự thêm nếu thiếu
    const polylineString = polyline.encode([
      [0, 0],
      [10, 10],
      [20, 20],
    ]);
    const geojson = polyline.decodeToGeoJSON(polylineString, 5, 'Polygon');
    assert.deepStrictEqual(geojson, {
      type: 'Polygon',
      coordinates: [
        [
          [0, 0],
          [10, 10],
          [20, 20],
          [0, 0], // điểm đóng vòng được thêm tự động
        ],
      ],
    });
  });
});
