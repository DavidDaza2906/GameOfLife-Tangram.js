class polygon{
  constructor(color,x,y,sideLength,rotation,name,reversed){
    this.color = color;
    this.x = x;
    this.y = y;
    this.sideLength = sideLength;
    this.rotation = rotation;
    this.name = name;
    this.reversed = reversed;
    this.vertexX = [];
    this.vertexY = [];
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
      this.vertexX.push(this.x1);
      this.vertexY.push(this.y1);
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
    this.vertexX.push(this.x);
    this.vertexY.push(this.y);
    this.name.moveTo(this.x, this.y);
    this.x1 = this.x + (this.sideLength*Math.cos((Math.PI/2)+ this.rotation));
    this.y1 = this.y + (this.sideLength * Math.sin((Math.PI/2) + this.rotation));
    this.vertexX.push(this.x1);
    this.vertexY.push(this.y1);
    this.name.lineTo(this.x1,this.y1);
    this.x2 = this.x + (this.sideLength * Math.cos((Math.PI*2) + this.rotation));
    this.y2 = this.y + (this.sideLength * Math.sin((Math.PI*2) + this.rotation));
    this.vertexX.push(this.x2);
    this.vertexY.push(this.y2);
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
    this.vertexX.push(this.x);
    this.vertexY.push(this.y);
    this.x1 = this.x + (this.sideLength*Math.cos(Math.PI*rev + this.rotation*rev));
    this.y1 = this.y + (this.sideLength * Math.sin(Math.PI*rev + this.rotation*rev));
    this.vertexX.push(this.x1);
    this.vertexY.push(this.y1);
    this.name.lineTo(this.x1,this.y1);
    this.name.lineTo(this.x2, this.y2);
    this.vertexX.push(this.x2);
    this.vertexY.push(this.y2);
    this.x3 = this.x2 + (this.sideLength*Math.cos((Math.PI*2)*rev+ this.rotation*rev));
    this.y3 = this.y2 + (this.sideLength * Math.sin((Math.PI*2)*rev + this.rotation*rev));
    this.name.lineTo(this.x3, this.y3);
    this.vertexX.push(this.x3);
    this.vertexY.push(this.y3);
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
function welcomeScreen(){
  ctx.rect(0,0,canvas.width,canvas.height);
  ctx.fillStyle= '#1a1a23';
  ctx.fill();
  ctx.font = '90px serif';
  ctx.strokeStyle = "white";
  ctx.strokeText("Tangram",canvas.width/4,canvas.height/4);
  ctx.fillStyle = "white";
  ctx.font = "50px serif";
  ctx.fillText("Presiona Space para jugar",canvas.width/4,canvas.height/2.5);
  ctx.fillText("Presiona S para entrar en modo creador", canvas.width/4, canvas.height/2);
  ctx.fillText("Presiona G para guardar y W para restaurar", canvas.width/4,canvas.height/1.7);

}
function creador(){
  ctx.rect(0,0,canvas.width,canvas.height);
  ctx.fillStyle= '#1a1a23';
  ctx.fill();
  for (let i = 0; i<figuresTotal.length; i++){
    figuresTotal[i].draw();
    }
}
function random(){
  for (let i = 0; i<figuresTotal.length;i++){
    figuresTotal[i].x = Math.random() * canvas.width;
    figuresTotal[i].y = Math.random() * canvas.height;
  }
}
let currentLevelX,currentLevel,currentLevelY;
let totalVertexX,totalVertexY;
function game(){
  ctx.rect(0,0,canvas.width, canvas.height)
  ctx.fillStyle= '#1a1a23';
  ctx.fill();
  squareBorder = new Path2D();
  squareBorder.moveTo(360,0);
  squareBorder.lineTo(360,645);
  squareBorder.lineTo(1000,645);
  squareBorder.lineTo(1000,0);
  squareBorder.lineTo(360,0);
  ctx.strokeStyle = "white";
  ctx.stroke(squareBorder);
  ctx.fill(squareBorder)
  let verification = new Set();
  totalVertexX = [];
  totalVertexY = [];
  for (let i = 0; i< figuresTotal.length; i++){
    figuresTotal[i].vertexX = [];
    figuresTotal[i].vertexY = [];
    figuresTotal[i].draw();
    for (let j = 0; j< figuresTotal[i].vertexX.length; j++){
      totalVertexX.push(figuresTotal[i].vertexX[j]);
      totalVertexY.push(figuresTotal[i].vertexY[j]);}
    }
    let vertex = new Set();
    totalVertexX.sort(function(a,b){return  a-b});
    totalVertexY.sort(function(a,b){return a-b});
    for (let i = 0; i< totalVertexX.length; i++){ 
      if (currentLevelX[i] -10 < totalVertexX[i] && currentLevelX[i] + 10 > totalVertexX[i]){
        vertex.add(true)
        }
      if (currentLevelY[i] -10 < totalVertexY[i] && currentLevelY[i] + 10 > totalVertexY[i]){
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
   if (verification.size == 1 && verification.has(true)){
    alert("Figura valida!");
   }
  }

function colliding(){};

function drawSaved(){

};
let down;
let x,y;
let rect = canvas.getBoundingClientRect();
let isPointInPath;
let savedFiguresX = [];
let savedFiguresY = [];
let tempFigures = [];
canvas.addEventListener("mousemove", event => {
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
document.addEventListener('keydown', event => {
  cancelAnimationFrame(currentScreen)
  switch(event.key){
    case ' ':
      random();
      currentScreen = game;
      currentLevelX = squareX;
      currentLevelY = squareY;
      requestAnimationFrame(currentScreen);
      break;
    case 's':
      random();
      currentScreen = creador;
      requestAnimationFrame(currentScreen);
      break;
    case 'p':
      currentScreen = welcomeScreen;
      requestAnimationFrame(currentScreen);
      break;
    case 'r':
      random();
      break;
    case 'g': //Dejarlo solo para modo creador
      savedFiguresX = [];
      savedFiguresY = [];
      tempFigures = figuresTotal;
      for (let i = 0; i<figuresTotal.length;i++){
        savedFiguresX.push(figuresTotal[i].x);
        savedFiguresY.push(figuresTotal[i].y);
      }
      break;
    case 'w': // dejarlo solo para modo creador
      figuresTotal = tempFigures;
     for (let i = 0; i<figuresTotal.length;i++){
      figuresTotal[i].x = savedFiguresX[i];
      figuresTotal[i].y = savedFiguresY[i];
      }
      requestAnimationFrame(currentScreen)
      break;
    case 'x':
      currentLevelX = squareX;
      currentLevelY = squareY;
      console.log("square")
      break;
    case 'y':
      for (let i = 0; i<totalVertexX.length; i++){
        console.log(totalVertexY[i])
      }
      break;
}})
window.addEventListener("resize", event =>{
    cancelAnimationFrame(currentScreen)
    requestAnimationFrame(currentScreen);
   // ctx.canvas.width = window.innerWidth;
    //ctx.canvas.height = window.innerHeight;
})
requestAnimationFrame(welcomeScreen);
let squareX = [
  360.0221681751368,
  360.02216817513727,
  361.8280641946078,
  363.5233637997383,
  519.4273840894189,
  522.6223895667115,
  678.2202197090833,
  679.4273840894189,
  679.4273840894189,
  679.4273840894189,
  679.7967889127735,
  680.026115728554,
  680.3653247074835,
  681.7214153336847,
  838.8958146797465,
  838.8958146797468,
  839.4273840894189,
  839.4832788769946,
  839.4832788769947,
  998.2241672625003,
  998.5823046439677,
  998.5823046439679,
  1000.3653247074834,
  1000.3653247074835
]
let squareY = [
6.602991669741982,
6.602991669742096,
7.711586572584565,
10.15124583955793,
169.2502716065312,
170.03147239712558,
324.80104320368855,
325.9096381065309,
328.1231365162971,
328.34929737350456,
329.04671421258104,
329.130498164099,
486.2308648952268,
487.44832314047784,
488.12313651629705,
488.1231365162971,
488.2295239310721,
644.1076896404777,
645.3298906621999,
645.3298906622,
648.1231365162971,
648.1231365162971,
649.046714212581,
649.0467142125812
]

let house = [];
hsT2 =  [ 430.9009742330269, 463.9009742330267, 463.9009742330268, 590, 623, 749.0990257669731 ];
hsT1 =[ 464.9009742330266, 590, 624, 749.099025766973, 749.0990257669732, 783.0990257669731 ];
hR =  [ 3.8629150101523635, 3.862915010152406, 230.13708498984758, 230.1370849898476, 230.13708498984772, 360.8629150101524, 360.8629150101524, 360.8629150101525, 587.1370849898476, 587.1370849898476]
hbT1 = [ 127, 363.801948466054, 445.1980515339465, 445.19805153394674, 682, 1000.1980515339462 ]
hbT2 = [ 141.801948466054, 447, 460, 765.1980515339465, 765.1980515339467, 778.1980515339462 ];
hmT = [  138, 138.00000000000009, 448.99999999999983, 449, 458, 769 ];
hP = [  140, 225, 225.0000000000001, 365, 365.00000000000006, 449.99999999999994, 450, 590 ]
hsTs = hsT1.concat(hsT2);
hbTs = hbT1.concat(hbT2);
house.push(hsTs, hR, hbTs, hmT, hP)

//Colisionar figuras

//Verificar distintas formas de solucionar
//Margenes posible forma
//Crear json para enviar los objetos ahi




