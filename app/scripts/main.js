(function() {
  'use strict';

  var $windowWidth = $(window).width();

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
      if(ui.values[0] < 10) {
        ui.values[0] = '0' + ui.values[0];
      }
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
    var numInmates = threeDigits(activeInmates.length);
    $totalInmates.text(numInmates);
  }

  function threeDigits(num) {
      if (num < 100) {
        if(num < 10) {
          return '00' + num;
        }
        return '0' + num;
      }
      return num;
  }

  //when lightbox opens
  $inmatesContainer.find('.open-lightbox').click(function() {
    var inmate = this.id;
    if($windowWidth < 460) {
      $('#' + inmate + ' img').toggleClass('grayscale');
      $('#' + inmate + ' .info-button').toggleClass('up');
    } else {
      $('body').css('overflow', 'hidden');
    }
    $('#light-' + inmate).toggleClass('hidden');
    $('#fade-' + inmate).toggleClass('hidden');
  });

  //when click prev or next
  $inmatesContainer.find('.pagination').click(function() {
    var parentEls = $(this).parent().parent();
    var inmate = parentEls.find('.open-lightbox').attr('id');
    var nextPrev = addNextPrevious(inmate, parentEls);
    if ($(this).hasClass('next')) {
      nextInmate(inmate, nextPrev[1]);
    } else {
      prevInmate(inmate, nextPrev[0]);
    }

    //add funcitonality that doesn't do anything if it's first or last of set - grays out link
  });

  //finds next and prev available
  function addNextPrevious(inmate, parentEls) {
    var nextViewable = parentEls.nextAll().not('.hidden').first()[0];
    var prevViewable = parentEls.prevAll().not('.hidden').first()[0];

    var nextID, prevID;

    if(nextViewable) {
      nextID = $(nextViewable).find('.open-lightbox')[0].id;  // the next available to view
    }
    if(prevViewable) {
      prevID = $(prevViewable).find('.open-lightbox')[0].id;  // the previous available to view
    }
    return [prevID, nextID];
  }

  //moves forward
  function nextInmate(inmate, nextID) {
    $('#light-' + inmate).toggleClass('hidden');
    $('#fade-' + inmate).toggleClass('hidden');
    $('#light-' + nextID).toggleClass('hidden');
    $('#fade-' + nextID).toggleClass('hidden');
  }

  //moves back
  function prevInmate (inmate, prevID) {
    $('#light-' + inmate).toggleClass('hidden');
    $('#fade-' + inmate).toggleClass('hidden');
    $('#light-' + prevID).toggleClass('hidden');
    $('#fade-' + prevID).toggleClass('hidden');
  }

  $('.black_overlay').click(function() {
    $('.black_overlay').addClass('hidden');
    $('.white_content').addClass('hidden');
    $('body').css('overflow', 'auto');
  });

  $('.close-lightbox').click(function() {
    $('.black_overlay').addClass('hidden');
    $('.white_content').addClass('hidden');
    $('body').css('overflow', 'auto');
  });
})();
