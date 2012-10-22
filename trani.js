(function($) {
  $.fn.trani = function(args) {
    var id = '#' + this.attr('id');
    var events = {};
    var froogInstance = $f(this.attr('id'));
    froogInstance.addEvent('ready', checkTime);

    function jumpToClickedSentance() {
      $(args).click(function(i) {
        tmpTime = Number($(this).data("time"));
        froogInstance.api('seekTo', tmpTime);
        froogInstance.api('play');
      });
    }

    function initTimes(args) {
      $(id + "_transcript").find(args).each(function() {
        var self = $(this);
        events[self.data('time')] = self;
      });
    }

    function addEvent(element, eventName, callback) {
      $(element).on(eventName, callback);
    }

    function checkTime() {
      froogInstance.addEvent('playProgress', function(data) {
        var curTime = Math.floor(Number(data.seconds));
        if(events[curTime]) {
          $('.highlight').removeClass('highlight');
          events[curTime].addClass('highlight');
        }
      });
    }
    jumpToClickedSentance(args);
    initTimes(args);
    return this;
  }
})(jQuery);