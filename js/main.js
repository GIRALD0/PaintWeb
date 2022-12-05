// Variables

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


const resize = () => {
    ctx.canvas.width = window.innerWidth - 150;
    ctx.canvas.height = window.innerHeight - 250;
};

window.addEventListener('resize', resize);
resize();

/** 
 *  The following code is for the input color and its functionality is that it changes the color of the brush when the user selects a color.
 *  @type {*} 
 * */

var colorPicker = document.getElementById("color").onchange = function () {
    color = this.value;
};
var thickness, x, y, estate = 0;

/**
 * The following code is for the clear button and its functionality is that it clears the canvas.
 */

var clear = document.getElementById("clear");
clear.addEventListener("click", function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

/**
 * The following code is for the eraser button and its functionality is that it changes the brush to an eraser.
 */

var eraser = document.getElementById("eraser");
eraser.addEventListener("click", function () {
    color = "white";
});

/**
 * The following code is for the save button and its functionality is that it saves the canvas as an image.
 */

var save = document.getElementById("save");
save.addEventListener("click", function () {

    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imgData.data;

    for (var i = 0; i < data.length; i += 4) {
        if (data[i + 3] < 255) {
            data[i] = 255;
            data[i + 1] = 255;
            data[i + 2] = 255;
            data[i + 3] = 255;
        }
    }

    ctx.putImageData(imgData, 0, 0);

    let enlace = document.createElement('a');
    enlace.download = "Canvas como imagen.jpg";
    enlace.href = canvas.toDataURL("image/jpeg", 1);
    enlace.click();
});

/**
 *  Thw following code is for the pencil, brush, paint and paint-roll buttons and its functionality is that it changes the brush to the selected one.
 */

var pencil = document.getElementById("pencil");
pencil.addEventListener("click", function () {
    thickness = parseInt(this.value);
});

var brush = document.getElementById("brush");
brush.addEventListener("click", function () {
    thickness = parseInt(this.value);
});

var paint = document.getElementById("paint");
paint.addEventListener("click", function () {
    thickness = parseInt(this.value);
});

var paintRoll = document.getElementById("paint-roll");
paintRoll.addEventListener("click", function () {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});

// Mouse events

canvas.addEventListener("mousedown", pressMouse);
canvas.addEventListener("mouseup", leaveMouse);
canvas.addEventListener("mousemove", drawMouse);
canvas.addEventListener("dblclick", function reset(e) {
    ctx.clearRect(0, 0, e.width, e.height);
});


// Functions

/**
 * The function draw() takes 5 parameters, and draws a line on the canvas.
 * @param color - the color of the line
 * @param xInitial - The x coordinate of the start of the line
 * @param yInitial - y-coordinate of the starting point
 * @param xFinal - The x-coordinate of the end point of the line.
 * @param yFinal - The y-coordinate of the end point of the line.
 * @param thickness - thickness of the line
 */

function draw(color, xInitial, yInitial, xFinal, yFinal, thickness) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
    ctx.moveTo(xInitial, yInitial);
    ctx.lineTo(xFinal, yFinal);
    ctx.stroke();
    ctx.closePath();
}

/**
 * The function thickness() changes the thickness of the line.
 */

function thickness() {
    thickness = parseInt(thickness.value);
}

/**
 * The function drawMouse() draws the mouse on the canvas.
 * @param {*} e event
 */

function drawMouse(e) {
    if (estate == 1) {
        draw(color, x, y, e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop, thickness);
    }
    x = (e.pageX - canvas.offsetLeft);
    y = (e.pageY - canvas.offsetTop);
}

/**
 *  The function pressMouse() and leaveMouse() changes the position save in memory
 *  to the mouse's position when user press the mouse.
 * @param {*} e
 */

function pressMouse(e) {
    estate = 1;
    x = (e.pageX - canvas.offsetLeft);
    y = (e.pageY - canvas.offsetTop);
}

function leaveMouse(e) {
    estate = 0;
    x = (e.pageX - canvas.offsetLeft);
    y = (e.pageY - canvas.offsetTop);
}
