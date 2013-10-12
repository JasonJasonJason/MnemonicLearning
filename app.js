var menu_width = 200;
var color_value = 0;
var video_step = 0;

window.onload=function(){

	draw();
};


function draw() {

    var canvas = document.getElementById("appLayer");
    var overlay = document.getElementById("overlayLayer");
    overlay.addEventListener('click', function(e)
    {
    	onCanvasClicked(e);
    });
    if (canvas.getContext) {

      	var img = new Image();
      	img.src = 'img/sample.jpg';
		img.onload = function(){

			var appCtx = canvas.getContext("2d");

			canvas.width = img.width + menu_width;
	    	canvas.height = img.height;
	    	overlay.width = canvas.width;
	    	overlay.height = canvas.height;

	        appCtx.fillStyle = "rgb(55,55,55)";
	        appCtx.fillRect (0, 0, canvas.width, canvas.height);

			appCtx.drawImage(img,menu_width,0);

			drawMenu(appCtx);
		};
    }
}


function drawMenu(context) {

    context.fillStyle = "rgb(55,55,200)";
	context.fillRect (0, 0, 100,100);
}

function highlightNextArea(){

	var overlay = document.getElementById("overlayLayer");
    if (overlay.getContext) {

    	area_x = 100;
    	area_y = 100;
    	area_width = 100;
    	area_height = 100;
    	area_bottom_y = area_y + area_height;
    	area_right_x = area_x + area_width;

    	var context = overlay.getContext("2d");

    	context.fillStyle = "rgba(0, 0, 0, 0.5)";
    	
    	context.fillRect(menu_width, 0, overlay.width - menu_width, overlay.height);

    	context.globalCompositeOperation = "destination-out";
		context.strokeStyle = "rgb(255,255,255)";
		context.fillRect(menu_width + area_x, area_y, area_width, area_height);
    }

}



//Event Listeners



function onCanvasClicked(e){

	video_step += 1;
	highlightNextArea();
}











