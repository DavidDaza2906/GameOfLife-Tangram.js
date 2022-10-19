class polygon{
  constructor(color,x,y,sideLength,rotation,name,reversed){
    this.color = color;
    this.x = x;
    this.y = y;
    this.sideLength = sideLength;
    this.rotation = rotation;
    this.name = name;
    this.reversed = reversed;
  }
}

class rectangle extends polygon{
  draw(){
    this.name = new Path2D();
    const a = ((Math.PI * 2)/ 4);
    for (let i = 0; i < 5; i++) {
      this.name.lineTo(this.x + (this.sideLength * Math.cos(a*i+this.rotation)), this.y + (this.sideLength * Math.sin(a*i+this.rotation)));
    }
  ctx.fillStyle = this.color;
  ctx.fill(this.name);
  ctx.stroke(this.name)
  }
}

class triangle extends polygon {
  draw(){
    this.name = new Path2D();
    this.name.moveTo(this.x, this.y);
    this.name.lineTo(this.x + (this.sideLength*Math.cos((Math.PI/2)+ this.rotation)),this.y + (this.sideLength * Math.sin((Math.PI/2) + this.rotation)));
    this.name.lineTo(this.x + (this.sideLength * Math.cos((Math.PI*2) + this.rotation)),this.y + (this.sideLength * Math.sin((Math.PI*2) + this.rotation)));
    this.name.lineTo(this.x,this.y);
    ctx.fillStyle = this.color;
    ctx.fill(this.name);
    ctx.lineWidth = 4
    ctx.strokeStyle = "white"
    ctx.stroke(this.name)
  }
}

class parallelogram extends polygon{
    draw(){
      if (!this.reversed){
        let x2 = this.x + (this.sideLength*Math.cos((Math.PI/2) + this.rotation));
        let y2 = this.y + (this.sideLength * Math.sin((Math.PI/2) + this.rotation));
        this.name = new Path2D();
        this.name.moveTo(this.x, this.y);
        this.name.lineTo(this.x + (this.sideLength*Math.cos(Math.PI + this.rotation)), this.y + (this.sideLength * Math.sin(Math.PI + this.rotation)));
        this.name.lineTo(x2, y2);
        this.name.lineTo(x2 + (this.sideLength*Math.cos((Math.PI*2) + this.rotation)), y2 + (this.sideLength * Math.sin((Math.PI*2) + this.rotation)));
        this.name.lineTo(this.x, this.y);
        ctx.fillStyle = this.color;
        ctx.fill(this.name);
        ctx.lineWidth = 4;
        ctx.strokeStyle = "white";
        ctx.stroke(this.name);}
    
    else{
      let x1 = this.x + (this.sideLength*Math.cos(Math.PI*2 + this.rotation));
      let y1 = this.y + (this.sideLength * Math.sin(Math.PI*2 + this.rotation));
      let x2 = this.x + (this.sideLength*Math.cos((Math.PI/2 + this.rotation)));
      let y2 =this.y + (this.sideLength * Math.sin((Math.PI/2 + this.rotation) ));
      this.name = new Path2D();
      this.name.moveTo(this.x, this.y);
      this.name.lineTo(x1,y1);
      this.name.lineTo(x2, y2);
      this.name.lineTo(x2 + (this.sideLength*Math.cos((Math.PI) + this.rotation)), y2 + (this.sideLength * Math.sin((Math.PI) + this.rotation)));
      this.name.lineTo(this.x, this.y);
      ctx.fillStyle = this.color;
      ctx.fill(this.name);
      ctx.lineWidth = 4;
      ctx.strokeStyle = "white";
      ctx.stroke(this.name);}
  
    }
}


let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
let nRC = 10;
let sR = canvas.height/nRC;
let sC = canvas.width/nRC;
let firstRectangle = new rectangle("rgba(46,142,222,1)",800,600,200, Math.PI/2, 'rectangle');
let smallTriangle1 = new triangle("rgba(241,91,96,1)",800,400,280,7*Math.PI/4,'triangle');
let smallTriangle2 = new triangle("rgba(57,181,160,1)",600,600,280,Math.PI/4, 'triangle');
let bigTriangle1 = new triangle("rgba(164, 146, 234,1)",600,600,560,5*Math.PI/4,'triangle')
let bigTriangle2 = new triangle("rgba(193, 212, 94,1)",600,600,560,3*Math.PI/4,'triangle')
let midTriangle = new triangle("rgba(150,1,16,1)",1000,1000, 400,Math.PI, 'triangle')
let parallelogram1 = new parallelogram("rgba(241,100,260,1)",400,800,280,7*Math.PI/4,'parallelogram',false)
let figuresTotal = [];
figuresTotal.push(smallTriangle1);
figuresTotal.push(firstRectangle);
figuresTotal.push(smallTriangle2);
figuresTotal.push(bigTriangle1);
figuresTotal.push(bigTriangle2);
figuresTotal.push(midTriangle);
figuresTotal.push(parallelogram1);

function grid() {
  ctx.lineWidth = 1;
  for (let y = 0; y < nRC; y++) {
    for (let x = 0; x < nRC; x++) {
     ctx.strokeStyle = "black";
      ctx.strokeRect(x* sC, y * sR, sC, sR)
    }
  }
}

function draw(){
  ctx.rect(0,0,canvas.width, canvas.height)
  ctx.fillStyle= '#1a1a23';
  ctx.fill();
  //grid();
    for (let i = 0; i< figuresTotal.length; i++){
        figuresTotal[i].draw();
    }


}

let down;
let x,y;
let rect = canvas.getBoundingClientRect();
let isPointInPath;

canvas.addEventListener("mousemove", event => {
    x = Math.floor(((event.clientX - rect.left) / (rect.right - rect.left) * canvas.width));
    y = Math.floor(((event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height));
    for (let i = 0; i < figuresTotal.length; i++){
        isPointInPath = ctx.isPointInPath(figuresTotal[i].name,x,y)
        if (isPointInPath && down){
            figuresTotal[i].x += event.movementX;
            figuresTotal[i].y += event.movementY;
        }
    }
})
canvas.addEventListener("mousedown", event =>{
  console.log(x,y);
    down = true;
    if (event.shiftKey){
        for (let i = 0; i, figuresTotal.length; i++){
            isPointInPath = ctx.isPointInPath(figuresTotal[i].name,x,y)
            if (isPointInPath){
                figuresTotal[i].rotation += Math.PI/4;
            }
        }
    }
    else if (event.ctrlKey){
      for (let i = 0; i, figuresTotal.length; i++){
        isPointInPath = ctx.isPointInPath(figuresTotal[i].name,x,y)
        if (isPointInPath){
            figuresTotal[i].reversed = !figuresTotal[i].reversed;

    }
}}})
canvas.addEventListener("mouseup", event =>{
    down = false;
})
window.addEventListener("resize", event =>{
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
})



setInterval(draw,100)
//Colisionar figuras
//Verificar distintas formas de solucionar
//Margenes posible forma
//Crear json para enviar los objetos ahi




