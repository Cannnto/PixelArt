var keys = [];
var mouse = {x: 0, y: 0};

document.addEventListener("mousemove", onMouseMove);
document.addEventListener("mousedown",mouseDown);
document.addEventListener("mouseup",mouseUp);

function onMouseMove(event)
{	event.preventDefault();
    mouse.x = event.clientX;
    mouse.y = event.clientY;
}
function mouseDown()
{   keys[1] = true;
}
function mouseUp()
{   keys[1] = false;
}
