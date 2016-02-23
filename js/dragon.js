(function() {
  document.addEventListener('DOMContentLoaded', function(){
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    var controls = document.getElementById('controls')
    var dragon1Color,
      dragon1Degree,
      dragon2Color,
      dragon2Degree,
      dragon3Color,
      dragon3Degree,
      dragon4Color,
      dragon4Degree,
      timeout;

    var maxDegree = 16;
    var dragonSet = genDragon(maxDegree);
    var startX = 300;
    var startY = 300;
    var r = 1;
    var th = 0;
    var step = 1;
    var lastDraw = null;

    var followPath = function(rotation, degree) {
      var x = startX;
      var y = startY;
      var thRadians = (th * Math.PI) / 180;
      var rotRadians = (rotation * Math.PI) / 180;
      var currentTh = thRadians + rotRadians;

      for (var i = 0, len = Math.pow(2, degree); i < len; i++) {
        currentTh += thRadians * dragonSet[i];
        x += r * Math.cos(currentTh);
        y += r * Math.sin(currentTh);
        ctx.lineTo(x, y);
      }
    };

    var draw = function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.strokeStyle = dragon1Color;
      ctx.moveTo(startX, startY);
      followPath(0, dragon1Degree);
      ctx.stroke();
      ctx.beginPath();
      ctx.strokeStyle = dragon2Color;
      ctx.moveTo(startX, startY);
      followPath(90, dragon2Degree);
      ctx.stroke();
      ctx.beginPath();
      ctx.strokeStyle = dragon3Color;
      ctx.moveTo(startX, startY);
      followPath(180, dragon3Degree);
      ctx.stroke();
      ctx.beginPath();
      ctx.strokeStyle = dragon4Color;
      ctx.moveTo(startX, startY);
      followPath(270, dragon4Degree);
      ctx.stroke();

      th += step;
      if (th == 90 || th == -90) step *= -1;

    };

    var drawWrapper = function(timestamp) {
      timeout = parseInt(controls.elements["timeout"].value);
      dragon1Color = controls.elements["dragon1color"].value;
      dragon1Degree = controls.elements["dragon1degree"].value;
      dragon2Color = controls.elements["dragon2color"].value;
      dragon2Degree = controls.elements["dragon2degree"].value;
      dragon3Color = controls.elements["dragon3color"].value;
      dragon3Degree = controls.elements["dragon3degree"].value;
      dragon4Color = controls.elements["dragon4color"].value;
      dragon4Degree = controls.elements["dragon4degree"].value;

      if (!lastDraw) {
        lastDraw = timestamp;
        draw();
      }
      var now = timestamp;
      if (now - lastDraw > timeout) {
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
