let nRC= 100; //Numero de columnas y filas
let width = 1300; //Viene del html
let height = 930; 
let sR = width/nRC;// ancho de cada celda
let sC = width/nRC; // altura de cada celda
let grid = initArray()

let canvas,ctx;
let interval;
let slider;
let sliderOutput;
let frames = 100;

function paintCanvas(){
  for (let y = 0; y < nRC; y++){
    for (let x = 0; x < nRC; x++){
      ctx.strokeStyle = '#f8f8f8';
      ctx.strokeRect(x*sR,y*sC,sR,sC)
      ctx.fillStyle = '#6B8E23'
      ctx.fillRect(x*sR,y*sC,sR,sC)
      if (grid[x][y] == 1){
        ctx.fillStyle = '#f8f8f8'
        ctx.fillRect(x*sR,y*sC,sR,sC)
      }}}
}

function cleanCanvas(){
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0,canvas.width,canvas.height) // Rellenar la pantalla con negro para que no se acumulen frames
  for (let y = 0; y < nRC; y++){
    for (let x = 0; x < nRC; x++){
      ctx.strokeStyle = '#f8f8f8';
      ctx.strokeRect(x*sR,y*sC,sR,sC);
      ctx.fillStyle = '#6B8E23';
      ctx.fillRect(x*sR,y*sC,sR,sC);
    }}
}
function clearCanvas(){
  cleanCanvas();
  grid = initArray();
}
function randomCanvas(){
  ctx.fillRect(0,0,canvas.width,canvas.height) // Rellenar la pantalla con negro para que no se acumulen frames
  grid = randomArray(grid);
  paintCanvas();   
}

function startGame(){
console.log('hola')
  let nextGrid = initArray();
  for (let i = 0; i < nRC; i++){
    for (let j= 0; j< nRC; j++){
      let state = grid[i][j];
      let neighbours = livingCells(grid,i,j);
      nextGrid[i][j] = rules(state,neighbours,i,j)
    }
  }
  grid = nextGrid;
  paintCanvas();
  
 
}
function startGameInterval(){
  interval = setInterval(startGame, frames);
}
function stop(){

  clearInterval(interval);
  cancelAnimationFrame(startGame);
 
}
function initArray(){
let array = Array(nRC);
  for (let i=0;i<nRC; i++){
    array[i] = Array(nRC)


  }
  for (let i=0;i<nRC; i++){
    for (let j = 0; j < nRC; j++) {
      array[i][j] = 0;
    }
  }
return array
}
function randomArray(array){
  for (let i=0;i<nRC; i++){
    for (let j = 0; j < nRC; j++) {
      array[i][j] = Math.round(Math.random(2));
    }
  }
  return array
}
function livingCells(array, x, y) {
  let n = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + nRC) % nRC;
      let row = (y + j + nRC) % nRC;
      n += array[col][row];
    }
  }
  n -= array[x][y];
  return n;
}
function rules(state,n,i,j){
    if (state == 0 && n ==3 ){
      return 1;
    }
    else if (state ==1 && (n< 2 || n >3)){
      return  0;
    }
    else {
      return state;
    }}
function figures(n){
  startGameInterval()
    switch(n){
    case 0:{ 
      grid[50][30] = 1; grid[51][30] = 1; grid[50][31] = 1; grid[51][31] = 1;
    break;}
    case 1:{


      grid[50][30] = 1; grid[51][30]=1; grid[50][31] =1; grid[53][32] = 1; grid[52][33] = 1; grid[53][33] = 1;
    break;}
    case 2:{
      grid[50][30] = 1; grid[51][31] = 1; grid[51][32] = 1; grid[50][31]= 1; grid[50][32] =1;
      break;}
  }
  
}
slider = document.getElementById("myRange");
sliderOutput = document.getElementById("frameRate");
 slider.oninput = function() {
frames = this.value;
   clearInterval(interval);
   startGameInterval();
  requestAnimationFrame(startGame);
  
}
canvas = document.getElementById('gameCanvas');
ctx = canvas.getContext('2d');
document.addEventListener('DOMContentLoaded', cleanCanvas)
canvas.addEventListener("click", function(event){
  mouseX = Math.floor((event.clientX)/sR)-20;
  mouseY = Math.floor((event.clientY)/sC);
  grid[mouseX][mouseY] =1 

})
