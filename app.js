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


function init(){

	initAudio();

	stageWidth = img.width + 200;
	stageHeight = img.height;
	stage = new Kinetic.Stage({
		container: 'container',
		width: stageWidth,
		height: stageHeight
	});

	
	var background = new Kinetic.Image({
		x: 200,
		y: 0,
		image: img,
		width: img.width,
		height: img.height
	});

	layer.add(background);
	overlay = getNewOverlay([100,150,Math.random() * 200 + 100,100]);
	layer.add(overlay);

	initMenu();

	stage.add(layer);
	stage.on('click', function(e)
	{
		onStageClicked();
	});

	
}

function initAudio(){

	for(i=0; i<audioFileNames.length; i+=1){
		audioSteps[i] = new Audio(audioFileNames[i]);
		audioSteps[i].addEventListener('ended', function(e){
			onStepFinished();
		});
	}
}


function initMenu()
{
	for(i=0; i<overlaySteps.length; i++)
	{
		(function(i){
			menuButtons[i] = new Kinetic.Group();

			var rect = new Kinetic.Rect({
				x: 0,
		        y: i*button_height,
		        width: menu_width,
		        height: button_height-1,
		        fill:'#444444'
			});

			menuButtons[i].on('click', function(e){
				goToStep(i);
			});

			var text = new Kinetic.Text({
				x:0,
				y:i*button_height + fontSize/2 + 3,
				text: 'Play 1',
				fontSize: fontSize,
				fontFamily: 'sans-serif',
				fill: 'white',
				width:menu_width,
				align: 'center'
			});

			menuButtons[i].add(rect);
			menuButtons[i].add(text);

			layer.add(menuButtons[i]);
		}(i));
	}

	//Play button
	playButton = new Kinetic.Group({
		x:0,
		y:stageHeight - button_height
	});
	playButton.on('click', function(e){
		onPlayPressed();
	});

	var rect = new Kinetic.Rect({
		x: 0,
        y: 0,
        width: menu_width/2,
        height: button_height-1,
        fill:'#444444'
	});

	var text = new Kinetic.Text({
		x:0,
		y:fontSize/2 + 3,
		text: 'Play',
		fontSize: fontSize,
		fontFamily: 'sans-serif',
		fill: 'white',
		width:menu_width/2,
		align: 'center'
	});
	playButton.add(rect);
	playButton.add(text);
	layer.add(playButton);

	//Pause button
	pauseButton = new Kinetic.Group({
		x:menu_width/2 + 1,
		y:stageHeight - button_height
	});
	pauseButton.on('click', function(e){
		onPausePressed();
	});

	var rect = new Kinetic.Rect({
		x: 0,
        y: 0,
        width: menu_width/2,
        height: button_height-1,
        fill:'#444444'
	});

	var text = new Kinetic.Text({
		x:0,
		y:fontSize/2 + 3,
		text: 'Pause',
		fontSize: fontSize,
		fontFamily: 'sans-serif',
		fill: 'white',
		width:menu_width/2,
		align: 'center'
	});
	pauseButton.add(rect);
	pauseButton.add(text);
	layer.add(pauseButton);
}

function highlightCurrentArea()
{

}

var layer = new Kinetic.Layer();
var img = new Image();
img.src = 'img/sample.jpg';
img.onload = function(){

	init();
};


function getNewOverlay(highlightArea)
{
	var area_x = highlightArea[0];
	var area_y = highlightArea[1];
	var area_width = highlightArea[2];
	var area_height = highlightArea[3];

	var rect = new Kinetic.Group(
		{
			x:menu_width,
			opacity:0
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


function pauseAllAudio(){

	for(i=0; i<audioSteps.length; i++)
	{
		audioSteps[i].pause();
	}
}


function pause(){

	pauseAllAudio();

}


function onPlayPressed(){

	goToStep(current_step);
}


function onPausePressed(){

	pause();
}


function goToStep(targetStep){

	if(targetStep == -1)
		targetStep = 0;

	if(targetStep == current_step)
	{
		
		audioSteps[current_step].play();
		return;
	}

	

	for(i=0; i<audioSteps.length; i++)
	{
		audioSteps[i].pause();
		audioSteps[i].currentTime = 0;
	}

	current_step = targetStep;
	if(overlayed){
		stopStep(function(){
			goToStep2(targetStep);
		});
	}
	else{
		goToStep2(targetStep);
	}
}

function stopStep(onFinishFunction){

	if(overlayed)
	{
		new Kinetic.Tween({
			node: overlay, 
			duration: 0.5,
			opacity: 0,
			onFinish: onFinishFunction
			}).play();
	}
	else
		onFinishFunction();

	overlayed = false;
}

function goToStep2(targetStep){

	overlayed = true;
	overlay.remove();
	overlay = getNewOverlay(overlaySteps[targetStep]);
	layer.add(overlay);
	new Kinetic.Tween({
		node: overlay, 
		duration: 0.5,
		opacity: 0.5,
		onFinish:function(){
			audioSteps[targetStep].play();
		}
	}).play();
}


function goToNextStep(){

	goToStep(current_step+1);
	
}


function onStageClicked(){

	//goToNextStep();
}


function onStepFinished(){

	if(current_step == overlaySteps.length - 1)
	{
		stopStep();
		current_step = -1;
		return;
	}
	goToNextStep();
}





