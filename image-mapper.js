// HTML IMAGE MAP 

// SAMPLE OUTPUT
//	<img src="path/to/img.jpg" width="250" height="250" alt="Planets" usemap="#image_map">
//
//	<map name="image_map" id="image_map">
//		<area shape="poly" coords="90,58,3,118" href="www.google.com" alt="google">
//	</map>



$(document).ready(function() {
	'use strict';


	var $image = $('#my_image');
	var coordinates = [];  // each set of x/y coords kept as collection


	function format_output(){

		// reference vars
		var img_src = 'images/img-home.jpg',
				map_id = 'image_map',
				href = '"www.google.com"',
				img_elem = '<img src="'+ img_src +'" usemap="#'+ map_id +'">',
				map_begin = '<map name="'+ map_id +'" id="'+ map_id +'">',
				map_end ='</map>',
				map_poly_val = '<area shape="poly" coords="',
				end_map_poly_val = '"';

		// Final Output Strung Together
		var output = img_elem + '\n\n' + map_begin + '\n' + map_poly_val + coordinates + end_map_poly_val + 'href=' + href + '>' + '\n' + map_end;

		// Update textarea with values
		$('#textarea').val(output.replace(/\n,/g,''));

	}

	$image.click(function(e){

		// get x/y mouse position over image
		var x_coord = e.pageX - this.offsetLeft;
		var y_coord = e.pageY - this.offsetTop;
		// push new coords into coordinates array
		coordinates.push((x_coord) + ',' + (y_coord));
		console.log(coordinates); //sample output of coords

		format_output();

	});

});