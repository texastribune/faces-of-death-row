'use strict';

$(document).ready(function(){

  initSliders();

  console.log(inmates);

  var FJS = FilterJS(inmates, '#inmates', {
    template: '#inmate-template',
    search: {ele: '#searchbox', fields: ['last_name', 'first_name']}, // With specific fields
    criterias:[
      {field: 'race', ele: '#race_criteria input:checkbox'},
      {field: 'sex', ele: '#sex_criteria input:checkbox'},
      {field: 'age', ele: '#age_filter', type: 'range'},
      {field: 'time_served', ele: '#time_served_filter', type: 'range'}
    ],
    callbacks: {
      afterFilter: function(result){
        $('#total_inmates').text(result.length);
      }
    }
  });

  FJS.addCriteria({field: 'year', ele: '#year_filter', type: 'range', all: 'all'});
  FJS.addCriteria({field: 'rating', ele: '#rating_filter', type: 'range'});
  FJS.addCriteria({field: 'runtime', ele: '#runtime_filter', type: 'range'});
  FJS.addCriteria({field: 'genre', ele: '#genre_criteria input:checkbox'});

  /*
   * Add multiple criterial.
    FJS.addCriteria([
      {field: 'race', ele: '#race_criteria input:checkbox'},
      {field: 'sex', ele: '#sex_criteria input:checkbox'},
      {field: 'age', ele: '#age_filter', type: 'range'},
      {field: 'time_served', ele: '#time_served_filter', type: 'range'}
    ])
  */

  window.FJS = FJS;
});

function initSliders(){
  $("#rating_slider").slider({
    min: 8,
    max: 10,
    values:[8, 10],
    step: 0.1,
    range:true,
    slide: function( event, ui ) {
      $("#rating_range_label" ).html(ui.values[ 0 ] + ' - ' + ui.values[ 1 ]);
      $('#rating_filter').val(ui.values[0] + '-' + ui.values[1]).trigger('change');
    }
  });

  $("#runtime_slider").slider({
    min: 50,
    max: 250,
    values:[0, 250],
    step: 10,
    range:true,
    slide: function( event, ui ) {
      $("#runtime_range_label" ).html(ui.values[ 0 ] + ' mins. - ' + ui.values[ 1 ] + ' mins.');
      $('#runtime_filter').val(ui.values[0] + '-' + ui.values[1]).trigger('change');
    }
  });

  $('#genre_criteria :checkbox').prop('checked', true);
  $('#all_genre').on('click', function(){
    $('#genre_criteria :checkbox').prop('checked', $(this).is(':checked'));
  });
}
