/* global inmates, FilterJS */

'use strict';

$(document).ready(function() {

  initSliders();

  var FJS = new FilterJS(inmates, '#inmates', {
    template: '#inmate-template',
    search: {},
    callbacks: {
      afterFilter: function(result) {
        $('#total_inmates').text(result.length);
      }
    }
  });

  FJS.addCriteria({field: 'race', ele: '#race_criteria input:checkbox'});
  FJS.addCriteria({field: 'age', ele: '#age_filter', type: 'range'});
  FJS.addCriteria({field: 'timeserved', ele: '#timeserved_filter', type: 'range'});
  FJS.addCriteria({field: 'sex', ele: '#sex_criteria input:checkbox'});


  window.FJS = FJS;
});

function initSliders() {
  $('#age_slider').slider({
    min: 18,
    max: 100,
    values:[18, 100],
    step: 5,
    range:true,
    slide: function(event, ui) {
      $('#age_range_label' ).html(ui.values[0] + ' - ' + ui.values[1]);
      $('#age_filter').val(ui.values[0] + '-' + ui.values[1]).trigger('change');
    }
  });

  $('#timeserved_slider').slider({
    min: 0,
    max: 40,
    values:[0, 40],
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
