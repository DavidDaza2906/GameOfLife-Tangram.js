class polygon{
  constructor(color,x,y,sideLength,rotation,name,reversed){
    this.color = color;
    this.x = x;
    this.y = y;
    this.sideLength = sideLength;
    this.rotation = rotation;
    this.name = name;
    this.reversed = reversed;
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
    this.name.moveTo(this.x, this.y);
    this.x1 = this.x + (this.sideLength*Math.cos((Math.PI/2)+ this.rotation));
    this.y1 = this.y + (this.sideLength * Math.sin((Math.PI/2) + this.rotation));
    this.name.lineTo(this.x1,this.y1);
    this.x2 = this.x + (this.sideLength * Math.cos((Math.PI*2) + this.rotation));
    this.y2 = this.y + (this.sideLength * Math.sin((Math.PI*2) + this.rotation));
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
    this.x1 = this.x + (this.sideLength*Math.cos(Math.PI*rev + this.rotation*rev));
    this.y1 = this.y + (this.sideLength * Math.sin(Math.PI*rev + this.rotation*rev));
    this.name.lineTo(this.x1,this.y1);
    this.name.lineTo(this.x2, this.y2);
    this.x3 = this.x2 + (this.sideLength*Math.cos((Math.PI*2)*rev+ this.rotation*rev));
    this.y3 = this.y2 + (this.sideLength * Math.sin((Math.PI*2)*rev + this.rotation*rev));
    this.name.lineTo(this.x3, this.y3);
    this.name.lineTo(this.x, this.y);
    ctx.fillStyle = this.color;
    ctx.fill(this.name);
    ctx.lineWidth = 4;
    ctx.strokeStyle = "white";
    ctx.stroke(this.name);}
}

let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext('2d', {alpha: false});
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
let firstRectangle = new rectangle("rgba(46,142,222,1)",474,115,160, Math.PI/2, 'rectangle');
let smallTriangle1 = new triangle("rgba(241,91,96,1)",590,624,225,7*Math.PI/4,'triangle');
let smallTriangle2 = new triangle("rgba(57,181,160,1)",590,623,225,Math.PI/4, 'triangle');
let bigTriangle1 = new triangle("rgba(164, 146, 234,1)",680,146,450,5*Math.PI/4,'triangle')
let bigTriangle2 = new triangle("rgba(193, 212, 94,1)",460,460,450,3*Math.PI/4,'triangle')
let midTriangle = new triangle("rgba(150,1,16,1)",140,450, 320,Math.PI, 'triangle')
let parallelogram1 = new parallelogram("rgba(241,100,260,1)",366,455,225,7*Math.PI/4,'parallelogram',0)
let figuresTotal = [];
figuresTotal.push(smallTriangle1,smallTriangle2, firstRectangle, bigTriangle1, bigTriangle2, midTriangle, parallelogram1);
let currentScreen = requestAnimationFrame(welcomeScreen);
let currentBackground;
ctx.rect(0,0,canvas.width,canvas.height);
ctx.fillStyle= 'rgba(26,26,35,1)';
ctx.fill();
const background = ctx.getImageData(0,0,canvas.width,canvas.height);
currentBackground = background;
let currentLevel = 0;
let levels = [0,0];
function welcomeScreen(){
  ctx.rect(0,0,canvas.width,canvas.height);
  ctx.fillStyle= 'rgba(26,26,35,1)';
  ctx.fill();
  ctx.font = '90px serif';
  ctx.strokeStyle = "white";
  ctx.strokeText("Tangram",canvas.width/4,canvas.height/4);
  ctx.fillStyle = "white";
  ctx.font = "50px serif";
  ctx.fillText("Presiona Space para jugar",canvas.width/4,canvas.height/2.5);
  ctx.fillText("Presiona Z para entrar en modo libre", canvas.width/4, canvas.height/2);
  ctx.fillText("Presiona S para guardar, R para restaurar y C para limpiar", canvas.width/4,canvas.height/1.7);
}
function creador(){
  ctx.rect(0,0,canvas.width,canvas.height);
  ctx.fillStyle= 'rgba(26,26,35,1)';
  ctx.fill();
  ctx.putImageData(currentBackground,0,0);
  for (let i = 0; i<figuresTotal.length; i++){
    figuresTotal[i].draw();
    }
  verification();
}
function random(){
  for (let i = 0; i<figuresTotal.length;i++){
    figuresTotal[i].x = Math.random() * canvas.width;
    figuresTotal[i].y = Math.random() * canvas.height;
  }
}
function game(){
  ctx.rect(0,0,canvas.width, canvas.height);
  ctx.fillStyle= 'rgba(26,26,35,1)';
  ctx.fill();
  ctx.putImageData(currentBackground,0,0);
  if (currentLevel == 0){
  squareBorder = new Path2D();
  squareBorder.moveTo(360,0);
  squareBorder.lineTo(360,645);
  squareBorder.lineTo(1000,645);
  squareBorder.lineTo(1000,0);
  squareBorder.lineTo(360,0);
  ctx.strokeStyle = "white";
  ctx.stroke(squareBorder);
  ctx.fillStyle = 'black'
  ctx.fill(squareBorder)}
  else if (currentLevel == 1){
    house = new Path2D();
    house.moveTo(380,80);
    house.lineTo(610,80);
    house.lineTo(610,310);
    house.lineTo(700,220);
    house.lineTo(1030,540);
    house.lineTo(840,540);
    house.lineTo(840,850);
    house.lineTo(200,850);
    house.lineTo(200,540);
    house.lineTo(160,540);
    house.lineTo(380,316);
    house.lineTo(380,80);
    ctx.strokeStyle = "white";
    ctx.stroke(house);
    ctx.fillStyle = 'black';
    ctx.fill(house);
  }
  else {
    currentBackground = levels[currentLevel]
  }
  for (let i = 0; i<figuresTotal.length; i++){
    figuresTotal[i].draw();
    }
  verification();
   }
