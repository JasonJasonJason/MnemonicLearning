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
var addStepButton;

var clickX = 0;
var clickY = 0;
var previousClickX = 0;
var previousClickY = 0;
var background;

var layer = new Kinetic.Layer();

var audioLoader = document.getElementById('audioLoader');
    audioLoader.addEventListener('change', handleAudio, false);

function handleAudio(e){

	var reader = new FileReader();
    reader.onload = function(event){
        var audio = new Audio();
        audio.src = event.target.result;
        audioSteps[audioSteps.length] = audio;
        initMenu();
    };
    reader.readAsDataURL(e.target.files[0]);
}


var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);

function handleImage(e){

	step2clicked();
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

	stageWidth = img.width + menu_width;
	stageHeight = img.height;
	stage = new Kinetic.Stage({
		container: 'container',
		width: stageWidth,
		height: stageHeight
	});

	background = new Kinetic.Image({
		x:menu_width,
		image:img
	});
	
	overlay = getNewOverlay([0,0,stageWidth, stageHeight]);

	layer.add(background);
	layer.add(overlay);
	layer.x = 200;

	stage.add(layer);
	
	stage.draw();
	stage.on('mousedown', onImageDown);

	

}


function initMenu(){

	for(i=0; i<audioSteps.length; i++)
	{
		(function(i){
			if(menuButtons[i] == null)
			{
				menuButtons[i] = new Kinetic.Group();
				overlaySteps[i] = new Array();

				var rect = new Kinetic.Rect({
					x: 1,
			        y: 1 + i*button_height,
			        width: menu_width-2,
			        height: button_height-1,
			        fill:'#444444',
			        cornerRadius:4
				});

				menuButtons[i].on('click', function(e){

					onMenuItemClicked(i);
				});

				var text = new Kinetic.Text({
					x:0,
					y:i*button_height + fontSize/2 + 3,
					text: 'Step '+(i+1),
					fontSize: fontSize,
					fontFamily: 'sans-serif',
					fill: 'white',
					width:menu_width,
					align: 'center'
				});

				menuButtons[i].add(rect);
				menuButtons[i].add(text);

				layer.add(menuButtons[i]);
			}
		}(i));
	}
	stage.draw();
}


function onMenuItemClicked(index){

	current_step = index;

	for(i = 0; i<audioSteps.length; i+= 1)
	{
		audioSteps[i].pause();
		audioSteps[i].currentTime = 0;
	}

	audioSteps[index].play();
	setOverlay(index);
}


function setOverlay(index){

	redrawOverlay(overlaySteps[index][0], 
		overlaySteps[index][1],
		overlaySteps[index][2],
		overlaySteps[index][3]);
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

	overlaySteps[current_step] = new Array();
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
			x:menu_width,
			opacity:0.5
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

	
	if(e.clientX < menu_width)
		return;

	clickX = stage.getMousePosition().x - menu_width;
	clickY = stage.getMousePosition().y;
	previousClickX = stage.getMousePosition().x - menu_width;
	previousClickY = stage.getMousePosition().y;

	//redrawOverlay(clickX, clickY, previousClickX-clickX, previousClickY-clickY);
	
	stage.on('mousemove', onImageMove);
	stage.on('mouseup', onImageUp);
}
function onImageMove(e){

	previousClickX = stage.getMousePosition().x - menu_width;
	previousClickY = stage.getMousePosition().y;
	redrawOverlay(clickX, clickY, previousClickX-clickX, previousClickY-clickY);
}
function onImageUp(e){
	
	stage.off('mousemove', onImageMove);
	stage.off('mouseup', onImageUp);
}

function step1clicked(){
	document.getElementById('step1').style.visibility = 'hidden';
	document.getElementById('step1').innerHTML = '';
	document.getElementById('step2').style.visibility = 'visible';
}
function step2clicked(){

	document.getElementById('step2').style.visibility = 'hidden';
	document.getElementById('step2').innerHTML = '';
	document.getElementById('step3').style.visibility = 'visible';	
}




