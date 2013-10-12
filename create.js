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

	var k_img = new Kinetic.Image({
		image:img
	});
	
	layer.add(k_img);
	stage.add(layer);

	k_img.on('click', onImageClicked);
}


//Event Listeners



function onImageClicked(e){
	var clickX = e.clientX;
	var clickY = e.clientY;

	alert('x: '+clickX + ' y: '+clickY);
}






