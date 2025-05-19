# @trackasia/polyline

A utility for encoding and decoding [Google Polylines](https://developers.google.com/maps/documentation/utilities/polylinealgorithm).

## Installation

```bash
npm install @trackasia/polyline
```

## Usage

### CommonJS

```javascript
const polyline = require('@trackasia/polyline');

// Encode coordinates
const coordinates = [[38.5, -120.2], [40.7, -120.95], [43.252, -126.453]];
const encodedPolyline = polyline.encode(coordinates);
console.log(encodedPolyline);

// Decode polyline
const polylineString = '_p~iF~ps|U_ulLnnqC_mqNvxq`@';
const decodedCoordinates = polyline.decode(polylineString);
console.log(decodedCoordinates);

// Encode coordinates with precision 6
const coordinates2 = [[-25.42, -49.27], [-25.41, -49.28], [-25.40, -49.29]];
const encodedPolyline2 = polyline.encode(coordinates2, 6);
console.log(encodedPolyline2);

// Decode polyline with precision 6
const polylineString2 = '~yczCn`vkHw}@nz}@oz}@n';
const decodedCoordinates2 = polyline.decode(polylineString2, 6);
console.log(decodedCoordinates2);
```

### ES Module

```javascript
import { encode, decode } from '@trackasia/polyline';

// Encode coordinates
const coordinates = [[38.5, -120.2], [40.7, -120.95], [43.252, -126.453]];
const encodedPolyline = encode(coordinates);
console.log(encodedPolyline);

// Decode polyline
const polylineString = '_p~iF~ps|U_ulLnnqC_mqNvxq`@';
const decodedCoordinates = decode(polylineString);
console.log(decodedCoordinates);

// Encode coordinates with precision 6
const coordinates2 = [[-25.42, -49.27], [-25.41, -49.28], [-25.40, -49.29]];
const encodedPolyline2 = encode(coordinates2, 6);
console.log(encodedPolyline2);

// Decode polyline with precision 6
const polylineString2 = '~yczCn`vkHw}@nz}@oz}@n';
const decodedCoordinates2 = decode(polylineString2, 6);
console.log(decodedCoordinates2);
```

### Browser

```html
<script src="https://unpkg.com/@trackasia/polyline/index.js"></script>
<script>
// Encode coordinates
const coordinates = [[38.5, -120.2], [40.7, -120.95], [43.252, -126.453]];
const encodedPolyline = polyline.encode(coordinates);
console.log(encodedPolyline);

// Decode polyline
const polylineString = '_p~iF~ps|U_ulLnnqC_mqNvxq`@';
const decodedCoordinates = polyline.decode(polylineString);
console.log(decodedCoordinates);

// Encode coordinates with precision 6
const coordinates2 = [[-25.42, -49.27], [-25.41, -49.28], [-25.40, -49.29]];
const encodedPolyline2 = polyline.encode(coordinates2, 6);
console.log(encodedPolyline2);

// Decode polyline with precision 6
const polylineString2 = '~yczCn`vkHw}@nz}@oz}@n';
const decodedCoordinates2 = polyline.decode(polylineString2, 6);
console.log(decodedCoordinates2);
</script>
```

## GeoJSON Support

### Encode GeoJSON to Polyline

GeoJSON coordinates use `[lng, lat]` order. The polyline algorithm uses `[lat, lng]`. The API automatically converts between these formats for you.

#### Encode GeoJSON LineString

```js
const geojsonLine = {
  type: 'LineString',
  coordinates: [
    [-120.2, 38.5],
    [-120.95, 40.7],
    [-126.453, 43.252],
  ],
};
const poly = polyline.encodeGeoJSON(geojsonLine);
console.log(poly); // _p~iF~ps|U_ulLnnqC_mqNvxq`@
```

#### Encode GeoJSON Polygon (first ring only)

```js
const geojsonPoly = {
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
const poly = polyline.encodeGeoJSON(geojsonPoly);
console.log(poly);
```

### Decode Polyline to GeoJSON

#### Decode to GeoJSON LineString

```js
const poly = '_p~iF~ps|U_ulLnnqC_mqNvxq`@';
const geojsonLine = polyline.decodeToGeoJSON(poly, 5, 'LineString');
console.log(geojsonLine);
// {
//   type: 'LineString',
//   coordinates: [
//     [-120.2, 38.5],
//     [-120.95, 40.7],
//     [-126.453, 43.252],
//   ]
// }
```

#### Decode to GeoJSON Polygon

```js
const poly = '??_c`|@_c`|@_c`|@_c`|@';
const geojsonPoly = polyline.decodeToGeoJSON(poly, 5, 'Polygon');
console.log(geojsonPoly);
// {
//   type: 'Polygon',
//   coordinates: [
//     [
//       [0, 0],
//       [10, 10],
//       [20, 20],
//       [0, 0],
//     ]
//   ]
// }
```

## License

MIT
