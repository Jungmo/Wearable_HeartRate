
( function () {

	var Ax=0;
	var Ay=0;
	var Az=0;
	var HR=0;
	var worker = new Worker("js/worker_test.js");
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
		//console.log(Ax, Ay, Az);

	});
	
	tizen.humanactivitymonitor.start("HRM",
			function onSuccess(hrm) {
		document.getElementById("divHertRate").innerHTML = hrm.heartRate;
		HR = hrm.heartRate;
		//console.log("Error "+ hrm.heartRate);
	});	
	
	worker.onmessage = function(event) {
		var ret = event.data;
		
	};
	document.getElementById("btnStart").onclick = function(){
		console.log("button clicked");
		var sensorValues = [];
		sensorValues.push(HR);
		sensorValues.push(Ax);
		sensorValues.push(Ay);
		sensorValues.push(Az);
		
		worker.postMessage(sensorValues);
	};
	document.getElementById("btnStop").onclick= function(){
		//sensoroff();
		var ts = Math.round(new Date().getTime()/1000);
		console.log(ts);
		var obj = {};
		obj.metric = "tizen.test";
		obj.timestamp = ts;
		obj.value = 160;
		var obj2 = {};
		obj2.acc_z = "z";
		obj.tags = obj2;
		var dta = JSON.stringify(obj);
		$(document).ready(function () {
			var request = $.ajax({
				url:"http://202.30.29.209:14242/api/put",
				type:"POST",
				dataType:"json",
				contentType:"application/json",
				data:dta,
				cache:false
			});
		});
		/*$.post("http://www.w3schools.com/jquery/demo_test_post.asp",
	          {
	            metric: "tizen.test",
	            timestamp: 1470381864,
	            value: 100,
	            tags : {
	  	            acc_z:"z"}
       },
	          function(data,status){
	        	var e1 = ('Data: ' + data + '<br> Status: ' + status);
	        });
		 */
		
	};
} () );


