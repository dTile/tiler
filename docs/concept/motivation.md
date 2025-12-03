
<h2>Tiler - Tiling Algorithms</h2>
<h3>Motivation</h3>
The decimal tile system (DTS), enables a unified global area definition without a need to specify coordinats or a clumsy system of comma delimited arrays or degrees, minutes and seconds. It may solve the problem of governments and lifesaving entities who don't use a well defined and unified system of proveying, understandable, comparable, traceable and unifed permiters needed for evacuations, alrest and coordination of response teams. Some governments or counties use their own asymetrical and incoherent delimiting systems because they are afraid of sxposing coordinates of priveate properties or because they want to create inneficient budgeting system that give more possibilites of money laundring or manipulative biddings by the use of red tape and inequal areas sizin and zoning.

<h3>Overcoming Notation Incoherency&#9638;</h3>
The North-Easting or the East-Northing coordinate notation systema have many incoherent formats where some applications use spaces, bearings, commas, minutes, degrees and seconds in differnt ways. Even barcoding a coordinate is cumbersome, since the degree symbol or the commas are not supported in various machines. The conventional map image tiling systems (x:y:z) make it difficult to humans to understand how far a tile is located from the meridian, equator or poles since a calculation of a binary math power by 2 is needed to understand its position. The DTS system simplifies and make a coherent notation of geolocations by pixelizing a map to decimal digits in chunks of 10x10 matrices putting the drilldown level up in front of the tile notation. The granularity of at 8 drilldown level achieves areas of 0.3 meters which may be enough for real estate purposes. Tourism, evacuation maps and nature disaster alerts may use drilldown level 6 or 5.
<hr>

<h3>Decimal Tiles</h3>
<p>
Decimal tiles split a navigation map or Meracator projected map into matrices of 10 x 10 polygons that visually seem to form perfect squares. Each zoom or drill down level splits a tile from a previous zoom level to 100 new tiles. At level 1 a map is pixelized into 100 tiles (10x10). At level 2 the map is pixelizes to 10,000 (100x100) tiles and so on.
Decimal tiles can be represented by one number instead of a x:y:z vector by concatenating the drill down level with row number and column number (padded with zeros). An API can return the latitude and longitude of a tile corner by spliting a previous level tile by 10 columns and 10 rows and making the proper calculations.
</p>

<h3>Binary or Decimal</h3>
<p>
Map tiles as used by image tiling providers represent the conventional polygons that make up a map tile layer. A tile layer is a matrix of image tiles that are superimposed on a an HTML element or digital canvas giving a perception of a continous map.
A binary tile in a specific zoom level has the corners defined by splitting a tile from a previous zoom level to 4 new tiles (2x2). Usually an image tile is an object that has 256 x 256 pixels and is identified with x:y:z string that represents a vector.<BR>
A decimal tile in a specific zoom level has the corners defined by splitting a tile from a previous zoom level to 100 new tiles (10x10) instead of 4. Pixelizing a row by 10 makes it more understandable and makes optimal use of the available characters in the decimal naming model.Thus, a row or a column in a 10x10 matrix can be identified with only one digit like a spreadsheet. Decimal tiles may be easier to program, name, manipulate, drill down, backtrack or join in many situations just by looking or manipulating its numerator.
</p>


![Demo use](https://dtile.github.io/tiler/media/tiles.png?raw=true)

