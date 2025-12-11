<h3>Tiler</h3>
<h4>Enhancing maps with floating grids and tiles</h4>
Tiler uses a decimal tile approach to enable an unambiguous use of shorthanded notation of areas on the surface of the earth. The tiling system may be used as an alternative or complementary method for the conventional use of coordinates by using unique numbers, thus, overcoming the cumbersome or incoherent use of vectors, commas, degrees, minutes, seconds and bearings. Decimal tiles split a navigation map or Meracator projected map into recursive 10 x 10 matrices of quadricular polygons. The tiles visually seem to form perfect adjacent squares or a grid. The tiles are actually trapezoids that look like squares due to earth curvature. Each granularity level has a nechanism that drills-down the previous level by spliting all tiles from a previous zoom level into 100 new tiles enabling a resolution tha may adapt to a required context. 
<br>
<h3>Tile</h3>

A "tile" represents a quadrilatareal that has asimilar functionalilty of a square pixel in HD screens, where the screen is replaced by a map superimposed on a digital canvas. A tile is instantiated by a constructor that takes g,x and y parameters. "g" represents the granualrity, x the distance in tiles from the anti-meridian to the east and y the distance in tiles from the north pole. The API calculates the tile boundaries with its method "coords" and can be "inflated" into a grid of tiles (Tbox).
At granularity level 1, 100 tiles or (10 x 10) would cover the Mercator projection base layer. In granuarity 2 the Base offset contains 100 x 100 tiles and so on.
Decimal tiles are  represented by one number instead of a vector by concatenating the drill-down level with row number and column number (padded with zeros).
A tile number shares the digits of its ancestors, which makes zooming and joining or splitting tiles more understandable and easier to program or share.

<h3>Tbox - Tile box</h3>
A tile box represents a quadrilateral perimeter that encloses tiles. It is instantiated by assigning an northwestern anchor tile number and increments to the east and south. A Tbox is denoted by concatenating a dot and the xi and yi increment to the anchor number. The API can convert a tile to a tilebox by surrounding it or extending it or using a function that has the coordinates of opposing corners. A Tbox has methods that create the set of coordinates that represent grid lines or geoJSON string that includes the coordinates of its tiles. Thus, the use of a Tbox is effective when suppoerimposing floating grids of different resolution on mapping applications.
<br>

<h3>CDN</h3>

###
``` html
<script src="https://cdn.jsdelivr.net/gh/dTile/tiler/dist/tiler.js"></script>
```

<h3>Node</h3>
<pre>
const DT = require('./YourAPPDirectory/tiler');
</pre>


<h3>JS Examples</h3>

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

//Output a geoJSON string with the coordinates of 200 tiles that are adjacent to the equator at granularity 2
var geoJSON2 = new DT.Tbox(20049,99,1).gridSON

//Output a geoJSON string with 100 tiles that cover the earth at granularity 1 (base offset)
var geoJSON = new DT.Tbox(100,9,9).gridSON
```
![Demo use](https://dtile.github.io/tiler/media/grid1.png?s=200)

<br>


[View a tile or a tilebox on a map](https://dtile.github.io/tiler/test/)

<br>

[Use Case](https://dtile.github.io/tiler/usecase)


<br>

[Granularity Breakdown](https://dtile.github.io/tiler/grid)


<hr>

<h3>Offsets</h3>
The base offset (or "offset 0") is the area confined by [90&deg;,-180&deg;] in the northwest and [-90&deg;.180&deg;] in the southeast. At offset 1 a tile would increment its longitude by 360&deg; and at offset -1 it would dercrease the longitude by 360&deg; and so on. This would enable a tile or a Tbox to be displayed west to the meridian or displayed at any selected offset of a Mercator projection layer. The offset attribute enables displaying Tbox grids that intersect with the anti-meridian. An offset attrbute of a Tbox is derived from the offset of its anchor at the northwest which may imply that some of its other tiles may be in an adjacent offset.



![Demo use](https://dtile.github.io/tiler/media/tbox2.png?raw=true)

The antimeridian is the 180° line of longitude. The Aleutian Islands archipelago, which includes Attu Island, crosses this line. 
Attu Island is located at approximately 172° 55' East longitude. Because it is east of the 180° meridian, it is technically in the Eastern Hemisphere, even though it is part of the United States. The offseting system enables diplaying a contiguous Tbox that is composed by tiles that are located in the western and eastern hemisphere.

 <hr>
  
> [!NOTE]
> Tiles visually seem to form perfect adjacent squares or a grid. The tiles are actually trapezoids that look like squares due to earth curvature under the anomality of the Mercator projection model. The anomality is accentuanted when moving towards the north or south poles.

 
<h3>License</h3>

###
Tiler is released under the [MIT license](LICENSE)

