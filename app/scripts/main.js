(function() {
  'use strict';

  //typeahead for county select
  var substringMatcher = function(strs) {
    return function findMatches(q, cb) {
      var matches, substringRegex;

      // an array that will be populated with substring matches
      matches = [];

      // regex used to determine if a string contains the substring `q`
      substringRegex = new RegExp(q, 'i');

      // iterate through the pool of strings and for any string that
      // contains the substring `q`, add it to the `matches` array
      $.each(strs, function(i, str) {
        if (substringRegex.test(str)) {
          matches.push(str);
        }
      });

      cb(matches);
    };
  };

  var counties = ['Anderson', 'Andrews', 'Angelina', 'Aransas', 'Archer',
  'Armstrong', 'Atascosa', 'Austin', 'Bailey', 'Bandera', 'Bastrop', 'Baylor',
  'Bee', 'Bell', 'Bexar', 'Blanco', 'Borden', 'Bosque', 'Bowie', 'Brazoria',
  'Brazos', 'Brewster', 'Briscoe', 'Brooks', 'Brown', 'Burleson', 'Burnet',
  'Caldwell', 'Calhoun', 'Callahan', 'Cameron', 'Camp', 'Carson', 'Cass',
  'Castro', 'Chambers', 'Cherokee', 'Childress', 'Clay', 'Cochran', 'Coke',
  'Coleman', 'Collin', 'Collingsworth', 'Colorado', 'Comal', 'Comanche',
  'Concho', 'Cooke', 'Coryell', 'Cottle', 'Crane', 'Crockett', 'Crosby',
  'Culberson', 'Dallam', 'Dallas', 'Dawson', 'Deaf Smith', 'Delta', 'Denton',
  'DeWitt', 'Dickens', 'Dimmit', 'Donley', 'Duval', 'Eastland', 'Ector',
  'Edwards', 'El Paso', 'Ellis', 'Erath', 'Falls', 'Fannin', 'Fayette',
  'Fisher', 'Floyd', 'Foard', 'Fort Bend', 'Franklin', 'Freestone', 'Frio',
  'Gaines', 'Galveston', 'Garza', 'Gillespie', 'Glasscock', 'Goliad',
  'Gonzales', 'Gray', 'Grayson', 'Gregg', 'Grimes', 'Guadalupe', 'Hale', 'Hall',
   'Hamilton', 'Hansford', 'Hardeman', 'Hardin', 'Harris', 'Harrison',
   'Hartley', 'Haskell', 'Hays', 'Hemphill', 'Henderson', 'Hidalgo', 'Hill',
   'Hockley', 'Hood', 'Hopkins', 'Houston', 'Howard', 'Hudspeth', 'Hunt',
   'Hutchinson', 'Irion', 'Jack', 'Jackson', 'Jasper', 'Jeff Davis',
   'Jefferson', 'Jim Hogg', 'Jim Wells', 'Johnson', 'Jones', 'Karnes',
   'Kaufman', 'Kendall', 'Kenedy', 'Kent', 'Kerr', 'Kimble', 'King', 'Kinney',
   'Kleberg', 'Knox', 'La Salle', 'Lamar', 'Lamb', 'Lampasas', 'Lavaca', 'Lee',
   'Leon', 'Liberty', 'Limestone', 'Lipscomb', 'Live Oak', 'Llano', 'Loving',
   'Lubbock', 'Lynn', 'Madison', 'Marion', 'Martin', 'Mason', 'Matagorda',
   'Maverick', 'McCulloch', 'McLennan', 'McMullen', 'Medina', 'Menard',
   'Midland', 'Milam', 'Mills', 'Mitchell', 'Montague', 'Montgomery', 'Moore',
   'Morris', 'Motley', 'Nacogdoches', 'Navarro', 'Newton', 'Nolan', 'Nueces',
   'Ochiltree', 'Oldham', 'Orange', 'Palo Pinto', 'Panola', 'Parker', 'Parmer',
   'Pecos', 'Polk', 'Potter', 'Presidio', 'Rains', 'Randall', 'Reagan', 'Real',
   'Red River', 'Reeves', 'Refugio', 'Roberts', 'Robertson', 'Rockwall',
   'Runnels', 'Rusk', 'Sabine', 'San Augustine', 'San Jacinto', 'San Patricio',
   'San Saba', 'Schleicher', 'Scurry', 'Shackelford', 'Shelby', 'Sherman',
   'Smith', 'Somervell', 'Starr', 'Stephens', 'Sterling', 'Stonewall', 'Sutton',
   'Swisher', 'Tarrant', 'Taylor', 'Terrell', 'Terry', 'Throckmorton', 'Titus',
   'Tom Green', 'Travis', 'Trinity', 'Tyler', 'Upshur', 'Upton', 'Uvalde',
   'Val Verde', 'Van Zandt', 'Victoria', 'Walker', 'Waller', 'Ward',
   'Washington', 'Webb', 'Wharton', 'Wheeler', 'Wichita', 'Wilbarger',
   'Willacy', 'Williamson', 'Wilson', 'Winkler', 'Wise', 'Wood', 'Yoakum',
   'Young', 'Zapata', 'Zavala'
  ];

  var countySearch = $('#county_typeahead .typeahead').typeahead({
    hint: true,
    highlight: true,
    minLength: 1
  },
  {
    name: 'counties',
    source: substringMatcher(counties)
  });

  //getting inputs
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
    max: 45,
    values:[0, 45],
    step: 5,
    range:true,
    slide: function(event, ui) {
      $timeServedRangeLabelStart.text(ui.values[0]);
      $timeServedRangeLabelEnd.text(ui.values[1]);

      filter();
    }
  });

  var $executionCritera = $('#execution_criteria').find('input[type=checkbox]');

  $executionCritera.change(function() {
    filter();
  });

  var countyEntry = '';

  countySearch.on('typeahead:selected', function(e, datum) {
    countyEntry = datum;
    filter();
  });

  function getState() {
    var raceSelection = $raceCriteria.filter(':checked').map(function() { return this.value; }).get();
    var sexSelection = $sexCriteria.filter(':checked').map(function() { return this.value; }).get();
    var ageRange = [+$ageRangeLabelStart.text(), +$ageRangeLabelEnd.text()];
    var timeRange = [+$timeServedRangeLabelStart.text(), +$timeServedRangeLabelEnd.text()];
    var executionSelection = $executionCritera.filter(':checked').map(function() { return this.value; }).get();
    var countySelection = countyEntry;

    return {
      raceSelection: raceSelection,
      sexSelection: sexSelection,
      ageRange: ageRange,
      timeRange: timeRange,
      executionSelection: executionSelection,
      countySelection: countySelection
    };
  }

  var $totalInmates = $('#total_inmates');
  var activeInmates = [];

  function filter() {
    $inmatesContainer.find('.inactive').toggleClass('inactive');

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

      if ($.inArray($this.data('execution'), state.executionSelection) < 0 && state.executionSelection.length) {
        $this.addClass('hidden');
        return false;
      }

      if (state.countySelection != $this.data('county')) {
        $this.addClass('hidden');
        return false;
      }

      $this.removeClass('hidden');
      return true;
    });
    var numInmates = threeDigits(activeInmates.length);
    $totalInmates.text(numInmates);

    //cancel pagination on first and last of filter
    var firstInmate = $(activeInmates[0]);
    var lastInmate = $(activeInmates[activeInmates.length -1]);
    firstInmate.find('.prev.pagination').toggleClass('inactive');
    lastInmate.find('.next.pagination').toggleClass('inactive');

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
    var parent = $(this).parent().attr('id');
    var inmate = $(this).attr('id');

    $inmatesContainer.find('.open').removeClass('open');
    $('#' + parent).toggleClass('open');
    $('body').addClass('fixed');

    //determine if needs scrolling or not
    var lightboxHeight = $('#light-' + inmate).height();
    var bioHeight = $('#light-' + inmate).children('.bio').height();
    if(lightboxHeight < bioHeight) {
      $('.white-content').css({'height': '90%', 'top': '5%'});
    }
  });

  //when click prev or next
  $inmatesContainer.find('.pagination').click(function() {
    var parentEls = $(this).parent().parent();
    var inmate = parentEls.find('.open-lightbox').attr('id');
    var prevNext = addPreviousNext(inmate, parentEls);

    if ($(this).hasClass('prev') && !$(this).hasClass('inactive')) {
      prevInmate(inmate, prevNext[0]);
    }
    if ($(this).hasClass('next') && !$(this).hasClass('inactive')) {
      nextInmate(inmate, prevNext[1]);
    }
  });

  //when keydown arrows
  $(document).keydown(function(e) {
    if( $('.inmate.open').length ) {
      var parentEls = $('.inmate.open');
      var inmate = parentEls.find('.open-lightbox').attr('id');
      var prevNext = addPreviousNext(inmate, parentEls);
      var noPrev = parentEls.find('.prev').hasClass('inactive');
      var noNext = parentEls.find('.next').hasClass('inactive');

      if (e.keyCode === 37 && !noPrev) {
        prevInmate(inmate, prevNext[0]);
      } else if (e.keyCode === 39 && !noNext) {
        nextInmate(inmate, prevNext[1]);
      }
    }
  });

  //finds next and prev available
  function addPreviousNext(inmate, parentEls) {
    var prevViewable = parentEls.prevAll().not('.hidden').first()[0];
    var nextViewable = parentEls.nextAll().not('.hidden').first()[0];

    var prevID, nextID;

    if(prevViewable) {
      prevID = $(prevViewable).find('.open-lightbox')[0].id;  // the previous available to view
    }

    if(nextViewable) {
      nextID = $(nextViewable).find('.open-lightbox')[0].id;  // the next available to view
    }

    return [prevID, nextID];
  }

  //moves back
  function prevInmate (inmate, prevID) {
    $('#' + inmate).parent().removeClass('open');
    $('#' + prevID).parent().addClass('open');
  }

  //moves forward
  function nextInmate(inmate, nextID) {
    $('#' + inmate).parent().removeClass('open');
    $('#' + nextID).parent().addClass('open');
  }

  //close lightbox
  $('.black-overlay').click(function() {
    var inmate = $(this).parent().attr('id');
    $('body').removeClass('fixed');
    $('#' + inmate).toggleClass('open');
  });

  $('.close-lightbox').click(function() {
    var inmate = $(this).parent().parent().attr('id');
    $('body').removeClass('fixed');
    $('#' + inmate).toggleClass('open');
  });

  $('.info-button').click(function() {
    var inmate = $(this).parent().parent().attr('id');
    if ($('#' + inmate).hasClass('open')) {
      $('#' + inmate).removeClass('open');
    }
  });

  //determine lightbox dimensions on resize
  $(window).resize(function() {
    if( $('.inmate.open').length ) {
      var inmate = $('.inmate.open').find('.white-content').attr('id');
      var lightboxHeight = $('#' + inmate).height();
      var bioHeight = $('#' + inmate).children('.bio').height();
      var $windowWidth = window.innerWidth ? window.innerWidth : $(window).width();

      if(lightboxHeight < bioHeight) {
        $('.white-content').css({'height': '90%', 'top': '5%'});

      } else {
        $('.white-content').css('height', 'auto');
        if ($windowWidth >= 1081) {
          $('.white-content').css('top', '20%');
        } else if ($windowWidth >= 661) {
          $('.white-content').css('top', '15%');
        } else if ($windowWidth >=480) {
          $('.white-content').css('top', '5%');
        }
      }
    }
  });

})();
