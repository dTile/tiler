<h3>Tiler</h3>
<h4>Adding floating grids and tiles on maps</h4>
Decimal tiles enable a unified shorthanded notation of areas on the surface of the earth instead of an alternative or complementary set of coordinates by using unique numbers, overcoming the cumbersome use of vectors, commas, degrees, minutes, seconds and bearings. Decimal tiles split a navigation map or Meracator projected map into recursive 10 x 10 matrices of quadricular polygons. The tiles visually seem to form perfect adjacent squares or a grid. The tiles are actually trapezoids that look like squares due to earth curvature. Each drill-down level splits a tile from a previous zoom level into 100 new tiles enabling granularity as required by the context. Decimal tiles can be represented by one number instead of a vector by concatenating the drill-down level with row number and column number (padded with zeros).
<br>
<h3>Tile</h3>

A "tile" represents a quadrilatareal that has asimilar functionalilty of a square pixel in an HD screen, where the screen is replaced by a map or a digital canvas. A tile is instantiated by a constructor that takes g,x and y parameters. "g" represents the granualrity, x the distance in tiles from the anti-meridian to the east and y the distance in tiles from the north pole. The API calculates the tile boundaries with its method "coords" and can be "inflated" into a tile-box.
At granularity level 1, 100 tiles or (10 x 10) would cover the Mercator projection base layer. In granuarity 2 the Base offset contains 100 x 100 tiles and so on.
A tile number shares the digits of its ancestors, which makes zooming and joining or splitting tiles more understandable and easier to program or share.

<h3>Tbox - Tile box</h3>
A tile box represents a quadrilateral perimeter that contains tiles. It is instantiated by assigning an anchor tile number and increments to the east and south. A Tbox is denoted by concatenating a dot and the xi and yi thresholds. The API can convert a tile to a tilebox by surrounding it or extending it or using a function that has the coordinates of opposing corners. A Tbox has methods that create the set of coordinates that represent grid lines or geoJSON string that includes the coordinates of its tiles. Thus, the use of a Tbox is effective when suppoerimposing floating grids of different sizes on mapping systems or naviagation applications.
<br>

<h3>Offsets</h3>
The base offset (or 0) is the area confined by [90&deg;,-180&deg;] in the northwest and [-90&deg;.180&deg;] in the southeast. At offset 1 a tile would increment its longitude by 360deg; and at offset -1 it would dercrease the longitude by 360deg; and so on. This would enable a tile or a Tbox to be displayed west to the meridian or displayed at any selected offset of a Mercator projection layer. The offset attribute enables displaying Tbox grids that intersect with the anti-meridian. An offset attrbite of a Tbox is derived from the offset of its anchor at the northwest which may imply that some of its other tiles may be in another offset.


<h3>CDN</h3>

###
``` html
<script src="https://cdn.jsdelivr.net/gh/dTile/tiler/dist/tiler.js"></script>
```


<h3>JS</h3>

###
```
// Intantiate a tile that encloses "Null Island" in granularity level 2
var tile = DT.find(0,0,2);
//or
var tile = new DT.Tile(2,50,50);
//or
var tile = new DT.Tile(25050);

//set the decimal precision to 6 and get the bounding coordinates;
tile.p=6;
console.log(tile.coords);
// result [[0,0],[0,3.6],[-3.597634,3.6],[-3.597634,0]]

//instantiate a tile-box (tbox) that surrounds "tile" with 10 tiles in each side and print corners' coordinates;
var tbox = tile.surround(10);
console.log(tbox.coords);

//Output a geoJSON string with all tbox tiles
console.log(tbox.gridJSON);
```
<br>

[View a tile or a tilebox on a map](https://dtile.github.io/tiler/test/)

<br>

[Use Case](https://dtile.github.io/tiler/concept/usecase)


<hr>

![Demo use](https://dtile.github.io/tiler/media/tbox2.png?raw=true)

 <hr>
  
> [!NOTE]
> Tiles visually seem to form perfect adjacent squares or a grid. The tiles are actually trapezoids that look like squares due to earth curvature under the Mercator projection model.

 
<h3>License</h3>

###
DT is released under the [MIT license](LICENSE)

