<h2>Implementation</h2>


<H3>Classes</H3>
<h2>Tile</h2>
A "Tile" class when instantiated (constucted) represents a quadrilateral that delimits an area which its size and top left corner is dependent of 3 paramaters:
<ul>
<li>g - Granularity or grid density</li>
<li>x - distance in tiles from lonngitude -180&deg;</li>
<li>y - distance in tiles from latititue -180&deg;</li>
</ul>

<h2>Tbox - tile box</h2>
A "Tbox" class when instantiated represents a quadrilateral that delimits an area which is composed of adjacent tiles that are demarked by an anchor tile in the northwest corner and an  size and top left corner and an opposing tile in the bottom left corners.
The countructor is dependent of 3 paramaters:
<ul>
<li>tn - Tile number of the anchor</li>
<li>xi - distance increment in tiles from the anchor to the east</li>
<li>yi - distance in tiles from the anchor to the south</li>
</ul>

<h2>Tbag - tile bag</h2>
A "Tbag" class extend th Tbox class by adding a bag property that lists arrays of tile numbers which may not be adjancent. This serves for overlaying tiles ("tetrisizing") on non recangular areas and building dynamic perimeters such as finding a perimeter of tiles that cover or surround GeoJSON areas.
