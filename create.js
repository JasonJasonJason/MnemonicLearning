var menu_width = 200;
var color_value  = 0;
var button_height = 40;
var overlaySteps  = new Array([10,10,100,100],[200,200,50,100],[100,300,100,50]);
var audioFileNames= new Array('audio/1.wav', 'audio/2.wav', 'audio/3.wav');
var audioSteps    = new Array()
var menuButtons   = new Array()
var current_step  = -1;
var overlay;
var overlayed = false;
var stage;
var stageWidth;
var stageHeight;
var fontSize = 16;
var playButton;
var pauseButton;
var img;

var clickX;
var clickY;
var previousClickX;
var previousClickY;
var background;



var layer = new Kinetic.Layer();
var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);

function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        img = new Image();
        img.onload = function(){
        	
        	init();
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);     
}



function init(){

	stageWidth = img.width + 200;
	stageHeight = img.height;
	stage = new Kinetic.Stage({
		container: 'container',
		width: stageWidth,
		height: stageHeight
	});

	background = new Kinetic.Image({
		image:img
	});
	
	overlay = getNewOverlay([0,0,stage.height, stage.width]);

	layer.add(background);
	redrawOverlay();
	stage.add(layer);

	background.on('mousedown', onImageDown);
}


function redrawOverlay(){

	overlay.remove();
	//overlay = getNewOverlay(clickX, clickY, previousClickX-clickX, previousClickY-clickY);
	overlay = getNewOverlay([0,0,200,200]);
	
	layer.add(overlay);
	

}


function getNewOverlay(highlightArea)
{
	var area_x = highlightArea[0];
	var area_y = highlightArea[1];
	var area_width = highlightArea[2];
	var area_height = highlightArea[3];

	var rect = new Kinetic.Group(
		{
			x:menu_width,
			opacity:1
		});

	var top = new Kinetic.Rect({
        x: 0,
        y: 0,
        width: stageWidth,
        height: area_y,
        fill:'black'
      });

	var left = new Kinetic.Rect({
        x: 0,
        y: area_y,
        width: area_x,
        height: area_height,
        fill:'black'
      });

	var right = new Kinetic.Rect({
        x: area_x + area_width,
        y: area_y,
        width: stageWidth - menu_width - area_x - area_width,
        height: area_height,
        fill:'black'
      });

	var bottom = new Kinetic.Rect({
        x: 0,
        y: area_y + area_height,
        width: stageWidth - menu_width,
        height: stageHeight - area_y - area_height,
        fill:'black'
      });

	rect.add(top);
	rect.add(left);
	rect.add(right);
	rect.add(bottom);
	return rect;
}



//Event Listeners



function onImageDown(e){

	clickX = e.clientX;
	clickY = e.clientY;
	previousClickX = e.clientX;
	previousClickY = e.clientY;

	redrawOverlay();
	

	background.on('mousemove', onImageMove);
	background.on('mouseup', onImageUp);
}
function onImageMove(e){


	previousClickX = e.clientX;
	previousClickY = e.clientY;
	redrawOverlay();
}
function onImageUp(e){
	
}





