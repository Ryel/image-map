/*
*	HTML Image Mapper
*
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

	
	var $image = $('#my-image'),
			$canvas = $('#my-canvas'),
			coordinates	= [];	// All coordinates


	$canvas.click(function(e){

		// get x/y mouse position over image
		var x_coord = e.pageX - this.offsetLeft;
		var y_coord = e.pageY - this.offsetTop;
		// push new coords into coordinates array
		coordinates.push((x_coord) + ',' + (y_coord));

		console.log(coordinates); //sample output of coords

		var map_output = format_map_output();
		var canvas_output = format_canvas_output();

		$('textarea').val(canvas_output + '\n\n' +  map_output);

		draw_canvas();


	});


	function format_map_output() {

		// reference vars to create markup
		var img_src					= 'images/image.jpg',
				map_id					= 'image-map',
				href						= '"www.google.com"',
				img_elem				= '<img src="'+ img_src +'" usemap="#'+ map_id +'">',
				map_start				= '<map name="'+ map_id +'" id="'+ map_id +'">',
				map_end					='</map>',
				map_poly_val		= '<area shape="poly" coords="',
				end_map_poly_val= '"';

		// Full markup output strung together
		var map_output = img_elem + '\n\n' + map_start + '\n' + map_poly_val + coordinates + end_map_poly_val + 'href=' + href + '>' + '\n' + map_end;
		
		return map_output;

	};

	function format_canvas_output() {

		var canvas_id		= 'my-canvas',
			canvas_height	= '350',
			canvas_width	= '500',
			// Full canvas output strung together
			canvas_output	= '<canvas ' + 'id=' + '"' + canvas_id + '" ' + 'height=' + '"' + canvas_height + '"' + 'width=' + '"' + canvas_width + '"' + '>' + '</canvas>';

		return canvas_output;

	};

	
	function draw_canvas(){

		var canvas = document.getElementById('my-canvas'),
			context	= canvas.getContext('2d');
				
		// Iterate of nodes and begin normalizing them
		for (var i = 0; i <= coordinates.length; i++) {

			var current_coord = coordinates[i],
			// Canvas methods need 2 arguments so we cant pass an array of coords.
			// So we normalize coords into seperate string 'x' & 'y' and pass them that way.
			spliced_coord_x = current_coord.split(',')[0],
			spliced_coord_y = current_coord.split(',')[1];
			// Example output
			console.log(spliced_coord_x);
			console.log(spliced_coord_y);
			// Canvas Initialization
			context.beginPath();
			context.moveTo(spliced_coord_x,spliced_coord_y);
			context.lineTo(220, 250);
			context.stroke();

		};


	}


});