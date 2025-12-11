<h3>Tiler</h3>
<h4>Granularity Overview - "G" refers to the resoluiton level of a tile or a tile-box</h4>


| G | # Tiles <BR>covering earth | Breakdown | ~Width at<BR>the equator | Info |Anchor Tile<BR>Northwest|Hitch<BR>Southeast|Eiffel's Tile 48.858255,2.294491
|-----|-------|-----------|----------------------|------|-|-|-|
| 1   | 100   | 10 x 10     |         4000 km       | Base |100|199|153|
| 2   | 10000     | 100 x 100     | 400 km | Encloses most countries |20000|29999|25034|
| 3   | 1000000     | 1000 x 1000     | 40 km | Encloses most major cities |3000000|3999999|3506344|
| 4   | 100000000     | 10000 x 10000     | 4 km |  |400000000|499999999|450633440|
| 5   | 10000000000     | 100000 x 100000     | 400 m |  |50000000000|599999999999|55063734402|
| 6   | 1000000000000     | 1000000 x 1000000     | 40 m |  |6000000000000|6999999999999|6506373344021|
| 7   | 100000000000000    | 10000000 x 10000000     | 4 m |  |70000000000000|799999999999999|750637363440213|

To find a tile for a latitude and longitude implement DT.find(lat,lng,g);
<pre>
DT.find(48.858255,2.294491,6)
</pre>
This returns an object with a tile number  '6506373344021' that delimts the tile with vertices a,b,c,d.
<ul>
  <li>
x represents the distance in tiles from the anti-meridian 
  </li>
  <li>
y the distance from latitude 90&deg;;
</li>
</ul>
<pre>
  {
    "valid": true,
    "x": 506373,
    "y": 344021,
    "g": 6,
     "_p": 6,
    "_offset": 0,
    "n": "6506373344021",
    "a": (...),
    "b": (...),
    "c": (...),
    "d": (...)
}
</pre>

<img src = https://raw.githubusercontent.com/DTile/tiler/main/docs/media/paris.png>

![Tiles in Granularity 6](https://raw.githubusercontent.com/DTile/tiler/main/docs/media/paris.png?raw=)

