var T = T || {};

T.create = function() {
  function init() {
    generateOnInputSubmit();
  }

  function generateOnInputSubmit() {
    $('input.url').on('keydown', function(e) {
      if(e.keyCode == 13) {
        console.log($(this).val());
      }
    });
  }

  function generateVideoHtml() {

  }

  function addVideo() {

  }

  return {
    init: init,
    generateVideoHtml: generateVideoHtml,
    addVideo: addVideo
  }
}

$(document).ready(function() {
  T.create().init();
});