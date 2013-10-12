var menu_width = 200;
var color_value = 0;
var current_step = 0;
var overlaySteps = new Array([10,10,100,100],[200,200,50,100],[100,300,100,50]);
var audioFileNames=new Array('audio/1.wav', 'audio/2.wav', 'audio/3.wav');
var audioSteps   = new Array()
var snd;
var overlayed = false;

window.onload=function(){

	init();
};


function init() {

	initAudio();
	
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

function initAudio(){

	for(i=0; i<audioFileNames.length; i+=1){
		audioSteps[i] = new Audio(audioFileNames[i]);
	}
}


function drawMenu(context) {

    //context.fillStyle = "rgb(55,55,200)";
	//context.fillRect (0, 0, 100,100);
}

function highlightNextArea(){


	var overlay = document.getElementById("overlayLayer");
    if (overlay.getContext) {

    	nextArea = overlaySteps[current_step % overlaySteps.length];

    	area_x = nextArea[0];
    	area_y = nextArea[1];
    	area_width  = nextArea[2];
    	area_height = nextArea[3];

    	var context = overlay.getContext("2d");

    	//Draw entire overlay
    	context.fillStyle = "rgba(0, 0, 0, 0.5)";
    	context.fillRect(menu_width, 0, overlay.width - menu_width, overlay.height);

    	//Cut out the focus square
    	previousComposite = context.globalCompositeOperation;
    	context.globalCompositeOperation = "destination-out";
		context.fillStyle = "rgb(255,255,255)";
		context.fillRect(menu_width + area_x, area_y, area_width, area_height);
		context.globalCompositeOperation = previousComposite;
    }

}


function clearOverlay(){

	var overlay = document.getElementById("overlayLayer");
    if (overlay.getContext) {

    	var context = overlay.getContext("2d");

    	//Cut out the focus square
    	previousComposite = context.globalCompositeOperation;
    	context.globalCompositeOperation = "destination-out";
		context.fillStyle = "rgb(255,255,255)";
		context.fillRect(menu_width, 0, overlay.width-menu_width, overlay.height);
		context.globalCompositeOperation = previousComposite;
    }

}



//Event Listeners



function onCanvasClicked(e){

	if(overlayed)
	{
		clearOverlay();
		audioSteps[current_step].pause();
		overlayed = false;
		current_step += 1;
	}
	else
	{
		highlightNextArea();
		audioSteps[current_step].play();
		overlayed = true;
	}
}











