let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext('2d');
let nRC = 10;
let sR = canvas.height/nRC;
let sC = canvas.width/nRC;

let polygons = {
  constructor(sides,color,x,y,sideLength,rotation,name,regular){
    this.sides = sides;
    this.color = color;
    this.x = x;
    this.y = y;
    this.sideLength = sideLength;
    this.rotation = rotation;
    this.name = name;
    this.regular = regular;
  },
  draw(){
    this.name = new Path2D();
    const a = ((Math.PI * 2)/ this.sides);
    if (this.regular){
    for (let i = 1; i < this.sides + 1; i++) {
      this.name.lineTo(this.x + this.sideLength * Math.cos(a*i+this.rotation), this.y + this.sideLength * Math.sin(a*i+this.rotation));
  }}
    else{ 
        this.name.lineTo(this.x + this.sideLength* Math.cos(a*1+this.rotation), this.y + this.sideLength* Math.sin(a*1+this.rotation));
        this.name.lineTo(this.x + this.sideLength* Math.cos(a*2+this.rotation), this.y + this.sideLength* Math.sin(a*2+this.rotation))
        this.name.lineTo(this.x + this.sideLength* Math.cos(a*3+this.rotation),this.y + this.sideLength * Math.sin(a+this.rotation))
        this.name.lineTo(this.x + this.sideLength* Math.cos(a*4+this.rotation),this.y + this.sideLength * Math.sin(a*4+this.rotation))
      }
  ctx.fillStyle = this.color;
  ctx.fill(this.name);
  }
};

let rectangle = Object.create(polygons);
rectangle.sides = 4;
rectangle.color = "rgba(46,142,222,1)";
rectangle.x = 150;
rectangle.y = 300;
rectangle.sideLength = 120;
rectangle.rotation = Math.PI/4;
rectangle.name = rectangle;
rectangle.regular = true;

let smallTriangle1 = Object.create(polygons);
smallTriangle1.sides = 3;
smallTriangle1.color = "rgba(241,91,96,1)";
smallTriangle1.x = 150;
smallTriangle1.y = 110;
smallTriangle1.sideLength = 100;
smallTriangle1.rotation = Math.PI/6;
smallTriangle1.name = smallTriangle1;
smallTriangle1.regular = true;

let smallTriangle2 = Object.create(polygons);
smallTriangle2.sides = 3;
smallTriangle2.color = "rgba(57,181,160,1)";
smallTriangle2.x = 150;
smallTriangle2.y = 500;
smallTriangle2.sideLength = 100;
smallTriangle2.rotation = Math.PI/6;
smallTriangle2.name = smallTriangle2;
smallTriangle2.regular = true;


let bigTriangle1 = Object.create(polygons);
bigTriangle1.sides = 3;
bigTriangle1.color = "rgba(164, 146, 234,1)";
bigTriangle1.x = 200;
bigTriangle1.y = 800;
bigTriangle1.sideLength = 200;
bigTriangle1.rotation = Math.PI/6;
bigTriangle1.name = bigTriangle1;
bigTriangle1.regular = true;


let bigTriangle2 = Object.create(polygons);
bigTriangle2.sides = 3;
bigTriangle2.color = "rgba(193, 212, 94,1)";
bigTriangle2.x = 500;
bigTriangle2.y = 200;
bigTriangle2.sideLength = 200;
bigTriangle2.rotation = Math.PI/6;
bigTriangle2.name = bigTriangle2;
bigTriangle2.regular = true;

let rightTriangle = Object.create(polygons);
rightTriangle.sides = 3;
rightTriangle.color = "rgba(241,91,96,1)";
rightTriangle.x = 650;
rightTriangle.y = 210;
rightTriangle.sideLength = 100;
rightTriangle.rotation = 0 ;
0;
rightTriangle.name = rightTriangle;
rightTriangle.regular = false;

function grid() {
  ctx.lineWidth = 1;
  for (let y = 0; y < nRC; y++) {
    for (let x = 0; x < nRC; x++) {
     ctx.strokeStyle = "black";
      ctx.strokeRect(x* sC, y * sR, sC, sR)
    }
  }
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(300,0);
  ctx.lineTo(300,1000);
  ctx.strokeStyle = "rgba(0,0,0,1)"
  ctx.stroke();
}



function draw(){
  ctx.rect(0,0,canvas.width, canvas.height)
  ctx.fillStyle= '#1a1a23';
  ctx.fill();
  grid();
  smallTriangle1.draw();
  rectangle.draw();
  smallTriangle2.draw();
  bigTriangle1.draw();
  bigTriangle2.draw();
  rightTriangle.draw();
}


let down = false;
let x,y;
let rect;
let isPointInPath;
let figuresTotal;
canvas.addEventListener("mousedown", event => {
  figuresTotal = [];
  rect = canvas.getBoundingClientRect();
  x= Math.floor(((event.clientX - rect.left) / (rect.right - rect.left) * canvas.width));
  y= Math.floor(((event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height));
  figuresTotal.push(smallTriangle1);
  figuresTotal.push(rectangle);
  figuresTotal.push(smallTriangle2);
  figuresTotal.push(bigTriangle1);
  figuresTotal.push(bigTriangle2);
  figuresTotal.push(rightTriangle)


  for (let i = 0; i < figuresTotal.length; i++){
    isPointInPath = ctx.isPointInPath(figuresTotal[i].name, x, y);
    if (isPointInPath){
      figuresTotal[i].rotation += Math.PI/6;
      down = true;
    }
  }
})

canvas.addEventListener("mousemove", event =>{
  if (down){
    x= Math.floor(((event.clientX - rect.left) / (rect.right - rect.left) * canvas.width));
    y= Math.floor(((event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height));
    for (let i = 0; i < figuresTotal.length; i++){
      isPointInPath = ctx.isPointInPath(figuresTotal[i].name, x, y);
      if (isPointInPath){
        figuresTotal[i].x = x;
        figuresTotal[i].y = y;
      }
    }
  }
})

canvas.addEventListener("mouseup", event =>{
  down = false;
})

setInterval(draw,10)
//Colisionar figuras
//Verificar distintas formas de solucionar
//Margenes posibule forma
// Paralelogramo relfejo



