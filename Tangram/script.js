let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext('2d');
let mouseX;
let mouseY;
let nRC = 10;
let sR = canvas.height/nRC;
let sC = canvas.width/nRC;
let array = Array(nRC);
for (let i = 0; i < nRC; i++) {
  array[i] = Array(nRC)
}
let triangle = {
  height: 10,
  sides: 3,
  color: 'red',
};

function paintCanvas() {
  for (let y = 0; y < nRC; y++) {
    for (let x = 0; x < nRC; x++) {
      ctx.strokeStyle = "rgba(0, 0, 0, 1)";
      ctx.strokeRect(x* sC, y * sR, sC, sR)
      ctx.fillStyle = "rgba(255, 255, 255, 1)";
      ctx.fillRect(x * sC, y * sR, sC, sR)
    }
  }
}

canvas.addEventListener("click", evt => {
  var rect = canvas.getBoundingClientRect();
  let x= Math.floor(((evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width)/sC);
  let y= Math.floor(((evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height)/sR);
  //grid[mouseX][mouseY] = 1;
  console.log(x,y)
})
setInterval(paintCanvas,100)
//Colisionar figuras
//Verificar distintas formas de solucionar
//Margenes posibule forma
// Paralelogramo relfejo
