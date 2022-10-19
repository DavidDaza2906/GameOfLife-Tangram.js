class polygon{
  constructor(color,x,y,sideLength,rotation,name,reversed){
    this.color = color;
    this.x = x;
    this.y = y;
    this.sideLength = sideLength;
    this.rotation = rotation;
    this.name = name;
    this.reversed = reversed;
    this.vertex = [];
    this.x1;this.x2;this.y1;this.y2;this.x3;this.y3;
  }
}

class rectangle extends polygon{
  draw(){
    this.name = new Path2D();
    const a = ((Math.PI * 2)/ 4);
    for (let i = 0; i < 5; i++) {
      this.x1 = this.x + (this.sideLength * Math.cos(a*i+this.rotation));
      this.y1 = this.y + (this.sideLength * Math.sin(a*i+this.rotation));
      this.vertex.push(this.x1,this.y1);
      this.name.lineTo(this.x1,this.y1);
    }
  ctx.fillStyle = this.color;
  ctx.fill(this.name);
  ctx.stroke(this.name);
  }
}

class triangle extends polygon {
  draw(){
    this.name = new Path2D();
    this.vertex.push(this.x, this.y);
    this.name.moveTo(this.x, this.y);
    this.x1 = this.x + (this.sideLength*Math.cos((Math.PI/2)+ this.rotation));
    this.y1 = this.y + (this.sideLength * Math.sin((Math.PI/2) + this.rotation));
    this.vertex.push(this.x1,this.y1);
    this.name.lineTo(this.x1,this.y1);
    this.x2 = this.x + (this.sideLength * Math.cos((Math.PI*2) + this.rotation));
    this.y2 = this.y + (this.sideLength * Math.sin((Math.PI*2) + this.rotation));
    this.vertex.push(this.x2,this.y2);
    this.name.lineTo(this.x2,this.y2);
    this.name.lineTo(this.x,this.y);
    ctx.fillStyle = this.color;
    ctx.fill(this.name);
    ctx.lineWidth = 4;
    ctx.strokeStyle = "white";
    ctx.stroke(this.name);
  }
}

class parallelogram extends polygon{
    draw(){
    let rev;
    this.reversed ? rev = 1: rev = -1;
    this.x2 = this.x + (this.sideLength*(Math.cos((Math.PI/2)*rev + this.rotation*rev)));
    this.y2 = this.y + (this.sideLength * (Math.sin((Math.PI/2)*rev + this.rotation*rev)));
    this.name = new Path2D();
    this.name.moveTo(this.x, this.y);
    this.vertex.push(this.x,this.y);
    this.x1 = this.x + (this.sideLength*Math.cos(Math.PI*rev + this.rotation*rev));
    this.y1 = this.y + (this.sideLength * Math.sin(Math.PI*rev + this.rotation*rev));
    this.vertex.push(this.x1, this.y1);
    this.name.lineTo(this.x1,this.y1);
    this.name.lineTo(this.x2, this.y2);
    this.vertex.push(this.x2,this.y2);
    this.x3 = this.x2 + (this.sideLength*Math.cos((Math.PI*2)*rev+ this.rotation*rev));
    this.y3 = this.y2 + (this.sideLength * Math.sin((Math.PI*2)*rev + this.rotation*rev));
    this.name.lineTo(this.x3, this.y3);
    this.vertex.push(this.x3,this.y3);
    this.name.lineTo(this.x, this.y);
    ctx.fillStyle = this.color;
    ctx.fill(this.name);
    ctx.lineWidth = 4;
    ctx.strokeStyle = "white";
    ctx.stroke(this.name);}
}

let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
let firstRectangle = new rectangle("rgba(46,142,222,1)",940,320,160, Math.PI/2, 'rectangle');
let smallTriangle1 = new triangle("rgba(241,91,96,1)",840,160,225,7*Math.PI/4,'triangle');
let smallTriangle2 = new triangle("rgba(57,181,160,1)",680,320,225,Math.PI/4, 'triangle');
let bigTriangle1 = new triangle("rgba(164, 146, 234,1)",680,320,450,5*Math.PI/4,'triangle')
let bigTriangle2 = new triangle("rgba(193, 212, 94,1)",680,320,450,3*Math.PI/4,'triangle')
let midTriangle = new triangle("rgba(150,1,16,1)",1000,642, 320,Math.PI, 'triangle')
let parallelogram1 = new parallelogram("rgba(241,100,260,1)",523,482,225,7*Math.PI/4,'parallelogram',1)
let figuresTotal = [];
figuresTotal.push(smallTriangle1,smallTriangle2, firstRectangle, bigTriangle1, bigTriangle2, midTriangle, parallelogram1);

