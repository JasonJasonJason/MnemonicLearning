var menu_width = 200;
var button_height = 40;
var overlaySteps  = new Array();
var audioFileNames= new Array();
var audioSteps    = new Array();
var menuButtons   = new Array();
var current_step  = 0;
var overlay;
var stage;
var stageWidth;
var stageHeight;
var fontSize = 16;
var img;

var clickX = 0;
var clickY = 0;
var previousClickX = 0;
var previousClickY = 0;
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
	
	overlay = getNewOverlay([0,0,100, 100]);

	layer.add(background);
	layer.add(overlay);
	stage.add(layer);

	stage.on('mousedown', onImageDown);

	
}


function redrawOverlay(x, y, width, height){

	overlay.remove();
	if(width < 0)
	{
		width = -width;
		x -= width;
	}
	if(height < 0)
	{
		height = -height;
		y -= height;
	}
	overlaySteps[current_step][0] = x;
	overlaySteps[current_step][1] = y;
	overlaySteps[current_step][2] = width;
	overlaySteps[current_step][3] = height;

	overlay = getNewOverlay([x, y, width, height]);
	layer.add(overlay);
	stage.draw();
}


function getNewOverlay(highlightArea)
{
	var area_x = highlightArea[0];
	var area_y = highlightArea[1];
	var area_width = highlightArea[2];
	var area_height = highlightArea[3];

	var rect = new Kinetic.Group(
		{
			x:0,
			opacity:0.5
		});

	var top = new Kinetic.Rect({
        x: 0,
        y: 0,
        width: stageWidth-menu_width,
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

	redrawOverlay(clickX, clickY, previousClickX-clickX, previousClickY-clickY);
	
	stage.on('mousemove', onImageMove);
	stage.on('mouseup', onImageUp);
}
function onImageMove(e){

	previousClickX = e.clientX;
	previousClickY = e.clientY;
	redrawOverlay(clickX, clickY, previousClickX-clickX, previousClickY-clickY);
}
function onImageUp(e){
	
	stage.off('mousemove', onImageMove);
	stage.off('mouseup', onImageUp);
}





