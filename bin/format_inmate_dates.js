#!/usr/bin/env node
'use strict';

var fs = require('fs');
var json = require('../data.json');

function formatDate(dateObj) {
  var month, day, year, format_date;
  dateObj = new Date(dateObj);
  month = ['Jan.','Feb.','March','April','May','June','July','Aug.','Sept.','Oct.','Nov.','Dec.'];
  month = month[dateObj.getMonth()];
  day = dateObj.getDate();
  year = dateObj.getFullYear();
  format_date = month + ' ' + day + ', ' + year;
  return format_date;
}

function cleanDates () {

  json['INMATES'].forEach(function(value) {
    if (value.received_date) {
      value.received_date = formatDate(value.received_date);
    }
    if (value.offense_date) {
      value.offense_date = formatDate(value.offense_date);
    }
    if (value.execution_date) {
      value.execution_date = formatDate(value.execution_date);
    }
  });

  fs.writeFile('../data.json', JSON.stringify(json, null, 2));
}

module.exports = cleanDates;

