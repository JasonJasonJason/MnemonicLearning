var menu_width = 200;
var color_value = 0;
var current_step = 0;
var overlaySteps  = new Array([10,10,100,100],[200,200,50,100],[100,300,100,50]);
var audioFileNames= new Array('audio/1.wav', 'audio/2.wav', 'audio/3.wav');
var audioSteps    = new Array()
var snd;
var overlayed = false;
var button_height = 40;
var playButtonCoordinates;
var pauseButtonCoordinates;
var overlayIntervalId;
var darken_count;
var lighten_count;

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

			appCtx.drawImage(img,menu_width-1,0);

			drawMenu(overlay, appCtx);
		};
    }
}

function initAudio(){

	for(i=0; i<audioFileNames.length; i+=1){
		audioSteps[i] = new Audio(audioFileNames[i]);
		audioSteps[i].addEventListener('ended', function(e){
			onStepFinished();
		});
	}
}


function setFontStyle(context){
	context.fillStyle = "#FFFFFF";
	context.textBaseline = "middle";
	context.textAlign = "center";
	context.font = "16px sans-serif";
}


function drawMenu(overlay, context) {


	for(i = 0; i<overlaySteps.length; i++)
	{
	    context.fillStyle = "#444444";
		context.fillRect (0, i*button_height, menu_width,button_height-1);
		context.fillStyle = "#AAAAAA";
		context.fillRect (0, i*button_height - 1, menu_width,1);

		setFontStyle(context);
		context.fillText("Step "+i, menu_width/2, i*button_height + button_height/2);
	}

	playButtonCoordinates  = new Array(0, overlay.height - 40, menu_width/2, 40);
	pauseButtonCoordinates = new Array(menu_width/2, overlay.height - 40, menu_width/2, 40);

	context.fillStyle = "#444444";
	context.fillRect (playButtonCoordinates[0], playButtonCoordinates[1], playButtonCoordinates[2], playButtonCoordinates[3]);
	context.fillRect (pauseButtonCoordinates[0], pauseButtonCoordinates[1], pauseButtonCoordinates[2], pauseButtonCoordinates[3]);
	context.fillStyle = "#FFFFFF";
	context.fillRect (menu_width/2, overlay.height - 40, 1, 40);

	context.fillText("Play", menu_width/4, overlay.height-button_height/2);
	context.fillText("Pause", menu_width*3/4, overlay.height-button_height/2);
}

function highlightCurrentArea(){

	overlayed = true;
	darken_count = 0;
	overlayIntervalId = window.setInterval(darken, 15);
}


function darken()
{
	darken_count += 1;
	if(darken_count > 20)
	{
		window.clearInterval(overlayIntervalId);
	}

	var overlay = document.getElementById("overlayLayer");
    if (overlay.getContext) {

		nextArea = overlaySteps[current_step % overlaySteps.length];

		area_x = nextArea[0];
		area_y = nextArea[1];
		area_width  = nextArea[2];
		area_height = nextArea[3];

		var context = overlay.getContext("2d");

		//Draw entire overlay
		context.fillStyle = "rgba(0, 0, 0, 0.06)";
		context.fillRect(menu_width, 0, overlay.width - menu_width, overlay.height);

		//Cut out the focus square
		previousComposite = context.globalCompositeOperation;
		context.globalCompositeOperation = "destination-out";
		context.fillStyle = "rgb(255,255,255)";
		context.fillRect(menu_width + area_x, area_y, area_width, area_height);
		context.globalCompositeOperation = previousComposite;
	}
}

/*function lighten(){

	lighten_count += 1;
	if(lighten_count > 20)
	{
		window.clearInterval(overlayIntervalId);
	}

	var overlay = document.getElementById("overlayLayer");
    if (overlay.getContext) {

    	var context = overlay.getContext("2d");

    	//Cut out the focus square
    	previousComposite = context.globalCompositeOperation;
    	context.globalCompositeOperation = "destination-out";
		context.fillStyle = "rgb(255,255,255)";
		context.fillRect(menu_width, 0, overlay.width-menu_width, overlay.height);
		context.globalCompositeOperation = previousComposite;
		overlayed = false;
    }

}
*/

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
		overlayed = false;
    }

}


function goToNextStep(){

	highlightCurrentArea();
	audioSteps[current_step].play();
}


function pauseCurrentStep(){

	clearOverlay();
	audioSteps[current_step].pause();
}


function stopPlayback(){

	audioSteps[current_step].pause();
	audioSteps[current_step].currentTime = 0;
	clearOverlay();
}


function hitTest(x, y, coordinates){
	return (x >= coordinates[0] && x <= coordinates[0] + coordinates[2] && y >=coordinates[1] && y <= coordinates[1]+coordinates[3]);
}



//Event Listeners



function onCanvasClicked(e){

	var x = e.clientX;
	var y = e.clientY;

	if(x <= menu_width)
	{
		if(y <= button_height*overlaySteps.length)
		{
			var buttonIndex = Math.floor(y/button_height);
			stopPlayback();
			current_step = buttonIndex;
			goToNextStep();
		}
		else if(hitTest(x, y, playButtonCoordinates))
			onPlayPressed();
		else if(hitTest(x, y, pauseButtonCoordinates))
			onPausePressed();
	}
	else
	{
		if(overlayed)
		{
			pauseCurrentStep();
		}
		else
		{
			goToNextStep();
		}
	}
}


function onStepFinished(){

	clearOverlay();
	
	if(current_step < overlaySteps.length)
		current_step += 1;
	if(current_step < overlaySteps.length)
		goToNextStep();
}


function onPlayPressed(){

	clearOverlay();
	highlightCurrentArea();
	audioSteps[current_step].play();
}


function onPausePressed(){

	clearOverlay();
	audioSteps[current_step].pause();	
}










