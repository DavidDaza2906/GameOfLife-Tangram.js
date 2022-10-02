let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext('2d');
let mouseX;
let mouseY;
let nRC = 7;
let sR = canvas.height/nRC;
let sC = canvas.width/nRC;
let array = Array(nRC);
for (let i = 0; i < nRC; i++) {
  array[i] = Array(nRC)
}
let triangle = {height: 10};

function paintCanvas() {
  for (let y = 0; y < nRC; y++) {
    for (let x = 0; x < nRC; x++) {
      ctx.strokeStyle = 'black';
      ctx.strokeRect(x * sR, y * sC, sR, sC)
      ctx.fillStyle = '#f8f8f8'
      ctx.fillRect(x * sR, y * sC, sR, sC)
    }
  }
}


canvas.addEventListener("click", event => {
  mouseX = Math.floor((event.clientX) / sC)-5;
  mouseY = Math.floor((event.clientY) / sR);
  //grid[mouseX][mouseY] = 1;
  paintCanvas()
  console.log(mouseX,mouseY)
})

//Colisionar figuras
//Verificar distintas formas de solucionar
//Margenes posibule forma
// Paralelogramo relfejo
