(function(window, document) {
  function init() {
    var config = window.param_cdn;
    if (!config || !config.token) return;

    var apiUrl = (config.api_url || 'https://apbugall.org/v2') + '/movies/search?';
    var params = [];

    if (config.kp) params.push('kp=' + config.kp);
    if (config.imdb) params.push('imdb=' + config.imdb);
    if (config.tmdb) params.push('tmdb=' + config.tmdb);
    if (config.world_art) params.push('world_art=' + config.world_art);
    if (config.movie_token) params.push('token=' + config.movie_token);
    if (!params.length) return;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', apiUrl + params.join('&'), true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + config.token);
    xhr.setRequestHeader('Accept', 'application/json');

    xhr.onload = function() {
      var response, data, iframe;
      try { 
        response = JSON.parse(xhr.responseText);
        data = response.data || response;
        iframe = data.iframe;
      } catch (e) { 
        response = {}; 
      }

      var playerId = config.player_id;
      if (playerId && playerId[0] === '#') playerId = playerId.slice(1);
      var container = playerId && document.getElementById(playerId);

      if (xhr.status < 300 && iframe) {
        var onSuccess = config.callback_success || config.calback_success;
        if (onSuccess && typeof window[onSuccess] === 'function') {
          window[onSuccess]({ status: 'success', data: data });
        } else if (container) {
          var attrs = '';
          if (config.width) attrs += ' width="' + config.width + '"';
          if (config.height) attrs += ' height="' + config.height + '"';
          container.innerHTML = '<iframe ' + attrs + ' src="' + iframe + '" frameborder="0" allowfullscreen referrerpolicy="no-referrer-when-downgrade"></iframe>';
        }
      } else {
        var onError = config.callback_error || config.calback_error;
        if (onError && typeof window[onError] === 'function') {
          window[onError]({ status: 'error', error: response.error || response });
        } else if (container && config.alternative_iframe) {
          container.innerHTML = config.alternative_iframe;
        }
      }
    };
    
    xhr.onerror = function() {
      var onError = config.callback_error || config.calback_error;
      if (onError && typeof window[onError] === 'function') {
        window[onError]({ status: 'error', error: { code: 'NETWORK_ERROR', message: 'Network request failed' } });
      }
    };

    xhr.send();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window, document);
