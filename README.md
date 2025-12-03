<h3>Tiler</h3>
<h4>Adding floating grids and tiles on maps</h4>
Decimal tiles enable a unified shorthanded notation system for areas on the surface of the earth instead of an alternative or complementary set of coordinates by using unique numbers, overcoming the cumbersome use of vectors, commas, degrees, minutes, seconds and bearings. Decimal tiles split a navigation map or Meracator projected map into recursive 10 x 10 matrices of quadricular polygons. The tiles visually seem to form perfect adjacent squares or a grid. The tiles are actually trapezoids that look like squares due to earth curvature. Each drill-down level splits a tile from a previous zoom level into 100 new tiles enabling granularity as required by the context. Decimal tiles can be represented by one number instead of a vector by concatenating the drill-down level with row number and column number (padded with zeros).
<br>
<h3>Tile</h3>

A "tile" is an object that is constructed by g,x and y parameters. "g" represents the granualrity, x the distance in tiles from the anti-meridian to the east and y the distance in tiles from the north pole. The API calculates the tile boundaries with its method "coords" and can be "inflated" into a tile-box.
Granularity level 1 covers a basic Mercator projection layer with 100 tiles or (10 x 10). 
In granuarity 2 the Base offset contains 100 x 100 tiles and so on.
The base offset (or 0) is the area confined by [90&deg;,-180&deg;] in the northwest and [-90&deg;.180&deg;] in the southeast. A tile number shares the digits of its ancestors, which makes zooming and joining or splitting tiles more understandable and easier to program or share.

<h3>Tbox - Tile box</h3>
A tile box represents a quadrilateral perimeter that contains tiles. It is instantiated by assigning an anchor tile number and increments to the east and south. A Tbox is denoted by concatenating a dot and the xi and yi thresholds. The API can convert a tile to a tilebox by surrounding it or extending it or using a function that has the coordinates of opposing corners. A Tbox has methods that create the set of coordinates that represent grid lines or geoJSON string that includes the coordinates of its tiles. Thus, the use of a Tbox is effective when suppoerimposing floating grids of different sizes on mapping systems or naviagation applications.
<br>

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

![Demo use](https://dtile.github.io/DT/test/dt.png?raw=true)

 <hr>
  
> [!NOTE]
> Tiles visually seem to form perfect adjacent squares or a grid. The tiles are actually trapezoids that look like squares due to earth curvature under the Mercator projection model.

 
<h3>License</h3>

###
DT is released under the [MIT license](LICENSE)

