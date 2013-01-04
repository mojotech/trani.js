(function($) {
  $.fn.trani = function(args) {
    var id = '#' + this.attr('id');
    var events = {};
    var froogInstance = $f(this[0]);
    froogInstance.addEvent('ready', checkTime);

    function jumpToClickedSentance() {
      $(args.spanClass).click(function(i) {
        tmpTime = Number($(this).data("time"));
        froogInstance.api('seekTo', tmpTime);
        froogInstance.api('play');
      });
    }

    function initTimes(args) {
      $(args.transcriptDiv).find(args.spanClass).each(function() {
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