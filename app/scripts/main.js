/* global inmates, FilterJS */

'use strict';

$(document).ready(function() {

  var ageMin, ageMax, yearMin, yearMax;
  findRange(inmates);

  initSliders(ageMin,ageMax,yearMin,yearMax);

  var FJS = new FilterJS(inmates, '#inmates', {
    template: '#inmate-template',
    search: {},
    callbacks: {
      afterFilter: function(result) {
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
