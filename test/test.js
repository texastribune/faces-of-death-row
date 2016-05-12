#!/usr/bin/env node

'use strict';

var assert = require('chai').assert;
var result = 'Jan. 1, 1992';

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

describe('Test formatDate function', function () {

  it('convert string date with zero padding to AP style date', function (done) {

    var testDateNoZeroPadding = '1/1/1992';
    assert.equal(formatDate(testDateNoZeroPadding), result);
    done();

  });

  it('should convert string date with zero padding to AP style date', function (done) {

    var testDateZeroPadding = '01/01/1992';
    assert.equal(formatDate(testDateZeroPadding), result);
    done();

  });

  it('should convert string date with hyphens to AP style date', function (done) {

    var testDateHyphenFormat = '1992-1-1';
    assert.equal(formatDate(testDateHyphenFormat), result);
    done();

  });

  it('should convert written date to AP style date', function (done) {

    var testDateWrittenOut = 'January 1 1992';
    assert.equal(formatDate(testDateWrittenOut), result);
    done();

  });

});
