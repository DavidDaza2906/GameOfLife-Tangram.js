
let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext('2d');
let nRC = 10;
let sR = canvas.height/nRC;
let sC = canvas.width/nRC;
let coor= []
function distance(x1,y1,x2,y2){
   return (Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2)))
}


export let rectangle = {
  constructor(color,x,y,sideLength,rotation,name){
    this.color = color;
    this.x = x;
    this.y = y;
    this.sideLength = sideLength;
    this.rotation = rotation;
    this.name = name;
  },
  draw(){
    this.name = new Path2D();
    const a = ((Math.PI * 2)/ 4);
    for (let i = 0; i < 4 + 0; i++) {
      this.name.lineTo(this.x + (this.sideLength * Math.cos(a*i+this.rotation)), this.y + (this.sideLength * Math.sin(a*i+this.rotation)));
    }
  ctx.fillStyle = this.color;
  ctx.fill(this.name);
  }
};

let triangle = { 
  constructor(color,x,y,sideLength,rotation,name){
    this.color = color;
    this.x = x;
    this.y = y;
    this.sideLength = sideLength;
    this.rotation = rotation;
    this.name = name;
},
  draw(){
    /// Crear triangulo en base al centro
    ctx.lineWidth = 4;
    this.name = new Path2D();
    this.name.moveTo(this.x, this.y);
    this.name.lineTo()
    this.name.lineTo(this.x+this.sideLength,this.y);
    this.name.lineTo(this.x+this.sideLength*Math.cos(Math.PI/3),this.y+this.sideLength*Math.sin(Math.PI/3))
    this.name.lineTo(this.x,this.y)
    ctx.fillStyle = this.color;
    ctx.fill(this.name)
  }
}


let firstRectangle = Object.create(rectangle);
rectangle.color = "rgba(46,142,222,1)";
rectangle.x = 150;
rectangle.y = 300;
rectangle.sideLength = 120;
rectangle.rotation = Math.PI/4;
rectangle.name = rectangle;

let smallTriangle1 = Object.create(triangle);
smallTriangle1.sides = 3;
smallTriangle1.color = "rgba(241,91,96,1)";
smallTriangle1.x = 100;
smallTriangle1.y = 100;
smallTriangle1.sideLength = 100;
smallTriangle1.rotation = Math.PI/6;
smallTriangle1.name = smallTriangle1;
smallTriangle1.regular = true;

let smallTriangle2 = Object.create(triangle);
smallTriangle2.sides = 3;
smallTriangle2.color = "rgba(57,181,160,1)";
smallTriangle2.x = 150;
smallTriangle2.y = 500;
smallTriangle2.sideLength = 100;
smallTriangle2.rotation = Math.PI/6;
smallTriangle2.name = smallTriangle2;
smallTriangle2.regular = true;


let bigTriangle1 = Object.create(triangle);
bigTriangle1.sides = 3;
bigTriangle1.color = "rgba(164, 146, 234,1)";
bigTriangle1.x = 400;
bigTriangle1.y = 600;
bigTriangle1.sideLength = 200;
bigTriangle1.rotation = Math.PI/2;
bigTriangle1.name = bigTriangle1;
bigTriangle1.regular = true;


let bigTriangle2 = Object.create(triangle);
bigTriangle2.sides = 3;
bigTriangle2.color = "rgba(193, 212, 94,1)";
bigTriangle2.x = 500;
bigTriangle2.y = 200;
bigTriangle2.sideLength = 200;
bigTriangle2.rotation = Math.PI;
bigTriangle2.name = bigTriangle2;
bigTriangle2.regular = true;

let rightTriangle = Object.create(triangle);
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
  //rectangle.draw();
  //smallTriangle2.draw();
  //bigTriangle1.draw();
  //bigTriangle2.draw();
  //rightTriangle.draw();
  //triangle.draw();
  firstRectangle.draw();
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
  figuresTotal.push(firstRectangle);
  //figuresTotal.push(smallTriangle2);
  //figuresTotal.push(bigTriangle1);
  //figuresTotal.push(bigTriangle2);
  //figuresTotal.push(rightTriangle)
  console.log(x,y)

  for (let i = 0; i < figuresTotal.length; i++){
    isPointInPath = ctx.isPointInPath(figuresTotal[i].name, x, y);
    if (isPointInPath){
      figuresTotal[i].rotation += Math.PI/12;
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


