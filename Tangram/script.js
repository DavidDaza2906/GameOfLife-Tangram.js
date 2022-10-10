let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext('2d');
let nRC = 10;
let sR = canvas.height/nRC;
let sC = canvas.width/nRC;
class rectangle {
  constructor(color,x,y,sideLength,rotation,name){
    this.color = color;
    this.x = x;
    this.y = y;
    this.sideLength = sideLength;
    this.rotation = rotation;
    this.name = name;
  }
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

class triangle { 
  constructor(color,x,y,sideLength,rotation,name){
    this.color = color;
    this.x = x;
    this.y = y;
    this.sideLength = sideLength;
    this.rotation = rotation;
    this.name = name
}

  draw(){
    this.name = new Path2D();
    this.name.moveTo(this.x, this.y);
    this.name.lineTo(this.x + (this.sideLength*Math.cos((Math.PI/2)+ this.rotation)),this.y + (this.sideLength * Math.sin((Math.PI/2) + this.rotation)));
    this.name.lineTo(this.x + (this.sideLength * Math.cos((Math.PI*2) + this.rotation)),this.y + (this.sideLength * Math.sin((Math.PI*2) + this.rotation)));
    this.name.lineTo(this.x,this.y)
    ctx.fillStyle = this.color;
    ctx.fill(this.name);
    ctx.lineWidth = 4
    ctx.strokeStyle = "white"
    ctx.stroke(this.name)
  }
}

let firstRectangle = new rectangle("rgba(46,142,222,1)",800,600,200, Math.PI/2, 'rectangle');
let smallTriangle1 = new triangle("rgba(241,91,96,1)",800,400,280,7*Math.PI/4,'triangle');
let smallTriangle2 = new triangle("rgba(57,181,160,1)",600,600,280,Math.PI/4, 'triangle');
let bigTriangle1 = new triangle("rgba(164, 146, 234,1)",600,600,560,5*Math.PI/4,'triangle')
let bigTriangle2 = new triangle("rgba(193, 212, 94,1)",600,600,560,3*Math.PI/4,'triangle')
let midTriangle = new triangle("rgba(150,1,16,1)",1000,1000, 400,Math.PI, 'triangle')

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
  ctx.moveTo(200,0);
  ctx.lineTo(200,1000);
  ctx.strokeStyle = "rgba(0,0,0,1)"
  ctx.stroke();
  ctx.moveTo(0,200);
  ctx.lineTo(1000,200);
  ctx.strokeStyle = "rgba(0,0,0,1)"
  ctx.stroke();
}

function draw(){
  ctx.rect(0,0,canvas.width, canvas.height)
  ctx.fillStyle= '#1a1a23';
  ctx.fill();
  grid();
  smallTriangle1.draw();
  firstRectangle.draw();
  smallTriangle2.draw();
  bigTriangle1.draw();
  bigTriangle2.draw();
  midTriangle.draw();
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
  figuresTotal.push(smallTriangle2);
  figuresTotal.push(bigTriangle1);
  figuresTotal.push(bigTriangle2);
  figuresTotal.push(midTriangle);
  console.log(x,y)
  for (let i = 0; i < figuresTotal.length; i++){
    isPointInPath = ctx.isPointInPath(figuresTotal[i].name, x, y);
    if (isPointInPath){
      figuresTotal[i].rotation += Math.PI/4;
      console.log(((figuresTotal[i].rotation)*180)/Math.PI)
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
        figuresTotal[i].y = y;// No funciona bien en los triangulos xd
        
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
//Margenes posible forma
//Arreglar movimiento de figuras
//Crear json para enviar los objetos ahi

