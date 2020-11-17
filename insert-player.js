var $ = $ || jQuery;
$(function(){
	if ( typeof param_cdn !== 'undefined' ) { 
		$.get('https://api.alloha.tv/', param_cdn, function(data){
			data = $.parseJSON(data);
			if ( data.status == 'success' ) {
				console.log(data.status);
				if ( 'calback_success' in param_cdn && typeof window[param_cdn.calback_error] == 'function' ) {
					window[param_cdn.calback_success](data);
				} else {
					console.log('iframe');
					$( param_cdn.player_id ).html( '<iframe frameborder="0" src="' + data.data.iframe + '" allowfullscreen></iframe>' );
				}
			} else {
				if ( 'calback_error' in param_cdn && typeof window[param_cdn.calback_error] == 'function' ) {
					window[param_cdn.calback_error](data);
				} else {
					$( param_cdn.player_id ).html( param_cdn.alternative_iframe );
				}
			}
		});
	}
});
