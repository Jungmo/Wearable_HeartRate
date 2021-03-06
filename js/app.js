
( function () {

	var Ax=0;
	var Ay=0;
	var Az=0;
	var HR=0;
	var rawHR=0;
	var sendFlag = 0;
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
	function basicVibration()
	 {
	    // Vibrate for 3 seconds 
	    navigator.vibrate(100);
	 }
	tizen.power.request("SCREEN", "SCREEN_NORMAL");
	tizen.power.turnScreenOn();
	function sendData(){
		var ts = Math.round(new Date().getTime()/1000);
		console.log(ts);
		
		var metric = "tizen.test2";
		var HRjson = {"metric" : metric, "timestamp" : ts, "value": HR, "tags" :{"sensor" : "HR"}};

		var Axjson = {"metric" : metric, "timestamp" : ts, "value": Ax , "tags" :{"sensor" : "Ax"}};

		var Ayjson = {"metric" : metric, "timestamp" : ts, "value": Ay, "tags" :{"sensor" : "Ay"}};

		var Azjson = {"metric" : metric, "timestamp" : ts, "value": Az, "tags" :{"sensor" : "Az"}};

		var rawHRjson = {"metric" : metric, "timestamp" : ts, "value": rawHR, "tags" :{"sensor" : "rawHR"}};

		var jsonArray = [];

		jsonArray.push(HRjson);
		jsonArray.push(Axjson);
		jsonArray.push(Ayjson);
		jsonArray.push(Azjson);
		jsonArray.push(rawHRjson);

		var ret = JSON.stringify(jsonArray);
		//var temp = ret.replace(new RegExp('\\"', 'g'),'"' );
		console.log(ret);
		$(document).ready(function () {
			var request = $.ajax({
				url:"http://210.107.198.223:14242/api/put",
				type:"POST",
				dataType:"json",
				contentType:"application/json",
				data:ret,
				cache:false
			});
		});
		basicVibration();
	}
	 var HRMrawsensor = tizen.sensorservice.getDefaultSensor("HRM_RAW");
	 function onGetSuccessCB(sensorData) {
	     console.log("HRMRaw light intensity : " + sensorData.lightIntensity);
	     rawHR = sensorData.lightIntensity
	 }

	 function onerrorCB(error) {
	     console.log("error occurs");
	 }

	 function onsuccessCB() {
	     console.log("HRMRaw sensor start");
	     HRMrawsensor.getHRMRawSensorData(onGetSuccessCB, onerrorCB);
	 }


	document.getElementById("btnStart").onclick = function(){
		console.log("button clicked");
		window.addEventListener('devicemotion', function(e) {
	        Ax = e.accelerationIncludingGravity.x ;
	        Ay = e.accelerationIncludingGravity.y ;
	        Az = e.accelerationIncludingGravity.z ;
			//console.log(Ax, Ay, Az);
		});
		window.addEventListener('')
		
		tizen.humanactivitymonitor.start("HRM",
				function onSuccess(hrm) {
			document.getElementById("divHertRate").innerHTML = hrm.heartRate;
			HR = hrm.heartRate;
			 HRMrawsensor.start(onsuccessCB);

			//console.log("Error "+ hrm.heartRate);
		});	
		sendFlag = 1;
	};
	document.getElementById("btnStop").onclick= function(){
		//sensoroff();
		tizen.humanactivitymonitor.stop("HRM");
		window.removeEventListener("deviceorientation");
		sendFlag = 0;
	};
	window.setInterval(function(){
		  /// call your function here
			if(sendFlag == 1){
				sendData();
			}
		}, 1000);
	
} () );


