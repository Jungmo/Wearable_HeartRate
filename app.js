
( function () {

	var Ax=0;
	var Ay=0;
	var Az=0;
	var HR=0;
	var worker = new Worker("worker_test.js");
	
	window.addEventListener( 'tizenhwkey', function( ev ) {
		if( ev.keyName === "back" ) {
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

	
	// Display sensor value
	/*
	var alphaElem = document.getElementById("alpha");
	var betaElem = document.getElementById("beta");
	var gammaElem = document.getElementById("gamma");
*/
	//XXX:Gyro
	/*
	window.addEventListener("deviceorientation", function (e) {
		alphaElem.innerHTML = 'alpha value ' + Math.round(e.alpha);
		betaElem.innerHTML = 'beta value ' + Math.round(e.beta);
		gammaElem.innerHTML = 'gamma value ' + Math.round(e.gamma);
	}, true);
	*/
	
	window.addEventListener('devicemotion', function(e) {
        Ax = e.accelerationIncludingGravity.x ;
        Ay = e.accelerationIncludingGravity.y ;
        Az = e.accelerationIncludingGravity.z ;
		console.log(Ax, Ay, Az)

	});
	tizen.humanactivitymonitor.start("HRM",
			function onSuccess(hrm) {
		document.getElementById("divHertRate").innerHTML = hrm.heartRate;
		HR = hrm.heartRate;
		//console.log("Error "+ hrm.heartRate);
	});	
	

	document.getElementById("btnStart").onclick = function(){
		console.log("button clicked");
	};
	document.getElementById("btnStop").onclick= function(){
		sensoroff();
	};

	function test(){
		var ts = Math.round(new Date().getTime()/1000);
		console.log(ts);
		var obj = new Object();
		obj.metric = "tizen.test";
		obj.timestamp = 1470381865;
		obj.value = 120;
		var obj2 = new Object();
		obj2.acc_z = "z";
		obj.tags = obj2;
		var dta = JSON.stringify(obj);

		var request = $.ajax({
			url:"http://202.30.29.209:14242/api/put",
			type:"POST",
			dataType:"json",
			contentType:"application/json",
			data:dta,
			cache:false
		});
	}
} () );


