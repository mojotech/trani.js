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
      $('textarea.transcriptEntry')[0].focus()
    });
  }
  function hideUrl(url) {
    $('.videoWrapper').html(T.template(url));
      setTimeout(function() {
        $('.hidden').removeClass('hidden');
        $('.videoWrapper').fitVids();
        $('.enterUrl').addClass('hidden');
      }, 450);
    $f('player_1').addEvent('ready', setupVideoListeners);
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

  function playPauseVideo(e) {
    e.preventDefault();
    if(T.paused) {
      $f('player_1').api('play');
      T.startedTime = T.currentTime;
      $('textarea.transcriptEntry')[0].focus()
    } else {
      $f('player_1').api('pause');
    }
  }

  function clearTextArea() {
    $('textarea').val('');
  }

  function insertNewSentance(e) {
    e.preventDefault();
    T.transcript[T.startedTime] = $('textarea').val();
    var startTag = '<span data-time="' + T.startedTime + '">';
    $('.transcriptPreview').append(startTag + $('textarea').val() + '</span>');
    clearTextArea();
    T.startedTime = T.currentTime;
    playVideoAtClickedSentence();
  }

  function keyboardListen() {
    var lastKey;
    $(window).on('keydown', function(e) {
      if(lastKey && (lastKey == 17 && e.keyCode == 32)) {
        playPauseVideo(e);
        lastKey = 0;
        return false;
      } else if(e.keyCode == 13) {
        insertNewSentance(e);
        lastKey = 0;
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