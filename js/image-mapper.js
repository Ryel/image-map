/*
*	HTML Image Mapper
*/

/*
*	Sample Output
*
*	<img src="path/to/img.jpg" width="350" height="500" alt="Planets" usemap="#image_map">
*
*	<map name="image_map" id="image_map">
*			<area shape="poly" coords="90,58,3,118" href="www.google.com" alt="google">
*	</map>
*
*/

/*
*	Canvas Output / Required Markup
*
*	<canvas id="my-canvas" height="350" width="500"></canvas>
*/

var hotspot_coordinates = [];

$(document).ready(function() {
	'use strict';

	var $canvas = $('#my-canvas'),
			$hotspot_input = $('.hotspot-input'),
			$hotspot_title_field = $('#hotspot-title'),
			$hotspot_input_field = $('input#hotspot'),

			coordinates = [],
			
			canvas = document.getElementById('my-canvas'), 
			ctx = canvas.getContext('2d'),

			double_click = false;


	// Primary click handler.
	$canvas.click(function(e){

		// Get x/y mouse position over image
		var x_coord = e.pageX - this.offsetLeft;
		var y_coord = e.pageY - this.offsetTop;
		// Push new coords into all coordinates array
		coordinates.push((x_coord) + ',' + (y_coord));

		console.log(coordinates); // Sample output of coords

		// Normalize markup and inject it
		var map_output = format_map_output();
		var canvas_output = format_canvas_output();
		// Display output in textarea
		$('textarea').val(canvas_output + '\n\n' +  map_output);

		draw_canvas(x_coord, y_coord);


	});

	/* 
	* Double Click handler
	* Double click event signals end of current hotspot. 
	* Action: Register dbl click, end path, begin new path.
	*/

	$canvas.dblclick(function() {

		double_click = true;

		ctx.closePath();	// end current canvas path

		console.log(coordinates);
		
		hotspot_coordinates.push(coordinates); // add coords to final collection

		getMapObject();  // Find map object in DOM and append html for new map

		console.log(hotspot_coordinates);

		handle_input_ui();

		coordinates = []; // new current coordinates array
		
		console.log('double_click = ' + double_click);

		return double_click;

	});

	// TODO: Either find a cleaner way to do this, or start implementing dynamic user images.
	function format_map_output() {

		var img_src = 'images/image.jpg',
				map_id = 'image-map',
				href = '"www.google.com"',
				img_elem = '<img src="'+ img_src +'" usemap="#'+ map_id +'">',
				map_start = '<map name="'+ map_id +'" id="'+ map_id +'">',
				map_end	= '</map>',
				map_poly_val = '<area shape="poly" coords="',
				end_map_poly_val = '"';

		// Full markup output strung together
		var map_output = img_elem + '\n\n' + map_start + '\n' + map_poly_val + coordinates + end_map_poly_val + 'href=' + href + '>' + '\n' + map_end;

		return map_output;

	}

	function format_canvas_output() {

		var canvas_id		= 'my-canvas',
			canvas_height	= '350',
			canvas_width	= '500',
			// Full canvas output strung together
			canvas_output	= '<canvas ' + 'id=' + '"' + canvas_id + '" ' + 'height=' + '"' + canvas_height + '"' + 'width=' + '"' + canvas_width + '"' + '>' + '</canvas>';

		return canvas_output;

	}

	function draw_canvas(x_coord, y_coord){
		
		var spliced_coord_x;
		var spliced_coord_y;
		// Canvas Initialization
		ctx.beginPath();
		ctx.moveTo(x_coord[0], y_coord[0]);	
		
		// Iterate over nodes and begin normalizing them
		for (var i = 0; i <= coordinates.length; i++) {
			var current_coord = coordinates[i];
				// Canvas methods need 2 arguments so we cant pass an array of coords.
				// So we normalize coords into seperate string 'x' & 'y' and pass them that way.
				if (current_coord) {
					spliced_coord_x = current_coord.split(',')[0];
					spliced_coord_y = current_coord.split(',')[1];
				}
				ctx.lineTo(spliced_coord_x, spliced_coord_y);

				ctx.lineWidth = 2;
				ctx.strokeStyle = "rgba(85,150,238,0.3)";
				ctx.stroke();
		}

	}

	/*
	*
	* Markup/DOM interactions
	*
	*/

	function getMapObject(){
		var obj = document.getElementById('image-map');
		obj.innerHTML = '<area shape="poly" coords="' + coordinates + '"' + 'href="www.google.com"></map>';
	}

	/*
	* Starts UI related stuff
	*/

	function handle_input_ui(){
		// reset input value to blank, display it, focus it.
		$hotspot_input_field.val('');
		$hotspot_input.fadeIn(100);
		$hotspot_input_field.focus();
	}

	// submit and hide form when user presses enter (e.which = enter)
	$hotspot_input.keypress(function (e) {

  	if (e.which == 13) {
  		
    	$hotspot_input.submit();
			$hotspot_input.css({display:"hidden"});

			var hotspot_title = document.getElementById('hotspot-title').value;
			var hotspot_url = document.getElementById('hotspot-url').value;

			console.log(hotspot_title);
			console.log(hotspot_url);

    	return false;

  	}

	});



});



