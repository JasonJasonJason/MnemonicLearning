window.onload=function(){

	draw();
};

//draw() Source = https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Canvas_tutorial/Basic_usage
function draw() {
      var canvas = document.getElementById("app");
      if (canvas.getContext) {
        var ctx = canvas.getContext("2d");

        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillRect (10, 10, 55, 50);

        ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        ctx.fillRect (30, 30, 55, 50);
      }
    }