function verification(){
  let incorrectPixels = 0;
  if (currentBackground == savedFigure || currentScreen == game){
    let tempFigure = ctx.getImageData(0,0,canvas.width,canvas.height)
    for (let i = 0; i<tempFigure.data.length; i+=4){
      if (tempFigure.data[i] == 0 &&
          tempFigure.data[i+1] == 0 &&
          tempFigure.data[i+2] == 0){
        incorrectPixels ++;
       }
      };
      if (incorrectPixels < 500){
        if (confirm("Figura valida!, deseas continuar al proximo nivel?")){
          currentLevel ++;
        }
        else{
          currentScreen = welcomeScreen;
        }
        
      }
    }
  }
let down;
let x,y;
let isPointInPath;
canvas.addEventListener("mousemove", event => {
  let rect = canvas.getBoundingClientRect();
  cancelAnimationFrame(currentScreen);
    x = Math.floor(((event.clientX - rect.left) / (rect.right - rect.left) * canvas.width));
    y = Math.floor(((event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height));
    for (let i = 0; i < figuresTotal.length; i++){
        isPointInPath = ctx.isPointInPath(figuresTotal[i].name,x,y)
        if (isPointInPath && down){
          requestAnimationFrame(currentScreen);
          figuresTotal[i].x += event.movementX;
          figuresTotal[i].y += event.movementY;
          cancelAnimationFrame(currentScreen);
}}})
canvas.addEventListener("mousedown", event =>{
  cancelAnimationFrame(currentScreen);
  console.log(x,y);
  down = true;
    if (event.shiftKey){
        for (let i = 0; i, figuresTotal.length; i++){
            isPointInPath = ctx.isPointInPath(figuresTotal[i].name,x,y);
            if (isPointInPath){
              requestAnimationFrame(currentScreen);
                figuresTotal[i].rotation += Math.PI/4;
}}}
    else if (event.ctrlKey){
      for (let i = 0; i, figuresTotal.length; i++){
        isPointInPath = ctx.isPointInPath(figuresTotal[i].name,x,y)
        if (isPointInPath){
          requestAnimationFrame(currentScreen);
            figuresTotal[i].reversed = !figuresTotal[i].reversed;
}}}})
canvas.addEventListener("mouseup", event =>{
    down = false;
    cancelAnimationFrame(currentScreen)
})
let savedFigure;
document.addEventListener('keydown', event => {
  cancelAnimationFrame(currentScreen)
  switch(event.key){
    case ' ':
      random();
      currentScreen = game;
      requestAnimationFrame(currentScreen);
      currentLevel = 0;
      break;
    case 'z':
      random();
      currentScreen = creador;
      requestAnimationFrame(currentScreen);
      break;
    case 'p':
      currentScreen = welcomeScreen;
      requestAnimationFrame(currentScreen);
      break;
    case 'a':
      random();
      break;
    case 's':
      savedFigure = ctx.getImageData(0,0,canvas.width,canvas.height);
      for (let i = 0; i<savedFigure.data.length; i+=4){
       if (savedFigure.data[i] != 26 &&
          savedFigure.data[i+1] != 26 &&
          savedFigure.data[i+2] != 35 &&
          savedFigure.data[i+3] == 255){
            savedFigure.data[i] = 0
            savedFigure.data[i+1] = 0;
            savedFigure.data[i+2] = 0;
            savedFigure.data[i+3] = 255;
       };
      }
      levels.push
      break;
    case 'r':
      currentBackground = savedFigure;
      break;
    case 'c':
      currentBackground = background;
      requestAnimationFrame(currentScreen);
      break;
}})
window.addEventListener("resize", event =>{
    cancelAnimationFrame(currentScreen)
    requestAnimationFrame(currentScreen);
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
})
requestAnimationFrame(welcomeScreen);


