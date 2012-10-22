var T = T || {};

T.paused = true;
T.startedTime = 0;
T.currentTime = 0;
T.transcript = {};

T.create = function() {
  function init() {
    generateOnInputSubmit();
    keyboardListen();
    hideUrlOnSubmitClick();
  }

  function addEvent(element, eventName, callback) {
    $(element).on(eventName, callback);
  }

  function generateOnInputSubmit() {
    $('input.url').on('keydown', function(e) {
      var url = $(this).val();
      if(e.keyCode == 13) {
        hideUrl(url);
      }
    });
  }
  function hideUrlOnSubmitClick() {
    $('button.submit').on('click', function() {
      hideUrl($('input.url').val());
    });
  }
  function hideUrl(url) {
    $('.videoWrapper').html(T.template(url));
      setTimeout(function() {
        $('.videoWrapper, .transcriptPreview, .transcriptEntry').removeClass('hidden');
        $('.videoWrapper').fitVids();
      }, 450);
    $f('player_1').addEvent('ready', setupVideoListeners);
    $('.enterUrl').addClass('hidden');
  }

  function playVideoAtClickedSentence() {
    $('.transcriptPreview span').off('click');

    $('.transcriptPreview span').on('click', function(i) {
        tmpTime = Number($(this).data("time"));
        $f('player_1').api('seekTo', tmpTime);
        $f('player_1').api('play');
      });
  }

  function setupVideoListeners() {
    setupPlayListener();
    setupPauseListener();
  }

  function setupPlayListener() {
    $f('player_1').addEvent('playProgress', function(data) {
      T.currentTime = Math.floor(data.seconds);
      T.paused = false;
      if(T.transcript[T.currentTime]) {
          $('.highlight').removeClass('highlight');
          $('span[data-time="' + T.currentTime + '"]').addClass('highlight');
        }
    });
  }

  function setupPauseListener() {
    $f('player_1').addEvent('pause', function() {
      T.paused = true;
      console.log('paused');
    });
  }

  function keyboardListen() {
    var lastKey;
    $(window).on('keydown', function(e) {
      if(lastKey && (lastKey == 17 && e.keyCode == 32)) {
        e.preventDefault();
        console.log(T.paused)
        if(T.paused) {
          $f('player_1').api('play');
        } else {
          $f('player_1').api('pause');
        }
        return false;
      } else if(lastKey && (lastKey == 17 && e.keyCode == 74)) {
        e.preventDefault();
        $f('player_1').api('play');
        $('textarea').focus();
        console.log('start');
        T.startedTime = T.currentTime;
        return false;
      } else if(lastKey && (lastKey == 17 && e.keyCode == 76)) {
        e.preventDefault();
        console.log('finish: ' + T.startedTime);
        T.transcript[T.startedTime] = $('textarea').val();
        var startTag = '<span data-time="' + T.startedTime + '">';
        $('.transcriptPreview').append(startTag + $('textarea').val() + '</span>');
        $('textarea').val('');
        T.startedTime = T.currentTime;
        playVideoAtClickedSentence();
        return false;
      }
      lastKey = e.keyCode;
    });
  }

  function hideVideo() {

  }

  return {
    init: init
  }
}

$(document).ready(function() {
  T.create().init();

});