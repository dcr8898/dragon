(function() {
  document.addEventListener('DOMContentLoaded', function(){
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    var degree = 13;
    var dragon1Color = 'white';
    var dragon2Color = 'blue';
    var dragon3Color = 'brown';
    var dragon4Color = 'red';
    var timeout = 0;

    var dragonSet = genDragon(degree);

    var startX = 300;
    var startY = 300;
    var r = 1;
    var th = 0;
    var step = 1;

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

    var draw = function () {
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

    draw();
    setInterval(draw, timeout);

  });

  function genDragon(degree) {
    var set = [];
    for (var i = 1, len = Math.pow(2, degree); i < len; i++) {
      bin = '0' + i.toString(2);
      set.push(Math.pow(-1, parseInt(bin[bin.lastIndexOf('1') - 1])));
    }
    return set;
  }

})();
