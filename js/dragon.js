(function() {
  document.addEventListener('DOMContentLoaded', function(){
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    ctx.strokeStyle = 'blue';

    var degree = 12;
    var dragonSet = genDragon(degree);

    var startX = 300;
    var startY = 300;
    var r = 3;
    var th = -90;
    var step = 1;
    var timeout = 50;

    var followPath = function(direction) {
      var x = startX;
      var y = startY;
      var rOffset = r * direction;
      var thRadians = (th * Math.PI) / 180;
      var currentTh = thRadians;

      dragonSet.forEach(function(el) {
        currentTh += thRadians * el;
        x += rOffset * Math.cos(currentTh);
        y += rOffset * Math.sin(currentTh);
        ctx.lineTo(x, y);
      });
    };

    var draw = function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      followPath(1);
      ctx.moveTo(startX, startY);
      followPath(-1);
      ctx.stroke();

      th += step;
      if (th == 90 || th == -90) step *= -1;
    };

    draw();
    setInterval(draw, 0);

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
