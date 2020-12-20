const INITIAL_COLOR = '#2c2c2c'
const INITIAL_BG_COLOR = 'white';
const INITIAL_LINE_WIDTH = 2.5;
const BTN_CLICKED_CN = 'controls__color__clicked';

const canvasParent = document.querySelector('#canvas');
const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.querySelectorAll('.jsColor')
const myColorContorls = document.querySelector('#jsMyColorControl');
const myColor = document.querySelector('#jsMyColor')
const range = document.querySelector('#jsRange');
const mode = document.querySelector('#jsMode');
const saveBtn = document.querySelector('#jsSave');
const resetBtn = document.querySelector('#jsReset');
const resizeBtn = document.querySelector('#jsResize');
const widthControls = document.querySelector('#jsWidth');
const heightControls = document.querySelector('#jsHeight');

let canvasWidth = 600;
let canvasHeight = 500;
let isPainting = false;
let isFilling = false;

const initSetting = () => {
  
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  
  ctx.fillStyle = INITIAL_BG_COLOR;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  ctx.strokeStyle = INITIAL_COLOR;
  ctx.fillStyle = INITIAL_COLOR;
  ctx.lineWidth = INITIAL_LINE_WIDTH;
  
  range.value = INITIAL_LINE_WIDTH;
  
  isFilling = false;
  mode.innerText = 'fill';
  
  colors.forEach(color=>{
    color.classList.remove(BTN_CLICKED_CN);
  })
  
  colors[0].classList.add(BTN_CLICKED_CN);
}

const initEvent = () => {
  
  if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleContextMenu)
  }
 
  colors.forEach(color => {
    color.addEventListener('click', handleColorClick);
  })
  
  if (range) {
    range.addEventListener("input", handleRangeChange);
  }
  
  if (mode) {
    mode.addEventListener("click", hanldeModeClick);
  }
  
  if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", handleResetClick);
  }
 
  if (myColorContorls) {
    myColorContorls.addEventListener("change", handleMyColorChange);
  }
 
  if (resizeBtn) {
    resizeBtn.addEventListener("click", handleResizeClick);
  }
}

const startPainting = () => {
  isPainting = true;
}

const stopPainting = () => {
  isPainting = false;
}

const onMouseMove = (e) => {
  if (isFilling)
    return;
  const x = e.offsetX;
  const y = e.offsetY;
  if (!isPainting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

const handleColorClick = (e) => {

  const color = e.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;

  colors.forEach(color=>{
    color.classList.remove(BTN_CLICKED_CN);
  })

  e.target.classList.add(BTN_CLICKED_CN);
}

const handleRangeChange = (e) => {
  const size = e.target.value;
  ctx.lineWidth = size;
}

const hanldeModeClick = () => {
  if (isFilling === true) {

    isFilling = false;
    mode.innerText = 'fill';
  } else {

    isFilling = true;
    mode.innerText = 'paint';
  }
}

const handleCanvasClick = () => {
  if (isFilling === true) {
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  }
}

const handleContextMenu = (e) => {
  e.preventDefault();
}

const handleSaveClick = () => {
  const image = canvas.toDataURL();
  const link = document.createElement('a');
  link.href = image;
  link.download = 'PaintJS[Export]';
  link.click();
}

const handleResetClick = () => {
  initSetting();
}

const handleMyColorChange = (e) => {
  const color = e.target.value;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  myColor.style.backgroundColor = color;
}

const handleResizeClick = (e) => {
  if (widthControls.value>window.innerWidth){
    alert('Too Large');
  }else{
    canvasWidth = widthControls.value;
    canvasHeight = heightControls.value;
    initSetting();
  }
}

initSetting();
initEvent();
