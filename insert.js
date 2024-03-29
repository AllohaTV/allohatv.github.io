var $ = $ || jQuery;
$(function () {
	if (typeof param_cdn !== 'undefined') {
		$.get('https://api.apbugall.org/', param_cdn, function (data) {
			data = $.parseJSON(data);
			if ( data.status == 'success' ) {
				if ( 'calback_success' in param_cdn && typeof window[param_cdn.calback_error] == 'function' ) {
					window[param_cdn.calback_success](data);
				} else {
					if ( param_cdn.player_id[0] != '#' ) param_cdn.player_id = '#' + param_cdn.player_id;

					if ( param_cdn.width != undefined && param_cdn.height != undefined ) {
						$(param_cdn.player_id).html('<iframe frameborder="0" width="' + param_cdn.width + '" height="' + param_cdn.height + '" src="' + data.data.iframe + '" allowfullscreen></iframe>');
					} else {
						$(param_cdn.player_id).html('<iframe frameborder="0" src="' + data.data.iframe + '" allowfullscreen></iframe>');
					}
				}
			} else {
				if ( 'calback_error' in param_cdn && typeof window[param_cdn.calback_error] == 'function' ) {
					window[param_cdn.calback_error](data);
				} else {
					$(param_cdn.player_id).html(param_cdn.alternative_iframe);
				}
			}
		});
	}
});
