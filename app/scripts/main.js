/* global inmates, FilterJS */

'use strict';

$(document).ready(function() {

  //get age and year ranges based on max and min of those values from data
  var ageMin, ageMax, yearMin, yearMax;
  findRange(inmates);

  initSliders(ageMin,ageMax,yearMin,yearMax);

  var FJS = new FilterJS(inmates, '#inmates', {
    template: '#inmate-template',
    search: {},
    callbacks: {
      afterFilter: function(result, inmates) {
        $('#total_inmates').text(result.length);
      }
    }
  });

  function findRange(inmates) {
    var ageRange = [];
    var yearRange = [];
    for(var i=0; i<inmates.length; i++) {
      ageRange.push(inmates[i].age);
      yearRange.push(inmates[i].timeserved);
    }
    Array.prototype.max = function() {
      return Math.max.apply(null, this);
    };
    Array.prototype.min = function() {
      return Math.min.apply(null, this);
    };
    ageMax = roundUp(ageRange.max());
    ageMin = roundDown(ageRange.min());
    yearMax = roundUp(yearRange.max());
    yearMin = roundDown(yearRange.min());
  }

  function roundDown(x) {
    return Math.floor(x/5)*5;
  }

  function roundUp(x) {
    return Math.ceil(x/5)*5;
  }

  FJS.addCriteria({field: 'race', ele: '#race_criteria input:checkbox'});
  FJS.addCriteria({field: 'age', ele: '#age_filter', type: 'range'});
  FJS.addCriteria({field: 'timeserved', ele: '#timeserved_filter', type: 'range'});
  FJS.addCriteria({field: 'sex', ele: '#sex_criteria input:checkbox'});

  window.FJS = FJS;

  //lightbox scripts
  $('.open-lightbox').click(function() {
    var inmate = $(this).attr('id');
    $('#light-'+inmate).removeClass('hidden');
    $('#fade-'+inmate).removeClass('hidden');
  });
  $('.black_overlay').click(function() {
    $('.black_overlay').addClass('hidden');
    $('.white_content').addClass('hidden');
  });
  $('.close-lightbox').click(function() {
    $('.black_overlay').addClass('hidden');
    $('.white_content').addClass('hidden');
  });

  //jump sidebar down when you hit it
  var length = jQuery('#interactive').height() - jQuery('.sidebar').height() + jQuery('#interactive').offset().top;
  jQuery(window).scroll(function () {
    var scroll = jQuery(this).scrollTop();
    var height = jQuery('.sidebar').height() + 'px';
    if (scroll < jQuery('#interactive').offset().top) {
      jQuery('.sidebar').css({
        'position': 'absolute',
        'top': '0'
      });
    } else if (scroll > length) {
      jQuery('.sidebar').css({
        'position': 'absolute',
        'top': 'auto'
      });
    } else {
      jQuery('.sidebar').css({
        'position': 'fixed',
        'top': '0',
        'margin-top': '1em'
      });
    }
  });

});

function initSliders(ageMin,ageMax,yearMin,yearMax) {
  $('#age_slider').slider({
    min: ageMin,
    max: ageMax,
    values:[ageMin, ageMax],
    step: 5,
    range:true,
    slide: function(event, ui) {
      $('#age_range_label' ).html(ui.values[0] + ' - ' + ui.values[1]);
      $('#age_filter').val(ui.values[0] + '-' + ui.values[1]).trigger('change');
    }
  });

  $('#timeserved_slider').slider({
    min: yearMin,
    max: yearMax,
    values:[yearMin, yearMax],
    step: 5,
    range:true,
    slide: function(event, ui) {
      $('#timeserved_range_label').html(ui.values[0] + ' - ' + ui.values[1]);
      $('#timeserved_filter').val(ui.values[0] + '-' + ui.values[1]).trigger('change');
    }
  });

  $('#race_criteria :checkbox').prop('checked', true);
  $('#sex_criteria :checkbox').prop('checked', true);
}
