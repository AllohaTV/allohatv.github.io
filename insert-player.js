$(function(){
	$.get('https://api.alloha.tv/', param_cdn, function(data){
		data = $.parseJSON(data);
		if ( data.status == 'success' ) {
			if ( 'calback_success' in param_cdn && typeof window[param_cdn.calback_error] == 'function' ) {
				window[param_cdn.calback_success](data);
			} else {
				$( param_cdn.player_id ).html( '<iframe frameborder="0" allowfullscreen src="' + data.data.iframe + '" width="640" height="480"></iframe>' );
			}
		} else {
			if ( 'calback_error' in param_cdn && typeof window[param_cdn.calback_error] == 'function' ) {
				window[param_cdn.calback_error](data);
			} else {
				$( param_cdn.player_id ).html( param_cdn.alternative_iframe );
			}
		}
	});

});
