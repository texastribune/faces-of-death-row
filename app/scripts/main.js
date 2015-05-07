(function() {
  'use strict';

  var $inmatesContainer = $('#inmates');
  var $inmates = $inmatesContainer.find('.inmate');

  var $raceCriteria = $('#race_criteria').find('input[type=checkbox]');

  $raceCriteria.change(function() {
    filter();
  });

  var $sexCriteria = $('#sex_criteria').find('input[type=checkbox]');

  $sexCriteria.change(function() {
    filter();
  });

  var $ageRangeLabelStart = $('#age_range_label_start');
  var $ageRangeLabelEnd = $('#age_range_label_end');

  $('#age_slider').slider({
    min: 20,
    max: 80,
    values:[20, 80],
    step: 5,
    range:true,
    slide: function(event, ui) {
      $ageRangeLabelStart.text(ui.values[0]);
      $ageRangeLabelEnd.text(ui.values[1]);

      filter();
    }
  });

  var $timeServedRangeLabelStart = $('#timeserved_range_label_start');
  var $timeServedRangeLabelEnd = $('#timeserved_range_label_end');

  $('#timeserved_slider').slider({
    min: 0,
    max: 40,
    values:[0, 40],
    step: 5,
    range:true,
    slide: function(event, ui) {
      $timeServedRangeLabelStart.text(ui.values[0]);
      $timeServedRangeLabelEnd.text(ui.values[1]);

      filter();
    }
  });

  function getState() {
    var raceSelection = $raceCriteria.filter(':checked').map(function() { return this.value; }).get();
    var sexSelection = $sexCriteria.filter(':checked').map(function() { return this.value; }).get();
    var ageRange = [+$ageRangeLabelStart.text(), +$ageRangeLabelEnd.text()];
    var timeRange = [+$timeServedRangeLabelStart.text(), +$timeServedRangeLabelEnd.text()];

    return {
      raceSelection: raceSelection,
      sexSelection: sexSelection,
      ageRange: ageRange,
      timeRange: timeRange
    };
  }

  var $totalInmates = $('#total_inmates');
  var activeInmates = [];

  function filter() {
    var state = getState();

    activeInmates = $inmates.filter(function() {
      var $this = $(this);

      if ($.inArray($this.data('race'), state.raceSelection) < 0 && state.raceSelection.length) {
        $this.addClass('hidden');
        return false;
      }

      if ($.inArray($this.data('sex'), state.sexSelection) < 0 && state.sexSelection.length) {
        $this.addClass('hidden');
        return false;
      }

      var age = +$this.data('age');

      if (state.ageRange[0] > age || age > state.ageRange[1]) {
        $this.addClass('hidden');
        return false;
      }

      var time = +$this.data('time');

      if (state.timeRange[0] > time || time > state.timeRange[1]) {
        $this.addClass('hidden');
        return false;
      }

      $this.removeClass('hidden');
      return true;
    });

    $totalInmates.text(activeInmates.length);
  }

  $inmatesContainer.find('.open-lightbox').click(function() {
    var inmate = this.id;
    var $parentEls = $(this).parent();

    var nextViewable = $parentEls.nextAll().not('.hidden').first();
    var prevViewable = $parentEls.prevAll().not('.hidden').first();

    console.log(nextViewable);  // the next available to view
    console.log(prevViewable);  // the previous available to view

    $('#light-' + inmate).removeClass('hidden');
    $('#fade-' + inmate).removeClass('hidden');
  });

  $('.black_overlay').click(function() {
    $('.black_overlay').addClass('hidden');
    $('.white_content').addClass('hidden');
  });

  $('.close-lightbox').click(function() {
    $('.black_overlay').addClass('hidden');
    $('.white_content').addClass('hidden');
  });
})();
