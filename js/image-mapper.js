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
*
*/


$(document).ready(function() {
	'use strict';

// Cache some variables; others as reference.
	var $image = $('#my-image'),
			$canvas = $('#my-canvas'),
			$hotspot_input = $('.hotspot-input'),
			$hotspot_input_field = $('input#hotspot'),
			
			coordinates	= [],	// All coordinates

			canvas = document.getElementById('my-canvas'), 
			context = canvas.getContext('2d'),

			click_count = 0,
			double_click = false;


	// Primary click handler.
	$canvas.click(function(e){

		// Get x/y mouse position over image
		var x_coord = e.pageX - this.offsetLeft;
		var y_coord = e.pageY - this.offsetTop;
		// Push new coords into all coordinates array
		coordinates.push((x_coord) + ',' + (y_coord));

		// console.log(coordinates); // Sample output of coords

		// Normalize markup and inject it
		var map_output = format_map_output();
		var canvas_output = format_canvas_output();
		// Textarea is a mistress of her own kind. Using this 1-2 combo to insert markup.
		$('textarea').val(canvas_output + '\n\n' +  map_output);

		draw_canvas(x_coord, y_coord);


	});

	/* 
	* Double Click handler
	* Double click event signals end of current hotspot. 
	* Action: Register dbl click, end path, begin new path.
	*/

	$canvas.dblclick(function(event) {

		// set true so we can handle this later
		double_click = true;
		// end current canvas path
		context.closePath();

		console.log(coordinates); // for reference

		// clear coordinates array to start new one
		coordinates = [];

		console.log('double_click = ' + double_click); // for reference

		return double_click; // exit event handler and return true

	});

	/*
	* This needs to be built out and properly integrated.
	* When user double clicks, we want to...
	* - Finish drawing their path by connect begin && end points
	* - End current canvas path 'closePath();'
	* - Prepare for potential new path
	* - And finally begin async embed of IMG data
	*/
	
	/*
		*	canvas.addEventListener('click', function(){
		*		// Increment click counter by +1 to register single click.
		* 	click_count++;
		*		// Detect click, wait x seconds to see if a second click occurs.
		* 	if (click_count === 1) {
		* 		setTimeout(function(){
		* 			click_count = 0;
		* 		}, 250);
		* 	}
		*		// If second click occurs, register this.
		* 	else if (click_count === 2) {
		* 		double_click = true;
		* 		click_count = 0;
		* 		console.log('double click = ' + double_click);
		* 		context.closePath();
		* 		return double_click;
		* 	}

		* }, false);
	*/


	function format_map_output() {

		// Reference vars to create markup
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
		context.beginPath();
		context.moveTo(x_coord[0], y_coord[0]);	
		
		// Iterate over nodes and begin normalizing them
		for (var i = 0; i <= coordinates.length; i++) {
			var current_coord = coordinates[i];
				// Canvas methods need 2 arguments so we cant pass an array of coords.
				// So we normalize coords into seperate string 'x' & 'y' and pass them that way.
				if (current_coord) {
					spliced_coord_x = current_coord.split(',')[0];
					spliced_coord_y = current_coord.split(',')[1];
				}
				context.lineTo(spliced_coord_x, spliced_coord_y);

				context.strokeStyle = "#0000ff";
				context.stroke();

		}

	}

	/*
	* Start of UI effects
	* Keeping UI seperate until I have time to properly integrate
	*/

	$canvas.dblclick(function(event) {
		// reset input value to blank, display it, focus it.
		$hotspot_input_field.val('');
		$hotspot_input.fadeIn(100);
		$hotspot_input_field.focus();

	});

	// submit and hide form when user presses enter (e.which = enter)
	$hotspot_input.keypress(function (e) {

  	if (e.which == 13) {
  		
    	$hotspot_input.submit();
			$hotspot_input.css({display:"hidden"});

    	return false;

  	}

	});



});
