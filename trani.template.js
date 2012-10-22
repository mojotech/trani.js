var T = T || {};

T.template = function(url) {
  return '<iframe id="player_1" class="vimeoPlayer" src="' + url +'?api=1&amp;js_swf_id=player_1&amp;js_onLoad=vimeo_player_1_loaded&amp;player_id=player_1" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>';
}
