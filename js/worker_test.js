
function sendToServer(sensorValues){
		var ts = Math.round(new Date().getTime()/1000);
		//console.log(ts);
		
		var HR = {};// {}
		HR.metric = 'tizen.test';
		HR.timestamp = ts;
		HR.value = sensorValues[0];
		var TAG = {};
		TAG.type = 'HR';
		HR.tags = TAG;
		var HRjson = JSON.stringify(HR);

		var Ax = {};
		Ax.metric = 'tizen.test';
		Ax.timestamp = ts;
		Ax.value = sensorValues[1];
		TAG = {};
		TAG.type = 'Ax';
		Ax.tags = TAG;
		var Axjson = JSON.stringify(Ax);

		var Ay = {};
		Ay.metric = 'tizen.test';
		Ay.timestamp = ts;
		Ay.value = sensorValues[2];
		TAG = {};
		TAG.type = 'Ay';
		Ay.tags = TAG;
		var Ayjson = JSON.stringify(Ay);
		
		var Az = {};
		Az.metric = 'tizen.test';
		Az.timestamp = ts;
		Az.value = sensorValues[3];
		TAG = {};
		TAG.type = 'Az';
		Az.tags = TAG;
		var Azjson = JSON.stringify(Az);
		
		var jsonArray = [];
		jsonArray.push(HRjson);
		jsonArray.push(Axjson);
		jsonArray.push(Ayjson);
		jsonArray.push(Azjson);
		
		var ret = JSON.stringify(jsonArray);
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
		
		return ret;
	}

onmessage = function(event) {
	var sensorValues = event.data;
	//console.log(sensorValues[0], sensorValues[1], sensorValues[2], sensorValues[3]);	

	var result = sendToServer(sensorValues);
	
	postMessage(result);
	
};


