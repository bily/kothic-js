var Kothic={};
Kothic.render=function(){function a(b,a){return parseFloat(b.style["z-index"]||0)-parseFloat(a.style["z-index"]||0)}function k(b,c,s,g,f){var d=s.features,s=[],j,m,r,n,h,l;j=0;for(r=d.length;j<r;j++){h=n=d[j];l=g;var p=f,o=void 0,w=void 0,e=[MapCSS.currentStyle,JSON.stringify(h.properties),l,h.type].join(":");if(!i[e]){if(h.type=="Polygon"||h.type=="MultiPolygon")o="way",w="area";else if(h.type=="LineString"||h.type=="MultiLineString")o="way",w="line";else if(h.type=="Point"||h.type=="MultiPoint")w=
o="node";i[e]=MapCSS.restyle(h.properties,l,o,w);p&&p(i[e],h.properties,l,o,w)}h=i[e];for(m in h)if(h.hasOwnProperty(m)){l={};p=n;o=void 0;for(o in p)p.hasOwnProperty(o)&&(l[o]=p[o]);l.kothicId=j+1;l.style=h[m];s.push(l)}}s.sort(a);g=0;for(f=s.length;g<f;g++)m=s[g],d=parseFloat(m.properties.layer)||0,j=m.style["-x-mapnik-layer"],j=="top"&&(d=1E4),j=="bottom"&&(d=-1E4),d in b||(b[d]=[],c.push(d)),b[d].push(m);c.sort()}function d(b,a){for(var c in a)a.hasOwnProperty(c)&&a[c]&&(b[c]=a[c])}function e(b,
a,c){this.buffer=[];this.ctx=b;this.debugBoxes=a;this.debugChecks=c}function r(b,a,c,g,f,r,j,m){var i=a.style,n;a:switch(a.type){case "Point":n=a.coordinates;break;case "Polygon":n=a.reprpoint;break;case "LineString":n=a.coordinates[0];break;case "GeometryCollection":case "MultiPoint":case "MultiPolygon":case "MultiLineString":n=void 0;break a}if(n){n=[g*n[0],f*(r-n[1])];var h;if(m){h=MapCSS.getImage(i["icon-image"]);if(!h)return;if(c.checkPointWH(n,h.width,h.height,a.kothicId))return}if(j){b.save();
var j=i["text-halo-radius"]+2,l;l=i["font-family"];var p=i["font-size"];l=l||"";var p=p||9,o=l?l+", ":"";l=l.toLowerCase();var e=[];(l.indexOf("italic")!=-1||l.indexOf("oblique")!=-1)&&e.push("italic");l.indexOf("bold")!=-1&&e.push("bold");e.push(p+"px");o+=l.indexOf("serif")!=-1?"Georgia, serif":"Arial, Helvetica, sans-serif";e.push(o);l=e.join(" ");d(b,{lineWidth:j,font:l});j=i.text+"";p=b.measureText(j).width;o=p/j.length*2.5;e=i["text-offset"]||0;if(i["text-allow-overlap"]!="true"&&c.checkPointWH([n[0],
n[1]+e],p,o,a.kothicId)){b.restore();return}var k=i["text-opacity"]||i.opacity||1,z=i["text-color"]||"#000000",B=i["text-halo-color"]||"#ffffff";l="text-halo-radius"in i;k<1&&(z=(new RGBColor(z,k)).toRGBA(),B=(new RGBColor(B,k)).toRGBA());d(b,{fillStyle:z,strokeStyle:B,textAlign:"center",textBaseline:"middle"});if(a.type=="Polygon"||a.type=="Point")l&&b.strokeText(j,n[0],n[1]+e),b.fillText(j,n[0],n[1]+e),g=parseFloat(i["-x-mapnik-min-distance"])||20,c.addPointWH([n[0],n[1]+e],p,o,g,a.kothicId);else if(a.type==
"LineString"){p=a.coordinates;o=[];e=0;for(k=p.length;e<k;e++)o.push([g*p[e][0],f*(r-p[e][1])]);Kothic.textOnPath(b,o,j,l,c)}b.restore()}m&&(b.drawImage(h,Math.floor(n[0]-h.width/2),Math.floor(n[1]-h.height/2)),g=parseFloat(i["-x-mapnik-min-distance"])||0,c.addPointWH(n,h.width,h.height,g,a.kothicId))}}var i={},f=!1,c={strokeStyle:"rgba(0,0,0,0.5)",fillStyle:"rgba(0,0,0,0.5)",lineWidth:1,lineCap:"round",lineJoin:"round"};e.prototype={addBox:function(b){this.buffer.push(b)},addPointWH:function(b,a,
c,f,d){b=this.getBoxFromPoint(b,a,c,f,d);this.buffer.push(b);if(this.debugBoxes)this.ctx.save(),this.ctx.strokeStyle="red",this.ctx.lineWidth="1",this.ctx.strokeRect(b[0],b[1],b[2]-b[0],b[3]-b[1]),this.ctx.restore()},checkBox:function(b){for(var a=0,c=this.buffer.length,f;a<c;a++)if(f=this.buffer[a],!(b[4]&&b[4]==f[4])&&f[0]<=b[2]&&f[1]<=b[3]&&f[2]>=b[0]&&f[3]>=b[1]){if(this.debugChecks)this.ctx.save(),this.ctx.strokeStyle="darkblue",this.ctx.lineWidth="1",this.ctx.strokeRect(b[0],b[1],b[2]-b[0],
b[3]-b[1]),this.ctx.restore();return!0}return!1},checkPointWH:function(a,c,f,d){return this.checkBox(this.getBoxFromPoint(a,c,f,0,d))},getBoxFromPoint:function(a,c,f,d,i){return[a[0]-c/2-d,a[1]-f/2-d,a[0]+c/2+d,a[1]+f/2+d,i]}};return function(a,i,s,g,x,u){var a=typeof a=="string"?document.getElementById(a):a,j=a.getContext("2d"),m=a.width,t=a.height,n=i.granularity,h=m/n,l=t/n,p={},o=[],w=new e,A,z,B=+new Date,E,F,G;if(u)A=document.createElement("canvas"),A.width=m,A.height=t,z=j,j=A.getContext("2d");
k(p,o,i,s,g);E=+new Date;d(j,c);var I=o.length,D,q,v,C,y,J;J=function(){w.addBox([0,0,m,0]);w.addBox([0,t,m,t]);w.addBox([m,0,m,t]);w.addBox([0,0,0,t]);for(D=I-1;D>=0;D--){v=p[o[D]];C=v.length;for(q=C-1;q>=0;q--)y=v[q].style,"icon-image"in y&&!y.text&&r(j,v[q],w,h,l,n,!1,!0);for(q=C-1;q>=0;q--)y=v[q].style,y.text&&y["text-position"]=="line"&&r(j,v[q],w,h,l,n,!0,!1);for(q=C-1;q>=0;q--)y=v[q].style,y.text&&y["text-position"]!="line"&&!("icon-image"in y)&&r(j,v[q],w,h,l,n,!0,!1);for(q=C-1;q>=0;q--)y=
v[q].style,"icon-image"in y&&y.text&&r(j,v[q],w,h,l,n,!0,!0)}G=+new Date;u&&z.drawImage(A,0,0);x({layersStyled:E-B,mapRendered:F-E,iconsAndTextRendered:G-F,total:G-B})};setTimeout(function(){var a=j,b=MapCSS.restyle({},s,"canvas","canvas")["default"];a.save();d(a,{fillStyle:b["fill-color"],globalAlpha:b["fill-opacity"]||b.opacity});a.fillRect(-1,-1,m+1,t+1);a.restore();for(D=0;D<I;D++){v=p[o[D]];C=v.length;for(q=0;q<C;q++)if(y=v[q].style,"fill-color"in y||"fill-image"in y){var a=j,c=v[q],i=v[q+1],
e=h,r=l,g=n,b=c.style;f||(f=!0,a.beginPath());Kothic.path(a,c,!1,!0,e,r,g);if(!i||i.style!==b){a.save();c=b["fill-opacity"]||b.opacity;"fill-color"in b&&(d(a,{fillStyle:b["fill-color"],globalAlpha:c}),a.fill());if("fill-image"in b&&(b=MapCSS.getImage(b["fill-image"])))d(a,{fillStyle:a.createPattern(b,"repeat"),globalAlpha:c}),a.fill();f=!1;a.restore()}}j.lineCap="butt";for(q=0;q<C;q++)if("casing-width"in v[q].style){var a=j,b=v[q],c=v[q+1],i=h,e=l,r=n,g=b.style,k=g["casing-dashes"]||g.dashes||!1;
f||(f=!0,a.beginPath());Kothic.path(a,b,k,!1,i,e,r);if(!c||c.style!==g)a.save(),d(a,{lineWidth:2*g["casing-width"]+("width"in g?g.width:0),strokeStyle:g["casing-color"]||g.color,lineCap:g["casing-linecap"]||g.linecap,lineJoin:g["casing-linejoin"]||g.linejoin,globalAlpha:g["casing-opacity"]||g.opacity}),f=!1,a.stroke(),a.restore()}j.lineCap="round";for(q=0;q<C;q++)if("width"in v[q].style&&(a=j,b=v[q],c=v[q+1],i=h,e=l,r=n,g=b.style,k=g.dashes,f||(f=!0,a.beginPath()),Kothic.path(a,b,k,!1,i,e,r),!c||
c.style!==g))a.save(),d(a,{lineWidth:g.width,strokeStyle:g.color,lineCap:g.linecap,lineJoin:g.linejoin,globalAlpha:g.opacity}),f=!1,a.stroke(),a.restore();F=+new Date}setTimeout(J,0)},0)}}();var MapCSS={styles:{},currentStyle:"",onError:function(){},onImagesLoad:function(){},e_min:function(){return Math.min.apply(null,arguments)},e_max:function(){return Math.max.apply(null,arguments)},e_any:function(){for(var a=0;a<arguments.length;a++)if(typeof arguments[a]!="undefined"&&arguments[a]!=="")return arguments[a];return""},e_num:function(a){return isNaN(parseFloat(a))?"":parseFloat(a)},e_str:function(a){return a},e_int:function(a){return parseInt(a,10)},e_tag:function(a,k){return k in a&&
a[k]!==null?a[k]:""},e_prop:function(a,k){return k in a&&a[k]!==null?a[k]:""},e_sqrt:function(a){return Math.sqrt(a)},e_boolean:function(a){return a=="0"||a=="false"||a===""?"false":"true"},e_boolean:function(a,k,d){return MapCSS.e_boolean(a)=="true"?k:d},e_metric:function(a){return/\d\s*mm$/.test(a)?1E3*parseInt(a,10):/\d\s*cm$/.test(a)?100*parseInt(a,10):/\d\s*dm$/.test(a)?10*parseInt(a,10):/\d\s*km$/.test(a)?0.001*parseInt(a,10):/\d\s*in$/.test(a)?0.0254*parseInt(a,10):/\d\s*ft$/.test(a)?0.3048*
parseInt(a,10):parseInt(a,10)},e_zmetric:function(a){return MapCSS.metric(a)},loadStyle:function(a,k,d,e){MapCSS.styles[a]={restyle:k,images:d,external_images:e,textures:{}};if(!MapCSS.currentStyle)MapCSS.currentStyle=a},loadImages:function(a,k){var d=!k,e=!MapCSS.styles[a].external_images.length;if(e&&d)MapCSS.onImagesLoad();e||MapCSS._preloadExternalImages(a,function(){if((e=!0)&&d)MapCSS.onImagesLoad()});d||MapCSS._preloadSpriteImage(a,k,function(){d=!0;if(e&&d)MapCSS.onImagesLoad()})},_preloadSpriteImage:function(a,
k,d){var e=new Image;e.onload=function(){var r=MapCSS.styles[a].images,i;for(i in r)if(r.hasOwnProperty(i))r[i].sprite=e;d()};e.onerror=function(a){MapCSS.onError(a)};e.src=k},_preloadExternalImages:function(a,k){var d=MapCSS.styles[a].external_images;delete MapCSS.styles[a].external_images;for(var e=d.length,r=0,i=0;i<e;i++)(function(f){var c=new Image;c.onload=function(){r++;MapCSS.styles[a].images[f]={sprite:c,height:c.height,width:c.width,offset:0};r==e&&k()};c.onerror=function(){r++;r==e&&k()};
c.src=f})(d[i])},getImage:function(a){var k=MapCSS.styles[MapCSS.currentStyle],d=k.images[a];if(d.sprite){var e=document.createElement("canvas");e.width=d.width;e.height=d.height;e.getContext("2d").drawImage(d.sprite,0,d.offset,d.width,d.height,0,0,d.width,d.height);d=k.images[a]=e}return d},restyle:function(){return MapCSS.styles[MapCSS.currentStyle].restyle.apply(MapCSS,arguments)}};Kothic.path=function(){function a(a,d){e={pattern:d,seg:0,phs:0,x:a[0],y:a[1]}}function k(a,d){var f=e,c=d[0]-f.x,b=d[1]-f.y,k=Math.sqrt(c*c+b*b),s;a.save();a.translate(f.x,f.y);a.rotate(Math.atan2(b,c));a.moveTo(0,0);c=0;do{s=f.pattern[f.seg];c+=s-f.phs;b=c<k;if(!b)f.phs=s-(c-k),c=k;a[f.seg%2?"moveTo":"lineTo"](c,0);if(b)f.phs=0,f.seg=++f.seg%f.pattern.length}while(b);f.x=d[0];f.y=d[1];a.restore()}function d(a,d){return a[0]===0||a[0]==d||a[1]===0||a[1]==d}var e;return function(e,i,f,c,b,H,s){var g=
i.type,i=i.coordinates;g=="Polygon"&&(i=[i],g="MultiPolygon");g=="LineString"&&(i=[i],g="MultiLineString");var x,u,j,m,t=i.length,n,h,l,p,o;if(g=="MultiPolygon")for(x=0;x<t;x++){j=0;for(n=i[x].length;j<n;j++){m=i[x][j];h=m.length;l=m[0];for(u=0;u<=h;u++)p=m[u]||m[0],o=[b*p[0],H*(s-p[1])],u===0||!c&&d(p,s)&&d(l,s)?(l=o,o=f,e.moveTo(l[0],l[1]),o&&a(l,o)):c||!f?e.lineTo(o[0],o[1]):k(e,o),l=p}}if(g=="MultiLineString")for(x=0;x<t;x++){m=i[x];h=m.length;for(u=0;u<h;u++)p=m[u],o=[b*p[0],H*(s-p[1])],(u===
0||u==h-1)&&d(p,s),u===0?(c=o,g=f,e.moveTo(c[0],c[1]),g&&a(c,g)):f?k(e,o):e.lineTo(o[0],o[1])}}}();/*
 Use it if you like it
*/
function RGBColor(a,k){this.ok=!1;a.charAt(0)=="#"&&(a=a.substr(1,6));var a=a.replace(/ /g,""),a=a.toLowerCase(),d={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"00ffff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000000",blanchedalmond:"ffebcd",blue:"0000ff",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"00ffff",darkblue:"00008b",
darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgreen:"006400",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dodgerblue:"1e90ff",feldspar:"d19275",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"ff00ff",
gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",green:"008000",greenyellow:"adff2f",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgrey:"d3d3d3",lightgreen:"90ee90",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",
lightslateblue:"8470ff",lightslategray:"778899",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"00ff00",limegreen:"32cd32",linen:"faf0e6",magenta:"ff00ff",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370d8",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",
oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"d87093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",red:"ff0000",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",
slategray:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",violetred:"d02090",wheat:"f5deb3",white:"ffffff",whitesmoke:"f5f5f5",yellow:"ffff00",yellowgreen:"9acd32"};d[a]&&(a=d[a]);for(var d=[{re:/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,example:["rgb(123, 234, 45)","rgb(255,234,245)"],process:function(a){return[parseInt(a[1]),parseInt(a[2]),parseInt(a[3])]}},{re:/^(\w{2})(\w{2})(\w{2})$/,
example:["#00ff00","336699"],process:function(a){return[parseInt(a[1],16),parseInt(a[2],16),parseInt(a[3],16)]}},{re:/^(\w{1})(\w{1})(\w{1})$/,example:["#fb0","f0f"],process:function(a){return[parseInt(a[1]+a[1],16),parseInt(a[2]+a[2],16),parseInt(a[3]+a[3],16)]}}],e=0;e<d.length;e++){var r=d[e].process,i=d[e].re.exec(a);if(i)channels=r(i),this.r=channels[0],this.g=channels[1],this.b=channels[2],this.ok=!0}this.r=this.r<0||isNaN(this.r)?0:this.r>255?255:this.r;this.g=this.g<0||isNaN(this.g)?0:this.g>
255?255:this.g;this.b=this.b<0||isNaN(this.b)?0:this.b>255?255:this.b;this.a=k?k:1;this.toRGB=function(){return"rgb("+this.r+", "+this.g+", "+this.b+")"};this.toRGBA=function(){return"rgba("+this.r+", "+this.g+", "+this.b+", "+this.a+")"};this.toHex=function(){var a=this.r.toString(16),c=this.g.toString(16),b=this.b.toString(16);a.length==1&&(a="0"+a);c.length==1&&(c="0"+c);b.length==1&&(b="0"+b);return"#"+a+c+b}};Kothic.textOnPath=function(){function a(a,b){if(!f[b])f[b]=a.measureText(b).width;return f[b]}function k(a,b){return[a[1]+0.5*Math.cos(a[0])*b,a[2]+0.5*Math.sin(a[0])*b]}function d(c,b,d,e){var e=e||0,g=a(c,b),b=a(c,b.charAt(0))*1.5,f=d[0],c=Math.abs(Math.cos(f)*g)+Math.abs(Math.sin(f)*b),b=Math.abs(Math.sin(f)*g)+Math.abs(Math.cos(f)*b);return[k(d,g+2*e),c,b,0]}function e(c,b,e,f){var g,i=0;for(g=0;g<=e.length;g++){if(c.checkPointWH.apply(c,d(b,e.charAt(g),f,i)))return!0;i+=a(b,e.charAt(g))}return!1}
function r(c,b,d){var e=b[4],g=k(b,a(c,e));c.save();c.translate(Math.floor(g[0]),Math.floor(g[1]));c.rotate(b[0]);c[d?"strokeText":"fillText"](e,0,0);c.restore()}function i(a,b){var d=a.length,e,g,f,i,j,m=0;j=0;for(i=1;i<d;i++){j=a[i];f=a[i-1];e=j[0]-f[0];g=j[1]-f[1];j=Math.sqrt(e*e+g*g);if(m+j>=b)return i=b-m,d=f[0]+e*i/j,f=f[1]+g*i/j,e=Math.atan2(g,e),[e,d,f,j-i];m+=j}}var f;return function(c,b,k,s,g){f={};var x=c.measureText(k).width,u=k.length,j,m=b.length,t,n,h,l=0;for(h=1;h<m;h++)t=b[h],n=b[h-
1],j=n[0]-t[0],t=n[1]-t[1],l+=Math.sqrt(j*j+t*t);j=l;if(!(j<x)){for(var p,o=0,w,A=!1,z,B=Math.PI/6;o<2;){t=o?a(c,k.charAt(0)):(j-x)/2;w=0;n=null;p=[];for(m=0;m<u;m++){h=i(b,t);if(t>=j||!h){o++;p=[];A&&(b.reverse(),A=!1);break}n||(n=h[0]);l=k.charAt(m);z=a(c,l);if(e(g,c,l,h)||Math.abs(n-h[0])>B)t+=z,m=-1,p=[],w=0;else{for(;z<h[3]&&m<u;)if(m++,l+=k.charAt(m),z=a(c,l),e(g,c,l,h)||Math.abs(n-h[0])>B){m=0;t+=z;p=[];w=0;l=k.charAt(m);z=a(c,l);h=i(b,t);break}if(h){if(h[0]>Math.PI/2||h[0]<-Math.PI/2)w+=l.length;
n=h[0];h.push(l);p.push(h);t+=z}}}w>u/2&&(b.reverse(),p=[],A?(o++,b.reverse(),A=!1):A=!0);if(o>=2)return;if(p.length>0)break}b=p.length;for(m=0;s&&m<b;m++)r(c,p[m],!0);for(m=0;m<b;m++){h=p[m];r(c,h);s=g;k=c;x=h[4];u=h;h=void 0;for(h=j=0;h<=x.length;h++)s.addPointWH.apply(s,d(k,x.charAt(h),u,j)),j+=a(k,x.charAt(h))}}}}();