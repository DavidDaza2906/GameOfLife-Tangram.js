let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext('2d');
let nRC = 10;
let sR = canvas.height/nRC;
let sC = canvas.width/nRC;

let figures = {
  constructor(sides,color,x,y,sideLength,rotation){
    this.sides = sides;
    this.color = color;
    this.x = x;
    this.y = y;
    this.sideLength = sideLength;
    this.rotation = rotation;
  },
  draw(){
    const a = ((Math.PI * 2)/ this.sides)
    ctx.beginPath();
    for (let i = 1; i < this.sides + 1; i++) {
      ctx.lineTo(this.x + this.sideLength * Math.cos(a*i+this.rotation), this.y + this.sideLength * Math.sin(a*i+this.rotation));
  }
  ctx.fillStyle = this.color
  ctx.fill();
  ctx.closePath();
  }
};

let triangle = Object.create(figures);
triangle.sides = 3;
triangle.color = "rgba(250,0,0,1)";
triangle.x = 150;
triangle.y = 110;
triangle.sideLength = 100;
triangle.rotation = Math.PI/6;

let rectangle = Object.create(figures);
rectangle.sides = 4;
rectangle.color = "rgba(0,150,0,1)";
rectangle.x = 150;
rectangle.y = 300;
rectangle.sideLength = 100;
rectangle.rotation = Math.PI/4;


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
  ctx.fillStyle= 'white';
  ctx.fill();
  grid();
  triangle.draw();
  rectangle.draw();
}




canvas.addEventListener("click", evt => {
  rectangle.rotation += Math.PI/6
  triangle.rotation += Math.PI/6
  let rect = canvas.getBoundingClientRect();
  let x= Math.floor(((evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width)/sC);
  let realX= Math.floor(((evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width));
  let realY= Math.floor(((evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height));
  let y= Math.floor(((evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height)/sR);
  //grid[mouseX][mouseY] = 1;
  console.log(realX,realY)
})
setInterval(draw,100)
//Colisionar figuras
//Verificar distintas formas de solucionar
//Margenes posibule forma
// Paralelogramo relfejo
