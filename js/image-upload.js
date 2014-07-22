/*
*	Upload local image and display it on same page
*/



(function(){
	
	var userImg = document.getElementById( "user-img" );
	var imgContainer = document.getElementById( "my-image" );
	

	putImg = function() {
		imgContainer.src = window.localStorage.getItem( "image-base64" );
	},

	/* Listener */

	bindUi = function(){

		userImg.addEventListener( "change", function(){

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