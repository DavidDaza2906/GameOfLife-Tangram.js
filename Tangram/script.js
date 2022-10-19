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
let firstRectangle = new rectangle("rgba(46,142,222,1)",1300,200,200, Math.PI/2, 'rectangle');
let smallTriangle1 = new triangle("rgba(241,91,96,1)",1500,200,280,7*Math.PI/4,'triangle');
let smallTriangle2 = new triangle("rgba(57,181,160,1)",1300,600,280,Math.PI/4, 'triangle');
let bigTriangle1 = new triangle("rgba(164, 146, 234,1)",1500,800,560,5*Math.PI/4,'triangle')
let bigTriangle2 = new triangle("rgba(193, 212, 94,1)",600,400,560,3*Math.PI/4,'triangle')
let midTriangle = new triangle("rgba(150,1,16,1)",1000,800, 400,Math.PI, 'triangle')
let parallelogram1 = new parallelogram("rgba(241,100,260,1)",400,600,280,7*Math.PI/4,'parallelogram',1)
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
  ctx.moveTo(200,0);
  ctx.lineTo(200,800);
  ctx.lineTo(1000,800);
  ctx.lineTo(1000,0);
  ctx.lineTo(200,0);
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
smallTriangle1B = [800,200, 1000,400,1000,0];
smallTriangle2B = [600,400,400,600,800,600]
rectangleB = [800,600,600,400,800,200,1000,400,800,600];
bigTriangle1B = [600,400,1000,0,200,0];
bigTriangle2B = [600,400,200,0,200,800];
midTriangleB = [1000,800,1000,400,600,800];
parallelogramB = [200,400,600,600,600,800,800,800];
square.push(smallTriangle1B, smallTriangle2B, rectangleB, bigTriangle1B, bigTriangle2B, midTriangleB, parallelogramB);



//Colisionar figuras

//Verificar distintas formas de solucionar
//Margenes posible forma
//Crear json para enviar los objetos ahi




