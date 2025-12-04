
((exports)=>{
var root = {x:0,y:0,g:0};
const version = "0.0.8";

/**
* @class Tile
* Creates a vector normal to Earth’s surface on the Mercator projection model.
*
* Constructor 1:
* new Tile(g,x,y,o)
* g {number 1-9} - granularity or grid resolution - at granularity 1 10 tiles encircle the earth. At g 2 100 tiles encircle the earth and so on.
* x {Number} - units distance from [[90,-180],[-90,-180]] (towards east).
* y {Number} - nits from [[90,-180],[90,180]] (towards south)
* options {offset:Number,p:Number,offset:Number}
* 	p - precision (optional) defines decimal fraction for coordinates- default 6.
*   offset - horizontal offset (optional) defines how many multuplies of 360 to latitudes - default 0.
*   e - elevation start in tiles for cubic representation. (optional)
*	} optional

* Constructor 2:
* new Tile(tn,o)
* tn{Number} - tilenumber.
* otions as above.
*
* @example
* const n = new DT.Tile(1,5,5) returns the tile that has its NW corner on [0,0] on a 10 x 10 grid.
* const n = new DT.Tile(25050,{p:6,offset:1) returns the tile that has its NW corner on [0,0] on a 100 x 1=0 grid with longitude incremented by 360°.
*/

class Tile{
constructor(number,x,y,o){
var opt = o;
var n = number;
if(isNaN(y)){
opt=x;
//2 paramaters
}else{
n = encode(number,x,y)
}
if(!opt){
opt={p:6,offset:0}
}

if(!validTN(n)){

console.log(`invalid tile number (${Number})`);
return;
}else{
this.valid=true;
}

this._p = opt.p||6;
this._offset = opt.offset||0;
var d = decode(n,this._p);
this.x = d.x;
this.y = d.y;
//this.el = el||0;
this.g = d.g;
this.n = this.number = Number(n);
}

set p(l){this._p=l}
get p(){return this._p}

//set elevation
set e(l){this._e=l}
get e(){return this._e}
get offset(){return this._offset||0}
set offset(o){this._offset=o};
get options(){return {offset:this.offset,p:this.p}}

abcd(){
var v = dtXYG(this.g,this.x,this.y,{p:this.p})
var of=this.offset * 360;
var coords = v.coords;
if(of!=0){
coords.forEach(corner=>corner[1]+=of)
}
return coords;
}

get coords(){
return this.abcd();
}

get center(){
var q = this.coords;
var x = middle(q[0][1],q[1][1])
var y = middle(q[0][0],q[3][0])
return [nFormat(y),nFormat(x)]
}

get a(){return this.coords[0]}
get b(){return this.coords[1]}
get c(){return this.coords[2]}
get d(){return this.coords[3]}

/**
* @function dist(point):
* returns distance to a tile in meters.
*
*/

dist(point){
var ret;
try{
var coords= this.coords;
	if(inPoly(point,coords)){
		console.log("Inside tile")
		return 0
	}
let minDistance = Infinity;

    // Iterate through each edge of the square
    for (let i = 0; i < coords.length; i++) {
        const p1 = coords[i];
        const p2 = coords[(i + 1) % coords.length];

        // Calculate distance from point to line segment (p1-p2)
        const dx = p2[1] - p1[1];
        const dy = p2[0] - p1[0];
        const lengthSq = dx * dx + dy * dy;

        let t = 0;
        if (lengthSq !== 0) {
            t = ((point[1] - p1[1]) * dx + (point[0] - p1[0]) * dy) / lengthSq;
            t = Math.max(0, Math.min(1, t)); // Clamp t to [0, 1] for segment
        }

        const closestLon = p1[1] + t * dx;
        const closestLat = p1[0] + t * dy;
        const d = distance(point, [closestLat,closestLon]);
        ret = minDistance = Math.min(minDistance, d);
		
    }
    }catch(e){console.log(e)}

    return ret;
}


/*****
* @function expand (xi,yi) : Tbox
* returns a Tilebox which has its anchor at the tile and incremented xi to the east and yi to the south
*/
expand(xi,yi){
var x2 = xi;
x2 = parseInt(x2);
var y2 = yi;
y2 = parseInt(y2);
var expanded = new DT.Tbox(this.n,x2,y2,this.options);
return expanded;
}

/*****
* @function surround(l):Tbox
* returns a Tbox which surrounds a tile with l tiles on each side
* l {Number} : threshold
*/

surround(l){
var g = this.g;
var x = this.x;
var y = this.y;
var max = Math.pow(10,g);
var newX = x - l;
var newY = y - l;
var o = objectCopy(this.options);
if(newX<0){	
newX+=max;
o.offset=this.offset-1
}
//if(newX<0){newX=0}
if(newY<0){newY=0}
var anchor = encode(g,newX,newY);
//console.log(anchor)
var yi,xi;
yi = xi = l + l-1;
//var o={offset:this.offset,p:this.p};
//if((newX+xi)>=max){	xi = max - newX - 1}
if((newY+yi)>=max){	yi = max - newY - 1}
var ret;
ret = new Tbox(anchor,xi,yi,o);
//console.log(ret)
return ret;
}
}//tile

class Tbox{
/**
* @class Tbox
* Creates a quadricular that encloses a list of tiles.
*
* Constructor 1:
* tn {Number} - number of the top leftmost tile.
* xi {Number} - increment to the east.
* yi {Number} - increment to the south.
* options:{
* 	p - precision (optional) defines decimal fraction.
*   offset - horizontal offset (optional) defines how many multuplies of 360 to latitudes.
*   e - elevation start in tiles for cubic representation. (optional)
*   ei - elevation increment. (optional)
*	} optional
*
* Constructor 2:
* tn {Number} - tilebox number.
* options: as constructor 1
*
* @example
*   const n = new DT.Tbox(155,1,1) returns a tilebox that contains tiles numbers 155,156,165,166
*   const n = new DT.Tbox(155.221) returns the tilebox that containe 3 x 3 tiles with 155 being its northwestern tile anchor
*/
	
constructor(tn,x2,y2,options){
if (isNaN(tn)){
console.log("Non valid tile number");
return;
//throw new TypeError(`invalid number (${n})`);
}else{
this.valid = 1;
}
var opt={p:6,offset:0,sh:1}
var n = tn;
var xi = x2||0;
var yi = y2||0;
if(isNumeric(y2)){
//constructor 1
if(options){
opt = options;
}
}else{
if(x2){
opt = x2;
}

//constructor 2
var o = decode(tn)
xi = o.xi;
yi = o.xi;
n = o.tn;
}
if (!validTN(n)) throw new TypeError(`invalid tbox number (${n})`);
this._tn = n; // top left anchor
this._p=opt.p;
this._offset=opt.offset;

//if (!validTN(n)) throw new TypeError(`invalid anchor number (${n})`);
this._xi=xi;
this._yi=yi;
var o = decode(n);
var x = this.x = o.x;
var g =	this.g = o.g;
var y = this.y = o.y;
var max = Math.pow(10,g);
//this._a = Number(n);//anchor
this.tn=this._at=n;
var xG = wrapN(x+xi,0,max);
this._bt = Number(encode(g,xG,y));//northeast tile
this._ct = Number(encode(g,xG,y+yi));
this._dt = Number(encode(g,x,y+yi));
var sh = this._sh = 1; //shape
this.n = this.n = this.number = encode(g,x,y,xi,yi,sh);
}

set p(l){this._p=l}
get p(){ return this._p||6}
get offset(){return this._offset||0}
set offset(o){this._offset=o}
get xi(){return this._xi}
get yi(){return this._yi}
get at(){return this._at}
get bt(){return this._bt}
get ct(){return this._ct}
get dt(){return this._dt}


/**
* @getter coords : points[]
* returns coords that delimit a tbox
*/

get coords(){
var p=this.p;
var options = {p:this.p,offset:this.offset}
var options2 = objectCopy(options);
var max = Math.pow(10,this.g)
if(this.x+this.xi>max){
//tb intersects with anti-meridian
options2.offset+=1
}
var arr = [];
var aCoord = new Tile(this.at,options).a;
arr.push(aCoord)
var bCoord = new Tile(this.bt,options2).b;
arr.push(bCoord)
var cCoord = new Tile(this.ct,options2).c;// southeast corner of southeast tile
arr.push(cCoord);
var dCoord = new Tile(this.dt,options).d;
arr.push(dCoord);
return arr;
}


/**
* @getter lines : points[][]
* returns arrya of coords pairs (vertical and horizontal lines) that delimit tbox's tiles
*/

get lines(){
return lines(this.at,this.xi,this.yi,this.p,this.offset);
console.log(offset)
}

get list(){
var arr = [];
var o = {}
var quads =[];
var st = this.number;
var anchor = decode(this.at);
var g=this.g;
var x=this.x;
var y=this.y;
var xi=this.xi;
var yi=this.yi;
var max=Math.pow(10,g);
for (let i=x;i<=x+xi;i++){
var im=i % max;
for (let j=y;j<=y+yi;j++){
var jm=j % max;
var v = encode(g,im,jm);
//var v = encode(g,i,j);
arr.push(v);
}
}
return arr;
}

/**
* @getter net : coords[]
* returns the nw coordinates of tbox's tiles and the se coordinates of the last column and row
*/
get net(){
var arr = [];
var o = {}
//var lastCol=[],edgeCol=[];
var offset = this.offset;
if(!isNumeric(offset)){offset = 0}
offset = offset * 360;
//console.log(offset)
var st = this.number;
var g=this.g;
var p=this.p;
var x=this.x;
var y=this.y;
var xi=this.xi;
var yi=this.yi;
var max=Math.pow(10,g);
for (let j=y;j<=y+yi+1;j++){
var jm=j % max;
var col=[];
//debugger
for (let i=x;i<=x+xi+1;i++){
var im=i % max;
var tile = new Tile(g,im,jm,p)
var a = tile.a;
if(i >= max){a[1]=a[1]+360}
if(offset!=0){
a[1]+=offset;
//console.log(a[1])
}
o[tile.n]=a;
}
//arr.push(col);
}
return o
}


/**
* @getter mosaic() : coords[][]
* returns an array of arrays that demark the tiles in Tbox
*/
get mosaic(){
var r = {}
var o = this.net;

var g=this.g;
var x=this.x;
var y=this.y;
var xi=this.xi;
var yi=this.yi;

for (let j=y;j<=y+yi;j++){
var jm=j % max;
for (let i=x;i<=x+xi;i++){
var tnA = encode(g,i,j);
var tnB = encode(g,i+1,j);
var tnC = encode(g,i+1,j+1);
var tnD = encode(g,i,j+1);
}
r[tnA] = [o[tnA],o[tnB],o[tnC],o[tnD]]
}
return r;
}

get outline(){
var o = {};
var coords = this.coords;
o.a = coords[0];
o.b = coords[1];
o.c = coords[2];
o.d = coords[3];
return o
}

get nw(){return this.coords[0]}
get ne(){return this.coords[1]}
get se(){return this.coords[2]}
get sw(){return this.coords[3]}

get bbox(){//geojsoon bbox
var o=this.outline;
return [[o.d[1],o.d[0]],[o.b[1],o.b[0]]]
}


//get decode(){return decode(this.number)}
get center(){
var p=this.precision;
var tn = this.tn;
var tile=new Tile(tn);
var g=this.g;
var x=this.x;
var y=this.y;
var xi=this.xi;
var yi=this.yi;
var newX=x + parseInt(xi / 2);
var newY=y + parseInt(yi / 2);
return encode(g,newX,newY)
//var p = this.p;
//return arr;
}

get centerCoords(){
var q = this.coords;
var x = middle(q[0][1],q[1][1])
var y = middle(q[0][0],q[3][0])
return [y,x]
}

/*
get fill(){
var p=this.precision;
//console.log(p)
var arr = [];
var o = {}
//var quads =[];
//var st = this.number;
var anchor = decode(this.at);
var g=this.g;
var x=this.x;
var y=this.y;
var xi=this.xi;
var yi=this.yi;
var p = this.p;
for (let i = x ; i <= x+xi; i++){
for (let j = y; j <= y+yi; j++){
var v = dtXYG(g,i,j,this.options);
arr.push(v);
}
}
return arr;
}
*/


/**
* @getter tiles: Tile[]
* Returns an array of tiles that fill a Tbox.
*/
get tiles(){
var offset=this.offset;	
var p = this.p;
var opt = {offset:offset,p:p};
var g=this.g;
var max = Math.pow(10,g);
var arr = [];

var x=this.x;
var y=this.y;
var xi=this.xi;
var yi=this.yi;
for (let i = x ; i <= x+xi; i++){
for (let j = y; j <= y+yi; j++){
if(j>=max){return}
var ii = i;
if(i>=max){
opt.offset=offset+1;
ii=wrapN(i,0,max)
}else{		
opt.offset=offset;
}
var t = new Tile(g,ii,j,opt);
//if(i>=max){console.log(t)}

arr.push(t);
}
}
return arr;
}

/**
* @getter gridJSON : geoJSON string
* returns tiles' coordinates that are within the tilebox in geoJSON format.
*/
get gridJSON(){
var o;
var quads = this.list;
var params={name:this.n,type:"tbox",noFill:1};
var pbox = this.bbox;
var ftr=feature(this.coords,params,pbox);
var features=[ftr];
quads.forEach((tn)=>{
var tile=new Tile(tn);
if(tile.coords){
params={name:tile.n,type:"tile",noFill:1};
ftr=feature(tile.coords,params);
features.push(ftr);
}
})
var j={type:"FeatureCollection",id:this.n,features:features,bbox:pbox};
j=JSON.stringify(j);
return j
}

get outlineJSON(){
var o;
var params={name:this.number,type:"tbox"};
var ftr=feature(this.coords,params,this.bbox);
var features=[ftr];
var j={type:"FeatureCollection",features:features,bbox:pbox};
j=JSON.stringify(j,null,2);
return j
}

get niceGridJSON(){
var j=this.gridJSON;
j=JSON.parse(j);
j=JSON.stringify(j,null,2);
return j;
}

}//class tbox

/**
* @function find(lt,ln,g,p): new Tile
* Returns a tile that surrounds [lat,lng] point for a grid level.
*
* lt: {Number} latitude
* ln: {Number} longitude
* g: {1 to 9} granularity
* p: {5 to 12} decimal presicision
*
*/

function find(lt,ln,g,p=6){
var lat=wrapN(lt,-90,90);
var lng=wrapN(ln,-180,180);
lat = nFormat(lat,p);
lng = nFormat(lng,p);
lt = nFormat(lt,p);
ln = nFormat(ln,p);
var offset = 0;
var rightEnd = 1;
if(ln<-180){
rightEnd = -1;
}
var absLn = Math.abs(ln);
var temp  = absLn+180;

if(temp == 0){

}else{
offset = parseInt(temp / 360)*rightEnd;
}
//console.log(offset);
var o = drill(root,lat,lng,g,p);
if(o){o.offset=offset}
//console.log(o);
return o
}

/**
* @function findBox(g,north,west,south,east,p): new Tbox
* Returns a tbox that its north wester tile surrounts [north,west] and its opposing tile surrounds [south,east].
*
* g: {1 to 9} granularity
* p: {5 to 12} decimal presicision
*
*/

function findBox(g,north,west,south,east,p){
var ret;
if(!g){return}
var nw = find(north,west,g);
var se = find(south,east,g);
var max=Math.pow(10,g);
//var xmod=x % n;
//var ymod=y % n;
if(g==1){
ret	= new Tbox(100,19,9)
}else{
if(nw&&se){
var xi = se.x-nw.x;
var yi = se.y-nw.y;
//console.log(se.x + " " + nw.x)
if(xi<0){xi=max+xi;}
if(xi>max){	xi=xi-max;}
//ret =  encode(g,nw.x,nw.y,xi,yi);
var tile = encode(g,nw.x,nw.y);
ret =  new Tbox(tile,xi,yi)
}
}

if(ret){
ret.p = p;
if(west<-180){ret.offset = -1}
if(west>180){ret.offset = 1}
}
return ret;
}


/**
* @function encode(g,x,y,x2,y2,e,e2): string
* Returns the encoded number of a tile or a cube or a recangle (tbox) filled with tiles or a box filled with cubes (cbox).
*
* g - granularity determines how many tiles/cubes fill the cirumference of a longitude i.e. 100 power g
* x - distance in tiles/cubes from the antimeridian
* y - distance from north pole
* x2 (optional) - include/increment x2 tiles/cubes to the east for a tbox
* y2 (optional) tiles/cubes to the south
* e (optional) - elevation start for cube
* e2 elevation increment
* @returns {Number} - a unique identifier that denominates a tile, a cube, a boounding rectangle or a bounding box (bbox)
* GXXXYYY.X2X2Y2Y2F format:
*	GXXXYYYE denominates the anchor or single tile/cube
*   X2X2Y2Y2E2F (optional) denomintaes the hitch increment which points to the farthest tile or cube (farthest corner) from the anchor
*	G for granularity,
*	Anchor: "XXX" stands for x padded with G zeros, "YYY" for y complementary padded to G zeros and E (optional) for elevation
*	hitch "X2X2" stands for the x2 eastern increment added to the anchor (complementary padded with F zeros)
*	hitch "Y2Y2" stands for y2 northern increment added to the anchor (padded with F zeros)
*	hitch: E2 elevation increment to the anchor
*
*	REM: for abbreviation "padded" means padded with zeros at the start to achieve a string of G digits
*   Example: encode(3,200,10,2,30) returns 3200010.02302
*   a tbox in a matrix 10000x10000 anchored 200 tiles from the anti meridian and 10 tiles from the north
*   pole, and its opposing corner at tile incrementsd 2 tiles to the east and 30 tles to the south
*
*   A negative number means e is deeper than the sea level
*/

var encode=function(g,x,y,x2,y2,e1,e2){
var paddedY2=""//String(ymod).padStart(g,'0');
var deep,e=e1||"",ei=e2||"";
if(e<0){deep=true};
var paddedX2=""//String(xmod).padStart(g,'0');
var decimal=""
//
if(x2 || y2){
var f = Math.max((''+x2).length,(''+y2).length)
var paddedY2=String(y2).padStart(f,'0');
var paddedX2=String(x2).padStart(f,'0');
var paddedE2="";
//if(e){paddedE2=String(e2).padStart(f,'0');}
decimal="."+paddedX2+paddedY2 + ei +f;
}
var st="";
var n=Math.pow(10,g);
var xmod=x % n;
var ymod=y % n;
if(xmod<0){xmod+=n};
var paddedY=String(ymod).padStart(g,'0');
var paddedX=String(xmod).padStart(g,'0');
st=g + paddedX + paddedY + e + decimal;
if(deep){
st+"-"+st;
}
//st=Number(st);
return st;
}

/**
* @function embelish(l,gClass,xClass,yClass): string
* Returns an embelished html of a tile number.
*
*/

var embelish=function(l,gClass,xClass,yClass){
var st="";
var o = decode(l)
if(xClass){
st='<b><span class="'+ gClass +'">' +o.g +'</span><span class="'+ xClass +'">' + o.x +'</span><span class="'+ yClass +'">'+ o.y + '</span>';
if(o.e){
st+=o.e;
}
var d= o.n % 1;
if(d){
st+=d;
}
st+="<b>"
}
return st;
}

/**
* @function decosde(l,p): returns a Tile or a Tbox
* l {String}: tile number or tbox number
* p:{5-12}: decimal precision
*
*/

function decode(l,precision=6){
var o={};
function splitToChunks(str,size) {
const result = [];
for (let i = 0; i < str.length; i += size) {
result.push(str.substring(i, i + size));
}
return result;
}

if(!validTN(l)){return}
if(l==0){
o.n=0;
o.g=1;
o.x=0;
o.y=0;
}else{
var g=1;
var st="" + l;
var isNegative;
if(l<0){
isNegative=true;
st=st.slice(1);//remove the -
}

var p=0;
var f;
var sh;//shape

var decimal = "";
var xi,yi,e=0,ei=0;
var arr = st.split(".");
if(arr.length>1){
decimal=p=arr[1]
}
st = arr[0];
g = st[0]
g = parseInt(g);
st=st.slice(1);
//f=decimal[-1]
f = parseInt(decimal.slice(-1));
const firstPart=st.substring(0,g);
var x=parseInt(firstPart);
const secondPart=st.substring(g,2*g);
var thirdPart = st.substring(2*g);
var y=parseInt(secondPart);
if(thirdPart){
	e=parseInt(thirdPart);
}
if(decimal){
//var f=Math.floor(decimal.length/2);
//var f=Math.floor(decimal.length/2);

decimal = decimal.slice(0,-1);
xi = decimal.substring(0,f);
xi=parseInt(xi);
yi = decimal.substring(f,f+f);
yi=parseInt(yi);
thirdPart =  decimal.substring(f+f);
if(thirdPart){
ei=parseInt(thirdPart)||0;
}	

}

//var o = dtXYG(g,x,y,xi,yi,precision)

if(g){
//var number = encode(g,x,y,xi,yi,"1",e||"",e2||"");
var number = encode(g,x,y,xi,yi,e||"",ei||"");
o={x:x,y:y,g:g,name:x+':'+y+':'+g,number:number,n:number};

o.tn = encode(g,x,y);
//if(perimeter){v.p=perimeter}
if(!!(ei) || !!(e)){
	o.e=e;
	o.ei=ei;
}

if(xi){o.xi=xi};
if(yi){o.yi=yi};
//TODO extract e and ei from the remainder
//if(e){o.e=e};
//if(ei){o.ei=ei};
//if(sh){o.sh=sh};//shape

}
}

//console.log(o)
o.p = precision||6;
return o;
}


/**
* @function dtXYG(g,x,y,options): returns a vector with tile corners' coords.
*
* x {Number} - X units distance from [[90,-180],[-90,-180]] (towards east).
* y {Number} - Y units from [[90,-180],[90,180]] (towards south).
* g {1-9} g - granularity.
* options (optional) = options include precision and offset.
*/

function dtXYG(g,x,y,options){
var opt = {p:6,offset:0}
if(options){
opt.offset = options.offset || 0;
opt.p = options.p || 6;
if(options.xi){opt.xi=options.xi};
if(options.yi){opt.yi=options.yi};
if(options.ei){opt.ei=options.e2};
if(options.e){opt.e=options.e};
}
var v,offset = opt.offset,p=opt.p;
if(g){
var n = encode(g,x,y)
v={x:x,y:y,g:g,name:x+':'+y+':'+g,number:n,n:n,options:opt};
//if(perimeter){v.p=perimeter}

var pi=Math.PI,n=Math.pow(10,g);
let lngNW=x / n * 360 - 180;
let latNW=180 * Math.atan(Math.sinh(pi * (1 - 2 * y / n))) / pi;
let lngSW=x / n * 360 - 180;
let latSW=180 * Math.atan(Math.sinh(pi * (1 - 2 * (y+1) / n))) / pi;
let lngNE=(x+1) / n * 360 - 180;
let latNE=180 * Math.atan(Math.sinh(pi * (1 - 2 * (y) / n))) / pi;
let lngSE=(x+1) / n * 360 - 180;
let latSE=180 * Math.atan(Math.sinh(pi * (1 - 2 * (y+1) / n))) / pi;
if(p){
latSE=latSE.toFixed(p);
lngSE=lngSE.toFixed(p);
latSW=latSW.toFixed(p);
lngSW=lngSW.toFixed(p);
latNW=latNW.toFixed(p);
lngNW=lngNW.toFixed(p);
latNE=latNE.toFixed(p);
lngNE=lngNE.toFixed(p);
}
v.a=v.nw=[Number(latNW),Number(lngNW)]; // starting conrners from northwest and moving clockwise
v.b=v.ne=[Number(latNE),Number(lngNE)];
v.c=v.se=[Number(latSE),Number(lngSE)];
v.d=v.sw=[Number(latSW),Number(lngSW)];

//v.coords=[v.sw,v.nw,v.ne,v.se];
v.coords=[v.a,v.b,v.c,v.d];
}
return v;
}

function tileJSON(n,precision,fancy){
var coords;
var quad = new Tile(n,precision);
coords=quad.coords;
//var quad = dtXYG(g,x,y,null,null,precision)
var features=[];
if(coords){
var params={name:quad.number,type:"tile",noFill:1};
var nw=flip(coords[0]);
var ne=flip(coords[1]);
var se=flip(coords[2]);
var sw=flip(coords[3]);
var ftr=feature(coords,params);
var bbox=[sw[0],sw[1],ne[0],ne[1]];
ftr.bbox = bbox;
features.push(ftr);
}

var j={type:"FeatureCollection",features:features};
if(fancy){
j=JSON.stringify(j,null,2)
}else{
j=JSON.stringify(j)
};
return j
}


function bbox(l,p){
var bb;
if (validTN(l)){
var o = new Tile(l,{p:p,offset:0});
var coords = [[o.d[1],o.d[0]],[o.b[1],o.b[0]]];
var ftr = feature(coords)
}
return bb;
}

/**
* @function isInT
* Returns true if a coordinate is inside a tile.
*/

function isInT(lat,lng,tile){
var ret=false;
var t;
var p = 10;
if(typeof tile === 'object'){
t=tile
}else{
t = new Tile(tile,p)
}

if(t.g){
var q = t.coords;
if(inPoly([lat,lng],q)){
ret = true;
}
}
return ret
}

/**
* @function split100(g,x,y): tn[]
* Returns an array of 100 tile numbers of the next zoom level at x and y.
*
* g {1 - 9} - tile granularity.
* x {Number} - tile horizontal position
* y {Number} - tile vart position.
*/

function split100(g,x,y){
var tn = encode(g+1,x*10,y*10);
var tb=new Tbox(tn,9,9)
return tb.list;
}

function drill(q,lat,lng,gMax){
var coord = [lat,lng];
var g = q.g;
if(!validDD(coord)){return}
var qds = split100(q.g,q.x,q.y);
var found;
qds.forEach(function(sq){
if (isInT(lat,lng,sq)){
//if (inPoly([lat,lng],sq)){
found = sq;
}
})
if(!found){return}
if(g+1<gMax){
return drill(new Tile(found),lat,lng,gMax)
}else{
return new Tile(found)
}
}

function feature(coords,prop,bbox){
var poly = [];
coords.forEach((point)=>{
poly.push(flip(point))
})
var ftr={}
if(prop){ftr.properties=prop}
ftr.geometry={
"type":"Polygon",
"coordinates":[poly]
}
ftr.type = "Feature";
if(bbox){feature.bbox = bbox}
return ftr
}

function validTile(g,x,y){
var ok=false;
if(Number.isInteger(x)&&Number.isInteger(y)&&Number.isInteger(g)){
ok = true;
}
return ok;
}

function validTN(tn){
var ok;
n = Number(tn);
if(n !== Infinity){
n = Math.abs(n);
var st="" + n;
var p=0;
var arr = st.split(".");
var int = arr[0];
const firstChar = int[0];
const firstDigit = Number(firstChar);
var length = int.length
if(firstDigit<=(length-1)/2){
ok=1;
}
}
if(!(ok)){console.log("valid " + tn + " " + ok);}
return ok;
}

function decimals(number){
const numString = number.toString();
const di = numString.indexOf('.');
if (di === -1) {
return 0; // No decimal part
} else {
return numString.length - di - 1;
}
}

function lines(tn,xi,yi,p,offset){
var off=offset||0;
off=off*360;
var arr=[];
var tile = decode(tn);
if(tile){
var x=tile.x,y=tile.y,g=tile.g,xii=xi,yii=yi;
var max = Math.pow(10,g);
if(g==1){
x=0;
y=0;
xii=9;
yii=9;
}

var vLines=[],hLines=[];
for (let i = x;i<=x+xii;i++){
var iG=wrapN(i,0,max);
var tileTop = new DT.Tile(g,iG,y,p);
var tileBottom = new DT.Tile(g,iG,y+yii,p);
var a=tileTop.a;
var b=tileTop.b;
var d=tileBottom.d;
var c=tileBottom.c;

if(iG<x){
//make sure the line goes to the east
a[1]=a[1]+360;
d[1]=d[1]+360;
b[1]=b[1]+360;
c[1]=c[1]+360;
}

if(off){
a[1]=a[1]+off;
d[1]=d[1]+off;
b[1]=b[1]+off;
c[1]=c[1]+off;
}

vLines.push([a,d])
if(i==x+xii){
vLines.push([b,c]);
}
}

for (let j = y;j<=y+yii;j++){
var tileLeft = new DT.Tile(g,x,j);
var xG=wrapN(x+xii,0,max)
var tileRight = new DT.Tile(g,xG,j);
var b=tileRight.b;
var a=tileLeft.a;
var d=tileLeft.d;
var c=tileRight.c;

if(xG<x){
//make sure the line goes to the east
b[1]=b[1]+360;
c[1]=c[1]+360;
}
if(off){
//make sure the line goes to the east
a[1]=a[1]+off;
d[1]=d[1]+off;
b[1]=b[1]+off;
c[1]=c[1]+off;
}

hLines.push([a,b]);
if(j==y+yii){
hLines.push([d,c]);
}

arr = vLines.concat(hLines)
}
}
return arr;
}

function middle(a,b){
var d= b + ((a-b) / 2);
return d;
}

function flip(l){
var cr;
if(Array.isArray(l)){
cr=[].concat(l);
cr[0]=l[1];
cr[1]=l[0];
}
return cr;
}

function wrapN(x, min,max, inc) {
var d = max - min;
return x === max && inc ? x : ((x - min) % d + d) % d + min;
}

function normalize(crd){
var ret;
var lat = wrapN(crd[0],-90,90);
var lng = wrapN(crd[1],-180,180);
ret = [lat,lng]
return ret
}

function isNumeric(v){return !isNaN(parseFloat(v)) && isFinite(v)}

function validDD(st){
var ok;
if(Array.isArray(st)&&st.length>1){
if(isNumeric(st[0]) && isNumeric(st[1])){ok = true}
}
return ok
}

function offsetter(crd,offset){
var cr = normalize(crd);
if(offset!=0){
var incr = offset * 360;
cr[1]=cr[1]+incr;
}
return cr
}
	
	
function inPoly(point,vs){
var x = point[0], y = point[1];
var inside = false;
for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
var xi = vs[i][0], yi = vs[i][1];
var xj = vs[j][0], yj = vs[j][1];
var intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
if (intersect) inside = !inside;
}
return inside;
};

function pointOnLine(P,A,B,tolerance = 0.0001) {
const cp = (P[0] - A[0]) * (B[1] - A[1]) - (P[1] - A[1]) * (B[0] - A[0]);
return Math.abs(cp) < tolerance;
}

function nFormat(num, precision){
if (precision === false){return num;}
var pow = Math.pow(10, precision === undefined ? 6 : precision);
return Math.round(num * pow) / pow;
}

function distance(p1,p2) {
	var ret;
	try{
    const R = 6371e3;
	var lat1=p1[0], lon1=p1[1], lat2=p2[0], lon2=p2[1];
    const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	ret = R * c;
	}catch(e){console.log(e)}
    return ret
}
function unload(){
	if(DT){DT={};}	
}
//helpers end

var exps = {
Tile:Tile,
Tbox:Tbox,
feature:feature,
bbox:bbox,
find:find,
findBox:findBox,
encode:encode,
decode:decode,
embelish:embelish,
dtXYG:dtXYG,
lines:lines,
tileJSON:tileJSON,
split100:split100,
nFormat:nFormat,
distance:distance,
validTN:validTN,
validDD:validDD,
wrapN:wrapN,
offsetter:offsetter,
inPoly:inPoly,
flip:flip,
version:version,
unload:unload,
}

for (const [key, value] of Object.entries(exps)) {
console.log(`${key}: ${value}`);
exports[key] = value 
}


//if (typeof module != 'undefined' && module.exports) {module.exports = exports} else{window.DT = exports;}
})(typeof exports === 'undefined'? window.DT={}: exports);
