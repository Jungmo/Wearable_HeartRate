
( function () {

	/*  
	document.getElementById("btnStart").onclick = function(){

			//sensoron();
	};

	document.getElementById("btnStop").onclick=
		function(){
		sensoroff();
		};
	 */
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


	var alphaElem = document.getElementById("alpha");
	var betaElem = document.getElementById("beta");
	var gammaElem = document.getElementById("gamma");

	window.addEventListener("deviceorientation", function (e) {
		alphaElem.innerHTML = 'alpha value ' + Math.round(e.alpha);
		betaElem.innerHTML = 'beta value ' + Math.round(e.beta);
		gammaElem.innerHTML = 'gamma value ' + Math.round(e.gamma);
	}, true);
	tizen.humanactivitymonitor.start("HRM",
			function onSuccess(hrm) {
		document.getElementById("divHertRate").innerHTML = hrm.heartRate;
		//console.log("Error "+ hrm.heartRate);
	});	


	document.getElementById("btnStart").onclick = function(){
		console.log("button clicked");
		//var dta = '{"metric": "tizen.test","timestamp": 1470381864,"value": 100,"tags": {"acc_z": "z"}}';

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
		var request = $.ajax({
			url:"http://202.30.29.209:14242/api/put",
			type:"POST",
			dataType:"json",
			contentType:"application/json",
			data:dta,
			cache:false
		});



	}

	/*
	function sensoron(){
		tizen.humanactivitymonitor.start("HRM",
		function onSuccess(hrm) {
			document.getElementById("divHertRate").innerHTML = hrm.heartRate;
		});		

    	window.addEventListener("devicemotion", function(event) {
    		document.getElementById("x").innerHTML = event.accelearation.x;
    		document.getElementById("y").innerHTML = event.accelearation.y;
    		document.getElementById("z").innerHTML = event.accelearation.z;
    	}, true)

	}
	function sensoroff(){
		tizen.humanactivitymonitor.stop("HRM");
	}
	 */
} () );


