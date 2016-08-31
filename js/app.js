
( function () {

	var Ax=0;
	var Ay=0;
	var Az=0;
	var HR=0;
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
	
	
	function sendData(){
		var ts = Math.round(new Date().getTime()/1000);
		console.log(ts);
		var sensorValues = [];
		sensorValues.push(HR);
		sensorValues.push(Ax);
		sensorValues.push(Ay);
		sensorValues.push(Az);
		
		var metric = "tizen.test2";
		var HRjson = {"metric" : metric, "timestamp" : ts, "value": HR, "tags" :{"sensor" : "HR"}};

		var Axjson = {"metric" : metric, "timestamp" : ts, "value": Ax , "tags" :{"sensor" : "Ax"}};

		var Ayjson = {"metric" : metric, "timestamp" : ts, "value": Ay, "tags" :{"sensor" : "Ay"}};

		var Azjson = {"metric" : metric, "timestamp" : ts, "value": Az, "tags" :{"sensor" : "Az"}};

		var jsonArray = [];

		jsonArray.push(HRjson);
		jsonArray.push(Axjson);
		jsonArray.push(Ayjson);
		jsonArray.push(Azjson);
		
		var ret = JSON.stringify(jsonArray);
		//var temp = ret.replace(new RegExp('\\"', 'g'),'"' );
		console.log(ret);
		$(document).ready(function () {
			var request = $.ajax({
				url:"http://202.30.29.209:14242/api/put",
				type:"POST",
				dataType:"json",
				contentType:"application/json",
				data:ret,
				cache:false
			});
		});
	}
	document.getElementById("btnStart").onclick = function(){
		console.log("button clicked");
		var sensorValues = [];
		sensorValues.push(HR);
		sensorValues.push(Ax);
		sensorValues.push(Ay);
		sensorValues.push(Az);
		sendData();
		worker.postMessage(sensorValues);
	};
	document.getElementById("btnStop").onclick= function(){
		//sensoroff();
		
	};
} () );


