<h3>Tiler - Use Case</h3>
      
<h4>How can tiling help in mapping applications</h4>
<p>
Perimeter tiling helps demarking areas needed for geo-business applications or for response management operations before or during disaster events such as fires, floods or a dam collapse / overflooding.
A tiled perimeter is better than the conventional area partitioning that depends on county boundaries or other non-symateric method and that does't cover same size areas. This anomaility makes some perimeters significantly bigger when compared to others which may create false alarms to far areas and undermine an efficient distribution of response teams and equipment.
The use of tiled perimeters has the following benfits:
<ol>
<li>Damarking areas that are made by joining similiar size tiles using a shorthanded, unified, easy to understand and traceable numeric representation</li>
<li>Enabling the use of matrices that are any combination of tiles accordingly with a resolution (granularity) level.</li>
<li>Ability to digitize/pixelize polygon areas accordingly with a adaptable resolution (granularity) and creating dynamic perimeters</li>
<li>Overcoming the need of cumbersome calculations and high memory use needed when superimposing polygons, grids or tiles on maps.</li>
<li>Assigning properties or colors to tiles which enable easier understaning and proximity evaluation to businesses, response teams and affected persons enabling a overview of contextualized maps</li>
</ol>
</p>

<HR>

<h3>Use Case - Eaton Fire</h3>

<h4>Objective</h4>
Depicting an imaginary impact/evacuation area and a larger smoke effect perimeter by showing grids with similar sized tiles that surround the area that went under fire.

<h4>Raw sources</h4>

A geoJSON map delimits the area of the "Eaton Fire" that took place in California and engulfed about 14,000 acres. 
The map is available at 
[https://gis.data.cnra.ca.gov/](https://gis.data.cnra.ca.gov/datasets/CALFIRE-Forestry::ca-perimeters-cal-fire-nifc-firis-public-view/explore)

A corresponding geoJSON file can be suppoerimposed on a  mapping application
[geoJSON](../media/firisEaton.geojson) 


<h4>Methodology</h4>
<ol>
  <li>Extract polygons from the geoJSON file</li>
  <li>For each polygon do:</li>
  <ol>
  <li>Create a list of all enclosed tiles which are inside the polygon (perimeter #0)</li>
  <li>For each vertice check what tile encloses that vertice</li>
  <li>Filter repetitive polygons - create a border list of tiles (Perimeter #1)</li>
  <li>Create a perieter ring by finding all tiles that are adjacent to the border tiles and are not part of the enclosed tiles (pereimeter #2 and so on)</li>
  <li>If the perimeter threshold is bigger than 1 find the adjacent tiles to the base perimeter ring and so on</li>
  
  </ol>
  <li>Merge the tile perimeters by removing tiles that are in higher perimeters if they are part of the lower perimeter and fileter repetitions</li>
  <li>Assign property to each perimeter assign a status, propeterty and/or color</li>
  <li>Create the geoJSON export file by retrieving the coordinates of the tiles and assiging the properties</li>
</ol>

<h3>Solution</h3>

The algorithm uses the tiler API to generate a list of tiles that make up the corresponding perimeters which are exported to a cross platform geoJSON file.

[geoJSON](/media/EatonTiles.json) 

[tiles.json](https://dtile.github.io/tiler/media/EatonTiles.json)



<hr>


The file can be superimposed on a map application which may enable a web service that calcuates the distance to an evacuation area or a smoke impact area.
If a higher resolution is needed the granularity level can be increased. Perimter thresholds, coloring and naming can be increased as well.


![Perimeter](https://dtile.github.io/tiler/media/EatonTiles.png?raw=true)

<hr>

[Read more on the tiling Concept](https://dtile.github.io/tiler/concept/motivation)

<br>

[Convert Tile to coordinates](https://dtile.github.io/tiler/test/)
