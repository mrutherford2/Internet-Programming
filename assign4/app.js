
$(document).ready(function() {

	var appleTreeInstance = null;
	var issacNewtonInstance = null; 
	var appleImgInstance = null;
	var messageBubbleImgInstance = null; 
	
	//initialize our canvas object
	var canvas = new fabric.Canvas('myCanvas', {renderOnAddRemove: false});
	//Add background image to our canvas
	canvas.setBackgroundImage('../Images/backdrop.jpg', canvas.renderAll.bind(canvas));

	fabric.Image.fromURL('../Images/appletree.png', function(oImg) {
		oImg.set('left', 30).set('top', 25).set('selectable', false);
		oImg.selection = false; 
		canvas.setActiveObject(oImg);
		appleTreeInstance = canvas.getActiveObject();
		canvas.add(oImg);
	});

	fabric.Image.fromURL('../Images/issacnewton.PNG', function(oImg) {
		oImg.set('left', 280).set('top', 320).set('selectable', false);
		canvas.setActiveObject(oImg);
		issacNewtonInstance = canvas.getActiveObject();
		canvas.add(oImg);
	})

	fabric.Image.fromURL('../Images/apple.png', function(oImg) {
		oImg.set('left', 330).set('top', 150).set('selectable', false);
		canvas.setActiveObject(oImg);
		appleImgInstace = canvas.getActiveObject();
		canvas.add(oImg);
	})

	fabric.Image.fromURL('../Images/messagebubble.png', function(oImg) {
		oImg.set('left', 400).set('top', 250).set('selectable', false);
		canvas.setActiveObject(oImg);
		messageBubbleImgInstance = canvas.getActiveObject();
	})

	//Sets canvas active object to unused image to get rid of selection on last image added
	fabric.Image.fromURL('../Images/Flowchart.png', function(oImg) {
		canvas.setActiveObject(oImg);
	})

	$('#btnDiscoverGravity').click(function() {

		appleImgInstace.animate('top', 300, {
  		onChange: canvas.renderAll.bind(canvas),
  		duration: 650,
  		easing: fabric.util.ease.easeOutBounce,
  		onComplete: function () {
  			appleImgInstace.animate('left', 240, {
  			onChange: canvas.renderAll.bind(canvas),
  			duration: 600,
  			easing: fabric.util.ease.easeOutCubic
		});

  			appleImgInstace.animate('top', 280, {
  			duration: 200,
  			easing: fabric.util.ease.easeOutCubic,
  			onComplete: function() {
  				appleImgInstace.animate('top', 480, {
  				duration: 500,
  				easing: fabric.util.ease.easeOutBounce
  				})

  				canvas.add(messageBubbleImgInstance);
				messageBubbleImgInstance.set('selectable', false);	

  				var newtonText = new fabric.Text('Newton', {
					left: 550, 
					top: 30,
					fontSize: 80,
				 	fontStyle: 'italic',
					fontFamily: 'Delicious',
					fill: 'red'
  				});

  				var discoversText = new fabric.Text('Discovers', {
					left: 550, 
					top: 30,
					fontSize: 80,
				 	fontStyle: 'italic',
					fontFamily: 'Delicious',
					fill: 'red'
  				}); 
  				//Create Text object 
				var gravityText = new fabric.Text('Gravity', {
					left: 550, 
					top: 30,
					fontSize: 80,
				 	fontStyle: 'italic',
					fontFamily: 'Delicious',
					fill: 'red'
				});

				canvas.add(newtonText);
				newtonText.animate('top', 860, {
					duration: 1000
				});
				
				canvas.add(discoversText);
				discoversText.animate('top', 1460, {
					duration: 1000
				});

				canvas.add(gravityText);
				gravityText.animate('top', 2060, {
					duration: 1000
				});
  			}
		});
  		}
		});
	});
});
