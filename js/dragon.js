(function() {
  document.addEventListener('DOMContentLoaded', function(){
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    var controls = document.getElementById('controls')
    var dragon1Color = 'HotPink';
    var dragon2Color = 'Purple';
    var dragon3Color = 'Teal';
    var dragon4Color = 'Magenta';
    var timeout = 50;

    var maxDegree = 10;
    var dragonSet = genDragon(maxDegree);
    var startX = 300;
    var startY = 300;
    var r = 1;
    var th = 0;
    var step = 1;
    var lastDraw = null;

    var followPath = function(rotation) {
      var x = startX;
      var y = startY;
      var thRadians = (th * Math.PI) / 180;
      var rotRadians = (rotation * Math.PI) / 180;
      var currentTh = thRadians + rotRadians;

      dragonSet.forEach(function(el) {
        currentTh += thRadians * el;
        x += r * Math.cos(currentTh);
        y += r * Math.sin(currentTh);
        ctx.lineTo(x, y);
      });
    };

    var draw = function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.strokeStyle = dragon1Color;
      ctx.moveTo(startX, startY);
      followPath(0);
      ctx.stroke();
      ctx.beginPath();
      ctx.strokeStyle = dragon2Color;
      ctx.moveTo(startX, startY);
      followPath(90);
      ctx.stroke();
      ctx.beginPath();
      ctx.strokeStyle = dragon3Color;
      ctx.moveTo(startX, startY);
      followPath(180);
      ctx.stroke();
      ctx.beginPath();
      ctx.strokeStyle = dragon4Color;
      ctx.moveTo(startX, startY);
      followPath(270);
      ctx.stroke();

      th += step;
      if (th == 90 || th == -90) step *= -1;

    };

    var drawWrapper = function(timestamp) {
      timeout = parseInt(controls.elements["timeout"].value);

      if (!lastDraw) {
        lastDraw = Math.floor(timestamp);
        draw();
      }
      var now = Math.floor(timestamp);
      if ((now - lastDraw) > timeout) {
        draw();
        lastDraw = now;
      }
      requestAnimationFrame(drawWrapper);
    };

    requestAnimationFrame(drawWrapper);

  });

  function genDragon(degree) {
    var dragonSet = [];
    for (var i = 1, len = Math.pow(2, degree); i < len; i++) {
      var bin = '0' + i.toString(2);
      dragonSet.push(Math.pow(-1, parseInt(bin[bin.lastIndexOf('1') - 1])));
    }
    return dragonSet;
  }

})();
