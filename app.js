
( function () {
	document.getElementById("btnStart").onclick=function(){
		tizen.humanactivitymonitor.start("HRM",
	        function onSuccess(hrm){
	        	document.getElementById("divHertRate").innerHTML = hrm.heartRate;
	        },
	        function onError(err){
	        	Alert(err.message);
	        }
	    );
	}
	document.getElementById("btnStop").onclick=function(){
		tizen.humanactivitymonitor.stop("HRM");
	}		
	//getPedometer();
	window.addEventListener( 'tizenhwkey', function( ev ) {
		if( ev.keyName == "back" ) {
			var page = document.getElementsByClassName( 'ui-page-active' )[0],
				pageid = page ? page.id : "";
			if( pageid === "main" ) {
				try {
					tizen.application.getCurrentApplication().exit();
				} catch (ignore) {
				}
			} else {
				window.history.back();
			}
		}
	} );
} () );
