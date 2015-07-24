
function initNumbers() {
	var x = 260;
	var y = 230;
	var d = 215;
	var r = [];
	for ( i = 11; i >= 0; i--) {
		var span = $('<span class="clock-number"></span>');
		span.text(((i == 0) ? 12 : i) + '');
		span.css('left', (x + (d) * Math.cos(1.57 - 30 * i * (Math.PI / 180))) + 'px');
		span.css('top', (y - (d) * Math.sin(1.57 - 30 * i * (Math.PI / 180))) + 'px');
		r.push(span);
	}
	return r;
}

function scaleCoordinates(delta, firstTime) {
	$('#ticker, #timelable, #timenow, .clock-number').each(function() {
		//Get X,Y,font size

		if(firstTime == false) {
			$(this).css({'left':$(this).data('x'), 'top':$(this).data('y'), 'fontSize' : $(this).data('font')});
		}

		var x = $(this).css('left');
		//-px
		x = x.substr(0, x.length - 2);
		var y = $(this).css('top');
		y = y.substr(0, y.length - 2);
		var fs = $(this).css('font-size');
		fs = fs.substr(0, fs.length - 2);
		//-px
		if(firstTime) {
			$(this).attr({ 'data-x' : x, 'data-y' : y, 'data-font' : fs });

		}
		//-%
		x = +x + Math.round((delta * x) / 555);
		//Set new X
		y = +y + Math.round((delta * y) / 555);
		//Set new Y
		fs = +fs + ((delta * fs) / 555);
		//set new font size %

		//apply new values to attributes
		$(this).css({
			"left" : x + "px",
			"top" : y + "px",
			"font-size" : fs + "px"
		});
	});
}


$(document).ready(function() {
	if( jQuery('link[href*="css/dark-theme.css"]').length ) {
		var opts={plate:"#424242",marks:"#424242",label:"#424242",hours:"#424242",minutes:"#424242",seconds:"#424242"};
	} else {
		var opts={plate:"#FFFFFF",marks:"#FFFFFF",label:"#FFFFFF",hours:"#FFFFFF",minutes:"#FFFFFF",seconds:"#FFFFFF"};
	}


	SVG('canvas', '100%').clock('100%', '', opts).start();

	var n = initNumbers();
	$('#time-container .numbers-container').append(n);
	$("#canvas").everyTime("1s", function(i) {

		
		var tiempo = new Date ();
	    var hora = tiempo.getHours ();
	    var minutos = tiempo.getMinutes ();
	    var segundos = tiempo.getSeconds ();
	  
	    var extra;
	    minutos = ( minutos < 10 ? "0" : "" ) + minutos;
	    segundos = ( segundos < 10 ? "0" : "" ) + segundos;
	    if(hora<12){
	    	extra= "A.M."
	    }
	   	else
	    extra="P.M.";
	  
	    var tiempoString = hora + ":" + minutos + ":" + segundos+"   "+" "+extra;
		$('#timenow').text(tiempoString);
	});
		

	//////////////////////////////////////////////////////////////////////////////////////
	var delta = 0;
	var curWidth = $('#time-container').width();
	if (curWidth != null) {
		delta = curWidth - 555;
		scaleCoordinates(delta, true);
	}
	//555 , 450 , 250
	$(window).resize(function() {
		scaleCoordinates($('#time-container').width() - 555, false);
	});
	///////////////////////////////////////////////////////////////////////////////////////

}); 