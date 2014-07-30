var context;
var canvas;
var sceneId;
var stats = new Stats();
var blobs = [];
var BLOB_COUNT = 10;
var radius = 10;

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
    // setup Blob objects
    for (var i = 0; i < BLOB_COUNT; i++) {
        var blob = new Blob(-radius * 2, 100 + (i * 100));
        blobs.push(blob);
    }
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
        var Blob = blobs[i];
        drawCircle(Blob.x, Blob.y, radius);
    }
    context.restore();
}

function drawCircle(centerX, centerY, radius) {
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = '#333333';
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

// animate a load of blobs across the screen
function createBlob() {
    var i = 0;
    var time = 1;
    var tweak = -0.1;
    var blob;
    var space = 40;
    // reset positions
    for (i = 0; i < blobs.length; i++) {
        blob = blobs[i];
        blob.x = -radius * 2;
        blob.y = space + (i * space);
    }
    // tween blobs based on scene id
    if (sceneId == 1) {
        for (i = 0; i < blobs.length; i++) {
            blob = blobs[i];
            TweenMax.to(blob, time, {
                x: canvas.width + (radius * 2),
                ease: Linear.easeNone,
                delay: i
            });
        }
    } else if (sceneId == 2) {
        for (i = 0; i < blobs.length; i++) {
            blob = blobs[i];
            TweenMax.to(blob, time, {
                x: canvas.width + (radius * 2),
                ease: Linear.easeNone,
                delay: time + i + tweak
            });
        }
    } else if (sceneId == 3) {
        tweak = -0.2;
        for (i = 0; i < blobs.length; i++) {
            blob = blobs[i];
            var starty = i * space;
            TweenMax.to(blob, time, {
                bezier: [{
                    x: canvas.width * 0.5,
                    y: starty
                }, {
                    x: canvas.width + (radius * 2) ,
                    y: (i / blobs.length) * canvas.height
                }],
                ease: Linear.easeNone,
                delay: (time * 2) + i + tweak
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