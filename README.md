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
console.log(encodedPolyline); // Output: _p~iF~ps|U_ulLnnqC_mqNvxq`@

// Decode polyline
const polylineString = '_p~iF~ps|U_ulLnnqC_mqNvxq`@';
const decodedCoordinates = polyline.decode(polylineString);
console.log(decodedCoordinates); // Output: [ [ 38.5, -120.2 ], [ 40.7, -120.95 ], [ 43.252, -126.453 ] ]

// Encode coordinates with precision 6
const coordinates2 = [[-25.42, -49.27], [-25.41, -49.28], [-25.40, -49.29]];
const encodedPolyline2 = polyline.encode(coordinates2, 6);
console.log(encodedPolyline2); // Output: ~yczCn`vkHw}@nz}@oz}@n

// Decode polyline with precision 6
const polylineString2 = '~yczCn`vkHw}@nz}@oz}@n';
const decodedCoordinates2 = polyline.decode(polylineString2, 6);
console.log(decodedCoordinates2); // Output: [ [ -25.42, -49.27 ], [ -25.41, -49.28 ], [ -25.4, -49.29 ] ]
```

### ES Module

```javascript
import { encode, decode } from '@trackasia/polyline';

// Encode coordinates
const coordinates = [[38.5, -120.2], [40.7, -120.95], [43.252, -126.453]];
const encodedPolyline = encode(coordinates);
console.log(encodedPolyline); // Output: _p~iF~ps|U_ulLnnqC_mqNvxq`@

// Decode polyline
const polylineString = '_p~iF~ps|U_ulLnnqC_mqNvxq`@';
const decodedCoordinates = decode(polylineString);
console.log(decodedCoordinates); // Output: [ [ 38.5, -120.2 ], [ 40.7, -120.95 ], [ 43.252, -126.453 ] ]

// Encode coordinates with precision 6
const coordinates2 = [[-25.42, -49.27], [-25.41, -49.28], [-25.40, -49.29]];
const encodedPolyline2 = encode(coordinates2, 6);
console.log(encodedPolyline2); // Output: ~yczCn`vkHw}@nz}@oz}@n

// Decode polyline with precision 6
const polylineString2 = '~yczCn`vkHw}@nz}@oz}@n';
const decodedCoordinates2 = decode(polylineString2, 6);
console.log(decodedCoordinates2); // Output: [ [ -25.42, -49.27 ], [ -25.41, -49.28 ], [ -25.4, -49.29 ] ]
```

### Browser

```html
<script src="https://unpkg.com/@trackasia/polyline"></script>
<script>
// Encode coordinates
const coordinates = [[38.5, -120.2], [40.7, -120.95], [43.252, -126.453]];
const encodedPolyline = polyline.encode(coordinates);
console.log(encodedPolyline); // Output: _p~iF~ps|U_ulLnnqC_mqNvxq`@

// Decode polyline
const polylineString = '_p~iF~ps|U_ulLnnqC_mqNvxq`@';
const decodedCoordinates = polyline.decode(polylineString);
console.log(decodedCoordinates); // Output: [ [ 38.5, -120.2 ], [ 40.7, -120.95 ], [ 43.252, -126.453 ] ]

// Encode coordinates with precision 6
const coordinates2 = [[-25.42, -49.27], [-25.41, -49.28], [-25.40, -49.29]];
const encodedPolyline2 = polyline.encode(coordinates2, 6);
console.log(encodedPolyline2); // Output: ~yczCn`vkHw}@nz}@oz}@n

// Decode polyline with precision 6
const polylineString2 = '~yczCn`vkHw}@nz}@oz}@n';
const decodedCoordinates2 = polyline.decode(polylineString2, 6);
console.log(decodedCoordinates2); // Output: [ [ -25.42, -49.27 ], [ -25.41, -49.28 ], [ -25.4, -49.29 ] ]
</script>
```

## License

MIT
