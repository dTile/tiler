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
[firiseaton.geojson](/media/firisEaton.geojson) or [firiseaton](https://github.com/dTile/tiler/blob/13e832576d668be0ad026e3868f8f1b8a6169311/docs/media/FirisEaton.geojson)


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

[geoJSON](/media/EatonTiles.json) or
[eatontiles.json](https://github.com/dTile/tiler/blob/e6dbb86b990ac5310382bad2dea94e9cb86e8034/docs/media/eatonTiles.json)

<details>
<summary>
EatonTiles.json
</summary>
<pre>
{
  "type": "FeatureCollection",
  "features": [
    {
      "properties": {
        "name": 417193987,
        "level": 1,
        "color": "pink",
        "noLine": 1
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.116,
              34.229048
            ],
            [
              -118.08,
              34.229048
            ],
            [
              -118.08,
              34.199278
            ],
            [
              -118.116,
              34.199278
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": 417173987,
        "level": 2,
        "color": "pink",
        "noLine": 1
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.188,
              34.229048
            ],
            [
              -118.152,
              34.229048
            ],
            [
              -118.152,
              34.199278
            ],
            [
              -118.188,
              34.199278
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": 417173988,
        "level": 2,
        "color": "pink",
        "noLine": 1
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.188,
              34.199278
            ],
            [
              -118.152,
              34.199278
            ],
            [
              -118.152,
              34.169498
            ],
            [
              -118.188,
              34.169498
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": 417183986,
        "level": 2,
        "color": "pink",
        "noLine": 1
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.152,
              34.258807
            ],
            [
              -118.116,
              34.258807
            ],
            [
              -118.116,
              34.229048
            ],
            [
              -118.152,
              34.229048
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": 417183987,
        "level": 2,
        "color": "pink",
        "noLine": 1
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.152,
              34.229048
            ],
            [
              -118.116,
              34.229048
            ],
            [
              -118.116,
              34.199278
            ],
            [
              -118.152,
              34.199278
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": 417183988,
        "level": 2,
        "color": "pink",
        "noLine": 1
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.152,
              34.199278
            ],
            [
              -118.116,
              34.199278
            ],
            [
              -118.116,
              34.169498
            ],
            [
              -118.152,
              34.169498
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": 417193986,
        "level": 2,
        "color": "pink",
        "noLine": 1
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.116,
              34.258807
            ],
            [
              -118.08,
              34.258807
            ],
            [
              -118.08,
              34.229048
            ],
            [
              -118.116,
              34.229048
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": 417193988,
        "level": 2,
        "color": "pink",
        "noLine": 1
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.116,
              34.199278
            ],
            [
              -118.08,
              34.199278
            ],
            [
              -118.08,
              34.169498
            ],
            [
              -118.116,
              34.169498
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": 417193989,
        "level": 2,
        "color": "pink",
        "noLine": 1
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.116,
              34.169498
            ],
            [
              -118.08,
              34.169498
            ],
            [
              -118.08,
              34.139707
            ],
            [
              -118.116,
              34.139707
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": 417203986,
        "level": 2,
        "color": "pink",
        "noLine": 1
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.08,
              34.258807
            ],
            [
              -118.044,
              34.258807
            ],
            [
              -118.044,
              34.229048
            ],
            [
              -118.08,
              34.229048
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": 417203987,
        "level": 2,
        "color": "pink",
        "noLine": 1
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.08,
              34.229048
            ],
            [
              -118.044,
              34.229048
            ],
            [
              -118.044,
              34.199278
            ],
            [
              -118.08,
              34.199278
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": 417203988,
        "level": 2,
        "color": "pink",
        "noLine": 1
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.08,
              34.199278
            ],
            [
              -118.044,
              34.199278
            ],
            [
              -118.044,
              34.169498
            ],
            [
              -118.08,
              34.169498
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": 417203989,
        "level": 2,
        "color": "pink",
        "noLine": 1
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.08,
              34.169498
            ],
            [
              -118.044,
              34.169498
            ],
            [
              -118.044,
              34.139707
            ],
            [
              -118.08,
              34.139707
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": 417213987,
        "level": 2,
        "color": "pink",
        "noLine": 1
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.044,
              34.229048
            ],
            [
              -118.008,
              34.229048
            ],
            [
              -118.008,
              34.199278
            ],
            [
              -118.044,
              34.199278
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": 417213988,
        "level": 2,
        "color": "pink",
        "noLine": 1
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.044,
              34.199278
            ],
            [
              -118.008,
              34.199278
            ],
            [
              -118.008,
              34.169498
            ],
            [
              -118.044,
              34.169498
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417173986",
        "level": 3,
        "color": "purple"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.188,
              34.258807
            ],
            [
              -118.152,
              34.258807
            ],
            [
              -118.152,
              34.229048
            ],
            [
              -118.188,
              34.229048
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417173988",
        "level": 3,
        "color": "purple"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.188,
              34.199278
            ],
            [
              -118.152,
              34.199278
            ],
            [
              -118.152,
              34.169498
            ],
            [
              -118.188,
              34.169498
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417163987",
        "level": 3,
        "color": "purple"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.224,
              34.229048
            ],
            [
              -118.188,
              34.229048
            ],
            [
              -118.188,
              34.199278
            ],
            [
              -118.224,
              34.199278
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417183987",
        "level": 3,
        "color": "purple"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.152,
              34.229048
            ],
            [
              -118.116,
              34.229048
            ],
            [
              -118.116,
              34.199278
            ],
            [
              -118.152,
              34.199278
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417173987",
        "level": 3,
        "color": "purple"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.188,
              34.229048
            ],
            [
              -118.152,
              34.229048
            ],
            [
              -118.152,
              34.199278
            ],
            [
              -118.188,
              34.199278
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417173989",
        "level": 3,
        "color": "purple"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.188,
              34.169498
            ],
            [
              -118.152,
              34.169498
            ],
            [
              -118.152,
              34.139707
            ],
            [
              -118.188,
              34.139707
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417163988",
        "level": 3,
        "color": "purple"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.224,
              34.199278
            ],
            [
              -118.188,
              34.199278
            ],
            [
              -118.188,
              34.169498
            ],
            [
              -118.224,
              34.169498
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417183988",
        "level": 3,
        "color": "purple"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.152,
              34.199278
            ],
            [
              -118.116,
              34.199278
            ],
            [
              -118.116,
              34.169498
            ],
            [
              -118.152,
              34.169498
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417183985",
        "level": 3,
        "color": "purple"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.152,
              34.288556
            ],
            [
              -118.116,
              34.288556
            ],
            [
              -118.116,
              34.258807
            ],
            [
              -118.152,
              34.258807
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417193986",
        "level": 3,
        "color": "purple"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.116,
              34.258807
            ],
            [
              -118.08,
              34.258807
            ],
            [
              -118.08,
              34.229048
            ],
            [
              -118.116,
              34.229048
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417183986",
        "level": 3,
        "color": "purple"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.152,
              34.258807
            ],
            [
              -118.116,
              34.258807
            ],
            [
              -118.116,
              34.229048
            ],
            [
              -118.152,
              34.229048
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417193987",
        "level": 3,
        "color": "purple"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.116,
              34.229048
            ],
            [
              -118.08,
              34.229048
            ],
            [
              -118.08,
              34.199278
            ],
            [
              -118.116,
              34.199278
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417183989",
        "level": 3,
        "color": "purple"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.152,
              34.169498
            ],
            [
              -118.116,
              34.169498
            ],
            [
              -118.116,
              34.139707
            ],
            [
              -118.152,
              34.139707
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417193988",
        "level": 3,
        "color": "purple"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.116,
              34.199278
            ],
            [
              -118.08,
              34.199278
            ],
            [
              -118.08,
              34.169498
            ],
            [
              -118.116,
              34.169498
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417193985",
        "level": 3,
        "color": "purple"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.116,
              34.288556
            ],
            [
              -118.08,
              34.288556
            ],
            [
              -118.08,
              34.258807
            ],
            [
              -118.116,
              34.258807
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417203986",
        "level": 3,
        "color": "purple"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.08,
              34.258807
            ],
            [
              -118.044,
              34.258807
            ],
            [
              -118.044,
              34.229048
            ],
            [
              -118.08,
              34.229048
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417193989",
        "level": 3,
        "color": "purple"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.116,
              34.169498
            ],
            [
              -118.08,
              34.169498
            ],
            [
              -118.08,
              34.139707
            ],
            [
              -118.116,
              34.139707
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417203988",
        "level": 3,
        "color": "purple"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.08,
              34.199278
            ],
            [
              -118.044,
              34.199278
            ],
            [
              -118.044,
              34.169498
            ],
            [
              -118.08,
              34.169498
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417193990",
        "level": 3,
        "color": "purple"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.116,
              34.139707
            ],
            [
              -118.08,
              34.139707
            ],
            [
              -118.08,
              34.109905
            ],
            [
              -118.116,
              34.109905
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417203989",
        "level": 3,
        "color": "purple"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.08,
              34.169498
            ],
            [
              -118.044,
              34.169498
            ],
            [
              -118.044,
              34.139707
            ],
            [
              -118.08,
              34.139707
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417203985",
        "level": 3,
        "color": "purple"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.08,
              34.288556
            ],
            [
              -118.044,
              34.288556
            ],
            [
              -118.044,
              34.258807
            ],
            [
              -118.08,
              34.258807
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417203987",
        "level": 3,
        "color": "purple"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.08,
              34.229048
            ],
            [
              -118.044,
              34.229048
            ],
            [
              -118.044,
              34.199278
            ],
            [
              -118.08,
              34.199278
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417213986",
        "level": 3,
        "color": "purple"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.044,
              34.258807
            ],
            [
              -118.008,
              34.258807
            ],
            [
              -118.008,
              34.229048
            ],
            [
              -118.044,
              34.229048
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417213987",
        "level": 3,
        "color": "purple"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.044,
              34.229048
            ],
            [
              -118.008,
              34.229048
            ],
            [
              -118.008,
              34.199278
            ],
            [
              -118.044,
              34.199278
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417213988",
        "level": 3,
        "color": "purple"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.044,
              34.199278
            ],
            [
              -118.008,
              34.199278
            ],
            [
              -118.008,
              34.169498
            ],
            [
              -118.044,
              34.169498
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417203990",
        "level": 3,
        "color": "purple"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.08,
              34.139707
            ],
            [
              -118.044,
              34.139707
            ],
            [
              -118.044,
              34.109905
            ],
            [
              -118.08,
              34.109905
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417213989",
        "level": 3,
        "color": "purple"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.044,
              34.169498
            ],
            [
              -118.008,
              34.169498
            ],
            [
              -118.008,
              34.139707
            ],
            [
              -118.044,
              34.139707
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417223987",
        "level": 3,
        "color": "purple"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.008,
              34.229048
            ],
            [
              -117.972,
              34.229048
            ],
            [
              -117.972,
              34.199278
            ],
            [
              -118.008,
              34.199278
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417223988",
        "level": 3,
        "color": "purple"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.008,
              34.199278
            ],
            [
              -117.972,
              34.199278
            ],
            [
              -117.972,
              34.169498
            ],
            [
              -118.008,
              34.169498
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417173985",
        "level": 4,
        "color": "blue"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.188,
              34.288556
            ],
            [
              -118.152,
              34.288556
            ],
            [
              -118.152,
              34.258807
            ],
            [
              -118.188,
              34.258807
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417163986",
        "level": 4,
        "color": "blue"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.224,
              34.258807
            ],
            [
              -118.188,
              34.258807
            ],
            [
              -118.188,
              34.229048
            ],
            [
              -118.224,
              34.229048
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417173984",
        "level": 4,
        "color": "blue"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.188,
              34.318294
            ],
            [
              -118.152,
              34.318294
            ],
            [
              -118.152,
              34.288556
            ],
            [
              -118.188,
              34.288556
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417153986",
        "level": 4,
        "color": "blue"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.26,
              34.258807
            ],
            [
              -118.224,
              34.258807
            ],
            [
              -118.224,
              34.229048
            ],
            [
              -118.26,
              34.229048
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417173990",
        "level": 4,
        "color": "blue"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.188,
              34.139707
            ],
            [
              -118.152,
              34.139707
            ],
            [
              -118.152,
              34.109905
            ],
            [
              -118.188,
              34.109905
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417153988",
        "level": 4,
        "color": "blue"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.26,
              34.199278
            ],
            [
              -118.224,
              34.199278
            ],
            [
              -118.224,
              34.169498
            ],
            [
              -118.26,
              34.169498
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417153987",
        "level": 4,
        "color": "blue"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.26,
              34.229048
            ],
            [
              -118.224,
              34.229048
            ],
            [
              -118.224,
              34.199278
            ],
            [
              -118.26,
              34.199278
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417163985",
        "level": 4,
        "color": "blue"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.224,
              34.288556
            ],
            [
              -118.188,
              34.288556
            ],
            [
              -118.188,
              34.258807
            ],
            [
              -118.224,
              34.258807
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417163989",
        "level": 4,
        "color": "blue"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.224,
              34.169498
            ],
            [
              -118.188,
              34.169498
            ],
            [
              -118.188,
              34.139707
            ],
            [
              -118.224,
              34.139707
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417143987",
        "level": 4,
        "color": "blue"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.296,
              34.229048
            ],
            [
              -118.26,
              34.229048
            ],
            [
              -118.26,
              34.199278
            ],
            [
              -118.296,
              34.199278
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417173991",
        "level": 4,
        "color": "blue"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.188,
              34.109905
            ],
            [
              -118.152,
              34.109905
            ],
            [
              -118.152,
              34.080093
            ],
            [
              -118.188,
              34.080093
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417153989",
        "level": 4,
        "color": "blue"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.26,
              34.169498
            ],
            [
              -118.224,
              34.169498
            ],
            [
              -118.224,
              34.139707
            ],
            [
              -118.26,
              34.139707
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417163990",
        "level": 4,
        "color": "blue"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.224,
              34.139707
            ],
            [
              -118.188,
              34.139707
            ],
            [
              -118.188,
              34.109905
            ],
            [
              -118.224,
              34.109905
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417143988",
        "level": 4,
        "color": "blue"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.296,
              34.199278
            ],
            [
              -118.26,
              34.199278
            ],
            [
              -118.26,
              34.169498
            ],
            [
              -118.296,
              34.169498
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417183990",
        "level": 4,
        "color": "blue"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.152,
              34.139707
            ],
            [
              -118.116,
              34.139707
            ],
            [
              -118.116,
              34.109905
            ],
            [
              -118.152,
              34.109905
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417183984",
        "level": 4,
        "color": "blue"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.152,
              34.318294
            ],
            [
              -118.116,
              34.318294
            ],
            [
              -118.116,
              34.288556
            ],
            [
              -118.152,
              34.288556
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417183983",
        "level": 4,
        "color": "blue"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.152,
              34.348022
            ],
            [
              -118.116,
              34.348022
            ],
            [
              -118.116,
              34.318294
            ],
            [
              -118.152,
              34.318294
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417193984",
        "level": 4,
        "color": "blue"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.116,
              34.318294
            ],
            [
              -118.08,
              34.318294
            ],
            [
              -118.08,
              34.288556
            ],
            [
              -118.116,
              34.288556
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417183991",
        "level": 4,
        "color": "blue"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.152,
              34.109905
            ],
            [
              -118.116,
              34.109905
            ],
            [
              -118.116,
              34.080093
            ],
            [
              -118.152,
              34.080093
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417193983",
        "level": 4,
        "color": "blue"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.116,
              34.348022
            ],
            [
              -118.08,
              34.348022
            ],
            [
              -118.08,
              34.318294
            ],
            [
              -118.116,
              34.318294
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417213985",
        "level": 4,
        "color": "blue"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.044,
              34.288556
            ],
            [
              -118.008,
              34.288556
            ],
            [
              -118.008,
              34.258807
            ],
            [
              -118.044,
              34.258807
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417203984",
        "level": 4,
        "color": "blue"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.08,
              34.318294
            ],
            [
              -118.044,
              34.318294
            ],
            [
              -118.044,
              34.288556
            ],
            [
              -118.08,
              34.288556
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417223986",
        "level": 4,
        "color": "blue"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.008,
              34.258807
            ],
            [
              -117.972,
              34.258807
            ],
            [
              -117.972,
              34.229048
            ],
            [
              -118.008,
              34.229048
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417193991",
        "level": 4,
        "color": "blue"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.116,
              34.109905
            ],
            [
              -118.08,
              34.109905
            ],
            [
              -118.08,
              34.080093
            ],
            [
              -118.116,
              34.080093
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417193992",
        "level": 4,
        "color": "blue"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.116,
              34.080093
            ],
            [
              -118.08,
              34.080093
            ],
            [
              -118.08,
              34.050271
            ],
            [
              -118.116,
              34.050271
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417213990",
        "level": 4,
        "color": "blue"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.044,
              34.139707
            ],
            [
              -118.008,
              34.139707
            ],
            [
              -118.008,
              34.109905
            ],
            [
              -118.044,
              34.109905
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417203991",
        "level": 4,
        "color": "blue"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.08,
              34.109905
            ],
            [
              -118.044,
              34.109905
            ],
            [
              -118.044,
              34.080093
            ],
            [
              -118.08,
              34.080093
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417223989",
        "level": 4,
        "color": "blue"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.008,
              34.169498
            ],
            [
              -117.972,
              34.169498
            ],
            [
              -117.972,
              34.139707
            ],
            [
              -118.008,
              34.139707
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417203983",
        "level": 4,
        "color": "blue"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.08,
              34.348022
            ],
            [
              -118.044,
              34.348022
            ],
            [
              -118.044,
              34.318294
            ],
            [
              -118.08,
              34.318294
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417223985",
        "level": 4,
        "color": "blue"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.008,
              34.288556
            ],
            [
              -117.972,
              34.288556
            ],
            [
              -117.972,
              34.258807
            ],
            [
              -118.008,
              34.258807
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417213984",
        "level": 4,
        "color": "blue"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.044,
              34.318294
            ],
            [
              -118.008,
              34.318294
            ],
            [
              -118.008,
              34.288556
            ],
            [
              -118.044,
              34.288556
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417233986",
        "level": 4,
        "color": "blue"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -117.972,
              34.258807
            ],
            [
              -117.936,
              34.258807
            ],
            [
              -117.936,
              34.229048
            ],
            [
              -117.972,
              34.229048
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417233987",
        "level": 4,
        "color": "blue"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -117.972,
              34.229048
            ],
            [
              -117.936,
              34.229048
            ],
            [
              -117.936,
              34.199278
            ],
            [
              -117.972,
              34.199278
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417233988",
        "level": 4,
        "color": "blue"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -117.972,
              34.199278
            ],
            [
              -117.936,
              34.199278
            ],
            [
              -117.936,
              34.169498
            ],
            [
              -117.972,
              34.169498
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417203992",
        "level": 4,
        "color": "blue"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.08,
              34.080093
            ],
            [
              -118.044,
              34.080093
            ],
            [
              -118.044,
              34.050271
            ],
            [
              -118.08,
              34.050271
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417223990",
        "level": 4,
        "color": "blue"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.008,
              34.139707
            ],
            [
              -117.972,
              34.139707
            ],
            [
              -117.972,
              34.109905
            ],
            [
              -118.008,
              34.109905
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417213991",
        "level": 4,
        "color": "blue"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.044,
              34.109905
            ],
            [
              -118.008,
              34.109905
            ],
            [
              -118.008,
              34.080093
            ],
            [
              -118.044,
              34.080093
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417233989",
        "level": 4,
        "color": "blue"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -117.972,
              34.169498
            ],
            [
              -117.936,
              34.169498
            ],
            [
              -117.936,
              34.139707
            ],
            [
              -117.972,
              34.139707
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417243987",
        "level": 4,
        "color": "blue"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -117.936,
              34.229048
            ],
            [
              -117.9,
              34.229048
            ],
            [
              -117.9,
              34.199278
            ],
            [
              -117.936,
              34.199278
            ]
          ]
        ]
      }
    },
    {
      "properties": {
        "name": "417243988",
        "level": 4,
        "color": "blue"
      },
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -117.936,
              34.199278
            ],
            [
              -117.9,
              34.199278
            ],
            [
              -117.9,
              34.169498
            ],
            [
              -117.936,
              34.169498
            ]
          ]
        ]
      }
    }
  ]
}
      
</pre>
</details>



<hr>


The file can be superimposed on a map application which may enable a web service that calcuates the distance to an evacuation area or a smoke impact area.
If a higher resolution is needed the granularity level can be increased. Perimter thresholds, coloring and naming can be increased as well.


![Perimeter](https://dtile.github.io/tiler/media/EatonTiles.png?raw=true)

<hr>

[Read more on the tiling Concept](https://dtile.github.io/tiler/concept/motivation)

<br>

[Convert Tile to coordinates](https://dtile.github.io/tiler/test/)
