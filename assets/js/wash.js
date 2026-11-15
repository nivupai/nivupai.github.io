/* Paints soft, impressionist brush dabs onto <canvas id="wash">. Same seed on every page. */
(function(){
  "use strict";
  var cv = document.getElementById('wash');
  if(!cv || !cv.getContext) return;
  function paint(){
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = window.innerWidth, h = window.innerHeight;
    cv.width = w*dpr; cv.height = h*dpr;
    var c = cv.getContext('2d');
    c.setTransform(dpr,0,0,dpr,0,0);
    c.clearRect(0,0,w,h);
    var palette = ['#9fb8ad','#b7cdbb','#e3aea6','#efcf98','#9fb6cc','#d49fb0','#c9b6d6','#f0dcc0'];
    var seed = 7;
    function rnd(){ seed = (seed*16807) % 2147483647; return (seed-1)/2147483646; }
    var n = Math.round(w*h/700);
    for(var i=0;i<n;i++){
      var x = rnd()*w, y = rnd()*h;
      // keep the middle, where the text sits, quieter
      var dx = (x-w/2)/(w/2), dy = (y-h/2)/(h/2);
      var edge = Math.min(1, Math.sqrt(dx*dx+dy*dy));
      var a = (0.05 + rnd()*0.10) * (0.25 + 0.75*edge);
      c.save();
      c.translate(x,y);
      c.rotate(-0.5 + rnd()*0.5 + (rnd()<0.5?0:Math.PI/2)*0.3);
      c.globalAlpha = a;
      c.fillStyle = palette[Math.floor(rnd()*palette.length)];
      c.beginPath();
      c.ellipse(0,0, 8+rnd()*22, 2.5+rnd()*5, 0, 0, Math.PI*2);
      c.fill();
      c.restore();
    }
  }
  paint();
  var t;
  window.addEventListener('resize', function(){ clearTimeout(t); t = setTimeout(paint, 150); });
})();
