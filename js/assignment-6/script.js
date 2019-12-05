var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var phase = 0;
var speed = 0.03;
var radius = 5;
var frameCount = 0;
var y;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var x = 0
    var colOffset = 0;
    frameCount++;
    phase = frameCount * speed;

    for (var j = 0; j<2; j++) {
        if (j === 0) {
            var rowPhase = phase;
        } else {
            var rowPhase = phase + j * Math.PI;
        }
        x = 0;
        for (var i = 0; i < 10; i++) {
            x = x + 30;
            colOffset = (i * 2 * Math.PI) / 10;
            y = canvas.height / 2 + 10 + Math.sin(rowPhase + colOffset) * 50;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2, false);
            ctx.fillStyle = 'red';
            ctx.fill();
            ctx.closePath();

        }
    }
}


setInterval(draw, 20);
