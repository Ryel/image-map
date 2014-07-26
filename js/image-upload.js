/*
*	Upload local image and display it on same page
*/


(function(){
	
	var user_upload = document.getElementById( "user-upload" );
	var user_img = document.getElementById( "user-image" );
	var user_img_copy = document.getElementById("user-image-2");
	

	putImg = function() {
		user_img.src = window.localStorage.getItem( "image-base64" );
		user_img_copy.src = window.localStorage.getItem( "image-base64" );
	},

	/* Listener */

	bindUi = function(){

		user_upload.addEventListener( "change", function(){

		if ( this.files.length ) {

			var reader = new FileReader();

			reader.onload = function( e ){
				window.localStorage.setItem( "image-base64", e.target.result );
				putImg();
			};
			
			reader.readAsDataURL( this.files[ 0 ] );
		}

	}, false );

	};

	putImg();
	bindUi();

}());