// scene
var context;
var canvas;
var sceneId;
var stats = new Stats();
// blobs
var blobs = [];
var BLOB_COUNT = 10;
var radius = 10;
var colours = ['#72BC8D', '#F75A53', '#497D9D'];
// animation
// TODO: tweak should be dynamically calculated based on the radius and speed!
var time = 1;
var tweak = -0.1;
var space = 40;
var delay = 0.2;

function initScene(sceneId_, canvasId) {
    sceneId = sceneId_;
    canvasId = canvasId || "canvas";
    canvas = document.getElementById(canvasId);
    context = canvas.getContext("2d");
    setupCanvas();
    // stats?
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
    // start the update loop
    update();
}

function update() {
    requestAnimFrame(update);
    stats.begin();
    draw();
    stats.end();
}

function draw() {
    canvas.width = canvas.width;
    context.save();
    for (var i = 0; i < blobs.length; i++) {
        var blob = blobs[i];
        drawCircle(blob.x, blob.y, radius);
    }
    context.restore();
}

function drawCircle(centerX, centerY, radius) {
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = colours[0];
    context.fill();
}



// window resize listener
window.onresize = function() {
    setupCanvas();
};

// setup canvas, retinize if required
function setupCanvas() {
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;
    // retinize canvas
    var ratio = 1;
    if (context.webkitBackingStorePixelRatio < 2)
        ratio = window.devicePixelRatio || 1;
    var w = context.canvas.width;
    var h = context.canvas.height;
    canvas.height = h * ratio;
    canvas.width = w * ratio;
    canvas.style.height = h + 'px';
    canvas.style.width = w + 'px';
    context.scale(ratio, ratio);
    canvas.width = canvas.width;
}

// Simple Blob struct
function Blob(x, y, colour) {
    this.x = x;
    this.y = y;
    this.colour = colour || "#ff0000";
    this.progress = 0;
}

// animate a load of blobs across the screen!
function createBlob() {
    // setup Blob objects and create tweens for them
    for (var i = 0; i < BLOB_COUNT; i++) {
        var starty = (space * 2) + (i * space);
        var blob = new Blob(-radius * 2, starty);
        blobs.push(blob);
        // tween blobs based on scene id
        if (sceneId == 1) {
            TweenMax.to(blob, time, {
                x: canvas.width + (radius * 2),
                ease: Linear.easeNone,
                delay: i * delay
            });
        }
        else if (sceneId == 2) {
            // Scene 2 requires a delay that includes the time to animate across scene 1
            TweenMax.to(blob, time, {
                x: canvas.width + (radius * 2),
                ease: Linear.easeNone,
                delay: time + (i * delay) + tweak
            });
        }
        else if (sceneId == 3) {
            // Scene 3 requires a delay that includes the time to animate across scenes 1 and 2
            // It animates using a bezier curve too!
            TweenMax.to(blob, time, {
                bezier: [{
                    x: canvas.width * 0.5,
                    y: starty
                }, {
                    x: canvas.width + (radius * 2) ,
                    y: (i / BLOB_COUNT) * canvas.height
                }],
                ease: Linear.easeNone,
                delay: (time * 2) + (i * delay) + (tweak * 2)
            });
        }
    }
}

// requestAnim shim layer by Paul Irish
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function( /* function */ callback, /* DOMElement */ element) {
            window.setTimeout(callback, 1000 / 60);
    };
})();