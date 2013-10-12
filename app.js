var menu_width = 200;

window.onload=function(){

	draw();
};

//draw() Source = https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Canvas_tutorial/Basic_usage
function draw() {
      var canvas = document.getElementById("app");
      if (canvas.getContext) {


      	var img = new Image();

		img.onload = function(){

			var ctx = canvas.getContext("2d");
			canvas.width = img.width + menu_width;
	    	canvas.height = document.body.clientHeight;

	        ctx.fillStyle = "rgb(200,0,0)";
	        ctx.fillRect (10, 10, canvas.width, canvas.height);

	        ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
	        ctx.fillRect (30, 30, 55, 50);
			ctx.drawImage(img,menu_width,0);
		};
		img.src = 'img/sample.jpg';

      }
    }