function draw(){
  ctx.beginPath();
  ctx.rect(0,0,canvas.width, canvas.height)
  ctx.fillStyle= '#1a1a23';
  ctx.fill();
  ctx.closePath();
  let verification = new Set();
    for (let i = 0; i< 7; i++){
      let vertex = new Set();
      figuresTotal[i].vertex = [];
      figuresTotal[i].draw();
      figuresTotal[i].vertex.sort(function(a,b){return  a-b});
      square[i].sort(function(a,b){return  a-b});
      for (let j = 0; j< figuresTotal[i].vertex.length; j++){
        if (square[i][j] -10 < figuresTotal[i].vertex[j] && square[i][j] + 10 > figuresTotal[i].vertex[j]){
          vertex.add(true)
        }
        else {
          vertex.add(false)
        }
     }
     if (vertex.size == 1 && vertex.has(true)) {
        verification.add(true);
     }
     else{
      verification.add(false);
     }
    }           
   if (verification.size == 1 && verification.has(true)){
    alert("Figura valida!");
   }
  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.moveTo(360,0);
  ctx.lineTo(360,645);
  ctx.lineTo(1000,645);
  ctx.lineTo(1000,0);
  ctx.lineTo(360,0);
  ctx.stroke();
  ctx.closePath();
}

let down;
let x,y;
let rect = canvas.getBoundingClientRect();
let isPointInPath;
canvas.addEventListener("mousemove", event => {
  cancelAnimationFrame(draw);
    x = Math.floor(((event.clientX - rect.left) / (rect.right - rect.left) * canvas.width));
    y = Math.floor(((event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height));
    for (let i = 0; i < figuresTotal.length; i++){
        isPointInPath = ctx.isPointInPath(figuresTotal[i].name,x,y)
        if (isPointInPath && down){
          temp = figuresTotal[i];
          figuresTotal.splice(i,1);
          figuresTotal.push(temp);
          requestAnimationFrame(draw);
          figuresTotal[i].x += event.movementX;
          figuresTotal[i].y += event.movementY;
          cancelAnimationFrame(draw);
          temp1 = square[i];
          square.splice(i,1);
          square.push(temp1);
        }
    }
})
canvas.addEventListener("mousedown", event =>{
  console.log(x,y);
    down = true;
    if (event.shiftKey){
        for (let i = 0; i, figuresTotal.length; i++){
            isPointInPath = ctx.isPointInPath(figuresTotal[i].name,x,y);
            if (isPointInPath){
              requestAnimationFrame(draw);
                figuresTotal[i].rotation += Math.PI/4;
            }
        }
    }
    else if (event.ctrlKey){
      for (let i = 0; i, figuresTotal.length; i++){
        isPointInPath = ctx.isPointInPath(figuresTotal[i].name,x,y)
        if (isPointInPath){
          requestAnimationFrame(draw);
            figuresTotal[i].reversed = !figuresTotal[i].reversed;

    }
}}

})
canvas.addEventListener("mouseup", event =>{
    down = false;
})
window.addEventListener("resize", event =>{
    requestAnimationFrame(draw);
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
})
requestAnimationFrame(draw);
let square = []
let smallTriangle1B, smallTriangle2B, rectangleB, bigTriangle1B, bigTriangle2B, midTriangleB, parallelogramB;
smallTriangle1B = [ 0.9009742330266022, 160, 319.0990257669731, 840, 999.099025766973, 999.0990257669732 ]
smallTriangle2B = [ 320, 479.0990257669731, 479.0990257669732, 520.9009742330268, 680, 839.0990257669732 ]
rectangleB = [ 160, 319.99999999999994, 320, 480, 480, 680, 840, 840, 840, 1000 ]
bigTriangle1B = [ 1.8019484660534317, 1.8019484660535454, 320, 361.8019484660538, 680, 998.1980515339462 ];
bigTriangle2B = [ 1.801948466053659, 320, 361.80194846605355, 361.801948466054, 638.1980515339467, 680 ];
midTriangleB =  [ 322, 642, 642.0000000000001, 680, 999.9999999999999, 1000 ];
parallelogramB = [ 363.900974233027, 481.9999999999997, 482, 523, 641.0990257669731, 641.0990257669733, 682.0990257669732, 841.1980515339462 ];
square.push(smallTriangle1B, smallTriangle2B, rectangleB, bigTriangle1B, bigTriangle2B, midTriangleB, parallelogramB);

let house = [];
hsT1 = [360, 360.0000000000001, 457.99999999999983, 458, 680, 778 ];
hsT2 = [ 357.801948466054, 449, 676, 767.1980515339465, 767.1980515339467, 994.1980515339462 ];
hR = [ 1.8629150101523635, 1.8629150101524061, 228.13708498984758, 228.1370849898476, 228.13708498984772, 586.8629150101524, 586.8629150101524, 586.8629150101525, 813.1370849898476, 813.1370849898476 ];


//Colisionar figuras

//Verificar distintas formas de solucionar
//Margenes posible forma
//Crear json para enviar los objetos ahi




